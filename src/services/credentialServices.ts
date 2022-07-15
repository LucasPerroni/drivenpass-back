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
