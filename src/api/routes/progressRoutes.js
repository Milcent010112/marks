const progressController = require('../controllers/progressController');
const progressServices = require('../../services/Progress');

module.exports = (router) => {
    router.post('/progress/fetch', progressController.getProgress(progressServices.getProgress))
    router.post('/progress/download-report', progressController.downloadReport(progressServices.downloadReport))
}