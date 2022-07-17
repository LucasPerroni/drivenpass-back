import { Cards } from "@prisma/client"
import { Request, Response } from "express"

import * as Services from "../services/cardsServices.js"
import * as Repository from "../repositories/cardsRepository.js"

export async function createCard(req: Request, res: Response) {
  const { userId } = res.locals
  const body: Omit<Cards, "id" | "userId"> = req.body

  await Services.blockCardByTitle(body.title, userId)
  await Services.createNewCard({ ...body, userId })

  res.sendStatus(201)
}

export async function getCards(req: Request, res: Response) {
  const { userId } = res.locals

  const cards = await Services.getCardsByUserId(userId)

  res.status(200).send({ cards })
}

export async function getOneCard(req: Request, res: Response) {
  const { userId } = res.locals
  const { id } = req.params

  const card = await Services.getCardById(id, userId)

  res.status(200).send(card)
}
