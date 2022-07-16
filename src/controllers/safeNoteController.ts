import { SafeNotes } from "@prisma/client"
import { Request, Response } from "express"

import * as Services from "../services/safeNoteServices.js"

export async function createSafeNote(req: Request, res: Response) {
  const { userId } = res.locals
  const { title, text }: SafeNotes = req.body

  await Services.blockSafeNoteByTitle(title, userId)
  await Services.createNewSafeNote({ title, text, userId })

  res.sendStatus(201)
}
