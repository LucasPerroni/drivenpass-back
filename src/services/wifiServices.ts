import { Wifi } from "@prisma/client"
import Cryptr from "cryptr"
import dotenv from "dotenv"

import * as Repository from "../repositories/wifiRepository.js"
import * as Error from "../middlewares/errorHandler.js"

dotenv.config()

export async function createNewWifi(data: Omit<Wifi, "id">) {
  const cryptr = new Cryptr(process.env.CRYPTR_KEY)
  data.password = cryptr.encrypt(data.password)

  await Repository.createWifi(data)
}
