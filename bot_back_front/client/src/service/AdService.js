import $api from '../http/httpIndex.js';

class AdService {
    static async create(formData) {
        return $api.post('/ads', formData)
    }
}

export default AdService;