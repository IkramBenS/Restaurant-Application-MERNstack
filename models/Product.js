const mongoose = require( 'mongoose');
const {ObjectId} = mongoose.Schema;

const ProductSchema = new mongoose. Schema({
   /*  filename: it's the image stored in the upload folder */
    fileName: {
        type: 'String',
        required: true
        },
    productName: {
        type: 'String',
        required: true,
        trim: true,
        maxlength: 60
        },
    productDesc: {
        type: 'String',
        trim: true
        },
    productPrice: {
        type: Number,
        required: true
        },
    productCategory: {
        type: ObjectId,
        ref: 'Category',
        required: true
        },
    productQty: {
        type: Number,
        required: true
        }
    }, { timestamps: true }) /* that gives us the tame of creation */

    const Product = mongoose.model( 'Product', ProductSchema);

    module.exports = Product;  



