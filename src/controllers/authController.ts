import { Request, Response } from "express"
import bcrypt from "bcrypt"
import dotenv from "dotenv"

import { createNewUser } from "../repositories/authRepository.js"
import { User } from "../schemas/signupSchema.js"
import { getUserByEmail } from "../services/authServices.js"

dotenv.config()

export async function signUp(req: Request, res: Response) {
  const { name, email, password }: User = req.body
  const cryptPassword = bcrypt.hashSync(password, Number(process.env.BCRYPT_SALT))

  await getUserByEmail(email, true)
  await createNewUser({ name, email, password: cryptPassword })

  res.sendStatus(201)
}
