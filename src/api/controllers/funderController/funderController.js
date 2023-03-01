class ModuleController {
    constructor (resWrap) {
        this._resWrap = resWrap;
    };

    addFunder = (addFunder) => (async (req, res) => {
        await this._resWrap(async (response) => {
            await addFunder(
                req.body.name,
                req.body.email
            );

            response.successful = true;

            return response;
        }, res);
    });

    getAll = (getAll) => (async (req, res) => {
        await this._resWrap(async (response) => {
            const funders = await getAll();

            response.funders = funders;

            return response;
        }, res);
    });

    search = (search) => (async (req, res) => {
        await this._resWrap(async (response) => {
            const funders = await search(req.query.q);

            response.funders = funders;

            return response;
        }, res);
    });

    getFunderDetails = (getFunderDetails) => (async (req, res) => {
        await this._resWrap(async (response) => {
            const funder = await getFunderDetails(req.params.funderId);

            response.funder = funder;

            return response;
        }, res);
    });

    deleteFunder = (deleteFunder) => (async (req, res) => {
        await this._resWrap(async (response) => {
            await deleteFunder(req.params.funderId);

            response.successful = true;

            return response;
        }, res);
    });

    updateFunder = (updateFunder) => (async (req, res) => {
        await this._resWrap(async (response) => {
            await updateFunder(
                req.params.funderId,
                req.body.name,
                req.body.email
            );

            response.successful = true;

            return response;
        }, res);
    });
};

module.exports = ModuleController;