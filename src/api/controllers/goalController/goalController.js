class ModuleController {
    constructor (resWrap) {
        this._resWrap = resWrap;
    };

    addGoal = (addGoal) => (async (req, res) => {
        await this._resWrap(async (response) => {
            await addGoal({
                studentId: req.studentDetails._id,
                studentNumber: req.studentDetails.studentNumber,
                moduleId: req.body.moduleId,
                goal: req.body.goal
            });

            response.successful = true;

            return response;
        }, res);
    });

    getAll = (getAll) => (async (req, res) => {
        await this._resWrap(async (response) => {
            const goals = await getAll();

            response.goals = goals;

            return response;
        }, res);
    });

    getGoals = (getGoals) => (async (req, res) => {
        await this._resWrap(async (response) => {
            const goals = await getGoals(req.studentDetails._id);

            response.goals = goals;

            return response;
        }, res);
    });

    searchAdminGoals = (searchAdminGoals) => (async (req, res) => {
        await this._resWrap(async (response) => {
            const goals = await searchAdminGoals(req.query.q);

            response.goals = goals;

            return response;
        }, res);
    });

    deleteGoal = (deleteGoal) => (async (req, res) => {
        await this._resWrap(async (response) => {
            await deleteGoal(req.params.goalId);

            response.successful = true;

            return response;
        }, res);
    });
};

module.exports = ModuleController;