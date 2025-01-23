import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./prisma";
import { schema } from "@/lib/zod";
import bcrypt from "bcryptjs";

import Credentials from "next-auth/providers/credentials";
import { ok } from "assert";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {

        if (!credentials) throw new Error("Missing credentials");

        const validated = schema.parse(credentials);

        const user = await prisma.user.findUnique({
          where: {
            email: validated.email,
          },
        });

        if (!user) throw new Error("Email incorrect");

        const IsPasswordOk = await bcrypt.compare(
          validated.password,
          user.password as string
        );

        if (!IsPasswordOk) throw new Error("Password incorrect");

        return user;
      },
    }),
  ],
});
