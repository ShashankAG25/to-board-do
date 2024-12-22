import prisma from "../prisma/prisma.client"; // Prisma client import

async function createUser(userData) {
  try {
    const user = await prisma.user.create({
      data: userData,
    });
    return user;
  } catch (error) {
    throw new Error("Error creating user: " + error.message);
  }
}

export { createUser };
