import { AuthService } from '../services/authService/authService'
const router = require('express').Router()

const authRoutes: AuthService = new AuthService()

//Auth routes
router.get('/', authRoutes.getUser)
router.post('/register', authRoutes.register)
router.post('/login', authRoutes.login)
router.post('/validToken', authRoutes.validToken)

module.exports = router
