import { Credentials } from "@prisma/client"
import Cryptr from "cryptr"
import dotenv from "dotenv"

import * as credentialRepository from "../repositories/credentialRepository.js"
import * as Error from "../middlewares/errorHandler.js"

dotenv.config()

export async function blockCredentialByTitle(title: string, id: number) {
  const credential = await credentialRepository.findCredentialByTitle(title, id)
  if (credential) {
    Error.errorConflict("You already have a credential with this title")
  }
}

export async function createNewCredential(data: Omit<Credentials, "id">) {
  const cryptr = new Cryptr(process.env.CRYPTR_KEY)
  data.password = cryptr.encrypt(data.password)

  await credentialRepository.createCredential(data)
}

export async function getCredentialsByUserId(userId: number) {
  const cryptr = new Cryptr(process.env.CRYPTR_KEY)
  const credentials = await credentialRepository.findCredentialByUserId(userId)

  credentials.forEach((c) => {
    delete c.userId
    c.password = cryptr.decrypt(c.password)
  })

  return credentials
}

export async function getCredentialsById(id: string, userId: number) {
  const cryptr = new Cryptr(process.env.CRYPTR_KEY)

  if (!Number(id)) {
    Error.errorUnprocessable("Id must be a number")
  }

  const credential = await credentialRepository.findCredentialById(Number(id))

  if (!credential) {
    Error.errorNotFound("Couldn't find a credential with that id")
  } else if (credential.userId !== userId) {
    Error.errorForbidden("This credential belongs to another user")
  }

  delete credential.userId
  credential.password = cryptr.decrypt(credential.password)

  return credential
}
