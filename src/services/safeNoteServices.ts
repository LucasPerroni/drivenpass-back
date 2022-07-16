import { SafeNotes } from "@prisma/client"

import * as Repository from "../repositories/safenoteRepository.js"
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
