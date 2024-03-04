import { Router } from 'express'

import { getLoginData, getLoginById } from './login.controller.js'

const router = Router()

router.post('/', getLoginData)

export default router
