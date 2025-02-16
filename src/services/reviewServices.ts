import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const finds = async () => {
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
  return response;
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

const findByUserId = async (userId: string) => {
  const response = await prisma.review.findFirst({
    where: {
      userId,
    },
  });
  if (!response) throw Error("review not found by userId");
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

const edit = async (id: number, data: Prisma.ReviewUpdateInput) => {
  const response = await prisma.review.update({
    where: {
      id,
    },
    data: {
      ...data,
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

export default { finds, findById, findByUserId, add, edit, remove };
