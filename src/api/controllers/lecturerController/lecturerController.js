class LecturerController {
    constructor (resWrap) {
        this._resWrap = resWrap;
    };

    renderSignIn (_req, res) {
        res.render('lecturer/sign-in', {
            page: {
                title: 'Lecturer - sign in'
            }
        });
    };

    renderSignUp (_req, res) {
        res.render('lecturer/sign-up', {
            page: {
                title: 'Lecturer - sign up'
            }
        });
    };

    renderModules (_req, res) {
        res.render('lecturer/modules', {
            page: {
                title: 'Lecturer - Modules'
            }
        });
    };

    renderStudents (_req, res) {
        res.render('lecturer/students', {
            page: {
                title: 'Lecturer - Students'
            }
        });
    };

    renderTestsAndExams (_req, res) {
        res.render('lecturer/tests-exams', {
            page: {
                title: 'Lecturer - Tests and exams'
            }
        });
    };

    renderGrades (_req, res) {
        res.render('lecturer/grades', {
            page: {
                title: 'Lecturer - Grades'
            }
        });
    };

    renderTutorials (_req, res) {
        res.render('lecturer/tutorials', {
            page: {
                title: 'Lecturer - Tutorials'
            }
        });
    };

    addLecturer = (addLecturer) => (async (req, res) => {
        await this._resWrap(async (response) => {
            const { tokens, redirect } = await addLecturer({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                modules: req.body.modules,
                password: req.body.password,
                passwordAgain: req.body.passwordAgain
            });

            // User json web tokens
            res.cookie('_lecturer', tokens);

            response.redirect = redirect;
            response.successful = true;

            return response;
        }, res);
    });

    getModules = async (req, res) => {
        await this._resWrap(async (response) => {
            response.modules = req.lecturerDetails.modules;

            return response;
        }, res);
    };

    searchAdminLecturers = (searchAdminLecturers) => (async (req, res) => {
        await this._resWrap(async (response) => {
            const lecturers = await searchAdminLecturers(req.query.q);

            response.lecturers = lecturers;

            return response;
        }, res);
    });

    getLecturers = (getLecturers) => (async (req, res) => {
        await this._resWrap(async (response) => {
            const lecturers = await getLecturers();

            response.lecturers = lecturers;

            return response;
        }, res);
    });

    deleteLecturer = (deleteLecturer) => (async (req, res) => {
        await this._resWrap(async (response) => {
            await deleteLecturer(req.params.lecturerId);

            response.successful = true;

            return response;
        }, res);
    });

    editLecturer = (editLecturer) => (async (req, res) => {
        await this._resWrap(async (response) => {
            await editLecturer(req.params.lecturerId, {
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email
            });

            response.successful = true;

            return response;
        }, res);
    });

    getLecturer = (getLecturer) => (async (req, res) => {
        await this._resWrap(async (response) => {
            const lecturer = await getLecturer(req.params.lecturerId);

            response.lecturer = lecturer;

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
            res.cookie('_lecturer', tokens);

            response.redirect = redirect;
            response.successful = true;

            return response;
        }, res);
    });
};

module.exports = LecturerController;