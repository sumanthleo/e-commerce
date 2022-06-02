import ProductModel from "../model/productSchema.js";

//get all products
export const getProducts = async (req, res) => {
  try {
    const products = await ProductModel.findById(req.params.id);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//admin create product
export const createProduct = async (req, res) => {
  const newProduct = new ProductModel(req.body);
  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

//admin updatedProduct
export const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

//admin deleteProduct
export const deleteProduct = async (req, res) => {
  try {
    await ProductModel.findByIdAndDelete(req.params.id);
    res.status(200).json("Product deleted");
  } catch (error) {
    res.status(400).json(error.message);
  }
};

//get all products
//pratice this
export const getAllProducts = async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let products;

    if (qNew) {
      products = await ProductModel.find().sort({ createdAt: -1 }).limit(1);
    } else if (qCategory) {
      products = await ProductModel.find({
        category: {
          $in: [qCategory],
        },
      });
    } else {
      products = await ProductModel.find();
    }
    res.status(200).json(products);
    res.send(products);
  } catch (err) {
    res.status(500).json(err);
  }
};
