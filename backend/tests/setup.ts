import app from "../src/app";
import request from "supertest";
import { prisma } from "../src/config/prisma";

beforeAll(async () => {
  await prisma.sweet.deleteMany();
  await prisma.user.deleteMany();
});

(global as any).request = request(app);
