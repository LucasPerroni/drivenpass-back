import joi from "joi"

import { User } from "../controllers/authController.js"

export const signupSchema = joi.object<User>({
  name: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().min(10).required(),
})
