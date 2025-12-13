import app from "../src/app";
import request from "supertest";

(global as any).request = request(app);
