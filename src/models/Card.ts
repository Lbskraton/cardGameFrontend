import User from "./User"

export default interface modelCard{
  id?:number
  value:String
  suit:String
  //Unicode Asociado si no tiene imagen
  entity:String
  frontImg?:number[] //Vienen como un  array de Bytes

  //quien ha creado la carta
  idUserCreator?:number 
  userCreator?:User

}