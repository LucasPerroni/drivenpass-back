import { Router } from "express"

import { createSafeNote } from "../controllers/safeNoteController.js"
import validateSchema from "../middlewares/validateSchema.js"
import validateToken from "../middlewares/validateToken.js"
import { safeNoteSchema } from "../schemas/safeNoteSchema.js"

const safeNoteRouter = Router()

safeNoteRouter.post("/safenotes", validateToken, validateSchema(safeNoteSchema), createSafeNote)

export default safeNoteRouter
