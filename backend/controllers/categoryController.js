import Categorie from '../models/Categorie.js';
import Thematique from '../models/Thematique.js';
import mongoose from 'mongoose';
import { body, validationResult, param } from 'express-validator';
import { upload } from '../upload/uploadConfig.js';

// Middleware de validation pour les catégories
export const validateCategory = [
  body('nom')
    .trim()
    .notEmpty()
    .withMessage('Le nom de la catégorie est requis')
    .isLength({ min: 2, max: 100 })
    .withMessage('Le nom doit contenir entre 2 et 100 caractères')
    .matches(/^[a-zA-ZÀ-ÿ0-9\s\-_]+$/)
    .withMessage('Le nom ne doit contenir que des lettres, chiffres, espaces, tirets et underscores'),
  
  body('image')
    .optional()
    .isURL()
    .withMessage('L\'URL de l\'image doit être valide'),
  
  body('id_thematique')
    .notEmpty()
    .withMessage('La thématique est requise')
    .custom(async (value) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new Error('ID de thématique invalide');
      }
      const thematique = await Thematique.findById(value);
      if (!thematique) {
        throw new Error('La thématique spécifiée n\'existe pas');
      }
      return true;
    })
];

export const validateCategoryId = [
  param('id')
    .isMongoId()
    .withMessage('ID de catégorie invalide')
];

// Middleware de gestion des erreurs de validation
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: 'Données de validation invalides',
      details: errors.array()
    });
  }
  next();
};

