import Chat from '../models/Chat.js';
import Message from '../models/Messages.js';
import User from '../models/Users.js';

export const sendMessage = async (req, res) => {
  try {
    const { senderId, receiverId, subject, content } = req.body;

    let chat = await Chat.findOne({
      $or: [
        { client: senderId, seller: receiverId },
        { client: receiverId, seller: senderId }
      ]
    });

    if (!chat) {
      chat = new Chat({
        client: senderId,
        seller: receiverId,
        messages: [],
      });
      await chat.save();

      const sender = await User.findById(senderId);
      sender.chatList.push(chat._id);
      await sender.save();

      const receiver = await User.findById(receiverId);
      receiver.chatList.push(chat._id);
      await receiver.save();
    }

    const newMessage = new Message({
      chat: chat._id,
      sender: senderId,
      receiver: receiverId,
      subject: subject,
      content: content,
    });
    await newMessage.save();

    chat.messages.push(newMessage._id);
    await chat.save();

    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
}


export const getChatListReceiver = async (req, res) => {
  try {
    const { userId } = req.query;
    console.log("Récupération de la liste des destinataires pour l'utilisateur :", userId);
    const user = await User.findById(userId).populate({
      path: "chatList",
      populate: { path: "client seller", select: "-password" }
    });

    if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });
    if (!user.chatList || !user.chatList.length) return res.status(200).json([]);


    const receivers = user.chatList
      .filter(chat => chat.client && chat.seller)
      .map(chat => chat.seller._id.equals(userId) ? chat.client : chat.seller);


    const chats = user.chatList
      .map(chat => getChatBetweenUsers(chat.client._id, chat.seller._id));

    for (let i = 0; i < receivers.length; i++) {
      receivers[i] = receivers[i].toObject();
      receivers[i].chat = await chats[i];
    }

    res.status(200).json(receivers);

  } catch (error) {
    console.error("Erreur serveur :", error);
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

export const getLastChatMessage = async (userId1, userId2) => {

  const chat = await Chat.findOne({
    $or: [
      { client: userId1, seller: userId2 },
      { client: userId2, seller: userId1 }
    ]
  }).populate('messages');

  if (!chat || chat.messages.length === 0) {
    return null;
  }

  const lastMessage = chat.messages[chat.messages.length - 1];

  return lastMessage;
};

export const getChatBetweenUsers = async (userId1, userId2) => {
  const chat = await Chat.findOne({
    $or: [
      { client: userId1, seller: userId2 },
      { client: userId2, seller: userId1 }
    ]
  }).populate('messages');

  return chat;
}

export const markMessagesAsRead = async (req, res) => {
  try {
    const { chatId, userId } = req.body;

    const chat = await Chat.findById(chatId).populate('messages');

    if (!chat) return res.status(404).json({ message: "Chat non trouvé" });

    const unreadMessage = chat.messages[chat.messages.length - 1];

    unreadMessage.read = true;
    await unreadMessage.save();

    res.status(200).json({ message: "messages marqué comme lus." });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
}
