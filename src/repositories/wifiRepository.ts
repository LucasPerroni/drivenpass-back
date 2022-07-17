import { Wifi } from "@prisma/client"
import { prisma } from "../config/database.js"

export async function findWifiByUserId(userId: number) {
  const wifi = await prisma.wifi.findMany({ where: { userId } })
  return wifi
}

export async function findWifiById(id: number) {
  const wifi = await prisma.wifi.findUnique({ where: { id } })
  return wifi
}

export async function createWifi(data: Omit<Wifi, "id">) {
  await prisma.wifi.create({ data })
}

export async function deleteWifi(id: number) {
  await prisma.wifi.delete({ where: { id } })
}
