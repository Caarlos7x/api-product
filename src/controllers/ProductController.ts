import { Request, Response } from 'express';
import { getProducts, addProducts, exportProductsToExcel } from '../services/ProductServices';

export const getAllProducts = async (req: Request, res: Response): Promise<void> => {
  const products = await getProducts();
  res.json(products);
};

export const createProduct = async (req: Request, res: Response): Promise<void> => {
  const products = Array.isArray(req.body) ? req.body : [req.body]; // Se for um array, mantém; se não, transforma em array.

  // Validar se os campos 'name' e 'price' estão presentes nos produtos
  for (const product of products) {
    const { name, price } = product;
    if (!name || !price) {
      res.status(400).json({ error: 'Name and price are required for all products' });
      return;
    }
  }

  // Se for um único produto, chama addProduct, senão, chama addProducts.
  if (products.length === 1) {
    const newProducts = await addProducts(products);
    res.status(201).json(newProducts);
  } else {
    const newProducts = await addProducts(products);
    res.status(201).json(newProducts);
  }
};

export const exportProducts = async (req: Request, res: Response): Promise<void> => {
  const buffer = await exportProductsToExcel();
  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.setHeader('Content-Disposition', 'attachment; filename=products.xlsx');
  res.send(buffer);
};
