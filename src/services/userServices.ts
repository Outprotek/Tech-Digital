import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const findUsers = async () => {
  const response = await prisma.user.findMany();
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

export default { findUsers, findUserById };
