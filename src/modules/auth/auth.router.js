import { Router } from "express";
import * as AuthController from './auth.controller.js';
import { asyncHandler } from "../../utils/errorHandling.js";
const router = Router();

router.post('/signup', asyncHandler(AuthController.signup));
router.post('/signin', asyncHandler(AuthController.signin));

export default router;