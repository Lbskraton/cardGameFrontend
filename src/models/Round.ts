import { Game } from "./Game";
import { Score } from "./Score";

export default interface Round{

    id: number;
    gameid: number;

  // Relaciones
    game?: Game;
    scores?: Score[];

}