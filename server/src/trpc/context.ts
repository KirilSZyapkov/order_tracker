import { CreateExpressContextOptions } from '@trpc/server/adapters/express';
import type { PrismaClient } from '@prisma/client';
import type { Server as SocketIOServer } from 'socket.io';
import { db } from '../db/prisma';

export type ContextOptions = {
  db: PrismaClient;
  io?: SocketIOServer;
  req?: Request;
  res?: Response;
};

export async function createContext(opts?: { io?: SocketIOServer, req: Request, res: Response }): Promise<ContextOptions> {
  return { db, io: opts?.io, req: opts?.req, res: opts?.res };
};

export type Context = Awaited<ReturnType<typeof createContext>>