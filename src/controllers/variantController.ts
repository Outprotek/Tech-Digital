import { Request, Response } from "express";
import variantServices from "../services/variantServices";

const getVariants = async (req: Request, res: Response) => {
  const { productId } = req.query;
  try {
    const data = productId
      ? await variantServices.findByProductId(productId.toString())
      : await variantServices.finds();
    if ("response" in data && "totalData" in data) {
      res.status(200).json({
        message: "Success",
        data: {
          data: data.response,
        },
        totaldata: data.totalData,
      });
    }
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
};

const getVariantById = async (req: Request, res: Response) => {
  const varianId = req.params.id;
  try {
    const data = await variantServices.findById(varianId);
    res.status(200).json({
      message: "Success",
      data,
    });
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
};

const createVariant = async (req: Request, res: Response) => {
  try {
    const data = await variantServices.add(req.body);
    res.status(200).json({
      message: "Success",
      data,
    });
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
};

const deleteVariant = async (req: Request, res: Response) => {
  const variantId = req.params.id;
  try {
    await variantServices.remove(variantId);
    res.status(200).json({
      message: "Success",
    });
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
};

export default { getVariants, getVariantById, createVariant, deleteVariant };
