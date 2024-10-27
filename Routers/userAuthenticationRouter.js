import { LoginUser, registrationUser, userGet, userGetById } from "../Controllers/userAuthenticationController.js";
import express from 'express'
import authMiddileware from "../Middleware/auth.middleware.js";


const router = express.Router();


router.post("/register",registrationUser)
router.post("/login",LoginUser)

router.get("/userget",authMiddileware,userGet)
router.get("/usergetbyid",authMiddileware,userGetById)


export default router;