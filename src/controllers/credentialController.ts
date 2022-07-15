import { Request, Response } from "express"

import { CredentialSchema } from "../schemas/credentialSchema.js"
import { blockCredentialByTitle, createNewCredential } from "../services/credentialServices.js"

export async function createCredential(req: Request, res: Response) {
  const { userId } = res.locals
  const { title, password, url, username }: CredentialSchema = req.body

  await blockCredentialByTitle(title, userId)
  await createNewCredential({ title, password, url, username, userId })

  res.sendStatus(201)
}
