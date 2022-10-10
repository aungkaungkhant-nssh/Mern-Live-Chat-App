const { Chat } = require("../model/Chat");

// @desc    accessChat
// @route   POST /api/chat
// @access  protected
exports.accessChat = async(req,res,next)=>{
    const {id} = req.body;
    console.log(id)
    const authUserId = req.user._id;
    try{
        let chat = await Chat.find({
            
                $or:[
                    {
                        $and:[
                            {users:{$elemMatch:{$eq:id}}},
                            {users:{$elemMatch:{$eq:req.user._id}}}
                        ]
                    },
                    {
                      _id:id  
                    }
                ]
            }
           
        ).populate("users","-password");
      
        
        if(chat.length){
            console.log(chat[0])
            res.status(200).json({message:"Creat Chat",data:chat[0]});
        }else{
            console.log("don")
            let createChat = await Chat.create({users:[authUserId,id]});
            createChat =await Chat.findById(createChat._id).populate("users","-password");
            res.status(201).json({message:"Create Chat",data:createChat})
        }
    }catch(err){
        res.status(500).json({message:"Something went wrong"})
    }
   
}

// @desc    createGroup
// @route   POST /api/chat/create
// @access  protected
exports.createGroup = async (req,res,next)=>{
     let chatName= req.body.chatName;
     let users =  req.body.users;
     if(!chatName || !users)return res.status(400).json({message:"Please fill the field"});
     if(users.length<2) return res.status(400).json({message:"More than 2 users are required to form group chat"});
     users.push(req.user)
     try{
   
        let chat= await Chat.create({
                    chatName,
                    isGroupChat:true,
                    groupAdmin:req.user,
                    users})

        let fullChat = await Chat.findById(chat._id).populate("users","-password");
        res.status(200).json({message:"Create Group Chat Success",data:fullChat})
     }catch(err){
        console.log(err)
        res.status(500).json({message:"Something went wrong"});
     }
}


// @desc    addToGroup
// @route   POST /api/chat/add
// @access  protected

exports.addToGroup = async (req,res)=>{
    const {chatId,userId} =req.body;
    if(!chatId || !userId) return;
    try{
        let addToGroupChat = await Chat.findByIdAndUpdate(chatId,{$push:{users:userId}});
        if(!addToGroupChat) return res.status(404).json({message:"Chat Not found"});
        addToGroupChat = await Chat.findById(addToGroupChat._id).populate("users","-password").populate("groupAdmin","-password");
        res.status(200).json({message:"Add To Group Success",data:addToGroupChat})
    }catch(err){
        res.status(500).json({message:"Something went wrong"});
    }
}

// @desc    removeFromGroup
// @route   POST /api/chat/remove
// @access  protected

exports.removeFromGroup = async(req,res)=>{
    const {chatId,userId} = req.body;
    if(!chatId || !userId) return;
    try{
        let removedFromChat = await Chat.findByIdAndUpdate(chatId,{$pull:{users:userId}});
        if(!removedFromChat) return res.status(404).json({message:"Chat Not Found"});
        removedFromChat = await Chat.findById(removedFromChat._id).populate("users","-password").populate("groupAdmin","-password")
        res.status(200).json({message:"Remove from group success",data:removedFromChat});
    }catch(err){
        console.log(err)
        res.status(500).send({message:"Something went wrong"});
    }
    
}

