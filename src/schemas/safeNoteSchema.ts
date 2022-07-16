import joi from "joi"

import { SafeNotes } from "@prisma/client"

export const safeNoteSchema = joi.object<Omit<SafeNotes, "id" | "userId">>({
  title: joi.string().max(50).required(),
  text: joi.string().max(1000).required(),
})
