const express = require('express');

const authController = require('../controllers/auth');
const authenticateToken = require('../middlewares/auth');

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/logout', authenticateToken, authController.logout);
router.get('/profile', authenticateToken, authController.getProfile);
router.patch('/profile', authenticateToken, authController.updateProfile);
router.delete('/profile', authenticateToken, authController.deleteProfile);

router.get('/csrf-token', authController.createCsrfToken);

module.exports = router;

