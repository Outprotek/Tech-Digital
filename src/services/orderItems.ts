import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const finds = async () => {
  const totalData = prisma.orderItem.count();
  const response = prisma.orderItem.findMany();
  return { response, totalData };
};

const findById = async (id: string) => {
  const response = prisma.orderItem.findUnique({
    where: {
      id,
    },
  });
  if (!response) throw Error("order not found");
  return response;
};

const add = async (data: Prisma.OrderItemCreateInput) => {
  const response = prisma.orderItem.create({
    data: {
      ...data,
    },
  });
  return response;
};

const remove = async (id: string) => {
  await prisma.orderItem.delete({
    where: {
      id,
    },
  });
};

export default { finds, findById, add, remove };
