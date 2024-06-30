import mongoose from "mongoose";
const cartSchema = new mongoose.Schema({
    pId: Number,
    image: String,
    title: {
        type: String
    },
    price: Number,
    qty: {
        type: Number,
        default: 1,
    },
    totalPrice: Number,
    user: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'users'
        }
    ]
})

const Cart = mongoose.model("cart", cartSchema);
export default Cart;