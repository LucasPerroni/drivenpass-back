import { Cards } from "@prisma/client"
import Cryptr from "cryptr"
import dotenv from "dotenv"

import * as Repository from "../repositories/cardsRepository.js"
import * as Error from "../middlewares/errorHandler.js"

dotenv.config()

export async function blockCardByTitle(title: string, id: number) {
  const card = await Repository.findCardByTitle(title, id)
  if (card) {
    Error.errorConflict("You already have a card with this title")
  }
}

export async function createNewCard(data: Omit<Cards, "id">) {
  const cryptr = new Cryptr(process.env.CRYPTR_KEY)
  data.password = cryptr.encrypt(data.password)
  data.securityCode = cryptr.encrypt(data.securityCode)

  await Repository.createCard(data)
}
