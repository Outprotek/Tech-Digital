import { Request, Response } from "express";
import reviewServices from "../services/reviewServices";

const getReviews = async (req: Request, res: Response) => {
  const { userId } = req.query;
  try {
    console.log(userId);

    const datas = userId
      ? await reviewServices.findByUserId(userId.toString())
      : await reviewServices.finds();
    res.status(200).json({
      message: "Success",
      datas,
    });
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
};

const getReviewById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    console.log(id);

    const data = await reviewServices.findById(id);
    res.status(200).json({
      message: "Success get by id",
      data,
    });
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
};

const createReview = async (req: Request, res: Response) => {
  try {
    const data = await reviewServices.add(req.body);
    res.status(200).json({
      message: "Success",
      data,
    });
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
};

const updateReview = async (req: Request, res: Response) => {
  const id = Number(req.query.id);
  try {
    const datas = await reviewServices.edit(id, req.body);
    res.status(200).json({
      message: "Success",
      datas,
    });
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
};

const deleteReview = async (req: Request, res: Response) => {
  const reviewID = parseInt(req.params.id);
  try {
    const data = await reviewServices.remove(reviewID);
    res.status(200).json({
      message: "Success",
      data,
    });
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
};

export default {
  getReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview,
};
