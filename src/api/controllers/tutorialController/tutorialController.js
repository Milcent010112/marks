class TutorialController {
    constructor (resWrap) {
        this._resWrap = resWrap;
    };

    addTutorial = (addTutorial) => (async (req, res) => {
        await this._resWrap(async (response) => {
            await addTutorial({
                link: req.body.link,
                description: req.body.description,
                module: req.body.module,
                lecturer: req.lecturerDetails._id
            });

            response.successful = true;

            return response;
        }, res);
    });

    deleteTutorial = (deleteTutorial) => (async (req, res) => {
        await this._resWrap(async (response) => {
            await deleteTutorial(req.params.tutorialId);

            response.successful = true;

            return response;
        }, res);
    });

    getLecturerTutorials = (getLecturerTutorials) => (async (req, res) => {
        await this._resWrap(async (response) => {
            const tutorials = await getLecturerTutorials(req.lecturerDetails._id);

            response.tutorials = tutorials;

            return response;
        }, res);
    });

    getStudentTutorials = (getStudentTutorials) => (async (req, res) => {
        await this._resWrap(async (response) => {
            const tutorials = await getStudentTutorials(req.studentDetails.modules);

            response.tutorials = tutorials;

            return response;
        }, res);
    });

    searchLecturerTutorials = (searchLecturerTutorials) => (async (req, res) => {
        await this._resWrap(async (response) => {
            const tutorials = await searchLecturerTutorials(req.query.q, req.lecturerDetails._id);

            response.tutorials = tutorials;

            return response;
        }, res);
    });
};

module.exports = TutorialController;