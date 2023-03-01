const baseController = require('../controllers/baseController');

module.exports = (router) => {
    router.get('/sign-in', baseController.renderSignIn);
    router.get('/sign-up', baseController.renderSignUp);

    router.get('/', (req, res) => {
        res.render('home', {
            page: {
                title: 'Home'
            }
        });
    });
}