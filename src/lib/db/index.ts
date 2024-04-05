import { PrismaClient } from "@prisma/client";

declare global {
  // allow global `var` declarations
  // eslint-disable-next-line no-var
  var DbClient: PrismaClient | undefined;
}

export const DbClient =
  global.DbClient ||
  new PrismaClient({
    log: ["query"],
  });

if (process.env.NODE_ENV !== "production") global.DbClient = DbClient;
