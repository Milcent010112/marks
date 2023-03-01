class TestController {
    constructor (resWrap) {
        this._resWrap = resWrap;
    };

    addTest = (addTest) => (async (req, res) => {
        await this._resWrap(async (response) => {
            await addTest({
                name: req.body.name,
                module: req.body.module,
                lecturer: req.lecturerDetails._id
            });

            response.successful = true;

            return response;
        }, res);
    });

    getTest = (getTest) => (async (req, res) => {
        await this._resWrap(async (response) => {
            const test = await getTest(req.params.testId);

            response.test = test;

            return response;
        }, res);
    });

    getLecturerTests = (getLecturerTests) => (async (req, res) => {
        await this._resWrap(async (response) => {
            const tests = await getLecturerTests(req.lecturerDetails.modules, req.lecturerDetails._id);

            response.tests = tests;

            return response;
        }, res);
    });

    getModuleTests = (getModuleTests) => (async (req, res) => {
        await this._resWrap(async (response) => {
            const tests = await getModuleTests(req.body.moduleId);

            response.tests = tests;

            return response;
        }, res);
    });

    getStudentTests = (getStudentTests) => (async (req, res) => {
        await this._resWrap(async (response) => {
            const { tests, grades } = await getStudentTests(req.studentDetails._id, req.studentDetails.modules);

            response.tests = tests;
            response.grades = grades;

            return response;
        }, res);
    });

    getSecretaryTests = (getSecretaryTests) => (async (req, res) => {
        await this._resWrap(async (response) => {
            const tests = await getSecretaryTests();

            response.tests = tests;

            return response;
        }, res);
    });

    searchAdminTests = (searchAdminTests) => (async (req, res) => {
        await this._resWrap(async (response) => {
            const tests = await searchAdminTests(req.query.q);

            response.tests = tests;

            return response;
        }, res);
    });

    searchLecturerTests = (searchLecturerTests) => (async (req, res) => {
        await this._resWrap(async (response) => {
            const tests = await searchLecturerTests(req.query.q, req.lecturerDetails._id);

            response.tests = tests;

            return response;
        }, res);
    });

    searchStudentTests = (searchStudentTests) => (async (req, res) => {
        await this._resWrap(async (response) => {
            const { tests, grades } = await searchStudentTests(req.query.q, req.studentDetails._id, req.studentDetails.modules);

            response.tests = tests;
            response.grades = grades;

            return response;
        }, res);
    });

    getAll = (getAll) => (async (req, res) => {
        await this._resWrap(async (response) => {
            const tests = await getAll();

            response.tests = tests;

            return response;
        }, res);
    });

    requestDeletion = (requestDeletion) => (async (req, res) => {
        await this._resWrap(async (response) => {
            await requestDeletion(req.params.testId);

            response.successful = true;

            return response;
        }, res);
    });

    deleteTest = (deleteTest) => (async (req, res) => {
        await this._resWrap(async (response) => {
            await deleteTest(req.params.testId);

            response.successful = true;

            return response;
        }, res);
    });

    // requestPublish = (requestPublish) => (async (req, res) => {
    //     await this._resWrap(async (response) => {
    //         await requestPublish(req.params.testId);

    //         response.successful = true;

    //         return response;
    //     }, res);
    // });

    publishTest = (publishTest) => (async (req, res) => {
        await this._resWrap(async (response) => {
            await publishTest(req.params.testId);

            response.successful = true;

            return response;
        }, res);
    });
};

module.exports = TestController;