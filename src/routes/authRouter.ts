import { Router } from "express"

import { signUp } from "../controllers/authController.js"
import validateSchema from "../middlewares/validateSchema.js"
import { signupSchema } from "../schemas/signupSchema.js"

const authRouter = Router()

authRouter.post("/signup", validateSchema(signupSchema), signUp)

export default authRouter
