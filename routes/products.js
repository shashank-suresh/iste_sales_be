import express from 'express'

import {getProducts, createProduct, getProductsByTags} from '../controllers/products.js'
import auth from '../middleware/auth.js'

const router = express.Router()

router.get('/', getProducts)
router.post('/', auth, createProduct)
router.get('/tags', getProductsByTags)

export default router