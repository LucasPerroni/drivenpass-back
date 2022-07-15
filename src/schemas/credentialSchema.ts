import joi from "joi"
import { Credentials } from "@prisma/client"

export type CredentialSchema = Omit<Credentials, "id" | "userId">

export const credentialSchema = joi.object<CredentialSchema>({
  title: joi.string().required(),
  url: joi.string().uri().required(),
  username: joi.string().required(),
  password: joi.string().required(),
})
