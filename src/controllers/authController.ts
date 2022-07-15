import { Request, Response } from "express"
import { Users } from "@prisma/client"
import bcrypt from "bcrypt"
import dotenv from "dotenv"

import { createNewUser } from "../repositories/authRepository.js"
import { checkPassword, createToken, getUserByEmail } from "../services/authServices.js"

export type User = Omit<Users, "id">

dotenv.config()

export async function signUp(req: Request, res: Response) {
  const { name, email, password }: User = req.body
  const cryptPassword = bcrypt.hashSync(password, Number(process.env.BCRYPT_SALT))

  await getUserByEmail(email, true)
  await createNewUser({ name, email, password: cryptPassword })

  res.sendStatus(201)
}

export async function signIn(req: Request, res: Response) {
  const { email, password }: User = req.body

  const user = await getUserByEmail(email)
  checkPassword(user, password)

  const token = createToken(user)
  res.status(200).send({ token })
}
