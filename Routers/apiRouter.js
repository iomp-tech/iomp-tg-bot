import { Router } from 'express'
import { body } from 'express-validator';

import roleMiddleware from '../Middlewares/roleMiddleware.js'

import UserController from '../Controllers/UserController.js'
import TimetableController from '../Controllers/TimetableController.js'
import CourseController from '../Controllers/CourseController.js'
import HeaderController from '../Controllers/HeaderController.js'
import FooterPolicyController from '../Controllers/FooterPolicyController.js'

const router = new Router()

// Users
router.post('/register', body('email').isEmail(), body('password').isLength({ min: 2, max: 32 }), UserController.register)
router.post('/login', body('email').isEmail(), body('password').isLength({ min: 2, max: 32 }), UserController.login)
router.post('/logout', UserController.logout)
router.get('/refresh', UserController.refresh)

// Timetable
router.get("/timetable", TimetableController.getAll)
router.get("/timetable/:id", TimetableController.getById)

router.post("/timetable", roleMiddleware(['MAIN_ADMIN']), TimetableController.create)
router.post("/timetable/:id", roleMiddleware(['MAIN_ADMIN']), TimetableController.update)

router.delete("/timetable/:id", roleMiddleware(['MAIN_ADMIN']), TimetableController.delete)

// Courses
router.get("/courses", CourseController.getAll)
router.get("/courses/:id", CourseController.getById)

router.post("/courses", roleMiddleware(['MAIN_ADMIN']), CourseController.create)
router.post("/courses/:id", roleMiddleware(['MAIN_ADMIN']), CourseController.update)

router.delete("/courses/:id", roleMiddleware(['MAIN_ADMIN']), CourseController.delete)

// Header
router.get("/header", HeaderController.getAll)
router.get("/header/:id", HeaderController.getById)

router.post("/header", roleMiddleware(['MAIN_ADMIN']), HeaderController.create)
router.post("/header/:id", roleMiddleware(['MAIN_ADMIN']), HeaderController.update)

router.delete("/header/:id", roleMiddleware(['MAIN_ADMIN']), HeaderController.delete)

// footer
router.get("/footer", FooterPolicyController.getAll)
router.get("/footer/:id", FooterPolicyController.getById)

router.post("/footer", roleMiddleware(['MAIN_ADMIN']), FooterPolicyController.create)
router.post("/footer/:id", roleMiddleware(['MAIN_ADMIN']), FooterPolicyController.update)

router.delete("/footer/:id", roleMiddleware(['MAIN_ADMIN']), FooterPolicyController.delete)

export default router