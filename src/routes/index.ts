import { Router } from "express"

import authRouter from "./authRouter.js"
import credentialRouter from "./credentialRouter.js"
import safeNoteRouter from "./safeNoteRouter.js"

const routes = Router()

routes.use(authRouter)
routes.use(credentialRouter)
routes.use(safeNoteRouter)

export default routes
