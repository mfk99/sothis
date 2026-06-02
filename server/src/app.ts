import Express from "express";
import cors from "cors";
import { getUserData } from "./controllers/user.controller";
import { getGameData } from "./controllers/game.controller";
import dotenv from "dotenv";
import { getFullAchievementData } from "./controllers/achievement.controller";

dotenv.config();
const app = Express();

const allowedOrigins = ["http://localhost:5173"];

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

app.get("/", (req, res) => {
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
