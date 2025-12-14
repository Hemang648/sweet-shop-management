import { prisma } from "../src/config/prisma";

export default async () => {
  await prisma.user.deleteMany();
  await prisma.sweet.deleteMany();
};
 
