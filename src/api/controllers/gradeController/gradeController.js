class CourseController {
    constructor (resWrap) {
        this._resWrap = resWrap;
    };

    addGrade = (addTest) => (async (req, res) => {
        await this._resWrap(async (response) => {
            await addTest({
                lecturer: req.lecturerDetails._id,
                studentNumber: req.body.studentNumber,
                testGrade: req.body.testGrade,
                testId: req.body.testId
            });

            response.successful = true;

            return response;
        }, res);
    });

    getStudentsGrades = (getStudentsGrades) => (async (req, res) => {
        await this._resWrap(async (response) => {
            const grades = await getStudentsGrades(req.lecturerDetails._id);

            response.grades = grades;

            return response;
        }, res);
    });

    getSecretaryGrades = (getSecretaryGrades) => (async (req, res) => {
        await this._resWrap(async (response) => {
            const grades = await getSecretaryGrades();

            response.grades = grades;

            return response;
        }, res);
    });

    searchAdminGrades = (searchAdminGrades) => (async (req, res) => {
        await this._resWrap(async (response) => {
            const { grades, moduleCodes } = await searchAdminGrades(req.query.q);

            response.grades = grades;
            response.moduleCodes = moduleCodes;

            return response;
        }, res);
    });

    searchLecturerGrades = (searchLecturerGrades) => (async (req, res) => {
        await this._resWrap(async (response) => {
            const grades = await searchLecturerGrades(req.query.q, req.lecturerDetails._id);

            response.grades = grades;

            return response;
        }, res);
    });

    getAll = (getAll) => (async (req, res) => {
        await this._resWrap(async (response) => {
            const {grades, moduleCodes} = await getAll();

            response.grades = grades;
            response.moduleCodes = moduleCodes;

            return response;
        }, res);
    });

    getGrades = (getGrades) => (async (req, res) => {
        await this._resWrap(async (response) => {
            const grades = await getGrades(req.studentDetails._id);

            response.grades = grades;

            return response;
        }, res);
    });

    requestDeletion = (requestDeletion) => (async (req, res) => {
        await this._resWrap(async (response) => {
            await requestDeletion(req.params.gradeId);

            response.successful = true;

            return response;
        }, res);
    });

    editGrade = (editGrade) => (async (req, res) => {
        await this._resWrap(async (response) => {
            await editGrade(req.params.gradeId, req.body.grade);

            response.successful = true;

            return response;
        }, res);
    });

    deleteGrade = (deleteGrade) => (async (req, res) => {
        await this._resWrap(async (response) => {
            await deleteGrade(req.params.gradeId);

            response.successful = true;

            return response;
        }, res);
    });

    publishGrade = (publishGrade) => (async (req, res) => {
        await this._resWrap(async (response) => {
            await publishGrade(req.params.gradeId);

            response.successful = true;

            return response;
        }, res);
    });
};

module.exports = CourseController;