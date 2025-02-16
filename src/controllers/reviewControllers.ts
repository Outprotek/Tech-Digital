import { Request, Response } from "express";
import reviewServices from "../services/reviewServices";

const getReviews = async (req: Request, res: Response) => {
  try {
    const datas = await reviewServices.finds();
    res.status(200).json({
      message: "Success",
      datas,
    });
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
};

const getReviewById = async (req: Request, res: Response) => {
  const userId = req.params.id;
  try {
    const data = await reviewServices.findById(userId);
    res.status(200).json({
      message: "Success",
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

export default { getReviews, getReviewById, createReview, deleteReview };
