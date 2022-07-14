import joi from "joi"

import { Users } from "@prisma/client"

export type User = Omit<Users, "id">

export const signupSchema = joi.object<User>({
  name: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().min(10).required(),
})
