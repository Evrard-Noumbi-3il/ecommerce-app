import User from "../models/Users.js"
import Notifications from "../models/Notifications.js"

export const getNotificationsSentByModerator = async(req, res) => {
    try {
        const notifications = await Notifications.find({ from: "moderator" }).sort({ createdAt: -1 });
        res.json(notifications);
    } catch (err) {
        res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
};

export const getUserNotifications = async(req, res) => {
  try {
    const { userId } = req.params;
    const notifications = await Notifications.find({ target: userId }).sort({ createdAt: -1 });
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};

export const markAsRead = async(req, res) => {
  try {
    const { id } = req.params;
    const notification = await Notifications
        .findByIdAndUpdate(id, { read: true }, { new: true });
    if (!notification) return res.status(404).json({ message: "Notification non trouvée" });
    res.json(notification);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};

export const sendNotification = async(req, res) => {
  try {
    const { type, message, target } = req.body;
    const user = await User.findOne({ email: target });
    const newNotification = new Notifications({ type, message, target : user._id , from : "moderator"});
    await newNotification.save();
    res.status(201).json(newNotification);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};


export const sendNotificationToAllUsers = async(req, res) => {
  try {
    const { type, message } = req.body;
    const users = await User.find({ role: "user" }).select("email");
    const notifications = users.map(user => ({
      type,
        message,
        target: user.email,
        from: "moderator"
    }));
    await Notifications.insertMany(notifications);
    res.status(201).json({ message: "Notifications envoyées à tous les utilisateurs" });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};