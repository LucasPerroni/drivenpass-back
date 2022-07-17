import { Router } from "express"

import { createCard } from "../controllers/cardsController.js"
import validateSchema from "../middlewares/validateSchema.js"
import validateToken from "../middlewares/validateToken.js"
import { cardSchema } from "../schemas/cardSchema.js"

const cardsRouter = Router()

cardsRouter.post("/cards", validateToken, validateSchema(cardSchema), createCard)

export default cardsRouter
