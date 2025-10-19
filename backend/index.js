import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from './routes/authRoutes.js'
import homeRoutes from "./routes/homeRoutes.js"
import filterRoutes from "./routes/filterRoutes.js"
import adminRoutes from "./routes/adminRoutes.js"
import favorisRoutes from "./routes/favorisRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import categorieRoutes from "./routes/categorieRoutes.js"
import avisRoutes from "./routes/avisRoutes.js"
import chatRoutes from "./routes/chatRoutes.js"
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({ origin: process.env.CORS_ORIGIN }));

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
app.use("/api/chat", chatRoutes)


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend démarré sur http://localhost:${PORT}`);
});
