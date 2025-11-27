import { CreateExpressContextOptions } from '@trpc/server/adapters/express';
import type { PrismaClient } from '@prisma/client';
import type { Server as SocketIOServer } from 'socket.io';
import { db } from '../db/prisma';
import { getAuth } from '@clerk/express';

export type ContextOptions = {
  db: PrismaClient;
  io?: SocketIOServer;
  req?: CreateExpressContextOptions['req'];
  res?: CreateExpressContextOptions['res'];
  userId?: string | null;
};

export async function createContext(opts: CreateExpressContextOptions & { io?: SocketIOServer }): Promise<ContextOptions> {
  const auth = getAuth(opts.req);

  return {
    db,
    io: opts?.io,
    req: opts?.req,
    res: opts?.res,
    userId: auth?.userId ?? null
  };
};

export type Context = Awaited<ReturnType<typeof createContext>>