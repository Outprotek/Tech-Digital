import { Request, Response } from "express";
import userServices from "../services/userServices";

const getUsers = async (req: Request, res: Response) => {
  try {
    const datas = await userServices.findUsers();
    res.status(200).json({
      message: "Success get all user",
      datas,
    });
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
};

const getUser = async (req: Request, res: Response) => {
  const userId = req.params.id;

  try {
    const datas = await userServices.findUserById(userId);
    res.status(200).json({
      message: "Success",
      datas,
    });
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
};

export default { getUsers, getUser };
