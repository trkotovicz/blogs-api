const { Router } = require('express');

const authController = require('../controllers/authController');
const categoryController = require('../controllers/categoryController');

const router = Router();

router.post('/', authController.validateToken, categoryController.create);
router.get('/', authController.validateToken, categoryController.list);

module.exports = router;