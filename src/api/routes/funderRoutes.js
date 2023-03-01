const funderController = require('../controllers/funderController');
const funderServices = require('../../services/Funder');

module.exports = (router) => {
    router.post('/funders/add', funderController.addFunder(funderServices.addFunder))
    router.post('/funders/fetch/all', funderController.getAll(funderServices.getAll))
    router.post('/funders/search', funderController.search(funderServices.search))
    router.post('/funder/:funderId/fetch', funderController.getFunderDetails(funderServices.getFunderDetails))
    router.post('/funder/:funderId/delete', funderController.deleteFunder(funderServices.deleteFunder))
    router.post('/funder/:funderId/update', funderController.updateFunder(funderServices.updateFunder))
}