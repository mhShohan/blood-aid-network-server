import { PrismaClient } from "@prisma/client";

async function liveDB() {
  const prisma = new PrismaClient();

  const existedData = await prisma.liveDB.findMany()

  if (existedData.length === 0) {
    await prisma.liveDB.create({ data: { count: 0 } })
  } else {
    await prisma.liveDB.update({ where: { id: existedData[0].id }, data: { count: existedData[0].count + 1 } })
  }

  prisma.$disconnect()
}

export default liveDB;