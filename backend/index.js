import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import authRoutes from './routes/authRoutes.js'
import homeRoutes from "./routes/homeRoutes.js"
import filterRoutes from "./routes/filterRoutes.js"
import adminRoutes from "./routes/adminRoutes.js"
import favorisRoutes from "./routes/favorisRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import categorieRoutes from "./routes/categorieRoutes.js"
import avisRoutes from "./routes/avisRoutes.js"
import notificationsRoutes from "./routes/notificationRoutes.js";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({ origin: process.env.CORS_ORIGIN }));
app.use(helmet());
app.disable('x-powered-by');

const allowedHosts = [
  "localhost:5173",          
  "localhost:8080",           

  "localhost:3000",           
];
const isAllowedHost = (host) => {
  return allowedDomains.some(domain => host.endsWith(domain));
};

app.get("/redirect", (req, res) => {
  const redirectUrl = req.query.url;

  if (!redirectUrl)
    return res.status(400).json({ error: "Aucune URL fournie" });

  try {
    const parsed = new URL(redirectUrl);

    if (!isAllowedHost(parsed.host)) {
      return res.status(400).json({ error: `Redirection non autorisée vers ${parsed.host}` });
    }

    return res.redirect(parsed.href);
  } catch {
    return res.status(400).json({ error: "URL invalide" });
  }
});

// Connexion MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB connecté"))
  .catch(err => console.error("❌ Erreur MongoDB :", err));


// Routes
app.use('/api/auth', authRoutes)
app.use("/api/home", homeRoutes)
app.use("/api/products", filterRoutes)
app.use("/api/admin", adminRoutes)
app.use("/api/favoris", favorisRoutes)
app.use("/api/user", userRoutes)
app.use("/api/categories", categorieRoutes)
app.use("/api/avis", avisRoutes)
app.use("/api/notifications", notificationsRoutes);

// custom 404
app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!")
})

// custom error handler
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend démarré sur http://localhost:${PORT}`);
});
