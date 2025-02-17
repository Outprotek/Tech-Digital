import { Request, Response } from "express";
import marketServices from "../services/marketServices";

const getMarkets = async (req: Request, res: Response) => {
  try {
    const data = await marketServices.finds();
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

const getMarketById = async (req: Request, res: Response) => {
  const marketId = req.params.id;
  try {
    const datas = await marketServices.findById(marketId);
    res.status(200).json({
      message: "Success",
      datas,
    });
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
};

const createMarket = async (req: Request, res: Response) => {
  try {
    const datas = await marketServices.add(req.body);
    res.status(201).json({
      message: "Success",
      datas,
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
      message: "Success",
    });
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
};

export default { getMarkets, getMarketById, createMarket, deleteMarket };
