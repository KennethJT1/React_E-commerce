import express from "express";
import { register, login, secret } from '../controller/authController.js'

const router = express.Router();

//middleware
import { auth, adminAuth } from '../middlewares/auth.js'

router.post('/register', register);
router.post('/login', login);

//testing
router.get('/secret', auth, adminAuth, secret);


export default router;