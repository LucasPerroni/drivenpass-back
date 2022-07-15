import { Router } from "express"

import authRouter from "./authRouter.js"
import credentialRouter from "./credentialRouter.js"

const routes = Router()

routes.use(authRouter)
routes.use(credentialRouter)

export default routes
