import cloudinary from './cloudinary.js';
import AdService from './AdService.js';
import { validationResult } from 'express-validator';

class AdController {
    async create(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw new Error('Please provide title and description')
            }
            const {title, description} = req.body;
            const resultMain = await cloudinary.uploader.upload(req.files['mainImg'][0].path, {
                folder: 'products',
            })
            let resultAdditional = [];
            // for (const image of req.files['additionalImg']) {
            //     const uploadedImage = await cloudinary.uploader.upload(image.path, {
            //         folder: 'products',
            //     })
            //     resultAdditional.push(uploadedImage.secure_url);
            // }
            const post = await AdService.createAd(title, description, resultMain.secure_url, resultAdditional);
            res.json(post)
        } catch (e) {
            next(e)
        }
    }
}

export default new AdController();