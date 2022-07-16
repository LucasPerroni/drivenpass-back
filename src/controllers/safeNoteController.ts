import { SafeNotes } from "@prisma/client"
import { Request, Response } from "express"

import * as Services from "../services/safeNoteServices.js"
import * as Repository from "../repositories/safeNoteRepository.js"

export async function createSafeNote(req: Request, res: Response) {
  const { userId } = res.locals
  const { title, text }: SafeNotes = req.body

  await Services.blockSafeNoteByTitle(title, userId)
  await Services.createNewSafeNote({ title, text, userId })

  res.sendStatus(201)
}

export async function getSafeNotes(req: Request, res: Response) {
  const { userId } = res.locals

  const safeNotes = await Services.getSafeNotesByUserId(userId)

  res.status(200).send({ safeNotes })
}

export async function getOneSafeNote(req: Request, res: Response) {
  const { userId } = res.locals
  const { id } = req.params

  const safeNote = await Services.getSafeNoteById(id, userId)

  res.status(200).send(safeNote)
}

export async function deleteSafeNote(req: Request, res: Response) {
  const { userId } = res.locals
  const { id } = req.params

  const safeNote = await Services.getSafeNoteById(id, userId)
  await Repository.deleteSafeNote(Number(id))

  res.sendStatus(200)
}