// Récupérer toutes les catégories avec pagination et filtres
export const getCategories = async (req, res) => {
  try {
    const {
      page = 1,
      limit = null,
      search = '',
      thematique = '',
      sortBy = 'nom',
      sortOrder = 'asc'
    } = req.query;

    // Construction des filtres
    const filters = {};
    
    if (search) {
      filters.nom = { $regex: search, $options: 'i' };
    }
    
    if (thematique && mongoose.Types.ObjectId.isValid(thematique)) {
      filters.id_thematique = thematique;
    }

    // Options de tri
    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const limitNum = parseInt(limit);

    // Requête avec population et comptage
    const [categories, total] = await Promise.all([
      Categorie.find(filters)
        .populate('id_thematique', 'nom description')
        .sort(sortOptions)
        .skip(skip)
        .limit(limitNum)
        .lean(),
      Categorie.countDocuments(filters)
    ]);

    // Formatage des données
    const formattedCategories = categories.map(cat => ({
      ...cat,
      thematique: cat.id_thematique,
      createdAt: cat.createdAt || new Date(),
      updatedAt: cat.updatedAt || new Date()
    }));

    res.json({
      data: formattedCategories,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limitNum),
        totalItems: total,
        itemsPerPage: limitNum,
        hasNextPage: skip + limitNum < total,
        hasPrevPage: page > 1
      },
      filters: {
        search,
        thematique,
        sortBy,
        sortOrder
      }
    });

  } catch (err) {
    console.error('Erreur lors de la récupération des catégories:', err);
    res.status(500).json({
      error: 'Erreur serveur lors de la récupération des catégories',
      details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
};

// Récupérer une catégorie par ID
export const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'ID de catégorie invalide' });
    }

    const category = await Categorie.findById(id)
      .populate('id_thematique', 'nom description')
      .lean();

    if (!category) {
      return res.status(404).json({ error: 'Catégorie non trouvée' });
    }

    // Reconstruire l’URL de l’image
    const imageUrl = category.image
    ? (category.image.startsWith('/images/')
        ? `${req.protocol}://${req.get('host')}${category.image}`
        : `${req.protocol}://${req.get('host')}/images/categories/${category.image}`)
    : null;

    // Réponse formatée
    const formattedCategory = {
      _id: category._id,
      nom: category.nom,
      image: imageUrl,
      id_thematique: category.id_thematique?._id || null,
    };

    res.json(formattedCategory);

  } catch (err) {
    console.error('Erreur lors de la récupération de la catégorie:', err);
    res.status(500).json({
      error: 'Erreur serveur lors de la récupération de la catégorie',
      details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
};

// Ajouter une nouvelle catégorie
export const addCategory = [
    upload.single('image'),
  validateCategory,
  handleValidationErrors,
  async (req, res) => {
    try {
      const { nom, id_thematique } = req.body;

      // Vérification d'unicité du nom (optionnel)
      const existingCategory = await Categorie.findOne({ 
        nom: { $regex: `^${nom}$`, $options: 'i' }
      });
      
      if (existingCategory) {
        return res.status(409).json({
          error: 'Une catégorie avec ce nom existe déjà'
        });
      }

      const imagePath = req.file
        ? `/images/categories/${req.file.filename}`
        : null;


      // Création de la nouvelle catégorie
      const newCategory = new Categorie({
        nom: nom.trim(),
        image: imagePath,
        id_thematique,
        createdAt: new Date(),
        updatedAt: new Date()
      });

      await newCategory.save();

      // Récupération avec population pour la réponse
      const populatedCategory = await Categorie.findById(newCategory._id)
        .populate('id_thematique', 'nom description')
        .lean();

      res.status(201).json({
        message: 'Catégorie créée avec succès',
        data: {
          ...populatedCategory,
          thematique: populatedCategory.id_thematique
        }
      });

    } catch (err) {
      console.error('Erreur lors de la création de la catégorie:', err);
      
      if (err.code === 11000) {
        return res.status(409).json({
          error: 'Une catégorie avec ces données existe déjà'
        });
      }
      
      res.status(500).json({
        error: 'Erreur serveur lors de la création de la catégorie',
        details: process.env.NODE_ENV === 'development' ? err.message : undefined
      });
    }
  }
];

// Mettre à jour une catégorie
export const updateCategory = [
  validateCategoryId,
  validateCategory,
  handleValidationErrors,
  async (req, res) => {
    try {
      const { id } = req.params;
      const { nom, image, id_thematique } = req.body;

      // Vérification d'existence de la catégorie
      const existingCategory = await Categorie.findById(id);
      if (!existingCategory) {
        return res.status(404).json({ error: 'Catégorie non trouvée' });
      }

      // Vérification d'unicité du nom (exclure la catégorie actuelle)
      const duplicateCategory = await Categorie.findOne({
        _id: { $ne: id },
        nom: { $regex: `^${nom}$`, $options: 'i' }
      });
      
      if (duplicateCategory) {
        return res.status(409).json({
          error: 'Une autre catégorie avec ce nom existe déjà'
        });
      }

      // Mise à jour
      const updatedCategory = await Categorie.findByIdAndUpdate(
        id,
        {
          nom: nom.trim(),
          image: image?.trim() || null,
          id_thematique,
          updatedAt: new Date()
        },
        { 
          new: true,
          runValidators: true
        }
      ).populate('id_thematique', 'nom description').lean();

      const formattedCategory = {
        ...updatedCategory,
        thematique: updatedCategory.id_thematique
      };

      res.json({
        message: 'Catégorie mise à jour avec succès',
        data: formattedCategory
      });

    } catch (err) {
      console.error('Erreur lors de la mise à jour de la catégorie:', err);
      
      if (err.code === 11000) {
        return res.status(409).json({
          error: 'Une catégorie avec ces données existe déjà'
        });
      }
      
      res.status(500).json({
        error: 'Erreur serveur lors de la mise à jour de la catégorie',
        details: process.env.NODE_ENV === 'development' ? err.message : undefined
      });
    }
  }
];

// Supprimer une catégorie
export const deleteCategory = [
  validateCategoryId,
  handleValidationErrors,
  async (req, res) => {
    try {
      const { id } = req.params;

      // Vérification d'existence
      const category = await Categorie.findById(id);
      if (!category) {
        return res.status(404).json({ error: 'Catégorie non trouvée' });
      }

      // Vérification des dépendances (optionnel)
      // Vous pouvez ajouter ici une vérification pour voir si la catégorie
      // est utilisée dans d'autres collections avant de la supprimer
      
      // Suppression
      await Categorie.findByIdAndDelete(id);

      res.json({
        message: 'Catégorie supprimée avec succès',
        deletedId: id
      });

    } catch (err) {
      console.error('Erreur lors de la suppression de la catégorie:', err);
      res.status(500).json({
        error: 'Erreur serveur lors de la suppression de la catégorie',
        details: process.env.NODE_ENV === 'development' ? err.message : undefined
      });
    }
  }
];

// Supprimer plusieurs catégories
export const deleteMultipleCategories = async (req, res) => {
  try {
    const { ids } = req.body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        error: 'Liste d\'IDs requise et non vide'
      });
    }

    // Validation des IDs
    const invalidIds = ids.filter(id => !mongoose.Types.ObjectId.isValid(id));
    if (invalidIds.length > 0) {
      return res.status(400).json({
        error: 'IDs invalides détectés',
        invalidIds
      });
    }

    // Suppression
    const result = await Categorie.deleteMany({
      _id: { $in: ids }
    });

    res.json({
      message: `${result.deletedCount} catégorie(s) supprimée(s) avec succès`,
      deletedCount: result.deletedCount,
      requestedCount: ids.length
    });

  } catch (err) {
    console.error('Erreur lors de la suppression multiple:', err);
    res.status(500).json({
      error: 'Erreur serveur lors de la suppression multiple',
      details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
};

// Obtenir les statistiques des catégories
export const getCategoriesStats = async (req, res) => {
  try {
    const stats = await Categorie.aggregate([
      {
        $group: {
          _id: '$id_thematique',
          count: { $sum: 1 },
          categories: { $push: '$nom' }
        }
      },
      {
        $lookup: {
          from: 'thematiques',
          localField: '_id',
          foreignField: '_id',
          as: 'thematique'
        }
      },
      {
        $unwind: {
          path: '$thematique',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $project: {
          _id: 1,
          count: 1,
          thematiqueNom: '$thematique.nom',
          categories: 1
        }
      },
      {
        $sort: { count: -1 }
      }
    ]);

    const totalCategories = await Categorie.countDocuments();
    const totalThematiques = await Thematique.countDocuments();

    res.json({
      totalCategories,
      totalThematiques,
      categoriesPerThematique: stats,
      lastUpdated: new Date()
    });

  } catch (err) {
    console.error('Erreur lors de la récupération des statistiques:', err);
    res.status(500).json({
      error: 'Erreur serveur lors de la récupération des statistiques',
      details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
};

// Recherche avancée de catégories
export const searchCategories = async (req, res) => {
  try {
    const { q, fields = 'nom' } = req.query;
    
    if (!q || q.trim().length < 2) {
      return res.status(400).json({
        error: 'Le terme de recherche doit contenir au moins 2 caractères'
      });
    }

    const searchFields = fields.split(',');
    const searchConditions = [];

    // Construction des conditions de recherche
    if (searchFields.includes('nom')) {
      searchConditions.push({
        nom: { $regex: q, $options: 'i' }
      });
    }

    const categories = await Categorie.find({
      $or: searchConditions
    })
    .populate('id_thematique', 'nom description')
    .limit(20)
    .lean();

    const formattedCategories = categories.map(cat => ({
      ...cat,
      thematique: cat.id_thematique
    }));

    res.json({
      query: q,
      fields: searchFields,
      results: formattedCategories,
      count: formattedCategories.length
    });

  } catch (err) {
    console.error('Erreur lors de la recherche:', err);
    res.status(500).json({
      error: 'Erreur serveur lors de la recherche',
      details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
};

// Export des données (CSV/JSON)
export const exportCategories = async (req, res) => {
  try {
    const { format = 'json' } = req.query;
    
    const categories = await Categorie.find()
      .populate('id_thematique', 'nom description')
      .lean();

    const formattedData = categories.map(cat => ({
      id: cat._id,
      nom: cat.nom,
      image: cat.image || '',
      thematique: cat.id_thematique?.nom || '',
      thematique_id: cat.id_thematique?._id || '',
      date_creation: cat.createdAt,
      date_modification: cat.updatedAt
    }));

    if (format === 'csv') {
      // Génération CSV
      const csv = [
        ['ID', 'Nom', 'Image', 'Thématique', 'Date Création', 'Date Modification'],
        ...formattedData.map(cat => [
          cat.id,
          cat.nom,
          cat.image,
          cat.thematique,
          cat.date_creation?.toISOString() || '',
          cat.date_modification?.toISOString() || ''
        ])
      ].map(row => row.join(',')).join('\n');

      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', `attachment; filename=categories_${Date.now()}.csv`);
      res.send(csv);
    } else {
      // Génération JSON
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Content-Disposition', `attachment; filename=categories_${Date.now()}.json`);
      res.json({
        exportDate: new Date(),
        totalItems: formattedData.length,
        data: formattedData
      });
    }

  } catch (err) {
    console.error('Erreur lors de l\'export:', err);
    res.status(500).json({
      error: 'Erreur serveur lors de l\'export',
      details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
};