import { prisma } from "../config/database.js"
import { User } from "../schemas/signupSchema.js"

export async function findUserByEmail(email: string) {
  const user = await prisma.users.findUnique({ where: { email } })
  return user
}

export async function createNewUser(data: User) {
  await prisma.users.create({ data })
}
