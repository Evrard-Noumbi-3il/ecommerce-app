import jwt from "jsonwebtoken";

export function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Token manquant" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Token invalide ou expiré" });
  }
}

export function isAdmin(req, res, next) {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ message: "Accès réservé aux administrateurs" });
  }
  next();
}

export function isModeratorOrAdmin(req, res, next) {
  if (req.user?.role !== "admin" && req.user?.role !== "moderator") {
    return res.status(403).json({ message: "Accès réservé aux modérateurs ou administrateurs" });
  }
  next();
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
