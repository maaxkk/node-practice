import Ad from './Ad.js';

class AdService {
    async createAd(title, description, mainImg, additionalImg) {
        const newAd = await Ad.create({title, description, mainImg, additionalImg});
        return newAd;
    }
}

export default new AdService();