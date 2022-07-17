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
