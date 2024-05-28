const User = require('../models/user');

class UserService {
    async register(username, email, password) {
        try {
            const user = new User({
                username: username,
                email: email,
                password: password,
            });
            return await user.save();
        } catch (e) {
            throw new Error(e);
        }
    }
}

module.exports = new UserService();
