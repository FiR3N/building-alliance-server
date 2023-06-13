import Router from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import checkRoleMiddleware from '../middleware/checkRoleMiddleware.js';
import ReviewsController from '../controllers/ReviewsController.js';

const reviewsRouter = Router();
reviewsRouter.get('/', ReviewsController.getReviews);
reviewsRouter.post('/', ReviewsController.addReview);
reviewsRouter.delete('/:reviewId', authMiddleware, checkRoleMiddleware([1, 2]), ReviewsController.deleteReview);
reviewsRouter.put('/:reviewId', authMiddleware, checkRoleMiddleware([1, 2]), ReviewsController.putReview);

export default reviewsRouter;
