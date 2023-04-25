import Router from 'express';
import ProjectController from '../controllers/ProjectController.js';

const projectRouter = Router();
projectRouter.get('/', ProjectController.getProjects);
projectRouter.get('/:projectId', ProjectController.getProjectById);
projectRouter.post('/', ProjectController.addProject);
projectRouter.delete('/:projectId', ProjectController.deleteProject);
projectRouter.put('/:projectId', ProjectController.putProject);

export default projectRouter;
