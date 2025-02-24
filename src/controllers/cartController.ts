import { Request, Response } from "express";
import cartServices from "../services/cartServices";

const getCarts = async (req: Request, res: Response) => {
  try {
    const data = await cartServices.finds();
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

const getCart = async (req: Request, res: Response) => {
  const userId = req.params.id;
  try {
    const data = await cartServices.findById(userId);
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

const createCart = async (req: Request, res: Response) => {
  const { userId, items } = req.body;
  try {
    const data = await cartServices.add(userId, items);
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

// const updateCart = async (req: Request, res: Response) => {
//   const { userId, items } = req.body;
//   try {
//     const data = await cartServices.edit(userId, items);
//     res.status(200).json({
//       message: "Success",
//       data: {
//         data,
//       },
//     });
//   } catch (e: any) {
//     res.status(500).json({ message: e.message });
//   }
// };

const deleteCart = async (req: Request, res: Response) => {
  const userId = req.params.id;
  try {
    await cartServices.remove(userId);
    res.status(200).json({
      message: "Success",
    });
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
};

export default { getCarts, getCart, createCart, deleteCart };
