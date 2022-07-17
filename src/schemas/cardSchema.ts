import joi from "joi"

import { Cards } from "@prisma/client"

export const cardSchema = joi.object<Omit<Cards, "id" | "userId">>({
  title: joi.string().max(50).required(),
  number: joi
    .string()
    .length(16)
    .pattern(/^[0-9]+$/)
    .required(),
  name: joi.string().required(),
  securityCode: joi
    .string()
    .length(3)
    .pattern(/^[0-9]+$/)
    .required(),
  expirationDate: joi
    .string()
    .length(5)
    .pattern(/^[0-9]{2}\/[0-9]{2}$/)
    .required(),
  password: joi.string().required(),
  isVirtual: joi.boolean().required(),
  type: joi.string().valid("credit", "debit", "both").required(),
})
