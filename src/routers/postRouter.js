const { Router } = require('express');

const authController = require('../controllers/authController');
const postController = require('../controllers/postController');

const router = Router();

router.post('/', authController.validateToken, postController.create);
router.get('/', authController.validateToken, postController.list);
router.get('/:id', authController.validateToken, postController.getById);
router.delete('/:id', authController.validateToken, postController.remove);
router.put('/:id', authController.validateToken, postController.update);

module.exports = router;