import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

export default new Sequelize(
  process.env.DB_NAME as string,
  process.env.DB_USER as string,
  process.env.DB_PASSWORD as string,
  {
    dialect: 'postgres',
    host: process.env.DB_HOST as string,
    port: Number(process.env.DB_PORT as string),
  },
);
