import { PrismaClient } from "@prisma/client";

async function liveDB() {
  const prisma = new PrismaClient();

  const data = await prisma.liveDB.findUnique({ where: { id: 'd4584b4f-6f46-4414-817b-a4388594c255' } })
  await prisma.liveDB.update({ where: { id: data?.id }, data: { count: data?.count as number + 1 } })

  prisma.$disconnect()
}

export default liveDB;