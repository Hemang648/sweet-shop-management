describe("Auth API", () => {
  it("should register a user", async () => {
    const res = await (global as any).request
      .post("/api/auth/register")
      .send({
        email: "test@test.com",
        password: "123456",
      });

    expect(res.status).toBe(201);
    expect(res.body.userId).toBeDefined();
  });

  it("should login user and return token", async () => {
    const res = await (global as any).request
      .post("/api/auth/login")
      .send({
        email: "test@test.com",
        password: "123456",
      });

    expect(res.status).toBe(200);
    expect(res.body.accessToken).toBeDefined();
  });
});
 
