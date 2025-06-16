import  { FormEvent, useEffect, useState } from 'react'
import { GameTypeService } from '../services/gameType.service'
import useFormHook from '../components/FormHook'
import { Deck } from '../models/Deck'
import GameType from '../models/GameType'
import { DeckService } from '../services/deck.service'
import MessageCard from '../components/MessageCard'
import SelectFormSingle from '../components/SelectFormSingle'

import { useNavigate } from 'react-router-dom'

function Play() {

    interface PlayError{
    gameTypeId?:string,
    deckId?:string,
    

  }

  const navigate = useNavigate();

  //Variables para los usestates de mis busquedas en mi base de datos
  const myDecks:Deck[]=[]
  const [decks, setDecks] = useState(myDecks);
  const myGameTypes:GameType[]=[]
    const [gameTypes, setGameTypes] = useState(myGameTypes);

  const { datosForm, handleChange, formError } = useFormHook({idDeck:'',idGameType:''})
  const [message, setMessage] = useState("")
  const [error,setError]=useState<PlayError | undefined>()
 
  
  

  const getGameTypes=async ()=>{
    try {
      setError({})
      

      const res=await GameTypeService.getGameTypes()
     
      setGameTypes(res) 
      
      
    
      setMessage("GameType safully retrieved")
      setError({})
      //redirigir a otra pagina
      
    } catch (error) {
      const msg = error instanceof Error ? error.message : "Error desconocido al obtner los gametypes"
      const msg2= formError ?? ""
      setMessage(msg+msg2)

    }
    
  }

  const getDecks=async ()=>{
    try {
      setError({})
      
      const res=await DeckService.getDecks()
      
      setDecks(res) 
      
    
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
    
      const fetchThings = async () => {
        //Cosas a cargar
          getGameTypes()
          getDecks()
      
      };
    
    fetchThings();
    
    }, []);



     const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        try {
          setError({})
    
          //redirigir a otra pagina

          navigate(`/match?idDeck=${datosForm.idDeck}&idGameType=${datosForm.idGameType}`);
          
          
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
    <div>

        <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
        <br />

        


        <SelectFormSingle 
        name={"idGameType"} 
        text={"Estilo de juego a jugar"} 
        value={datosForm.idGameType+""}
        options={gameTypes.map((d)=>({ value: ""+d.id, label: d.name }))} 
        handleChange={handleChange}
        error={error?.gameTypeId}></SelectFormSingle>

        <SelectFormSingle 
        name={"idDeck"} 
        text={"Baraja a Usar"} 
        value={datosForm.idDeck+""}
        options={decks.map((d)=>({ value: ""+d.id, label: d.name }))} 
        handleChange={handleChange}
        error={error?.deckId}></SelectFormSingle>


        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Play</button>
      </form>

      {message ? <MessageCard type="hearts" size="text-xl">{message}</MessageCard> : <div></div>}




    </div>
  )
}

export default Play