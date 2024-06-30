import express from 'express'
const router = express.Router();
import { registerUser, loginUser } from '../controllers/userConteollers.js';

router.route("/").post(registerUser);
router.route("/login").post(loginUser);


export default router