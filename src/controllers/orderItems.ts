import { Request, Response } from "express";
import orderItems from "../services/orderItems";
import productControllers from "./productControllers";

const getOrders = async (req: Request, res: Response) => {
  try {
    const datas = await orderItems.finds();
    res.status(200).json({
      message: "Success",
      data: {
        data: datas.response,
      },
      totaldata: datas.totalData,
    });
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
};

const getOrder = async (req: Request, res: Response) => {
  const userId = req.params.id;
  try {
    const data = await orderItems.findById(userId);
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

const createOrder = async (req: Request, res: Response) => {
  try {
    const data = await orderItems.add(req.body);
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

const deleteOrder = async (req: Request, res: Response) => {
  const userId = req.params.id;
  try {
    await orderItems.remove(userId);
    res.status(200).json({
      message: "Success",
    });
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
};

export default { getOrders, getOrder, createOrder, deleteOrder };
