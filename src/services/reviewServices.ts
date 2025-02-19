import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const finds = async () => {
  const totalData = await prisma.review.count();
  const response = await prisma.review.findMany({
    include: {
      user: {
        select: {
          userName: true,
          displayName: true,
          email: true,
        },
      },
    },
  });
  return { response, totalData };
};

const findById = async (id: number) => {
  const response = await prisma.review.findFirst({
    where: {
      id,
    },
  });
  if (!response) throw Error("review not found");
  return response;
};
const findReviews = async (params: { userId?: string; productId?: string }) => {
  const { userId, productId } = params;

  if (!userId && !productId) throw new Error("userId or productId is required");

  const where = userId ? { userId } : { productId };

  const totalData = await prisma.review.count({ where });

  const response = await prisma.review.findMany({ where });

  if (!response.length) throw new Error("Review not found");

  return { response, totalData };
};

const add = async (review: Prisma.ReviewCreateInput) => {
  const response = await prisma.review.create({
    data: {
      ...review,
    },
  });
  return response;
};

const remove = async (id: number) => {
  await prisma.review.delete({
    where: {
      id,
    },
  });
};

export default {
  finds,
  findById,
  findReviews,
  add,
  remove,
};
