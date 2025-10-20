import twilio from "twilio";

const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const fromNumber = process.env.TWILIO_PHONE_NUMBER; // numéro Twilio

const client = twilio(accountSid, authToken);

/**
 * Envoie un SMS
 * @param {string} to - Numéro du destinataire au format international (+33…)
 * @param {string} message - Contenu du SMS
 */
export const sendSMS = async (to, message) => {
  try {
    const sentMessage = await client.messages.create({
      body: message,
      from: fromNumber,
      to,
    });

    console.log("SMS envoyé:", sentMessage.sid);
    return sentMessage.sid;
  } catch (err) {
    console.error("Erreur envoi SMS:", err);
    throw err;
  }
};
