import Avis from "../models/Avis.js";
import User from "../models/Users.js";

export const createAvis= async (req, res) => {
    try{
        const { userSend, userReceive, note, comments } = req.body;

        
        if (!userSend || !userReceive || !note ) {
            return res.status(400).json({ message: "Tous les champs sont requis ❌" });
        }

        const newAvis = new Avis({
            userSend,
            userReceive,
            note,
            comments
        });

        await newAvis.save();

        const userToUpdate = await User.findById(userReceive);
        if(!userToUpdate){
            return res.status(404).json({ message: "Utilisateur non trouvé ❌" });
        }else{
            userToUpdate.avis.push(newAvis._id);
            await userToUpdate.save();
        }

        res.status(201).json({ message: "Avis créé avec succès ✅", avis: newAvis });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erreur serveur ❌", error: error.message });
    }   
    
} 

export const getAvisByUser = async (req, res) => {
    try {
        const userId = req.params.id;
        console.log("userId : ", userId);
        const avis = await Avis.find({ userReceive: userId }).populate("userSend", "-password");
        console.log("avis user methode : ", avis);
        return res.status(200).json(avis);
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erreur serveur ❌", error: error.message });
    }
};


    