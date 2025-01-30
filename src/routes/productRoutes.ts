import { Router } from 'express';
import { getAllProducts, createProduct, exportProducts } from '../controllers/ProductController';

const router = Router();

router.get('/products', getAllProducts);
router.post('/products', createProduct);
router.get('/products/export', exportProducts);

export default router;