import { Types } from "mongoose";
import allProducts from "../models/AllProductsModel.js";
import Cart from "../models/CartModel.js";
import User from "../models/UserModel.js";
const getAllProducts = async (req, res) => {

    await allProducts.find({})
        .then((result) => {
            res.json(result);
            // console.log(result);
        })
        .catch((err) => {
            res.json(err);
        })

}
const addCart = async (req, res) => {
    let { pId, image, title, price, userId, qty } = req.body;
    let userExist = await User.findById(userId);

    if (userExist) {
        let existingItem = await Cart.findOne({ pId, user: userId }); // Check if item exists in current user's cart
        if (existingItem) {
            await Cart.findOneAndUpdate(
                { pId: pId, user: userId },
                {
                    $set: {
                        qty: existingItem.qty + 1,
                        totalPrice: existingItem.price * (existingItem.qty + 1),
                    },
                }
            ).then((result) => {
                res.json(result);
            }).catch((err) => {
                res.json(err);
            });
        } else {
            let cart = new Cart({
                pId,
                image,
                title,
                price,
                qty,
                totalPrice: qty * price,
                user: userExist._id, // Associate cart with current user
            });
            await cart.save().then(() => {
                res.json({ cart });
            });
            userExist.cart.push(cart._id); // Add cart to user's cart array
            userExist.save();
        }
    } else {
        res.status(404).json({ message: "User not found" });
    }
};

const getCartItems = async (req, res) => {
    // console.log(req.user);
    let userExist = await User.findById(req.user._id).populate('cart').select({ password: 0 })
    res.json(userExist);

}


const deleteCartItems = async (req, res) => {
    let { id } = req.body;
    // let pId = req.params;
    // console.log(req.params);

    let userExist = await User.findByIdAndUpdate({ _id: id }, {
        $pull: {
            cart: req.params.pId
        }
    });
    console.log(userExist);
    if (userExist) {
        await Cart.findByIdAndDelete(req.params.pId)
            .then((result) => {
                res.json(result);
            })
            .catch((err) => {
                res.json(err);
            })
    }
}


const updateCartItem = async (req, res) => {
    // console.log(req.body);

    let { _id, pId, qty } = req.body;

    let cartItem = await Cart.findById(pId)
    // console.log(cartItem);
    if (cartItem) {
        cartItem.qty = qty;
        cartItem.totalPrice = cartItem.price * qty;
        await cartItem.save();
        res.json(cartItem);
    }
    else {
        res.status(404).json({ message: 'Item not found' });
    }


}

export { getAllProducts, addCart, getCartItems, deleteCartItems, updateCartItem }