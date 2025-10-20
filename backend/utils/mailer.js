import nodemailer from "nodemailer";

// Créer le transporter Mailtrap
const createMailtrapTransporter = () => {
  if (!process.env.MAILTRAP_HOST || !process.env.MAILTRAP_USER || !process.env.MAILTRAP_PASS) {
    console.error("❌ Variables Mailtrap manquantes dans .env");
    return null;
  }

  const transporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_HOST,
    port: parseInt(process.env.MAILTRAP_PORT) || 465,
    secure: false, 
    auth: {
      user: process.env.MAILTRAP_USER,
      pass: process.env.MAILTRAP_PASS,
    },
  });

  return transporter;
};


export const sendEmail = async ({ to, subject, text, html }) => {
  try {
    const transporter = createMailtrapTransporter();

    if (!transporter) {
      throw new Error("Mailtrap non configuré. Vérifiez votre .env");
    }

    
    const verified = await new Promise((resolve, reject) => {
      transporter.verify((error, success) => {
        if (error) {
          console.error("❌ Erreur SMTP Mailtrap:", error);
          reject(error);
        } else {
          console.log("✅ Connecté à Mailtrap");
          resolve(success);
        }
      });
    });

    if (!verified) {
      throw new Error("Impossible de se connecter à Mailtrap");
    }

   
    const info = await transporter.sendMail({
      from: '"Kanope" <noreply@kanope.com>',
      to,
      subject,
      text,
      html: html || `<p>${text}</p>`,
    });

    console.log("✅ Email envoyé avec succès - Message ID:", info.messageId);
    return { success: true, messageId: info.messageId };

  } catch (error) {
    console.error("❌ Erreur envoi email:", error.message);
    throw error;
  }
};


export const sendVerificationEmail = async (email, code) => {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f9f9f9;">
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px; text-align: center; border-radius: 10px 10px 0 0; color: white;">
        <h1 style="margin: 0; font-size: 28px;">Vérifiez votre compte</h1>
      </div>
      
      <div style="background: white; padding: 40px; border-radius: 0 0 10px 10px; border: 1px solid #eee; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        <p style="font-size: 16px; color: #333; margin-bottom: 20px;">
          Bienvenue sur Kanope!<br><br>
          Pour sécuriser votre compte, veuillez vérifier votre adresse email en utilisant le code ci-dessous.
        </p>

        <div style="background: #f5f5f5; padding: 30px; border-radius: 8px; text-align: center; margin: 30px 0; border: 2px dashed #667eea;">
          <p style="color: #999; font-size: 12px; margin: 0 0 15px 0; text-transform: uppercase; letter-spacing: 2px;">Code de vérification</p>
          <p style="font-size: 40px; font-weight: bold; color: #667eea; margin: 0; letter-spacing: 8px; font-family: 'Courier New', monospace;">
            ${code}
          </p>
        </div>

        <p style="font-size: 14px; color: #666; margin: 20px 0; text-align: center;">
          Ce code expire dans <strong>24 heures</strong>.
        </p>

        <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">

        <p style="font-size: 12px; color: #999; margin: 0;">
          Si vous n'avez pas créé de compte sur Kanope, ignorez cet email.
        </p>
      </div>

      <div style="text-align: center; padding: 20px; color: #999; font-size: 11px;">
        <p>© 2024 Kanope. Tous droits réservés.</p>
      </div>
    </div>
  `;

  return sendEmail({
    to: email,
    subject: "Vérification de votre compte Kanope",
    text: `Votre code de vérification est : ${code}`,
    html,
  });
};


export const sendWelcomeEmail = async (email, name) => {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f9f9f9;">
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px; text-align: center; border-radius: 10px 10px 0 0; color: white;">
        <h1 style="margin: 0; font-size: 28px;">Bienvenue sur Kanope</h1>
      </div>
      
      <div style="background: white; padding: 40px; border-radius: 0 0 10px 10px; border: 1px solid #eee; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        <p style="font-size: 16px; color: #333; margin-bottom: 20px;">
          Salut ${name},<br><br>
          Nous sommes ravis de vous compter parmi nos membres ! Voici ce que vous pouvez faire maintenant :
        </p>

        <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <ul style="list-style: none; padding: 0; margin: 0; color: #333;">
            <li style="margin-bottom: 12px; padding-left: 25px; position: relative;">
              <span style="position: absolute; left: 0; color: #667eea; font-weight: bold;">🔍</span>
              Découvrir les meilleures offres
            </li>
            <li style="margin-bottom: 12px; padding-left: 25px; position: relative;">
              <span style="position: absolute; left: 0; color: #667eea; font-weight: bold;">📝</span>
              Publier vos propres annonces
            </li>
            <li style="margin-bottom: 12px; padding-left: 25px; position: relative;">
              <span style="position: absolute; left: 0; color: #667eea; font-weight: bold;">💬</span>
              Communiquer avec les vendeurs
            </li>
            <li style="padding-left: 25px; position: relative;">
              <span style="position: absolute; left: 0; color: #667eea; font-weight: bold;">⭐</span>
              Laisser des avis et gérer votre profil
            </li>
          </ul>
        </div>

        <div style="text-align: center; margin: 30px 0;">
          <a href="${process.env.FRONTEND_URL}" 
             style="background: #667eea; color: white; padding: 14px 40px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold;">
            Accéder à Kanope
          </a>
        </div>

        <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">

        <p style="font-size: 12px; color: #999; margin: 0;">
          Des questions ? Contactez-nous à support@kanope.com
        </p>
      </div>

      <div style="text-align: center; padding: 20px; color: #999; font-size: 11px;">
        <p>© 2024 Kanope. Tous droits réservés.</p>
      </div>
    </div>
  `;

  return sendEmail({
    to: email,
    subject: "Bienvenue sur Kanope!",
    text: `Bienvenue ${name}! Découvrez nos meilleures offres.`,
    html,
  });
};


export const sendPasswordResetEmail = async (email, resetToken) => {
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f9f9f9;">
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px; text-align: center; border-radius: 10px 10px 0 0; color: white;">
        <h1 style="margin: 0; font-size: 28px;">Réinitialiser votre mot de passe</h1>
      </div>
      
      <div style="background: white; padding: 40px; border-radius: 0 0 10px 10px; border: 1px solid #eee; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        <p style="font-size: 16px; color: #333; margin-bottom: 20px;">
          Bonjour,<br><br>
          Vous avez demandé la réinitialisation de votre mot de passe. Cliquez sur le lien ci-dessous pour créer un nouveau mot de passe :
        </p>

        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetUrl}" 
             style="background: #667eea; color: white; padding: 14px 40px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold;">
            Réinitialiser mon mot de passe
          </a>
        </div>

        <p style="font-size: 12px; color: #999; margin: 20px 0;">
          Ce lien expire dans <strong>24 heures</strong>.<br><br>
          Si vous n'avez pas demandé cette réinitialisation, ignorez cet email.
        </p>
      </div>

      <div style="text-align: center; padding: 20px; color: #999; font-size: 11px;">
        <p>© 2024 Kanope. Tous droits réservés.</p>
      </div>
    </div>
  `;

  return sendEmail({
    to: email,
    subject: "Réinitialisation de votre mot de passe Kanope",
    text: `Cliquez ici pour réinitialiser votre mot de passe: ${resetUrl}`,
    html,
  });
}