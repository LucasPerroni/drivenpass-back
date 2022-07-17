import { Cards } from "@prisma/client"
import { prisma } from "../config/database.js"

export async function findCardByTitle(title: string, userId: number) {
  const card = await prisma.cards.findUnique({ where: { userId_title: { title, userId } } })
  return card
}

export async function findCardsByUserId(userId: number) {
  const cards = await prisma.cards.findMany({ where: { userId } })
  return cards
}

export async function findCardById(id: number) {
  const Card = await prisma.cards.findUnique({ where: { id } })
  return Card
}

export async function createCard(data: Omit<Cards, "id">) {
  await prisma.cards.create({ data })
}

export async function deleteCard(id: number) {
  await prisma.cards.delete({ where: { id } })
}
