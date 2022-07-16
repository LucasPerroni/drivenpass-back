import { Router } from "express"

import {
  createSafeNote,
  deleteSafeNote,
  getOneSafeNote,
  getSafeNotes,
} from "../controllers/safeNoteController.js"
import validateSchema from "../middlewares/validateSchema.js"
import validateToken from "../middlewares/validateToken.js"
import { safeNoteSchema } from "../schemas/safeNoteSchema.js"

const safeNoteRouter = Router()

safeNoteRouter.post("/safenotes", validateToken, validateSchema(safeNoteSchema), createSafeNote)
safeNoteRouter.get("/safenotes", validateToken, getSafeNotes)
safeNoteRouter.get("/safenotes/:id", validateToken, getOneSafeNote)
safeNoteRouter.delete("/safenotes/:id", validateToken, deleteSafeNote)

export default safeNoteRouter
