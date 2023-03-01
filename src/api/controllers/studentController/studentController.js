class StudentController {
    constructor (resWrap) {
        this._resWrap = resWrap;
    };

    renderSignIn (_req, res) {
        res.render('student/sign-in', {
            page: {
                title: 'Student - Sign in'
            }
        });
    };

    renderSignUp (_req, res) {
        res.render('student/sign-up', {
            page: {
                title: 'Student - Sign up'
            }
        });
    };

    renderTests (_req, res) {
        res.render('student/tests', {
            page: {
                title: 'Student - Tests'
            }
        });
    };

    renderGoals (_req, res) {
        res.render('student/goals', {
            page: {
                title: 'Student - Goals'
            }
        });
    };

    renderProgress (_req, res) {
        res.render('student/progress', {
            page: {
                title: 'Student - Progress'
            }
        });
    };

    renderProfile(_req, res) {
        res.render('student/profile', {
            page: {
                title: 'Student - Profile'
            }
        });
    };

    addStudent = (addStudent) => (async (req, res) => {
        await this._resWrap(async (response) => {
            const { tokens, redirect } = await addStudent({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                studentNumber: req.body.studentNumber,
                email: req.body.email,
                modules: req.body.modules,
                funder: req.body.funder,
                password: req.body.password,
                passwordAgain: req.body.passwordAgain,
            });

            // User json web tokens
            res.cookie('_student', tokens);

            response.redirect = redirect;
            response.successful = true;

            return response;
        }, res);
    });

    updateStudent = (updateStudent) => (async (req, res) => {
        await this._resWrap(async (response) => {
            await updateStudent({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                studentId: req.params.studentId
            });

            response.successful = true;

            return response;
        }, res);
    });

    changeProfile = (updateStudent) => (async (req, res) => {
        await this._resWrap(async (response) => {
            const tokens = await updateStudent(req.studentDetails._id, req.file.filename);

            res.cookie('_student', tokens);

            response.successful = true;

            return response;
        }, res);
    });

    deleteStudent = (deleteStudent) => (async (req, res) => {
        await this._resWrap(async (response) => {
            await deleteStudent(req.params.studentId);

            response.successful = true;

            return response;
        }, res);
    });

    downloadReport = (downloadReport) => (async (req, res) => {
        await this._resWrap(async (response) => {
            const fileName = await downloadReport(req.params.studentId);

            response.reportFile = fileName;

            return response;
        }, res);
    })

    getModuleStudents = (getStudents) => (async (req, res) => {
        await this._resWrap(async (response) => {
            const students = await getStudents(req.params.moduleId);

            response.students = students;

            return response;
        }, res);
    });

    searchAdminStudents = (searchAdminStudents) => (async (req, res) => {
        await this._resWrap(async (response) => {
            const students = await searchAdminStudents(req.query.q);

            response.students = students;

            return response;
        }, res);
    });

    getStudents = (getStudents) => (async (req, res) => {
        await this._resWrap(async (response) => {
            const students = await getStudents();

            response.students = students;

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
            res.cookie('_student', tokens);

            response.redirect = redirect;
            response.successful = true;

            return response;
        }, res);
    });

    searchAdminStudents = (searchAdminStudents) => (async (req, res) => {
        await this._resWrap(async (response) => {
            const students = await searchAdminStudents(req.query.q);

            response.students = students;

            return response;
        }, res);
    });

    endSemester = (endSemester) => (async (req, res) => {
        await this._resWrap(async (response) => {
            await endSemester();

            response.successful = true;

            return response;
        }, res);
    });
};

module.exports = StudentController;