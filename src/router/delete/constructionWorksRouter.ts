import Router from 'express';
import ContsructionWorkController from '../controllers/ContsructionWorkController.js';

const constructionWorksRouter = Router();
constructionWorksRouter.get('/', ContsructionWorkController.getConstructionWork);
constructionWorksRouter.post('/', ContsructionWorkController.addConstructionWork);
constructionWorksRouter.delete('/:constructionWorkId', ContsructionWorkController.deleteConstructionWork);
constructionWorksRouter.put('/:constructionWorkId', ContsructionWorkController.putConstructionWork);

export default constructionWorksRouter;
