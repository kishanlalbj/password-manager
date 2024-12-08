import { Router } from "express";
import User from "../models/User.js";
import HttpError from "../utils/HttpError.js";
import generateAccessToken from "../utils/tokens.js";
import verifyJwt from "../middlewares/verifyJwt.js";
import { parseCookies } from "../utils/index.js";
import jwt from "jsonwebtoken";

const router = Router();

router.post("/register", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const userExists = await User.findOne({ email }).lean().exec();

    if (userExists) throw new HttpError(409, "email already registered");

    const user = new User({ email, password });

    const savedUser = await user.save();

    if (!savedUser) throw new HttpError(500, "Error registering user");

    res.json({ success: true, message: "Register successful" });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) throw new HttpError(400, "Fields empty");

    const user = await User.findOne({ email }).exec();

    if (!user) throw new HttpError(401, "Invalid credentials.");

    const isValid = await user.isValidPassword(password);

    if (!isValid) {
      throw new HttpError(401, "Invalid credentials");
    }

    const access_token = await generateAccessToken({
      id: user?._id,
      email: user?.email,
      iat: Math.floor(Date.now() / 1000) - 30
    });

    const refresh_token = await generateAccessToken(
      {
        id: user?._id,
        email: user?.email,
        iat: Math.floor(Date.now() / 1000) - 30
      },
      "refresh"
    );

    res.cookie("rtkn", refresh_token, {
      secure: true,
      sameSite: "None",
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000 // 1 day
    });

    res.send({
      access_token
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get("/me", verifyJwt, async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).lean().exec();

    res.send({ user, authenticated: true });
  } catch (error) {
    next(error);
  }
});

router.post("/logout", verifyJwt, (req, res) => {
  try {
    res.clearCookie("rtkn");

    res.send({
      success: true,
      message: "logged out"
    });
  } catch (error) {
    next(error);
  }
});

router.get("/refresh-token", async (req, res, next) => {
  try {
    const cookies = parseCookies(req.headers.cookie);

    await jwt.verify(
      cookies?.rtkn,
      process.env.JWT_REFRESH_SECRET,
      async (error, payload) => {
        if (error) throw new HttpError(403, "Forbidden");

        req.user = payload;

        const user = await User.findById(req.user.id).lean();

        const access_token = await generateAccessToken({
          id: user?._id,
          email: user?.email,
          iat: Math.floor(Date.now() / 1000) - 30
        });

        res.send({ access_token });
      }
    );
  } catch (error) {
    next(error);
  }
});

router.post("/reset-password", async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});

export default router;
