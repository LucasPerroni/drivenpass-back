import { Wifi } from "@prisma/client"
import { Request, Response } from "express"

import * as Services from "../services/wifiServices.js"
import * as Repository from "../repositories/wifiRepository.js"

export async function createWifi(req: Request, res: Response) {
  const { userId } = res.locals
  const body: Wifi = req.body

  await Services.createNewWifi({ ...body, userId })

  res.sendStatus(201)
}

export async function getWifi(req: Request, res: Response) {
  const { userId } = res.locals

  const wifi = await Services.getWifiByUserId(userId)

  res.status(200).send({ wifi })
}

export async function getOneWifi(req: Request, res: Response) {
  const { userId } = res.locals
  const { id } = req.params

  const wifi = await Services.getWifiById(id, userId)

  res.status(200).send(wifi)
}
