import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const finds = async () => {
  const response = await prisma.review.findMany({
    include: {
      user: true,
    },
  });
  return response;
};

const findById = async (userId: string) => {
  const response = await prisma.review.findFirst({
    where: {
      userId,
    },
  });
  if (!response) throw Error("review not found");
  return response;
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

export default { finds, findById, add, remove };
