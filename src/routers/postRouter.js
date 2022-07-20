const { Router } = require('express');

const authController = require('../controllers/authController');
const postController = require('../controllers/postController');

const router = Router();

router.post('/', authController.validateToken, postController.create);
router.get('/', authController.validateToken, postController.list);

module.exports = router;