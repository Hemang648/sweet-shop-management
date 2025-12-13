// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import { User } from "../models/user.model";
// import { env } from "../config/env";


// // Temporary in-memory store (DB will replace this later)
// const users: User[] = [];

// export const registerUser = async (
//   email: string,
//   password: string
// ): Promise<User> => {
//   const existing = users.find((u) => u.email === email);
//   if (existing) {
//     throw new Error("User already exists");
//   }

//   const hashedPassword = await bcrypt.hash(password, 10);

//   const user: User = {
//     id: Date.now().toString(),
//     email,
//     password: hashedPassword,
//     role: email === "admin@sweetshop.com" ? "ADMIN" : "USER",

//   };

//   users.push(user);
//   return user;
// };

// export const loginUser = async (
//   email: string,
//   password: string
// ): Promise<string> => {
//   const user = users.find((u) => u.email === email);
//   if (!user) {
//     throw new Error("Invalid credentials");
//   }

//   const isMatch = await bcrypt.compare(password, user.password);
//   if (!isMatch) {
//     throw new Error("Invalid credentials");
//   }

//   const token = jwt.sign(
//     { userId: user.id, role: user.role },
//     env.JWT_SECRET,
//     { expiresIn: "1h" }
//   );

//   return token;
// };

// Updated code with Prisma integration
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../config/prisma";
import { env } from "../config/env";

export const registerUser = async (email: string, password: string) => {
  const existing = await prisma.user.findUnique({
    where: { email },
  });

  if (existing) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      role: email === "admin@sweetshop.com" ? "ADMIN" : "USER",
    },
  });

  return user;
};

export const loginUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign(
    { userId: user.id, role: user.role },
    env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  return token;
};
