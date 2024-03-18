import { Router } from "express";
import * as MessageController from './message.controller.js';
const router = Router();


router.get('/', MessageController.getMessages);
export default router;