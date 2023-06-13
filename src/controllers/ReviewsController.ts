import { NextFunction, Request, Response } from 'express';
import { UploadedFile } from 'express-fileupload';
import { __dirname } from '../utils/conts.js';
import ApiError from '../exceptions/ApiError.js';
import ReviewsService from '../services/ReviewsService.js';

class ReviewsController {
  async addReview(req: Request, res: Response, next: NextFunction) {
    try {
      const { companyName, description, rating } = req.body;
      let image = req.files?.image as UploadedFile;

      const review = await ReviewsService.addReview(companyName, description, rating, image);

      return res.status(200).json(review);
    } catch (e: any) {
      console.log(e.message);
      next(e);
    }
  }
  async putReview(req: Request, res: Response, next: NextFunction) {
    try {
      const reviewId = Number(req.params.reviewId);
      const { companyName, description, rating, isPublished } = req.body;
      let image = req.files?.image as UploadedFile;

      const review = await ReviewsService.putReview(
        reviewId,
        companyName,
        description,
        rating,
        image,
        isPublished,
        next,
      );

      return res.status(200).json(review);
    } catch (e) {
      next(e);
    }
  }
  async deleteReview(req: Request, res: Response, next: NextFunction) {
    try {
      const reviewId = Number(req.params.reviewId);

      const review = await ReviewsService.deleteReview(reviewId, next);

      if (!review) {
        return next(ApiError.BadRequest('Отзыв с таким Id не найден', []));
      }

      return res.status(200).json(review);
    } catch (e) {
      next(e);
    }
  }
  async getReviews(req: Request, res: Response, next: NextFunction) {
    try {
      let isNotOnlyPublished = Boolean(req.query.isNotOnlyPublished);
      let limit = Number(req.query.limit) || 9;
      let page = Number(req.query.page) || 1;

      const reviews = await ReviewsService.getReviews(limit, page, isNotOnlyPublished);

      return res.status(200).json(reviews);
    } catch (e) {
      console.log(e);
      next(e);
    }
  }
}

export default new ReviewsController();
