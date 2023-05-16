import Router from 'express';
import NewsController from '../controllers/NewsController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import checkRoleMiddleware from '../middleware/checkRoleMiddleware.js';
const newsRouter = Router();
newsRouter.get('/', NewsController.getNews);
newsRouter.get('/:newsId', NewsController.getNewsById);
newsRouter.post('/', authMiddleware, checkRoleMiddleware([1, 2]), NewsController.addNews);
newsRouter.delete('/:newsId', authMiddleware, checkRoleMiddleware([1, 2]), NewsController.deleteNews);
newsRouter.put('/:newsId', authMiddleware, checkRoleMiddleware([1, 2]), NewsController.putNews);
export default newsRouter;
//# sourceMappingURL=newsRouter.js.map