import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const finds = async () => {
  const totalData = await prisma.orderItem.count();
  const response = await prisma.orderItem.findMany();
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

const remove = async (id: string) => {
  await prisma.orderItem.delete({
    where: {
      id,
    },
  });
};

export default { finds, findById, remove };
