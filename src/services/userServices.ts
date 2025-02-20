import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const findUsers = async () => {
  const totalData = await prisma.user.count({
    where: {
      isActive: true,
    },
  });
  const response = await prisma.user.findMany({
    where: {
      isActive: true,
    },
    include: {
      _count: {
        select: {
          reviews: true,
        },
      },
    },
  });
  return { response, totalData };
};

const findUserById = async (userId: string) => {
  const response = await prisma.user.findFirst({
    where: {
      id: userId,
    },
    include: {
      _count: {
        select: {
          reviews: true,
        },
      },
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

const edit = async (id: string, data: Prisma.UserUpdateInput) => {
  const response = await prisma.user.update({
    where: {
      id,
    },
    data: {
      ...data,
    },
  });
  return response;
};

const status = async (id: string, status: boolean) => {
  await prisma.user.update({
    where: {
      id,
    },
    data: {
      isActive: status,
    },
  });
};

const deleteUser = async (userId: string) => {
  await prisma.user.delete({
    where: {
      id: userId,
    },
  });
};
export default { findUsers, findUserById, add, edit, status, deleteUser };
