import { Router } from "express"

import { createWifi, deleteWifi, getOneWifi, getWifi } from "../controllers/wifiController.js"
import validateSchema from "../middlewares/validateSchema.js"
import validateToken from "../middlewares/validateToken.js"
import wifiSchema from "../schemas/wifiSchema.js"

const wifiRouter = Router()

wifiRouter.post("/wifi", validateToken, validateSchema(wifiSchema), createWifi)
wifiRouter.get("/wifi", validateToken, getWifi)
wifiRouter.get("/wifi/:id", validateToken, getOneWifi)
wifiRouter.delete("/wifi/:id", validateToken, deleteWifi)

export default wifiRouter
