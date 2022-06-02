import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: Array,
  },
  size: {
    type: Array,
  },
  color: {
    type: Array,
  },
});

const ProductModel = mongoose.model("product", productSchema);

export default ProductModel;
