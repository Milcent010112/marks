const goalController = require('../controllers/goalController');
const goalServices = require('../../services/Goal');

module.exports = (router) => {
    router.post('/goals/add', goalController.addGoal(goalServices.addGoal))
    router.post('/goals/fetch', goalController.getGoals(goalServices.getGoals))
    router.post('/goals/fetch/all', goalController.getAll(goalServices.getAll))
    router.post('/goals/search/admin', goalController.searchAdminGoals(goalServices.searchAdminGoals))
    router.post('/goal/:goalId/delete', goalController.deleteGoal(goalServices.deleteGoal))
}