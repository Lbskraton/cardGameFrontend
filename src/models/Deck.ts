import modelCard from "./Card";
import GameType from "./GameType";
import User from "./User";

export interface Deck {
  id?: number;
  name: string;
  entity?:string;
  idUserCreator?: number | null;
  userCreator?: User | null;
  gameTypes?: GameType[];
  gameTypeIds?: number[];
  Cards?: modelCard[];
}