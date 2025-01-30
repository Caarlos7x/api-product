import express from 'express';
import productRoutes from './routes/productRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', productRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});