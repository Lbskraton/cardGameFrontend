import { FormEvent, useEffect, useState } from "react";
import MessageCard from "../components/MessageCard";
import SelectFormSingle from "../components/SelectFormSingle";
import { DeckService } from "../services/deck.service";
import { Deck } from "../models/Deck";
import useFormHook from "../components/FormHook";
import User from "../models/User";
import InputForm from "../components/InputForm";
import modelCard from "../models/Card";
import unicodeOptions from "../utils/unicodeOptions";
import { CardService } from "../services/card.service";


function CardForm() {
    
    interface CardError{
        id?:number
        value?:string
        suit?:string
          //Unicode Asociado si no tiene imagen
        entity?:string
        frontImg?:number[] //Vienen como un  array de Bytes
        
          //quien ha creado la carta
        idUserCreator?:number 
        userCreator?:User
        deck?:string
    }

  

  //Variables para los usestates de mis busquedas en mi base de datos
  const myDecks:Deck[]=[]
  const [decks, setDecks] = useState(myDecks);
  
    const myCard:modelCard={entity:'',suit:'',value:''}
  const { datosForm, handleChange, formError } = useFormHook(myCard)
  const [message, setMessage] = useState("")
  const [error,setError]=useState<CardError | undefined>()
 
  


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
         
          getDecks()
      
      };
    
    fetchThings();
    
    }, []);



     const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        try {
          setError({})
            CardService.createCard(datosForm)
          setError({})
          
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

        <InputForm name="value" text="Valor" handleChange={handleChange} error={error?.value}></InputForm>
        <InputForm name="suit" text="Palo" handleChange={handleChange} error={error?.suit}></InputForm>
        
        <SelectFormSingle 
        name={"entity"} 
        text={"Aspecto del reverso del deck"} 
        value={datosForm.entity}
        options={unicodeOptions} 
        handleChange={handleChange}></SelectFormSingle>
        



        <SelectFormSingle 
        name={"idDeck"} 
        text={"Baraja a Usar"} 
        value={datosForm.deckid+""}
        options={decks.map((d)=>({ value: ""+d.id, label: d.name }))} 
        handleChange={handleChange}
        error={error?.deck}></SelectFormSingle>


        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Play</button>
      </form>

      {message ? <MessageCard type="hearts" size="text-xl">{message}</MessageCard> : <div></div>}




    </div>
  )
}


export default CardForm