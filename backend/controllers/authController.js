import bcrypt from 'bcryptjs';
import User from '../models/Users.js';
import jwt from 'jsonwebtoken';
import Notifications from '../models/Notifications.js';
import { sendEmail } from "../utils/mailer.js";
import { sendVerificationEmail, sendWelcomeEmail } from "../utils/mailer.js";
//import { sendSMS } from "../utils/sms.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;


    if (!email || !password) {
      return res.status(400).json({
        message: "Email et mot de passe requis"
      });
    }


    const user = await User.findOne({ email: email.toLowerCase().trim() });

    if (!user) {
      return res.status(401).json({
        message: "Utilisateur non trouvé"
      });
    }


    if (user.isBan) {
      return res.status(403).json({
        message: "Votre compte a été banni. Veuillez contacter le support pour plus d'informations."
      });
    }


    if (!user.isVerified) {


      const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

      console.log('✅ Code de vérification généré pour:', verificationCode);

      user.verificationCode = verificationCode;
      await user.save();


      try {
        await sendVerificationEmail(user.email, verificationCode);
        console.log('✅ Email de vérification renvoyé à:', user.email);
      } catch (emailError) {
        console.error('⚠️ Erreur envoi email de vérification:', emailError);

      }
      return res.status(403).json({
        message: "Votre compte n'est pas encore vérifié. Vérifiez votre email.",
        requiresVerification: true,
        email: user.email
      });
    }


    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "mot de passe incorrect"
      });
    }

    // Générer un token JWT
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );


    const userResponse = {
      id: user._id,
      email: user.email,
      name: user.name,
      firstname: user.firstname,
      role: user.role,
      isVerified: user.isVerified
    };

    return res.status(200).json({
      message: "Connexion réussie",
      token,
      user: userResponse
    });

  } catch (error) {
    console.error('❌ Erreur login:', error);
    return res.status(500).json({
      message: "Erreur serveur lors de la connexion",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

export const registerUser = async (req, res) => {
  try {
    const { name, firstname, phonenumber, email, password } = req.body;


    if (!email || !password) {
      return res.status(400).json({
        message: "Email et mot de passe requis"
      });
    }

    // if (password !== confirmpassword) {
    //   return res.status(400).json({
    //     message: "Les mots de passe ne correspondent pas"
    //   });
    // }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Le mot de passe doit contenir au moins 6 caractères"
      });
    }


    const existingUserEmail = await User.findOne({ email: email.toLowerCase() });
    if (existingUserEmail) {
      return res.status(400).json({
        message: "Cet email est déjà utilisé"
      });
    }


    if (phonenumber) {
      const existingUserNum = await User.findOne({ phonenumber });
      if (existingUserNum) {
        return res.status(400).json({
          message: "Ce numéro de téléphone est déjà utilisé"
        });
      }
    }


    // const hashedPassword = await bcrypt.hash(password, 10);

    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    console.log('✅ Code de vérification généré pour:', verificationCode);

    const newUser = new User({
      name,
      firstname,
      phonenumber: phonenumber || null,
      email: email.toLowerCase(),
      password: password,
      verificationCode,
      isVerified: false,
      role: 'user',
      createdAt: new Date()
    });

    await newUser.save();

    const welcomeMessage = `Bienvenue sur Kanope, ${firstname} ${name}! 🎉 Nous sommes ravis de vous compter parmi nos membres. Découvrez dès maintenant nos meilleures offres ou commencez à vendre vos produits.`;

    const welcomeNotification = new Notifications({
      type: "info",
      target: newUser._id,
      message: welcomeMessage,
      createdAt: new Date()
    });

    await welcomeNotification.save();

    try {

      await sendVerificationEmail(email, verificationCode);
      console.log('✅ Email de vérification envoyé à:', email);
      console.log('Code de vérification:', verificationCode);
    } catch (emailError) {
      console.error('⚠️ Erreur envoi email de vérification:', emailError);

    }

    try {

      await new Promise(resolve => setTimeout(resolve, 5000));
      await sendWelcomeEmail(email, `${firstname} ${name}`);
      console.log('✅ Email de bienvenue envoyé à:', email);
    } catch (emailError) {
      console.error('⚠️ Erreur envoi email de bienvenue:', emailError);

    }

    const token = jwt.sign(
      {
        id: newUser._id,
        email: newUser.email,
        role: newUser.role
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );


    return res.status(201).json({
      message: "Inscription réussie! Vérifiez votre email pour confirmer votre compte.",
      token,
      user: {
        id: newUser._id,
        email: newUser.email,
        name: newUser.name,
        firstname: newUser.firstname,
        isVerified: newUser.isVerified
      }
    });

  } catch (error) {
    console.error('❌ Erreur registration:', error);
    return res.status(500).json({
      message: "Erreur serveur lors de l'inscription",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

export const verifyUser = async (req, res) => {
  try {
    const { email, code } = req.body;

    console.log('DEBUG - Email reçu:', email);
    console.log('DEBUG - Code reçu:', code);


    if (!email || !code) {
      console.log('❌ Email ou code manquant');
      return res.status(400).json({
        message: "Email et code requis"
      });
    }

    // Nettoyer l'email (trim + lowercase)
    const cleanEmail = email.toLowerCase().trim();
    console.log('DEBUG - Email nettoyé:', cleanEmail);


    const user = await User.findOne({ email: cleanEmail });

    console.log('DEBUG - Utilisateur trouvé:', !!user);

    if (!user) {
      console.log('❌ Aucun utilisateur avec cet email:', cleanEmail);
      return res.status(404).json({
        message: "Utilisateur non trouvé"
      });
    }

    console.log('DEBUG - isVerified:', user.isVerified);
    console.log('DEBUG - verificationCode stocké:', user.verificationCode);
    console.log('DEBUG - code reçu:', code);
    console.log('DEBUG - codes correspondent:', user.verificationCode === code);

    if (user.isVerified) {
      console.log('⚠️ Compte déjà vérifié');
      return res.status(400).json({
        message: "Ce compte est déjà vérifié"
      });
    }

    if (user.verificationCode !== code) {
      console.log('❌ Code invalide');
      console.log('  Code attendu:', user.verificationCode);
      console.log('  Code reçu:', code);
      return res.status(400).json({
        message: "Code de vérification invalide"
      });
    }

    user.isVerified = true;
    user.verificationCode = null;
    await user.save();

    console.log('✅ Compte vérifié avec succès');

    const notification = new Notifications({
      type: "info",
      target: user._id,
      message: "Votre compte a été vérifié avec succès! ✅",
      createdAt: new Date()
    });
    await notification.save();

    return res.json({
      message: "Compte vérifié avec succès! ✅"
    });

  } catch (err) {
    console.error('❌ Erreur vérification:', err);
    return res.status(500).json({
      message: "Erreur serveur lors de la vérification",
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
};

export const resendVerificationCode = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "Email requis"
      });
    }

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(404).json({
        message: "Utilisateur non trouvé"
      });
    }

    if (user.isVerified) {
      return res.status(400).json({
        message: "Ce compte est déjà vérifié"
      });
    }

    const newCode = Math.floor(100000 + Math.random() * 900000).toString();
    user.verificationCode = newCode;
    await user.save();

    try {

      await sendVerificationEmail(email, newCode);
      console.log('✅ Code de vérification renvoyé à:', email);
    } catch (emailError) {
      console.error('⚠️ Erreur envoi email:', emailError);
      return res.status(500).json({
        message: "Erreur lors de l'envoi de l'email"
      });
    }

    return res.json({
      message: "Code de vérification renvoyé à votre email ✅"
    });

  } catch (err) {
    console.error('❌ Erreur renvoi code:', err);
    return res.status(500).json({
      message: "Erreur serveur"
    });
  }
};