const tutorialController = require('../controllers/tutorialController');
const tutorialServices = require('../../services/Tutorial');

module.exports = (router) => {
    router.post('/tutorials/add', tutorialController.addTutorial(tutorialServices.addTutorial))
    router.post('/tutorial/:tutorialId/delete', tutorialController.deleteTutorial(tutorialServices.deleteTutorial))
    router.post('/tutorials/fetch/lecturer', tutorialController.getLecturerTutorials(tutorialServices.getLecturerTutorials))
    router.post('/tutorials/fetch/student', tutorialController.getStudentTutorials(tutorialServices.getStudentTutorials))
    router.post('/tutorials/search/lecturer', tutorialController.searchLecturerTutorials(tutorialServices.searchLecturerTutorials))
}