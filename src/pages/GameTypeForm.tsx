import { FormEvent, useState } from "react"
import useFormHook from "../components/FormHook"
import InputForm from "../components/InputForm"
import MessageCard from "../components/MessageCard"


import GameType from "../models/GameType"
import { GameTypeService } from "../services/gameType.service"

function GameTypeForm() {

  

  interface RegisterError{
    name?:string,
    surname?:string,
    role?:string,
    email?:string,
    active?:boolean,
    acceptNotifications?:boolean,
    password?:string
    repeatPassword?:string

  }

  

  const myGameType:GameType={name: ""}
  

  const { datosForm, handleChange, formError } = useFormHook(myGameType)

  const [message, setMessage] = useState("")
  const [error,setError]=useState<RegisterError | undefined>()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try {
      setError({})
      
      if(!datosForm.name){
        setError(error=>({...error,email:"invalid void name"}))
        throw new Error("Nombre invalido")
      }
      
      const res=await  GameTypeService.saveGameType(datosForm)
      console.log(res.status)
    
      setMessage("GameType save succesful")
      setError({})
      
    } catch (error) {
      const msg = error instanceof Error ? error.message : "Error desconocido"
      const msg2= formError ?? ""
      setMessage(msg+msg2)

    }

  }


  return (
    <>


      <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
        <br />

        <InputForm name="name" text="name" handleChange={handleChange} error={error?.name}></InputForm>

        <InputForm name="time" text="Tiempo Maximo (Segundos) (Opcional)" type="number" handleChange={handleChange} error={error?.email}></InputForm>

        <InputForm name="minRounds" text="Minimo de Rondas (Opcional)" type="number" handleChange={handleChange} error={error?.email}></InputForm>

        <InputForm name="maxRounds" text="Máximo de Rondas (Opcional)" type="number" handleChange={handleChange} error={error?.email}></InputForm>

        <InputForm name="minUsers" text="Minimo de Usuarios (Opcional)" type="number" handleChange={handleChange} error={error?.email}></InputForm>

        <InputForm name="maxUsers" text="Máximo de Usuarios (Opcional)" type="number" handleChange={handleChange} error={error?.email}></InputForm>


        <div className="flex items-start mb-5">
          <div className="flex items-center h-5">
            <input id="terms" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
          </div>
          <label htmlFor="terms" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree with the <a href="#" className="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a></label>
        </div>
        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Register GameType</button>
      </form>

      {message ? <MessageCard type="hearts" size="text-xl">{message}</MessageCard> : <div></div>}


    </>
  )
}

export default GameTypeForm