import { Router } from "express"

import { createWifi } from "../controllers/wifiController.js"
import validateSchema from "../middlewares/validateSchema.js"
import validateToken from "../middlewares/validateToken.js"
import wifiSchema from "../schemas/wifiSchema.js"

const wifiRouter = Router()

wifiRouter.post("/wifi", validateToken, validateSchema(wifiSchema), createWifi)

export default wifiRouter
