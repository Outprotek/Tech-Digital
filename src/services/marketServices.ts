import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const finds = async () => {
  const response = await prisma.market.findMany({
    where: {
      isActive: true,
    },
    include: {
      _count: {
        select: {
          products: true,
        },
      },
    },
  });
  const totalData = await prisma.market.count({
    where: {
      isActive: true,
    },
  });
  return { response, totalData };
};

const findById = async (id: string) => {
  const response = await prisma.market.findFirst({
    where: {
      id,
    },
    include: {
      _count: {
        select: {
          products: true,
        },
      },
    },
  });
  if (!response) throw Error("Market not found");
  return response;
};

const add = async (data: Prisma.MarketCreateInput) => {
  const response = await prisma.market.create({
    data: {
      ...data,
    },
  });
  return response;
};

const edit = async (id: string, data: Prisma.MarketUpdateInput) => {
  const response = await prisma.market.update({
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
  await prisma.market.update({
    where: {
      id,
    },
    data: {
      isActive: status,
    },
  });
};

const remove = async (id: string) => {
  await prisma.market.delete({
    where: {
      id,
    },
  });
};
export default { finds, findById, add, edit, status, remove };
