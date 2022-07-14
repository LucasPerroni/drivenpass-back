import * as Error from "../middlewares/errorHandler.js"
import { findUserByEmail } from "../repositories/authRepository.js"

export async function getUserByEmail(email: string, blockExistentUser: boolean = false) {
  const user = await findUserByEmail(email)
  if (blockExistentUser && user) {
    Error.errorConflict("This email is already in use")
  }

  return user
}
