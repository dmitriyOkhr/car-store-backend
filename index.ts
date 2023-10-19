import express from "express";
import cors from "cors";
import { Request, Response } from "express";
import mongoose from "mongoose";
import fs from "fs";
import multer from "multer";
import path from "path";

import {
  registerValidation,
  loginValidation,
  createPostValidation,
} from "./validations.js";
import checkAuth from "./utils/checkAuth.js";
import * as UserControllers from "./controllers/UserController.js";
import * as PostControllers from "./controllers/PostController.js";
import handleValidationsErrors from "./utils/handleValidationsErrors.js";

mongoose
  .connect(
    "mongodb+srv://nayts2017:KQtlNtQmUbhZjROG@cluster1.eafitog.mongodb.net/store?retryWrites=true&w=majority"
  )
  .then(() => console.log("DB OK"))
  .catch((err) => console.log("DB error", err));

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));
const port = 5555;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Папка для збереження файлів
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${Date.now()}${ext}`); // Генерація унікального імені файла
  },
});

const upload = multer({ storage });

//const upload = multer({ dest: "uploads/" });

//////////////user n-points////////////

app.post(
  "/auth/register",
  registerValidation,
  handleValidationsErrors,
  UserControllers.register
);
app.post(
  "/auth/login",
  loginValidation,
  handleValidationsErrors,
  UserControllers.login
);
app.get("/auth/me", checkAuth, UserControllers.getMe);

//////////////post n-points///////////

app.post("/upload", upload.array("images", 10), (req, res) => {
  res.json(req.files);
});

app.get("/posts", PostControllers.getAll);
app.get("/posts/:id", PostControllers.getOne);
app.post(
  "/posts",
  checkAuth,
  createPostValidation,
  handleValidationsErrors,
  PostControllers.create
);
app.delete("/posts/:id", checkAuth, PostControllers.remove);
app.patch(
  "/posts/:id",
  checkAuth,
  createPostValidation,
  handleValidationsErrors,
  PostControllers.update
);

/////////////////////////////////////
app.listen(port, () => {
  console.log("Server OK");
});
