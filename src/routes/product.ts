import { listProducts, getProduct, createProduct, updateProduct, deleteProduct } from "../service/product-service";
const express = require('express')
const router = express.Router()

router.get("/products", listProducts);

router.get("/products/:id", getProduct);

router.post("/products", createProduct);

router.put("/products/:id", updateProduct);

router.patch("/products/:id", updateProduct);

router.delete("/products/:id", deleteProduct);

export default router;
