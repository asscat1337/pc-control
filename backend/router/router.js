const {Router} = require('express');
const router = Router();

const controller = require('../controller/controller')


router.get('/getAll',controller.subject)
router.post('/addSubject',controller.addSubject)
router.post('/updateSubject',controller.updateSubject)
router.delete('/deleteSubject',controller.deleteSubject)




module.exports = router