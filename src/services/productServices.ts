import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const fetchAllProducts = async () => {
  return await prisma.product.findMany();
};

const fetchProductById = async (id: string) => {
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) throw new Error("Product not found");
  return product;
};

const addProduct = async (data: Prisma.ProductCreateInput) => {
  const response = await prisma.product.create({
    data: {
      ...data,
      categories: {
        connect: (Array.isArray(data.categories) ? data.categories : []).map(category => ({ id: category.id }))
      }
    }
  });
  return response
};

const modifyProduct = async (id: string, data: any) => {
  const existingProduct = await prisma.product.findUnique({ where: { id } });
  if (!existingProduct) throw new Error("Product not found");

  return await prisma.product.update({
    where: { id },
    data,
  });
};

const removeProduct = async (id: string) => {
  const existingProduct = await prisma.product.findUnique({ where: { id } });
  if (!existingProduct) throw new Error("Product not found");

  await prisma.product.delete({ where: { id } });
};

export default { fetchAllProducts, fetchProductById, addProduct, modifyProduct, removeProduct };
