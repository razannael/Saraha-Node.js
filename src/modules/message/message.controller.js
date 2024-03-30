import messageModel from "../../../db/models/Message.model.js";
import userModel from "../../../db/models/User.model.js";

export const getMessages = async(req, res) => {
    const messageList = await messageModel.find({receiverId: req.user._id});
     return res.json({message:"success",messageList});
}

export const sendMessage = async(req, res) => {
    const {receiverId} = req.params;
    const {message} = req.body;
    const user = await userModel.findById(receiverId);
    
    if(!user){
        return res.json({message:"user not found"});
    }
    const createMessage = await messageModel.create({
      content: message,
      receiverId  
    });
    return res.status(201).json({message:"success",createMessage});
}