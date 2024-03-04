import { Router } from 'express'

import { fetchAllData, fetchById } from './home.controller.js'

const router = Router()

router.get('/', fetchAllData)

router.get('/:id', fetchById)

export default router
