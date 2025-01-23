'use server'
import { prisma } from "./prisma";
import { User } from "@prisma/client";
import bcrypt from "bcryptjs";

export async function registerUser(userData: Pick<User, 'email' | 'password'>) {
  try {

    const existingUser = await prisma.user.findUnique({
      where: { email: userData.email as string },
    });

    if (existingUser) {
      return {
        error: "Email already registered. Please use a different email.",
      };
    }

    const createdUser = await prisma.user.create({
      data: {
        email: userData.email,
        password: await bcrypt.hash(userData.password as string, 10),
      },
    });
    
    return createdUser;
    
  } catch (error) {
    console.error('Error registering user:', error);
    return { 
      error: error instanceof Error ? error.message : "An unexpected error occurred." 
    };
  }
}