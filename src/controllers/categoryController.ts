import { Request, Response } from "express";
import categoryServices from "../services/categoryServices";

const getCategories = async (req: Request, res: Response) => {
  try {
    const data = await categoryServices.finds();
    res.status(200).json({
      message: "Success",
      data: {
        data: data.response,
      },
      totaldata: data.totalData,
    });
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
};

const getCategoryById = async (req: Request, res: Response) => {
  const categoryId = Number(req.params.id);
  try {
    const data = await categoryServices.findById(categoryId);
    res.status(200).json({
      message: "Success",
      data: {
        data,
      },
    });
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
};

const createCategory = async (req: Request, res: Response) => {
  try {
    const data = await categoryServices.add(req.body);
    res.status(200).json({
      message: "Success",
      data: {
        data,
      },
    });
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
};

const updateCategory = async (req: Request, res: Response) => {
  const id = req.query.id as any;
  try {
    const data = await categoryServices.edit(Number(id), req.body);
    res.status(200).json({
      message: "Success",
      data: {
        data,
      },
    });
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
};

const deleteCategory = async (req: Request, res: Response) => {
  const categoryId = Number(req.params.id);
  try {
    await categoryServices.findById(categoryId);
    await categoryServices.remove(categoryId);
    res.status(200).json({
      message: "Success",
    });
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
};
export default {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
