// lib/user.ts

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createUser = async (walletAddress: string) => {
  return prisma.user.create({
    data: {
      walletAddress,
    },
  });
};

export const addFavorite = async (
  walletAddress: string,
  favoriteAddress: string
) => {
  return prisma.user.update({
    where: { walletAddress },
    data: {
      favorites: {
        push: favoriteAddress,
      },
    },
  });
};

export const removeFavorite = async (
  walletAddress: string,
  favoriteAddress: string
) => {
  const user = await prisma.user.findUnique({
    where: { walletAddress },
  });

  if (!user) throw new Error("User not found");

  const updatedFavorites = user.favorites.filter(
    (fav) => fav !== favoriteAddress
  );

  return prisma.user.update({
    where: { walletAddress },
    data: {
      favorites: updatedFavorites,
    },
  });
};

export const getUserFavorites = async (walletAddress: string) => {
  const user = await prisma.user.findUnique({
    where: { walletAddress },
  });

  return user?.favorites || [];
};
