import express from 'express'
import { addCart, deleteCartItems, getAllProducts, getCartItems, updateCartItem } from '../controllers/productsControllers.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route("/").get(getAllProducts);
router.route("/add").post(addCart);
router.route("/getitems").get(authMiddleware, getCartItems);
router.route("/deleteitems/:pId").delete(deleteCartItems);
router.route("/updateqty").put(updateCartItem);


export default router