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

export async function getWifiByUserId(userId: number) {
  const cryptr = new Cryptr(process.env.CRYPTR_KEY)
  const wifi = await Repository.findWifiByUserId(userId)

  wifi.forEach((w) => {
    delete w.userId
    w.password = cryptr.decrypt(w.password)
  })

  return wifi
}

export async function getWifiById(id: string, userId: number) {
  const cryptr = new Cryptr(process.env.CRYPTR_KEY)
  if (!Number(id)) {
    Error.errorUnprocessable("Id must be a number")
  }

  const wifi = await Repository.findWifiById(Number(id))

  if (!wifi) {
    Error.errorNotFound("Couldn't find a wifi with that id")
  } else if (wifi.userId !== userId) {
    Error.errorForbidden("This wifi belongs to another user")
  }

  delete wifi.userId
  wifi.password = cryptr.decrypt(wifi.password)

  return wifi
}
