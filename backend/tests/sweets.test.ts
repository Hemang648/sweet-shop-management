let token: string;
let adminToken: string;
let sweetId: string;

beforeAll(async () => {
  await (global as any).request.post("/api/auth/register").send({
    email: "admin@sweetshop.com",
    password: "admin123",
  });

  const login = await (global as any).request
    .post("/api/auth/login")
    .send({
      email: "admin@sweetshop.com",
      password: "admin123",
    });

  adminToken = login.body.accessToken;
});

describe("Sweets API", () => {
  it("should create sweet", async () => {
    const res = await (global as any).request
      .post("/api/sweets")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        name: "Ladoo",
        category: "Indian",
        price: 10,
        quantity: 5,
      });

    sweetId = res.body.id;
    expect(res.status).toBe(201);
  });

  it("should purchase sweet", async () => {
    const res = await (global as any).request
      .post(`/api/sweets/${sweetId}/purchase`)
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.status).toBe(200);
    expect(res.body.quantity).toBe(4)
  });

  it("should delete sweet (admin only)", async () => {
    const res = await (global as any).request
      .delete(`/api/sweets/${sweetId}`)
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.status).toBe(204);
  });
});
