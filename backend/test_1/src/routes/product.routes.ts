import express, { type Router } from 'express'
import productController from '../controllers/product.controller.js';

const productRouter: Router = express.Router();

productRouter
    .get('/product/:id', productController.getProduct)
    .post('/product/:id', productController.addProduct)
    .patch('/product/:id', productController.updateProduct)
    .delete('/product/:id', productController.deleteProductField)


export default productRouter;
