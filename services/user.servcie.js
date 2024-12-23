import prisma from "../prisma/prisma.client.js";

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
