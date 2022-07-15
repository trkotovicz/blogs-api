const { Router } = require('express');

const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

const router = Router();

router.post('/', userController.create);
router.get('/', authController.validateToken, userController.list);

module.exports = router;