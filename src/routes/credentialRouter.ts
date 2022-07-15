import { Router } from "express"

import { createCredential } from "../controllers/credentialController.js"
import validateSchema from "../middlewares/validateSchema.js"
import validateToken from "../middlewares/validateToken.js"
import { credentialSchema } from "../schemas/credentialSchema.js"

const credentialRouter = Router()

credentialRouter.post("/credentials", validateToken, validateSchema(credentialSchema), createCredential)

export default credentialRouter
