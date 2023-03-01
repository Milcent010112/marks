class AdminController {
    constructor (resWrap) {
        this._resWrap = resWrap;
    };

    renderSignIn (_req, res) {
        res.render('admin/sign-in', {
            page: {
                title: 'Sign in'
            }
        });
    };

    renderModules (_req, res) {
        res.render('admin/modules', {
            page: {
                title: 'Admin - Modules'
            }
        });
    };

    renderCourses (_req, res) {
        res.render('admin/courses', {
            page: {
                title: 'Admin - courses'
            }
        });
    };

    renderStudents (_req, res) {
        res.render('admin/students', {
            page: {
                title: 'Admin - Students'
            }
        });
    };

    renderLecturers (_req, res) {
        res.render('admin/lecturers', {
            page: {
                title: 'Admin - Lecturers'
            }
        });
    };

    renderSecretaries (_req, res) {
        res.render('admin/secretaries', {
            page: {
                title: 'Admin - Secretaries'
            }
        });
    };

    renderFunders (_req, res) {
        res.render('admin/funders', {
            page: {
                title: 'Admin - Funders'
            }
        });
    };

    renderTests (_req, res) {
        res.render('admin/tests', {
            page: {
                title: 'Admin - Tests'
            }
        });
    };

    renderGrades (_req, res) {
        res.render('admin/grades', {
            page: {
                title: 'Admin - Grades'
            }
        });
    };

    renderGoals (_req, res) {
        res.render('admin/goals', {
            page: {
                title: 'Admin - Goals'
            }
        });
    };

    signIn = (signIn) => (async (req, res) => {
        await this._resWrap(async (response) => {
            const { tokens, redirect } = await signIn({
                email: req.body.email,
                password: req.body.password
            });

            // save admin data into a cookie
            res.cookie('_admin', tokens);

            // repond with a direct and success message
            response.redirect = redirect;
            response.successful = true;

            return response;
        }, res);
    });
};

module.exports = AdminController;