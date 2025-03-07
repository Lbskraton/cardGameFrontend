export default interface User{
  name:string,
  surname:string,
  role:string,
  email:string,
  course: string,
  active:boolean,
  acceptNotifications:boolean,
  password?:string
}

export const UserPropertieNames=["Name","Surname","Role","Email","Course","Active","AcceptNotifications","Password"]