import { UploadedFile } from 'express-fileupload';
import ReviewsModel from '../models/ReviewsModel.js';
import { v4 } from 'uuid';
import path from 'path';
import { REVIEWS_PLUG_IMG, __dirname } from '../utils/conts.js';
import fs from 'fs';
import { NextFunction } from 'express';

class ReviewsService {
  async addReview(companyName: string, description: string, rating: number, image: UploadedFile) {
    let imgPathname: string;
    if (image) {
      imgPathname = v4() + '.jpg';
      await image.mv(path.resolve(__dirname, 'static', 'reviews', imgPathname));
    } else {
      imgPathname = REVIEWS_PLUG_IMG;
    }

    const review = await ReviewsModel.create({
      companyName: companyName,
      description: description,
      rating: rating,
      isPublished: false,
      image: imgPathname,
    });

    return review;
  }

  async putReview(
    reviewId: number,
    companyName: string,
    description: string,
    rating: number,
    image: UploadedFile,
    isPublished: boolean,
    next: NextFunction,
  ) {
    const review = await ReviewsModel.findOne({ where: { $id$: reviewId } });

    let imgPathname = review?.image;

    if (image) {
      imgPathname = v4() + '.jpg';
      image.mv(path.resolve(__dirname, 'static', 'reviews', imgPathname));

      if (review?.image != REVIEWS_PLUG_IMG) {
        fs.unlink(path.resolve(__dirname, 'static', 'reviews', review?.image!), (err: any) => {
          if (err) next(err);
          console.log(`revoews/${review?.image}.jpg was deleted`);
        });
      }
    }

    await ReviewsModel.update(
      {
        companyName: companyName,
        description: description,
        rating: rating,
        isPublished: isPublished,
        image: imgPathname,
      },
      { where: { $id$: reviewId } },
    );

    const updatedReview = await ReviewsModel.findOne({
      where: { id: reviewId },
    });

    return updatedReview;
  }

  async deleteReview(reviewId: number, next: NextFunction) {
    const review = await ReviewsModel.findOne({ where: { $id$: reviewId } });
    if (review)
      if (review?.image != REVIEWS_PLUG_IMG) {
        fs.unlink(path.resolve(__dirname, 'static', 'reviews', review?.image!), (err: any) => {
          if (err) next(err);
          console.log(`reviews/${review?.image}.jpg was deleted`);
        });
      }
    await ReviewsModel.destroy({ where: { $id$: reviewId } });

    return review;
  }
  async getReviews(limit: number, page: number, isNotOnlyPublished: boolean) {
    let offset = page * limit - limit;
    const whereisNotOnlyPublished: any = {};
    if (!isNotOnlyPublished) {
      whereisNotOnlyPublished.isPublished = true;
    }
    const reviews = await ReviewsModel.findAndCountAll({
      where: whereisNotOnlyPublished,
      order: [['id', 'DESC']],
      limit,
      offset,
      distinct: true,
    });

    return reviews;
  }
}

export default new ReviewsService();
