import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const fetchAllProducts = async () => {
  const totalData = await prisma.product.count({
    where: {
      isActive: true,
    },
  });
  const response = await prisma.product.findMany({
    where: {
      isActive: true,
    },
    include: {
      _count: {
        select: {
          reviews: true,
          variant: true,
        },
      },
      categories: {
        select: {
          id: true,
          label: true,
        },
      },
    },
  });
  return { totalData, response };
};

const fetchProductById = async (id: string) => {
  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      categories: {
        select: {
          id: true,
          label: true,
        },
      },
      _count: {
        select: {
          reviews: true,
          variant: true,
        },
      },
    },
  });
  if (!product) throw new Error("Product not found");
  return product;
};

const addProduct = async (data: Prisma.ProductCreateInput) => {
  const response = await prisma.product.create({
    data: {
      ...data,
      categories: {
        connectOrCreate: (Array.isArray(data.categories)
          ? data.categories
          : []
        ).map((category) => ({
          where: { label: category.label },
          create: {
            label: category.label,
          },
        })),
      },
    },
  });
  return response;
};

const modifyProduct = async (id: string, data: any) => {
  const existingProduct = await prisma.product.findUnique({ where: { id } });
  if (!existingProduct) throw new Error("Product not found");

  // Pastikan id tidak diubah
  const { id: _, categories, ...updateData } = data;

  return await prisma.product.update({
    where: { id },
    data: {
      ...updateData,
      categories: categories
        ? {
            set: categories.map((category: { id: number }) => ({
              id: category.id,
            })),
          }
        : undefined,
    },
  });
};

const removeProduct = async (id: string) => {
  const existingProduct = await prisma.product.findUnique({ where: { id } });
  if (!existingProduct) throw new Error("Product not found");

  await prisma.product.delete({ where: { id } });
};

export default {
  fetchAllProducts,
  fetchProductById,
  addProduct,
  modifyProduct,
  removeProduct,
};
