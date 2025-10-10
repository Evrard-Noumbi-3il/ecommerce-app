import jwt from "jsonwebtoken";
import User from "../models/Users.js";

export const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Accès refusé" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (err) {
    res.status(401).json({ message: "Token invalide" });
  }
};

export const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Accès réservé à l’admin" });
  }
  next();
};

export const isModeratorOrAdmin = (req, res, next) => {
  if (["admin", "moderator"].includes(req.user.role)) {
    return next();
  }
  return res.status(403).json({ message: "Accès réservé aux modérateurs/admins" });
};
// ce que j'ai ajoute 
export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Vérifie si un token est présent
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Accès refusé : Token manquant' });

  // Vérifie la validité du token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Token invalide' });

    req.user = user; // On stocke les infos du user dans req
    next(); // Passe au prochain middleware ou contrôleur
  });
};