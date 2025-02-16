import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const findUsers = async () => {
  const response = await prisma.user.findMany({
    include: {
      reviews: true,
    },
  });
  return response;
};

const findUserById = async (userId: string) => {
  const response = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  });
  if (!response) throw Error("user not found");
  return response;
};

const add = async (user: Prisma.UserCreateInput) => {
  const response = await prisma.user.create({
    data: {
      ...user,
    },
  });
  return response;
};

const deleteUser = async (userId: string) => {
  await prisma.user.delete({
    where: {
      id: userId,
    },
  });
};
export default { findUsers, findUserById, add, deleteUser };
