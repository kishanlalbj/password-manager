import { Router } from "express";
import { decryptData, encryptData } from "../encryption.js";
import Application from "../models/Application.js";
import jwt from "jsonwebtoken";
import HttpError from "../utils/HttpError.js";
import verifyJwt from "../middlewares/verifyJwt.js";

const router = Router();

router.post("/", verifyJwt, async (req, res) => {
  try {
    const { name, username, password, website } = req.body;

    if (!username || !password || !name) {
      throw new HttpError(400, "All fields required");
    }

    const hashed = encryptData(password);

    const newApplication = new Application({
      name,
      username,
      password: hashed,
      website,
      user: req.user.id
    });

    const savedApplication = await newApplication.save();
    res.send(savedApplication);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get("/", verifyJwt, async (req, res, next) => {
  try {
    const apps = await Application.find({ user: req.user.id }).lean();

    const decrypted = apps.map((app) => {
      return {
        ...app,
        password: decryptData(app?.password)
      };
    });
    res.send(decrypted);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.post("/decrypt", verifyJwt, async (req, res, next) => {
  try {
    const { password } = req.body;

    if (!password) throw new HttpError(400, "password is empty");

    const text = decryptData(password);

    res.send({ decoded: text });
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", verifyJwt, async (req, res, next) => {
  try {
    const { id } = req.params;

    const app = await Application.findById(id).populate('user').lean();

    if (!app) throw new HttpError(404, "App not found");

    if (app.user._id.toString() !== req.user.id)
      throw new HttpError(
        403,
        "You are not authorized to delete this application"
      );

    await Application.findByIdAndDelete(id).lean();

    res.send({ id });
  } catch (error) {
    next(error);
  }
});

router.put("/:id", verifyJwt, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, username, website, password } = req.body;

    const app = await Application.findById(id).lean();

    if (!app) throw new HttpError(404, "App not found");

    console.log(app.user, req.user.id)

    if (app.user.toString() !== req.user.id)
      throw new HttpError(
        403,
        "You are not authorized to update this application"
      );

    const updatedApp = await Application.findByIdAndUpdate(
      id,
      { name, username, website, password },
      { new: 1 }
    );

    res.send(updatedApp);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get("/search", verifyJwt, async (req, res, next) => {
  try {
    const { q = "", page = 1 } = req.body;

    // const page = 1; // Current page
    const limit = 10; // Number of items per page

    const totalPages = await Application.find({
      name: { $regex: q, $options: "i" },
      user: req.user.id
    }).countDocuments();

    const apps = await Application.find({
      name: { $regex: q, $options: "i" },
      user: req.user.id
    })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    res.send({
      page,
      isLastPage: page === totalPages,
      data: apps
    });
  } catch (error) {
    next(error);
  }
});



export default router;
