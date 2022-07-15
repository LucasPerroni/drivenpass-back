import { Users } from "@prisma/client"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

import * as Error from "../middlewares/errorHandler.js"
import { findUserByEmail } from "../repositories/authRepository.js"

export async function getUserByEmail(email: string, blockExistentUser: boolean = false) {
  const user = await findUserByEmail(email)

  if (blockExistentUser && user) {
    Error.errorConflict("This email is already in use")
  } else if (!blockExistentUser && !user) {
    Error.errorNotFound("There is no user with this email")
  }

  return user
}

export function checkPassword(user: Users, password: string) {
  if (!bcrypt.compareSync(password, user.password)) {
    Error.errorForbidden("Wrong password")
  }
}

export function createToken(user: Users) {
  const data = { userId: user.id }
  const key = process.env.JWT_KEY
  const config = { expiresIn: 60 * 60 } // 60 minutes

  const token = jwt.sign(data, key, config)
  return token
}
