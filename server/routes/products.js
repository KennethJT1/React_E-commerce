import express from "express";
import formidable from "express-formidable";
import { create,list,read,photo, remove,update } from '../controller/product.js';

const router = express.Router();

//middleware
import { auth, adminAuth } from '../middlewares/auth.js'


router.post('/product', auth, adminAuth,formidable(), create);
router.get('/products', list);
router.get('/product/:slug', read);
// to get product with photo
router.get('/product/photo/:productId', photo);
router.delete('/product/:productId',auth, adminAuth, remove);
router.put('/product/:productId',auth, adminAuth,formidable(), update);


export default router;

