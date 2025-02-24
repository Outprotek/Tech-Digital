import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const finds = async () => {
  const totalData = await prisma.variant.count();
  const response = await prisma.variant.findMany();
  return { response, totalData };
};

const findById = async (id: string) => {
  const response = await prisma.variant.findFirst({
    where: {
      id,
    },
  });
  if (!response) throw Error("variant not found");
  return response;
};

const findByProductId = async (productId: string) => {
  const totalData = await prisma.variant.count({
    where: {
      productId,
    },
  });
  const response = await prisma.variant.findMany({
    where: {
      productId,
    },
  });
  if (!response) throw Error("variant not found by productId");
  return { response, totalData };
};

const add = async (data: Prisma.VariantCreateInput) => {
  const response = await prisma.variant.create({
    data: {
      ...data,
    },
  });
  return response;
};

const remove = async (id: string) => {
  await prisma.variant.delete({
    where: {
      id,
    },
  });
};

export default { finds, findById, findByProductId, add, remove };
