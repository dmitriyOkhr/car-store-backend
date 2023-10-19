import { body } from "express-validator";

export const registerValidation = [
  body("fullName", "Коротке повне ім*я").isLength({ min: 3 }),
  body("email", "Невірний формат пошти").isEmail(),
  body("password", "Короткий пароль").isLength({ min: 5 }),
];

export const loginValidation = [
  body("email", "Невірний формат пошти").isEmail(),
  body("password", "Короткий пароль").isLength({ min: 5 }),
];

export const createPostValidation = [
  body("imageUrls").isArray(),
  body("brand").isString(),
  body("model").isString(),
  body("price").isString(),
  body("year").isString(),
  body("engine").isString(),
  body("drivetrain").isString(),
  body("transmission").isString(),
  body("exterior").isString(),
  body("interiorFeatures").isString(),
  body("exteriorFeatures").isString(),
  body("functional").isString(),
  body("safetyConvenience").isString(),
];
