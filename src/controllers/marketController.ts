import { Request, Response } from "express";
import marketServices from "../services/marketServices";
import bcrypt from "bcryptjs";
const getMarkets = async (req: Request, res: Response) => {
  try {
    const data = await marketServices.finds();
    const formattedData = data.response.map(({ _count, ...rest }) => ({
      ...rest,
      productCount: _count.products,
      password: undefined,
    }));

    res.status(200).json({
      message: "Success",
      data: {
        data: formattedData,
      },
      totaldata: data.totalData,
    });
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
};

const getMarketById = async (req: Request, res: Response) => {
  const marketId = req.params.id;
  try {
    const data = await marketServices.findById(marketId);
    const { _count, ...rest } = data;
    const formattedData = {
      ...rest,
      productCount: _count.products,
      password: undefined,
    };
    res.status(200).json({
      message: "Success",
      formattedData,
    });
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
};

const createMarket = async (req: Request, res: Response) => {
  const hashPassword = await bcrypt.hash(req.body.password, 10);
  const data = { ...req.body, password: hashPassword };
  try {
    const datas = await marketServices.add(data);
    res.status(201).json({
      message: "Success",
      datas,
    });
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
};

const updateMarket = async (req: Request, res: Response) => {
  const id = req.query.id as string;
  try {
    const data = await marketServices.edit(id, req.body);
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

const statusMarket = async (req: Request, res: Response) => {
  const id = req.query.id as string;
  try {
    await marketServices.findById(id);
    await marketServices.status(id, req.body.isActive);
    res.status(200).json({
      message: "Success",
    });
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
};

const deleteMarket = async (req: Request, res: Response) => {
  const marketId = req.params.id;
  try {
    await marketServices.remove(marketId);
    res.status(200).json({
      message: "Success change status",
    });
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
};

export default {
  getMarkets,
  getMarketById,
  createMarket,
  updateMarket,
  statusMarket,
  deleteMarket,
};
