import { Pool } from 'pg';
import { Product } from '../models/Product';

const pool = new Pool({
  user: 'caarlos7x',
  host: 'localhost',
  database: 'product_db',
  password: '913174471',
  port: 5432,
});

// Função para pegar todos os produtos
export const getProducts = async (): Promise<Product[]> => {
  const { rows } = await pool.query('SELECT * FROM products');
  return rows;
};

// Função para adicionar múltiplos produtos
export const addProducts = async (products: Omit<Product, 'id' | 'created_at'>[]): Promise<Product[]> => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN'); // Inicia uma transação

    const result: Product[] = []; // Resultados a serem retornados após inserção
    for (const product of products) {
      const { name, description, price } = product;

      const { rows } = await client.query(
        'INSERT INTO products (name, description, price) VALUES ($1, $2, $3) RETURNING *',
        [name, description, price]
      );

      result.push(rows[0]); // Armazena o produto inserido (com id e created_at gerados pelo banco)
    }

    await client.query('COMMIT'); // Confirma a transação
    return result; // Retorna os produtos inseridos
  } catch (error) {
    await client.query('ROLLBACK'); // Desfaz a transação em caso de erro
    throw error;
  } finally {
    client.release(); // Libera o cliente
  }
};

// Função para exportar produtos para Excel
export const exportProductsToExcel = async (): Promise<Buffer> => {
  const products = await getProducts();
  const ExcelJS = require('exceljs');
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Products');

  worksheet.columns = [
    { header: 'ID', key: 'id', width: 10 },
    { header: 'Name', key: 'name', width: 32 },
    { header: 'Description', key: 'description', width: 32 },
    { header: 'Price', key: 'price', width: 10 },
    { header: 'Created At', key: 'created_at', width: 20 },
  ];

  products.forEach((product) => worksheet.addRow(product)); // Adiciona cada produto como uma nova linha

  return await workbook.xlsx.writeBuffer(); // Retorna o buffer do arquivo Excel
};
