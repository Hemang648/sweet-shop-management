import { Request, Response } from "express";
import * as sweetService from "../services/sweet.service";

export const createSweet = (req: Request, res: Response) => {
  const sweet = sweetService.addSweet(req.body);
  res.status(201).json(sweet);
};

export const getSweets = (_req: Request, res: Response) => {
  res.json(sweetService.getAllSweets());
};

export const searchSweet = (req: Request, res: Response) => {
  const { name, category, minPrice, maxPrice } = req.query;

  const results = sweetService.searchSweets(
    name as string,
    category as string,
    minPrice ? Number(minPrice) : undefined,
    maxPrice ? Number(maxPrice) : undefined
  );

  res.json(results);
};

export const updateSweet = (req: Request, res: Response) => {
  const updated = sweetService.updateSweet(req.params.id, req.body);
  res.json(updated);
};

export const deleteSweet = (req: Request, res: Response) => {
  sweetService.deleteSweet(req.params.id);
  res.status(204).send();
};


export const purchaseSweetController = (req: Request, res: Response) => {
  try {
    const sweet = sweetService.purchaseSweet(req.params.id);
    res.json(sweet);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const restockSweetController = (req: Request, res: Response) => {
  try {
    const { amount } = req.body;

    if (!amount) {
      return res.status(400).json({ message: "Restock amount required" });
    }

    const sweet = sweetService.restockSweet(req.params.id, Number(amount));
    res.json(sweet);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
