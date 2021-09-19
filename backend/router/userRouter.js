const {Router} = require('express');
const router = Router();
const passport = require('../password/password')
const userController = require('../controller/userController');

router.post('/login',userController.login)
router.post('/register',userController.register)
router.get('/profile',passport.authenticate('jwt',{session:false}),userController.profile)

module.exports = router