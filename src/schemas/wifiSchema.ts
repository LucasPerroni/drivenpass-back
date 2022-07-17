import { Wifi } from "@prisma/client"
import joi from "joi"

const wifiSchema = joi.object<Omit<Wifi, "id" | "userId">>({
  title: joi.string().required(),
  name: joi.string().required(),
  password: joi.string().required(),
})

export default wifiSchema
