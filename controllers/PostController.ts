import PostModel from "../models/Post.js";
import { Response, Request } from "express";
import { IGetUserAuthInfoRequest } from "../types.js";

export const create = async (req: IGetUserAuthInfoRequest, res: Response) => {
  try {
    const doc = new PostModel({
      user: req.userId,
      brand: req.body.brand.toLowerCase(),
      model: req.body.model,
      price: req.body.price,
      engine: req.body.engine,
      drivetrain: req.body.drivetrain,
      transmission: req.body.transmission,
      exterior: req.body.exterior,
      interior: req.body.interior,
      year: req.body.year,
      imageUrls: req.body.imageUrls,
      interiorFeatures: req.body.interiorFeatures,
      exteriorFeatures: req.body.exteriorFeatures,
      functional: req.body.functional,
      safetyConvenience: req.body.safetyConvenience,
    });

    const post = await doc.save();

    return res.json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не вдалось створити пост",
    });
  }
};

export const getAll = async (req: Request, res: Response) => {
  try {
    const query =
      req.query.arg.length === 24
        ? { user: { $all: req.query.arg } }
        : { brand: { $all: req.query.arg } };

    const posts = await PostModel.find(query).populate("user").exec();

    return res.json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не вдалось отримати оголошення",
    });
  }
};

export const getOne = async (req: Request, res: Response) => {
  try {
    const postId = req.params.id;

    const post = await PostModel.findById(postId).populate("user").exec();

    if (!post) {
      return res.status(500).json({
        message: "Не вдалось знайти оголошення",
      });
    }

    return res.json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не вдалось отримати оголошення",
    });
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const postId = req.params.id;

    const doc = await PostModel.findOneAndDelete({ _id: postId });
    if (!doc) {
      return res.status(404).json({ massage: "Не знайдено" });
    }
    return res.json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      massage: "Невідома помилка",
    });
  }
};

export const update = async (req: IGetUserAuthInfoRequest, res: Response) => {
  try {
    const postId = req.params.id;

    const updatedDoc = await PostModel.findOneAndUpdate(
      { _id: postId },
      {
        user: req.userId,
        brand: req.body.brand,
        model: req.body.model,
        price: req.body.price,
        engine: req.body.engine,
        drivetrain: req.body.drivetrain,
        transmission: req.body.transmission,
        exterior: req.body.exterior,
        interior: req.body.interior,
        year: req.body.year,
        imageUrls: req.body.imageUrls,
        interiorFeatures: req.body.interiorFeatures,
        exteriorFeatures: req.body.exteriorFeatures,
        functional: req.body.functional,
        safetyConvenience: req.body.safetyConvenience,
      }
    );
    return res.json({
      success: "true",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      massage: "Невідома помилка",
    });
  }
};
