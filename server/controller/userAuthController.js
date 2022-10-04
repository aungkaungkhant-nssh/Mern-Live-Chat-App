const {validate,User} = require('../model/User');
const _ = require("lodash");
const Joi = require("joi");
exports.userRegister = async(req,res)=>{
    const {error} = validate(req.body);
    if(error) return res.status(400).send({message:error.details[0].message});
    try{
        const {name,email,password} =req.body;
        const user = await User.create({name,email,password});
        let token = await user.generateToken();
        res.status(201).json({
                message:"Regsiter Successfully",
                data:{..._.pick(user, ['_id','name', 'email','pic','isAdmin']),
                token}
            })
    }catch(err){
        res.status(500).json({message:"Something went wrong"})
    }
  
}

exports.userLogin = async(req,res)=>{
    const {error} = loginValidate(req.body);
    if(error) return res.status(400).send({message:error.details[0].message});
    try{
        const {email,password} =req.body;
        let user = await User.findOne({email});
        if(user && await user.matchPassword(password)){
            let token =await  user.generateToken();
            res.status(200).json({message:"Login Success",
                data:{..._.pick(user, ['_id','name', 'email','pic','isAdmin']),
                token}
            })
        }else{
            res.status(400).json({message:"You Email Or Password Invalid"})
        }
    }catch(err){
        console.log(err)
        res.status(500).json({message:"Something went wrong"});
    }
}

function loginValidate(user){
    const Schema = Joi.object({
        email:Joi.string().email().required(),
        password:Joi.string().min(8).max(15).required()
    })
    return Schema.validate(user)
}