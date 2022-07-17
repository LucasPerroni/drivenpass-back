import { Router } from "express"

import authRouter from "./authRouter.js"
import credentialRouter from "./credentialRouter.js"
import safeNoteRouter from "./safeNoteRouter.js"
import cardsRouter from "./cardsRouter.js"
import wifiRouter from "./wifiRouter.js"

const routes = Router()

routes.use(authRouter)
routes.use(credentialRouter)
routes.use(safeNoteRouter)
routes.use(cardsRouter)
routes.use(wifiRouter)

export default routes
