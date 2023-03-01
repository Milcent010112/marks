const studentController = require('../controllers/studentController');
const studentServices = require('../../services/Student');
const { downloadStudentReport } = require('../../services/Report');

const multer = require('multer');
const { limits, setStorage } = require('../../config/multer');

const uploadIssueImage = multer({
    fileSize: limits.fileSize,
    fileFilter: limits.fileFilter('images'),
    storage: setStorage('./public/assets/up/profiles'),
}).single('profile');

const middleware = require('../../middleware');

module.exports = (router) => {
    router.get('/sign-in', studentController.renderSignIn)
    router.get('/s/sign-up', studentController.renderSignUp)
    router.get('/s/goals', middleware.authStudent, studentController.renderGoals)
    router.get('/s/progress', middleware.authStudent, studentController.renderProgress)
    router.get('/s/tests', middleware.authStudent, studentController.renderTests)
    router.get('/s/profile', middleware.authStudent, studentController.renderProfile)
    
    router.post('/students/add', studentController.addStudent(studentServices.addStudent))
    router.post('/student/sign-in', studentController.signIn(studentServices.signIn))
    router.post('/student/:studentId/update', studentController.updateStudent(studentServices.updateStudent))
    router.post('/student/:studentId/delete', studentController.deleteStudent(studentServices.deleteStudent))
    router.post('/student/:studentId/download-report', studentController.downloadReport(downloadStudentReport))
    router.post('/students/fetch', studentController.getStudents(studentServices.getStudents))
    router.post('/students/search/admin', studentController.searchAdminStudents(studentServices.searchAdminStudents))
    router.post('/students/fetch/module/:moduleId', studentController.getModuleStudents(studentServices.getModuleStudents))

    router.post('/students/end-semester', studentController.endSemester(studentServices.endSemester))
    router.post('/students/end-semester', studentController.endSemester(studentServices.endSemester))

    router.get('/s/logout', (req, res) => {
        res.clearCookie('_student');

        res.redirect('/sign-in');
    });

    router.post('/student/change-profile', (req, res) => {
        uploadIssueImage(req, res, (err) => {
            if (err)
                if (err.code == 'LIMIT_FILE_SIZE')
                    req.fileUploadError = 'File size too large! please upload a smaller file';
                else if (err.code == 'FILE_TYPE_NOT_ALLOWED')
                    req.fileUploadError = 'File type not allowed!';

            studentController.changeProfile(studentServices.changeProfile)(req, res)
        })
    });
}