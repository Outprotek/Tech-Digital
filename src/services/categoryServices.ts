import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const finds = async () => {
  const totalData = await prisma.category.count();
  const response = await prisma.category.findMany();
  return { response, totalData };
};

const findById = async (id: number) => {
  const response = await prisma.category.findFirst({
    where: {
      id,
    },
  });
  if (!response) throw Error("Category not found");
  return response;
};

const add = async (data: Prisma.CategoryCreateInput) => {
  const response = await prisma.category.create({
    data: {
      ...data,
    },
  });
  return response;
};

const edit = async (id: number, data: Prisma.CategoryUpdateInput) => {
  const response = await prisma.category.update({
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
  await prisma.category.delete({
    where: {
      id,
    },
  });
};

export default { finds, findById, add, edit, remove };
