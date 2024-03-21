import { Router } from "express";
import * as UserController from './user.controller.js';
import auth from "../../middleware/auth.middleware.js";
const router = Router();

router.get('/profile',auth, UserController.profile);

export default router;