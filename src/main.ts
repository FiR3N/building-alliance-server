import express from 'express';
import dotenv from 'dotenv';
import sequelize from './db.js';
import * as models from './models/models.js';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import router from './router/index.js';
import errorMiddleware from './middleware/errorMiddleware.js';
import path from 'path';

dotenv.config();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve('src');

console.log(models);

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
  }),
);
app.use(express.static(path.resolve(__dirname, 'static')));
app.use(express.static(path.resolve(__dirname, 'static', 'products')));
app.use(fileUpload({}));

app.use(router);
app.use(errorMiddleware);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();

    app.listen(PORT, () => console.log(`Server started on PORT: ${PORT}`));
  } catch (e: any) {
    console.log(e.message);
  }
};

start();