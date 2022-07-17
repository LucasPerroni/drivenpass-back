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

export async function getCardsByUserId(userId: number) {
  const cryptr = new Cryptr(process.env.CRYPTR_KEY)
  const card = await Repository.findCardsByUserId(userId)

  card.forEach((n) => {
    delete n.userId
    n.password = cryptr.decrypt(n.password)
    n.securityCode = cryptr.decrypt(n.securityCode)
  })

  return card
}

export async function getCardById(id: string, userId: number) {
  const cryptr = new Cryptr(process.env.CRYPTR_KEY)
  if (!Number(id)) {
    Error.errorUnprocessable("Id must be a number")
  }

  const card = await Repository.findCardById(Number(id))

  if (!card) {
    Error.errorNotFound("Couldn't find a safe note with that id")
  } else if (card.userId !== userId) {
    Error.errorForbidden("This safe note belongs to another user")
  }

  delete card.userId
  card.password = cryptr.decrypt(card.password)
  card.securityCode = cryptr.decrypt(card.securityCode)

  return card
}
