import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class ConnectPrisma {
  public prisma = prisma;
}

export default ConnectPrisma;
