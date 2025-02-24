import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const finds = async () => {
  const totalData = await prisma.cart.count();
  const response = await prisma.cart.findMany({
    include: {
      items: true,
    },
  });
  return { response, totalData };
};

const findById = async (id: string) => {
  const response = await prisma.cart.findUnique({
    where: {
      id,
    },
  });
  if (!response) throw Error("order not found");
  return response;
};

const findByUserId = async (userId: string) => {
  const totalData = await prisma.cart.count({
    where: {
      userId,
    },
  });
  const response = await prisma.cart.findFirst({
    where: {
      userId,
    },
    include: {
      items: true,
    },
  });
  if (!response) throw Error("cart not found");
  return { response, totalData };
};

const add = async (
  userId: string,
  items: { variantId: string; quantity: number }[]
) => {
  return prisma.$transaction(async (tx) => {
    const cekcart = await tx.cart.findFirst({
      where: { userId },
    });
    if (cekcart) {
      await update(userId, items);
      return;
    }
    const item = items[0];
    const variant = await tx.variant.findUnique({
      where: { id: item.variantId },
    });

    if (!variant || variant.stock < item.quantity) {
      throw new Error(`Variant ${item.variantId} is out of stock`);
    }

    const subTotal = new Prisma.Decimal(variant.price).mul(item.quantity);

    const cart = await tx.cart.create({
      data: {
        userId,
        items: {
          create: {
            variantId: item.variantId,
            quantity: item.quantity,
            subTotal,
          },
        },
        totalPrice: subTotal,
      },
      include: { items: true },
    });

    return cart;
  });
};

const update = async (
  userId: string,
  items: { variantId: string; quantity: number }[]
) => {
  return prisma.$transaction(async (tx) => {
    const cart = await tx.cart.findFirst({
      where: { userId },
      include: { items: true },
    });

    if (!cart) {
      throw new Error("Cart tidak ditemukan");
    }

    let totalPrice = new Prisma.Decimal(cart.totalPrice);
    let remainingItems = cart.items.length;

    for (const item of items) {
      const existingItem = cart.items.find(
        (i) => i.variantId === item.variantId
      );

      if (item.quantity === 0 && existingItem) {
        // Hapus item dari cart jika quantity = 0
        await tx.orderItem.delete({
          where: { id: existingItem.id },
        });

        totalPrice = totalPrice.minus(existingItem.subTotal);
        remainingItems--; // Kurangi jumlah item yang tersisa
        continue;
      }

      // Cek variant hanya untuk item yang memiliki quantity > 0
      const variant = await tx.variant.findUnique({
        where: { id: item.variantId },
      });

      if (!variant || variant.stock < item.quantity) {
        throw new Error(`Variant ${item.variantId} is out of stock`);
      }

      const subTotal = new Prisma.Decimal(variant.price).mul(item.quantity);

      if (existingItem) {
        // Update item yang sudah ada
        const oldSubTotal = new Prisma.Decimal(existingItem.subTotal);
        totalPrice = totalPrice.minus(oldSubTotal).plus(subTotal);

        await tx.orderItem.update({
          where: { id: existingItem.id },
          data: { quantity: item.quantity, subTotal },
        });
      } else {
        // Tambahkan item baru ke cart
        totalPrice = totalPrice.plus(subTotal);
        remainingItems++;

        await tx.orderItem.create({
          data: {
            cartId: cart.id,
            variantId: item.variantId,
            quantity: item.quantity,
            subTotal,
          },
        });
      }
    }

    if (remainingItems === 0) {
      // Jika tidak ada item tersisa, hapus cart
      await tx.cart.delete({
        where: { id: cart.id },
      });

      return { cartId: cart.id, deleted: true };
    }

    await tx.cart.update({
      where: { id: cart.id },
      data: { totalPrice },
    });

    return { cartId: cart.id, updatedItems: items };
  });
};

const remove = async (id: string) => {
  await prisma.cart.delete({
    where: {
      id,
    },
  });
};

export default { finds, findById, findByUserId, add, remove };
