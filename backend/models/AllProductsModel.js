import mongoose from "mongoose";
const allProductsSchema = new mongoose.Schema({
    title: String,
    price: String,
    image: String,
})

const allProducts = mongoose.model("allProducts", allProductsSchema);
export default allProducts;