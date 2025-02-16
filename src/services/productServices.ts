import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const fetchAllProducts = async () => {
  const products = await prisma.product.findMany();
  return products;
};

const fetchProductById = async (id: string) => {
  const productDetail = await prisma.product.findUnique({
    where: { id },
  });
  if (!productDetail) throw new Error("Product not found");
  return productDetail;
};

export default { fetchAllProducts, fetchProductById };
