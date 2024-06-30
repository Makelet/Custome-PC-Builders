import jwt from 'jsonwebtoken'
import User from '../models/UserModel.js'

const authMiddleware = async (req, res, next) => {
    let jwtToken = req.header('Authorization');
    // console.log(jwtToken);
    if (!jwtToken) {
        res.json({ status: false, message: "Unauthorize Token, Token not Provided" });
    }

    let token = jwtToken.split(" ")[1];
    // console.log(token);
    try {
        const isVerified = jwt.verify(token, process.env.JWT_SECRET_KEY);
        // console.log("isVerified----------------");
        // console.log(isVerified);
        // console.log("isVerified----------------");

        const userData = await User.findOne({ _id: isVerified.id }).select({ password: 0 });
        // console.log("userData-------");
        // console.log(userData);


        req.user = userData;

        next();

    } catch (error) {
        res.json({ status: false, message: "Invalid Token" });
    }
}

export default authMiddleware;