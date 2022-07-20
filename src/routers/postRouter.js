const { Router } = require('express');

const authController = require('../controllers/authController');
const postController = require('../controllers/postController');

const router = Router();

router.post('/', authController.validateToken, postController.create);
router.get('/', authController.validateToken, postController.list);
router.get('/:id', authController.validateToken, postController.getById);

module.exports = router;