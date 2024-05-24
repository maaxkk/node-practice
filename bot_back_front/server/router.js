import {Router} from "express";
import AdController from "./AdController.js";

const router = new Router();
router.post('/ads', AdController.create)

export default router;