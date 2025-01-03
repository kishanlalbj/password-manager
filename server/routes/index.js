import { Router } from "express";
import { decryptData, encryptData } from "../encryption.js";
import Application from "../models/Application.js";
import HttpError from "../utils/HttpError.js";
import verifyJwt from "../middlewares/verifyJwt.js";

const router = Router();

router.get("/search", verifyJwt, async (req, res, next) => {
  try {
    const { q = "", page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const apps = await Application.find({
      user: req.user.id,
      name: { $regex: q, $options: "i" }
    })
      .select({ password: 0 })
      .skip(skip)
      .limit(parseInt(limit))
      .lean()
      .exec();

    const total = await Application.countDocuments({
      user: req.user.id,
      name: { $regex: q, $options: "i" }
    });

    res.send({
      apps,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit)
    });
  } catch (error) {
    next(error);
  }
});

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
    const apps = await Application.find({ user: req.user.id })
      .select({ password: 0 })
      .lean()
      .exec();

    res.send(apps);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get("/:appId/decrypt/", verifyJwt, async (req, res, next) => {
  try {
    const { appId } = req.params;

    const application = await Application.findById(appId).lean().exec();

    if (!application) throw new HttpError(404, "application not found");

    if (application.user.toString() !== req.user.id) {
      throw new HttpError(403, "You are not authorized");
    }

    const text = decryptData(application.password);

    res.send({ decoded: text });
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", verifyJwt, async (req, res, next) => {
  try {
    const { id } = req.params;

    const app = await Application.findById(id).populate("user").lean().exec();

    if (!app) throw new HttpError(404, "App not found");

    if (app.user._id.toString() !== req.user.id)
      throw new HttpError(
        403,
        "You are not authorized to delete this application"
      );

    await Application.findByIdAndDelete(id).exec();

    res.send({ id });
  } catch (error) {
    next(error);
  }
});

router.put("/:id", verifyJwt, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, username, website, password } = req.body;

    const app = await Application.findById(id).lean().exec();

    if (!app) throw new HttpError(404, "App not found");

    if (app.user.toString() !== req.user.id)
      throw new HttpError(
        403,
        "You are not authorized to update this application"
      );

    const updatedApp = await Application.findByIdAndUpdate(
      id,
      { name, username, website, password: encryptData(password) },
      { new: 1 }
    ).exec();

    updatedApp.password = decryptData(updatedApp.password);

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
    })
      .countDocuments()
      .exec();

    const apps = await Application.find({
      name: { $regex: q, $options: "i" },
      user: req.user.id
    })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean()
      .exec();

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
