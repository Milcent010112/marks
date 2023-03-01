class SecretaryController {
    constructor (resWrap) {
        this._resWrap = resWrap;
    };

    renderSignIn (_req, res) {
        res.render('secretary/sign-in', {
            page: {
                title: 'Sign in'
            }
        });
    };

    renderTests (_req, res) {
        res.render('secretary/tests', {
            page: {
                title: 'Secretary - Tests'
            }
        });
    };

    renderGrades (_req, res) {
        res.render('secretary/grades', {
            page: {
                title: 'Secretary - Grades'
            }
        });
    };

    addSecretary = (addSecretary) => (async (req, res) => {
        await this._resWrap(async (response) => {
            await addSecretary({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
            });

            response.successful = true;

            return response;
        }, res);
    });

    getSecretaries = (getSecretaries) => (async (req, res) => {
        await this._resWrap(async (response) => {
            const secretaries = await getSecretaries();

            response.secretaries = secretaries;

            return response;
        }, res);
    });

    searchAdminSecretaries = (searchAdminSecretaries) => (async (req, res) => {
        await this._resWrap(async (response) => {
            const secretaries = await searchAdminSecretaries(req.query.q);

            response.secretaries = secretaries;

            return response;
        }, res);
    });

    signIn = (signIn) => (async (req, res) => {
        await this._resWrap(async (response) => {
            const { tokens, redirect } = await signIn({
                email: req.body.email,
                password: req.body.password
            });

            // User json web tokens
            res.cookie('_secretary', tokens);

            response.redirect = redirect;
            response.successful = true;

            return response;
        }, res);
    });
};

module.exports = SecretaryController;