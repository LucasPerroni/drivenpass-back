import { Request, Response } from "express"

import { CredentialSchema } from "../schemas/credentialSchema.js"
import * as Services from "../services/credentialServices.js"
import * as Repository from "../repositories/credentialRepository.js"

export async function createCredential(req: Request, res: Response) {
  const { userId } = res.locals
  const { title, password, url, username }: CredentialSchema = req.body

  await Services.blockCredentialByTitle(title, userId)
  await Services.createNewCredential({ title, password, url, username, userId })

  res.sendStatus(201)
}

export async function getCredentials(req: Request, res: Response) {
  const { userId } = res.locals

  const credentials = await Services.getCredentialsByUserId(userId)

  res.status(200).send({ credentials })
}

export async function getOneCredential(req: Request, res: Response) {
  const { userId } = res.locals
  const { id } = req.params

  const credential = await Services.getCredentialsById(id, userId)

  res.status(200).send(credential)
}

export async function deleteCredential(req: Request, res: Response) {
  const { userId } = res.locals
  const { id } = req.params

  const credential = await Services.getCredentialsById(id, userId)
  await Repository.deleteCredential(Number(id))

  res.sendStatus(200)
}
