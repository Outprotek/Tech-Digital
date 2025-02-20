import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const finds = async () => {
  const totalData = prisma.order.count();
  const response = prisma.order.findMany();
  return { response, totalData };
};

const findById = async (id: string) => {
  const response = prisma.order.findUnique({
    where: {
      id,
    },
  });
  if (!response) throw Error("order not found");
  return response;
};

const add = async (data: Prisma.OrderCreateInput) => {
  const response = prisma.order.create({
    data: {
      ...data,
    },
  });
  return response;
};

const remove = async (id: string) => {
  await prisma.order.delete({
    where: {
      id,
    },
  });
};

export default { finds, findById, add, remove };
