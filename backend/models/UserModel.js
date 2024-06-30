import mongoose from "mongoose";
import bcrypt from 'bcryptjs'
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    cart: [
        {
            type: mongoose.Types.ObjectId,
            ref: "cart",
        }
    ]
})

userSchema.pre('save', async function (next) {
    const user = this;
    if (!user.isModified('password')) {
        next();
    }

    try {
        let slatRound = await bcrypt.genSalt(10);
        let hash_password = await bcrypt.hash(user.password, slatRound);
        user.password = hash_password;
    } catch (err) {
        next(err)
    }
})
const User = mongoose.model("users", userSchema);
export default User;