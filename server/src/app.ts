import cors from "cors";
import dotenv from "dotenv";
import Express from "express";
import { getUserData } from "./controllers/user.controller.js";
import { getGameData } from "./controllers/game.controller.js";
import { getFullAchievementData } from "./controllers/achievement.controller.js";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

dotenv.config();
const app = Express();

const allowedOrigins = ["http://localhost:5173"];

const adapter = new PrismaPg({
  connectionString: process.env.DIRECT_URL!,
});

const prisma = new PrismaClient({ adapter });

app.use(
  cors({
    origin: function (origin: any, callback: any) {
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) === -1) {
        return callback(new Error("Not allowed by CORS"));
      }

      return callback(null, true);
    },
    credentials: true,
  }),
);

app.get("/", async (req, res) => {
  res.send("Hello World!");
});

app.get("/user/:id", async (req, res) => {
  const userData = await getUserData(req.params.id);
  res.send(userData);
});

app.get("/gamedata/:id", async (req, res) => {
  const gameData = await getGameData(req.params.id);
  res.send(gameData);
});

app.get("/userachievements/:id", async (req, res) => {
  const achievementData = await getFullAchievementData(req.params.id);
  res.send(achievementData);
});

export default app;
