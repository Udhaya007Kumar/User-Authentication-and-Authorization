import user from "../Models/userAuthentication.schema.js"
import bcrypt from "bcrypt";
import jwt  from 'jsonwebtoken'
import dotenv from 'dotenv';
import Useres from "../Models/userAuthentication.schema.js";



dotenv.config();

//registrationUser in  Registertation
export const registrationUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hasPassword = await bcrypt.hash(password, 10);
    const newUser = new user({ username, email, password: hasPassword });
    await newUser.save();
    res
      .status(200)
      .json({ message: "User Register Succcesfully", data: newUser });
  } catch (error) {
    res
      .status(500)
      .json({ message: "registrationUser Error ", message: error.message });
  }
};



//Login Process
export const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const Useres = await user.findOne({ email });
    if (!Useres) {
      return res.status(404).json({ message: "User Not Found" });
    }
    const passwordMatch = await bcrypt.compare(password, Useres.password);
    if (!passwordMatch) {
      return res.status(404).json({ message: "Invalid Password" });
    }
    //Jwt Part
    const token = jwt.sign({ _id: Useres.id }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });
    Useres.token = token;
    await Useres.save();
    res
      .status(200)
      .json({ message: "User Logged IN successfully", token: token });
  } catch (error) {
    res
      .status(500)
      .json({ message: "registrationUser Error ", message: error.message });
  }
};



//UserGet method

export const userGet = async (req,res) =>{
    try {
        //const userId =req.user._id;
        const User = await user.find()
        res.status(200).json({message:"Aithorizes User" ,data:User});
        
    } catch (error) {
        res
      .status(500)
      .json({ message: "registrationUser Error ", message: error.message });
  
    }
}
//UserGet method
export const userGetById = async (req,res) =>{
    try {
        const userId =req.user._id;
        const User = await user.findById(userId)
        res.status(200).json({message:"Aithorizes User" ,data:User});
        
    } catch (error) {
        res
      .status(500)
      .json({ message: "registrationUser Error ", message: error.message });
  
    }
}
