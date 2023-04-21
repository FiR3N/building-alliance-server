import Router from 'express';
import NewsController from '../controllers/NewsController.js';

const newsRouter = Router();
newsRouter.get('/', NewsController.getNews);
newsRouter.get('/:newsId', NewsController.getNewsById);
newsRouter.post('/', NewsController.addNews);
newsRouter.delete('/:newsId', NewsController.deleteNews);
newsRouter.put('/:newsId', NewsController.putNews);

export default newsRouter;
