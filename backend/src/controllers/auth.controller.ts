import { Request, Response } from "express";
import { loginUser, registerUser } from "../services/auth.service";

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const user = await registerUser(email, password);

    return res.status(201).json({
      message: "User registered successfully",
      userId: user.id,
    });
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const token = await loginUser(email, password);

    return res.status(200).json({ accessToken: token });
  } catch (error: any) {
    return res.status(401).json({ message: error.message });
  }
};
