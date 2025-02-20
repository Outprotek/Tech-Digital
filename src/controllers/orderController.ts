import { Request, Response } from "express";
import orderServices from "../services/orderServices";

const getOrders = async (req: Request, res: Response) => {
  try {
    const datas = await orderServices.finds();
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
    const data = await orderServices.findById(userId);
    res.status(200).json({
      message: "Success",
      data: {
        data,
      },
    });
  } catch (e: any) {}
};

const createOrder = async (req: Request, res: Response) => {
  try {
    const data = await orderServices.add(req.body);
    res.status(200).json({
      message: "Success",
      data: {
        data,
      },
    });
  } catch (e: any) {}
};

const deleteOrder = async (req: Request, res: Response) => {
  const userId = req.params.id;
  try {
    await orderServices.remove(userId);
    res.status(200).json({
      message: "Success",
    });
  } catch (e: any) {}
};

export default { getOrders, getOrder, createOrder, deleteOrder };
