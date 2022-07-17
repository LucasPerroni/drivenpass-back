import { Router } from "express"

import { createCard, deleteCard, getCards, getOneCard } from "../controllers/cardsController.js"
import validateSchema from "../middlewares/validateSchema.js"
import validateToken from "../middlewares/validateToken.js"
import { cardSchema } from "../schemas/cardSchema.js"

const cardsRouter = Router()

cardsRouter.post("/cards", validateToken, validateSchema(cardSchema), createCard)
cardsRouter.get("/cards", validateToken, getCards)
cardsRouter.get("/cards/:id", validateToken, getOneCard)
cardsRouter.delete("/cards/:id", validateToken, deleteCard)

export default cardsRouter
