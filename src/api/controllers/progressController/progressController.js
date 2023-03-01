module.exports = class ModuleController {
    constructor (resWrap) {
        this._resWrap = resWrap;
    };

    getProgress = (getProgress) => (async (req, res) => {
        await this._resWrap(async (response) => {
            const progress = await getProgress(req.studentDetails.modules, req.studentDetails._id);

            response.progress = progress;

            return response;
        }, res);
    });

    downloadReport = (downloadReport) => (async (req, res) => {
        await this._resWrap(async (response) => {
            const fileName = await downloadReport(req.studentDetails.modules, req.studentDetails._id);

            response.progressFile = fileName;

            return response;
        }, res);
    })
};