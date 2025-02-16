import { Request, Response } from "express";
import productServices from "../services/productServices";

const getAllProducts = async (req: Request, res: Response) => {
  try {
    res.status(200).json({
      message: "Successfully retrieved all products",
      data: await productServices.fetchAllProducts(),
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

export default { getAllProducts, getProductDetails };
