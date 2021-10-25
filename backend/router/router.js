const {Router} = require('express');
const router = Router();

const controller = require('../controller/controller')
const passport = require('../password/password')

router.get('/getAll',passport.authenticate('jwt',{session:false}),controller.subject)
router.post('/addSubject',controller.addSubject)
router.post('/updateSubject',controller.updateSubject)
router.delete('/deleteSubject',controller.deleteSubject)
router.get('/showService',controller.showService)
router.get('/showDep',controller.showDepartment)
router.get('/showDepartment',controller.showEditDepartment)
router.post('/addHistoryMoving',controller.addHistoryMoving)
router.get('/showHistory/:id',controller.showHistory)
router.get('/showComments/:id',controller.showComment)
router.post('/addComment',controller.addComment)




module.exports = router