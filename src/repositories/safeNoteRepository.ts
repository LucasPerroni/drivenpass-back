import { SafeNotes } from "@prisma/client"
import { prisma } from "../config/database.js"

export async function findSafeNoteByTitle(title: string, userId: number) {
  const safeNote = await prisma.safeNotes.findUnique({ where: { userId_title: { title, userId } } })
  return safeNote
}

export async function findSafeNoteByUserId(userId: number) {
  const safeNotes = await prisma.safeNotes.findMany({ where: { userId } })
  return safeNotes
}

export async function findSafeNoteById(id: number) {
  const safeNote = await prisma.safeNotes.findUnique({ where: { id } })
  return safeNote
}

export async function createSafeNote(data: Omit<SafeNotes, "id">) {
  await prisma.safeNotes.create({ data })
}

export async function deleteSafeNote(id: number) {
  await prisma.safeNotes.delete({ where: { id } })
}
