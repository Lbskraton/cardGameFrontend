import { GameParticipant } from "./GameParticipant";
import GameType from "./GameType";
import Round from "./Round";
import User from "./User";

export interface Game {
  id?: number;
  idGameTypeid?: number;
  idUserCreator?: number;

  // Relaciones
  idGameType?: GameType;
  userCreator?: User;
  rounds?: Round[];
  gameParticipants?: GameParticipant[];
}