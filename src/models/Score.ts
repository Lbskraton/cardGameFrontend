import { GameParticipant } from "./GameParticipant";
import Round from "./Round";

export interface Score {
  idRound: number;
  idGameParticipant: number;
  value?: number;
  winner?: boolean;
  playing?: boolean;

  // Relaciones
  round?: Round;
  gameParticipant?: GameParticipant;
}