const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category');
const { autenticatateJWT } = require('../middlware/authenticator');

router.post('/', autenticatateJWT, categoryController.create);
router.get('/', autenticatateJWT, categoryController.readAll);
module.exports = router;