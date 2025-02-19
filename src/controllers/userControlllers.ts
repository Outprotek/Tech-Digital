import { Request, Response } from "express";
import userServices from "../services/userServices";

const getUsers = async (req: Request, res: Response) => {
  try {
    const data = await userServices.findUsers();
    const formattedData = data.response.map(({ _count, ...rest }) => ({
      ...rest,
      reviewCount: _count.reviews,
    }));
    res.status(200).json({
      message: "Success all",
      data: {
        data: formattedData,
      },
      totaldata: data.totalData,
    });
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
};

const getUser = async (req: Request, res: Response) => {
  const userId = req.params.id;
  try {
    const data = await userServices.findUserById(userId);

    const { _count, ...rest } = data;
    const formattedData = {
      ...rest,
      reviewCount: data._count.reviews,
    };
    res.status(200).json({
      message: "Success by id",
      formattedData,
      _count: undefined,
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
    const data = await userServices.edit(id, req.body);
    res.status(200).json({
      message: "Success",
      data,
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
