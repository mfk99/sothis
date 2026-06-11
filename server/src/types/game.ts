import type { Achievement } from "./achievement.js";

export type Game = {
  name: string;
  appid: number;
  playtimeMinutes: number;
  playtime_forever: number;
  gameImageUrl: string;
  has_community_visible_stats: boolean;
  hasAchievements: boolean;
  achievementData: Record<string, Achievement>;
};
