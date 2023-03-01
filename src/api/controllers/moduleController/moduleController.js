class ModuleController {
    constructor (resWrap) {
        this._resWrap = resWrap;
    };

    addModule = (addModule) => (async (req, res) => {
        await this._resWrap(async (response) => {
            await addModule(
                req.body.name,
                req.body.code
            );

            response.successful = true;

            return response;
        }, res);
    });

    deleteModule = (deleteModule) => (async (req, res) => {
        await this._resWrap(async (response) => {
            await deleteModule(req.params.moduleId);

            response.successful = true;

            return response;
        }, res);
    });

    editModule = (editModule) => (async (req, res) => {
        await this._resWrap(async (response) => {
            await editModule(
                req.params.moduleId,
                req.body.name,
                req.body.code
            );

            response.successful = true;

            return response;
        }, res);
    });

    getModules = (getModules) => (async (req, res) => {
        await this._resWrap(async (response) => {
            const modules = await getModules();

            response.modules = modules;

            return response;
        }, res);
    });

    getStudentModules = (getStudentModules) => (async (req, res) => {
        await this._resWrap(async (response) => {
            const modules = await getStudentModules(req.studentDetails.modules);

            response.modules = modules;

            return response;
        }, res);
    });

    getModule = (getModule) => (async (req, res) => {
        await this._resWrap(async (response) => {
            const module = await getModule(req.params.moduleId);

            response.module = module;

            return response;
        }, res);
    });

    searchAdminModules = (searchAdminModules) => (async (req, res) => {
        await this._resWrap(async (response) => {
            const modules = await searchAdminModules(req.query.q);

            response.modules = modules;

            return response;
        }, res);
    });

    getStudentGoalReport = (getStudentGoalReport) => (async (req, res) => {
        await this._resWrap(async (response) => {
            const fileName = await getStudentGoalReport(req.params.moduleId);

            response.reportFile = fileName;

            return response;
        }, res);
    })
};

module.exports = ModuleController;