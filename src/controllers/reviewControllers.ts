import { Request, Response } from "express";
import reviewServices from "../services/reviewServices";

const getReviews = async (req: Request, res: Response) => {
  const userId = req.query.userId as string | undefined;
  const productId = req.query.productId as string | undefined;

  try {
    const data =
      userId || productId
        ? await reviewServices.findReviews({ userId, productId })
        : await reviewServices.finds();
    if ("response" in data && "totalData" in data) {
      res.status(200).json({
        message: "Success",
        data: {
          data: data.response,
        },
        totaldata: data.totalData,
      });
    }
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
  deleteReview,
};
