import express from "express";
import {
  register,
  login,
  secret,
  updateProfile,
} from "../controller/authController.js";

const router = express.Router();

//middleware
import { auth, adminAuth } from "../middlewares/auth.js";

router.post("/register", register);
router.post("/login", login);
router.get("/auth-check", auth, (req, res) => {
  res.json({ ok: true });
});

router.get("/admin-check", auth, adminAuth, (req, res) => {
  res.json({ ok: true });
});

//from frontend
router.put("/profile", auth, updateProfile);

//testing
router.get("/secret", auth, adminAuth, secret);

export default router;
