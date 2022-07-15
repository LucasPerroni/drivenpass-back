import joi from "joi"

import { User } from "../controllers/authController.js"

export const signinSchema = joi.object<Omit<User, "name">>({
  email: joi.string().email().required(),
  password: joi.string().min(10).required(),
})
