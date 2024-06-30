import generateToken from "../config/generateToken.js";
import Cart from "../models/CartModel.js";
import User from "../models/UserModel.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import authMiddleware from "../middlewares/authMiddleware.js";


const registerUser = async (req, res) => {
    let { name, email, password } = req.body;


    let userExist = await User.findOne({ email });

    if (userExist) {
        return res.json({ status: false, message: "User Already Exist" })
    }

    let userCreated = await User.create(req.body)
    // console.log(userCreated);


    res.json({
        _id: userCreated._id.toString(),
        email,
        token: generateToken(userCreated._id.toString())
    })

}
const loginUser = async (req, res) => {
    let { email, password } = req.body;


    let userExist = await User.findOne({ email });

    if (!userExist) {
        return res.json({ status: false, message: "User Does not Exist" })
    }

    const comparePassword = await bcrypt.compare(password, userExist.password);

    if (!comparePassword) {
        return res.json({ status: false, message: "Password is Incorrect" });
    }



    res.json({
        _id: userExist._id.toString(),
        email,
        token: generateToken(userExist._id.toString())
    })

}

export { registerUser, loginUser }