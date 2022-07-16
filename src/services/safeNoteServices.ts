import { SafeNotes } from "@prisma/client"

import * as Repository from "../repositories/safeNoteRepository.js"
import * as Error from "../middlewares/errorHandler.js"

export async function blockSafeNoteByTitle(title: string, id: number) {
  const safeNote = await Repository.findSafeNoteByTitle(title, id)
  if (safeNote) {
    Error.errorConflict("You already have a safe note with this title")
  }
}

export async function createNewSafeNote(data: Omit<SafeNotes, "id">) {
  await Repository.createSafeNote(data)
}

export async function getSafeNotesByUserId(userId: number) {
  const safeNotes = await Repository.findSafeNoteByUserId(userId)

  safeNotes.forEach((n) => delete n.userId)

  return safeNotes
}

export async function getSafeNoteById(id: string, userId: number) {
  if (!Number(id)) {
    Error.errorUnprocessable("Id must be a number")
  }

  const safeNote = await Repository.findSafeNoteById(Number(id))

  if (!safeNote) {
    Error.errorNotFound("Couldn't find a safe note with that id")
  } else if (safeNote.userId !== userId) {
    Error.errorForbidden("This safe note belongs to another user")
  }

  delete safeNote.userId
  return safeNote
}
