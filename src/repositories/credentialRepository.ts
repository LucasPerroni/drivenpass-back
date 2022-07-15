import { Credentials } from "@prisma/client"
import { prisma } from "../config/database.js"

export async function findCredentialByTitle(title: string, userId: number) {
  const credential = await prisma.credentials.findUnique({ where: { userId_title: { title, userId } } })
  return credential
}

export async function createCredential(data: Omit<Credentials, "id">) {
  await prisma.credentials.create({ data })
}
