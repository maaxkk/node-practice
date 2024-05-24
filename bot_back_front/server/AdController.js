import Ad from "./Ad.js";

class AdController {
    async create(req, res) {
        try {
            const {imgSrc, description} = req.body;
            const post = await Ad.create({imgSrc, description})
            res.json(post)
        } catch (e) {
            res.status(500).json(e)
        }
    }
}

export default new AdController();