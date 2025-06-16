import User from "./User"

export default interface modelCard{
  id?:number
  value:string
  suit:string
  //Unicode Asociado si no tiene imagen
  entity:string
  frontImg?:number[] //Vienen como un  array de Bytes

  //quien ha creado la carta
  idUserCreator?:number 
  userCreator?:User

  deckid?:number

}