const express = require('express');

const postController = require('../controllers/post');
const authenticateToken = require('../middlewares/auth');
const associationController = require('../controllers/association');

const router = express.Router();

// Posts
router.get('/', postController.getAll);
router.get('/:postId', postController.getOne);
router.post('/', authenticateToken, postController.create);
router.patch('/:postId', authenticateToken, postController.updateOne);
router.delete('/:postId', authenticateToken, postController.deleteOne);

// ======================================================================================

// Association add or remove Category
router.patch('/:postId/category/:categoryId', authenticateToken, associationController.addCategory);
router.delete('/:postId/category/:categoryId', authenticateToken, associationController.removeCategory);

// Association add or Remove Favorite
router.patch('/:postId/favorite/add', authenticateToken, associationController.addFavorite);
router.patch('/:postId/favorite/remove', authenticateToken, associationController.removeFavorite);

// Association add or Remove Like
router.patch('/:postId/like/add', authenticateToken, associationController.addLike);
router.patch('/:postId/like/remove', authenticateToken, associationController.removeLike);

module.exports = router;