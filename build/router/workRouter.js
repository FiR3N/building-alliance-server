import Router from 'express';
import WorkController from '../controllers/WorkController.js';
const workRouter = Router();
workRouter.get('/', WorkController.getWorks);
workRouter.get('/:workId', WorkController.getWorkById);
workRouter.post('/', WorkController.addWork);
workRouter.delete('/:workId', WorkController.deleteWork);
workRouter.put('/:workId', WorkController.putWork);
export default workRouter;
//# sourceMappingURL=workRouter.js.map