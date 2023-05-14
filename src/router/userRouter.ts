import Router from 'express';
import UserController from '../controllers/UserController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const userRouter = Router();
userRouter.get('/', authMiddleware, UserController.getUsers); //getAll
userRouter.get('/refresh', UserController.refresh); // refresh
userRouter.get('/:userId', authMiddleware, UserController.getUserById); //getOne
userRouter.post('/logout', UserController.logout); // logout
userRouter.post('/', authMiddleware, UserController.addUser); // create
userRouter.post('/login', UserController.login); // login
userRouter.delete('/:userId', authMiddleware, UserController.deleteUser); //deleteOne
userRouter.put('/:userId', authMiddleware, UserController.putUser); //updateOneByAdmin
userRouter.put('/by-user/:userId', authMiddleware, UserController.putUserByUser); //updateOneByUser

export default userRouter;
