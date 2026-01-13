import express from 'express';
import http from 'http';
import cors from 'cors';

import { Server as SocketIOServer } from 'socket.io';
import healthRoute from './routes/health';
import { errorHandlingMiddleware } from './middleware/errorHandling';
import { clerkMiddleware } from '@clerk/express';
import shipmentRoutes from "./routes/shipment.routes";
import truckRoutes from "./routes/truck.routes";
import userRoutes from "./routes/user.routes";

const app = express();
// да изтрия от env client_url!
const allowedOrigins = process.env.CLIENT_URL ?? "http://localhost:3000";
console.log(allowedOrigins)
app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(clerkMiddleware());

app.use("/", healthRoute);
app.use("/api/shipments", shipmentRoutes);
app.use("/api/trucks", truckRoutes);
app.use("/api/users", userRoutes);

const httpServer = http.createServer(app);
export const io = new SocketIOServer(httpServer, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST", "PATCH"],
    credentials: true,
  }
});

io.on("connection", (socket) => {
  console.log(`New client connected: ${socket.id}`);

  socket.on("disconnect", () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});

app.get("/favicon.ico", (req, res) => res.status(204).end());

app.get('/', (req, res) => {
  console.log("Welcome to home page!");

  res.send('Welcome to the tRPC Express Server with Socket.IO!');
});

app.use(errorHandlingMiddleware);

const PORT = process.env.PORT || 4000;

httpServer.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});