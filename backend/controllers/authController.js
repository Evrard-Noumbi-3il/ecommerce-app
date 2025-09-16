import bcrypt from 'bcryptjs';
import User from '../models/Users.js';
import jwt from 'jsonwebtoken';

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Utilisateur non trouvé" });
    }

    // Vérifier le mot de passe
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Mot de passe incorrect ❌" });
    }

    // Générer un token JWT
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      message: "Connexion réussie 🎉",
      token,
      user: { id: user._id, email: user.email }
    });
  } catch (error) {
    return res.status(500).json({ message: "Erreur serveur ❌", error: error.message });
  }
};

export const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email et mot de passe requis" });
    }

    // Vérifier si l’utilisateur existe déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Cet email est déjà utilisé" });
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer l’utilisateur
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    return res.status(201).json({ message: "Utilisateur créé avec succès 🚀",token });
  } catch (error) {
    return res.status(500).json({ message: "Erreur serveur ❌", error: error.message });
  }
};
