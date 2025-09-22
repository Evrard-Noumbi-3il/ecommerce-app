import bcrypt from 'bcryptjs';
import User from '../models/Users.js';
import jwt from 'jsonwebtoken';
import Notifications from '../models/Notifications.js';

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
      { id: user._id , role: user.role},
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
    const { name, firstname, phonenumber, email, password, confirmpassword } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email et mot de passe requis" });
    }

    // Vérifier si l’utilisateur existe déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Cet email est déjà utilisé" });
    }

    if (password !== confirmpassword) {
      return res.status(400).json({ message: "les mots de passe ne coïncides pas" });
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer l’utilisateur
    const newUser = new User({ name, firstname, phonenumber, email, password: hashedPassword });
    await newUser.save();

    // Créer une notification de bienvenue
    const welcomeNotification = new Notifications({
      type: "info",
      target: newUser._id,
      message: "Bienvenue sur notre plateforme ! Nous sommes ravis de vous compter parmi nous.",
    });
    await welcomeNotification.save();

    const token = jwt.sign({ id: newUser._id, role: newUser.role }, process.env.JWT_SECRET, { expiresIn: '1d' });

    return res.status(201).json({ message: "Utilisateur créé avec succès 🚀", token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erreur serveur ❌", error: error.message });
  }
};
