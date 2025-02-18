import { Request, Response } from "express";
import productServices from "../services/productServices";

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const data = await productServices.fetchAllProducts();
    res.status(200).json({
      message: "Successfully retrieved all products",
      data: {
        data: data.response,
      },
      totaldata: data.totalData,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const getProductDetails = async (req: Request, res: Response) => {
  try {
    const product = await productServices.fetchProductById(req.params.id);
    res.status(200).json({
      message: "Product found",
      data: product,
    });
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

const createProduct = async (req: Request, res: Response) => {
  try {
    const newProduct = await productServices.addProduct(req.body);
    res.status(201).json({
      message: "Product created successfully",
      data: newProduct,
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

const updateProduct = async (req: Request, res: Response) => {
  try {
    const updatedProduct = await productServices.modifyProduct(req.params.id, req.body);
    res.status(200).json({
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error: any) {
    res.status(error.message === "Product not found" ? 404 : 400).json({ message: error.message });
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  try {
    await productServices.removeProduct(req.params.id);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export default {
  getAllProducts,
  getProductDetails,
  createProduct,
  updateProduct,
  deleteProduct,
};
