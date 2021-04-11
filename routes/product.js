const express = require('express');
const router = express.Router();
const { autenticatateJWT } = require('../middlware/authenticator');
const upload = require('../middlware/multer');
const productController = require('../controllers/product');

router.post(
	'/',
	autenticatateJWT,
	upload.single('productImage'),
	productController.create
);

router.get(
	'/',
	productController.readAll
);

module.exports = router;