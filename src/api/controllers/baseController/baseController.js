class BaseController {
    constructor (resWrap) {
        this._resWrap = resWrap;
    };

    renderSignIn (_req, res) {
        res.render('sign-in', {
            page: {
                title: 'Sign in'
            }
        });
    };

    renderSignUp (_req, res) {
        res.render('sign-up', {
            page: {
                title: 'Sign up'
            }
        });
    };
};

module.exports = BaseController;