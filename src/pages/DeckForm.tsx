import { FormEvent, useEffect, useState } from "react"
import useFormHook from "../components/FormHook"
import InputForm from "../components/InputForm"
import MessageCard from "../components/MessageCard"

import { GameTypeService } from "../services/gameType.service"
import SelectFormMulti from "../components/SelectFormMulti"
import { Deck } from "../models/Deck"
import GameType from "../models/GameType"
import { DeckService } from "../services/deck.service"
import SelectFormSingle from "../components/SelectFormSingle"
import unicodeOptions from "../utils/unicodeOptions"
import User from "../models/User"
import modelCard from "../models/Card"
function DeckForm() {

  interface DeckError{
      id?: number;
      name?: string;
      entity?:string;
      idUserCreator?: number | null;
      userCreator?: User | null;
      gameTypes?: GameType[];
      gameTypeIds?: number[];
      Cards?: modelCard[];

  }

  const myDeck:Deck={name: ""}
  const myGameTypes:GameType[]=[]

  const { datosForm, handleChange,handleChangeSelected, formError } = useFormHook(myDeck)
  const [message, setMessage] = useState("")
  const [error,setError]=useState<DeckError | undefined>()
  const [gameTypes, setGameTypes] = useState(myGameTypes);
  

  const getGameTypes=async ()=>{
    try {
      setError({})
      

      const res=await GameTypeService.getGameTypes()
      console.log('Gametype res: '+res)
      setGameTypes(res) 
      
      console.log(gameTypes)
    
      setMessage("GameType safully retrieved")
      setError({})
      //redirigir a otra pagina
      
    } catch (error) {
      const msg = error instanceof Error ? error.message : "Error desconocido al obtner los gametypes"
      const msg2= formError ?? ""
      setMessage(msg+msg2)

    }
    
  }

  useEffect(() => {
  
    const fetchGameTypes = async () => {
      //Cargo los gametypes nada más empezar
        getGameTypes()
    
    };
  
  fetchGameTypes();
  console.log(gameTypes)
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try {
      setError({})
      
      if(!datosForm.name){
        setError(error=>({...error,email:"invalid void name"}))
        throw new Error("Nombre invalido")
      }
      
      await  DeckService.saveDeck(datosForm)

      //redirigir a otra pagina
    } catch (error) {
      const msg = error instanceof Error ? error.message : "Error desconocido"
      const msg2= formError ?? ""
      setMessage(msg+msg2)

    }finally{
        setMessage("GameType save succesful")
      setError({})
    }

  }


  return (
    <>


      <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
        <br />

        <InputForm name="name" text="name" handleChange={handleChange} error={error?.name}></InputForm>

        <SelectFormMulti 
        name={"gameTypes"} 
        text={"Tipos de Juegos que usan este deck"} 
        value={datosForm.gameTypeIds?.map(id => id.toString()) ?? []}
        options={gameTypes.map(v=>({ value: ""+v.id, label: v.name }))} 
        handleChange={handleChangeSelected}></SelectFormMulti>

        <SelectFormSingle 
        name={"entity"} 
        text={"Aspecto del reverso del deck"} 
        value={datosForm.entity+""}
        options={unicodeOptions} 
        handleChange={handleChange}></SelectFormSingle>


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

export default DeckForm