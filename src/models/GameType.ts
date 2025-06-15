import User from "./User";


export default interface GameType{
  id?: number,
  name: string,

  minRounds?:number,
  maxRounds?:number,

  maxUsers?:number,
  minUsers?:number,

  time?:number,

  //Creador
  userCreator?: User | null;

  //Game Game[]
}