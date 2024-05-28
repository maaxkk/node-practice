const UserService = require('../service/UserService');
class UserController {
    async loginGET(req, res, next) {
        res.render('login_form');
    }

    async loginPOST(req, res, next) {}

    async registerGET(req, res, next) {
        res.render('register_form');
    }

    async registerPOST(req, res, next) {
        try {
            const { username, email, password } = req.body;
            const user = await UserService.register(username, email, password);
            if (user) {
                res.redirect('/');
            }
        } catch (e) {
            return next(e);
        }
    }

    async becomeMember(req, res, next) {
        res.render('become_member_form');
    }
}

module.exports = new UserController();
