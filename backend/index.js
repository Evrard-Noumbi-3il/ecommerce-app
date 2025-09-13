import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";


dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({ origin: process.env.CORS_ORIGIN }));

// Connexion MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ Connecté à MongoDB Atlas"))
  .catch(err => console.error("❌ Erreur MongoDB :", err));

// Route test
app.get("/api", (req, res) => {
  res.json({ message: "Backend fonctionne 🚀" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend démarré sur http://localhost:${PORT}`);
});
