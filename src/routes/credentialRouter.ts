import { Router } from "express"

import { createCredential, getCredentials, getOneCredential } from "../controllers/credentialController.js"
import validateSchema from "../middlewares/validateSchema.js"
import validateToken from "../middlewares/validateToken.js"
import { credentialSchema } from "../schemas/credentialSchema.js"

const credentialRouter = Router()

credentialRouter.post("/credentials", validateToken, validateSchema(credentialSchema), createCredential)
credentialRouter.get("/credentials", validateToken, getCredentials)
credentialRouter.get("/credentials/:id", validateToken, getOneCredential)

export default credentialRouter
