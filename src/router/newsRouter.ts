import Router from 'express';
import NewsController from '../controllers/NewsController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const newsRouter = Router();
newsRouter.get('/', NewsController.getNews);
newsRouter.get('/:newsId', NewsController.getNewsById);
newsRouter.post('/', authMiddleware, NewsController.addNews);
newsRouter.delete('/:newsId', authMiddleware, NewsController.deleteNews);
newsRouter.put('/:newsId', authMiddleware, NewsController.putNews);

export default newsRouter;
