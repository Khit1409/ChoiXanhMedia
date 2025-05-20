import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({}, { strict: false });

const Cart = mongoose.model("Cart", cartSchema, "carts");

export default Cart;
