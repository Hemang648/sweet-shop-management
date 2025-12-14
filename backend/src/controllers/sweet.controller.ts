

import { Request, Response } from "express";
import * as sweetService from "../services/sweet.service";

export const createSweet = async (req: Request, res: Response) => {
  try {
    const sweet = await sweetService.addSweet(req.body);
    res.status(201).json(sweet);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getSweets = async (_req: Request, res: Response) => {
  const sweets = await sweetService.getAllSweets();
  res.json(sweets);
};

export const searchSweet = async (req: Request, res: Response) => {
  const { name, category, minPrice, maxPrice } = req.query;

  const results = await sweetService.searchSweets(
    name as string,
    category as string,
    minPrice ? Number(minPrice) : undefined,
    maxPrice ? Number(maxPrice) : undefined
  );

  res.json(results);
};

export const updateSweet = async (req: Request, res: Response) => {
  try {
    const updated = await sweetService.updateSweet(req.params.id, req.body);
    res.json(updated);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteSweet = async (req: Request, res: Response) => {
  await sweetService.deleteSweet(req.params.id);
  res.status(204).send();
};

export const purchaseSweetController = async (req: Request, res: Response) => {
  try {
    const sweet = await sweetService.purchaseSweet(req.params.id);
    res.json(sweet);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const restockSweetController = async (req: Request, res: Response) => {
  try {
    const { amount } = req.body;

    if (!amount) {
      return res.status(400).json({ message: "Restock amount required" });
    }

    const sweet = await sweetService.restockSweet(
      req.params.id,
      Number(amount)
    );
    res.json(sweet);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
