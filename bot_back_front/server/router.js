import { Router } from 'express';
import AdController from './AdController.js';
import upload from './multer.js';

import { body } from 'express-validator';


const router = new Router();
router.post('/ads',
    upload.fields([
        { name: 'mainImg', maxCount: 1 },
        { name: 'additionalImg', maxCount: 8 },
    ]),
    body('title', 'Title is required and minimum 3 characters')
        .isLength({ min: 3, max: 40 }),
    body('description', 'Description is required and minimum 10 characters')
        .isLength({ min: 10, max: 240 }),
    AdController.create);

export default router;