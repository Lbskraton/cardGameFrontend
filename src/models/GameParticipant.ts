import { Game } from "./Game";
import { Score } from "./Score";
import User from "./User";

export interface GameParticipant {
  id: number;
  gameId: number;
  userId: number;

  // Relaciones
  game?: Game;
  user?: User;
  scores?: Score[];
}