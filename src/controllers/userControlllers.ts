import { Request, Response } from "express";
import userServices from "../services/userServices";

const getUsers = async (req: Request, res: Response) => {
  try {
    const datas = await userServices.findUsers();
    res.status(200).json({
      message: "Success all",
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
      message: "Success by id",
      datas,
    });
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
};

const createUser = async (req: Request, res: Response) => {
  try {
    const datas = await userServices.add(req.body);
    res.status(201).json({
      message: "Success",
      datas,
    });
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
};

const updateUser = async (req: Request, res: Response) => {
  const id = req.query.id as string;
  try {
    const datas = await userServices.edit(id, req.body);
    res.status(200).json({
      message: "Success",
      datas,
    });
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  const userId = req.params.id;
  try {
    await userServices.findUserById(userId);
    await userServices.deleteUser(userId);
    res.status(200).json({ message: "Success deleted user!" });
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
};

export default { getUsers, getUser, createUser, updateUser, deleteUser };
