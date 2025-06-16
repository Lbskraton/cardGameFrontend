import  { useEffect, useState } from 'react'

import GT_Match from './GT_Match'
import { useSearchParams } from 'react-router-dom';

import GameType from '../models/GameType';
import { GameTypeService } from '../services/gameType.service';
import MessageCard from '../components/MessageCard';


function Match() {

  

  const [searchParams] = useSearchParams();
  const idDeckStr = searchParams.get('idDeck');
  const idGameTypeStr = searchParams.get('idGameType');
  
  //Guardar el gametype obtenido
  const myGameType:GameType={name:''}
  const [gameType,setGameType]=useState(myGameType)

  const [loading,setLoading]=useState(true)

  
  const [message, setMessage] = useState("")

  const getGametype=async ()=>{

        setLoading(true)
        try {
          
          const idGameType=idGameTypeStr ? Number(idGameTypeStr) : undefined;
          if(!idGameType){
              
              throw new Error("Deck no encontrado")
          }
          const res:GameType=await GameTypeService.getGameTypeById(idGameType)

          console.log('Gametipe res='+res)
  
          setGameType(res)
          
        } catch (error) {
          
          const msg = error instanceof Error ? error.message : "Error desconocido al obtner el deck"
          setMessage(msg)
          
    
        }finally{
          setLoading(false)
        }
      }

  
  useEffect(() => {
        const toDo = async () => {
          
          getGametype()
        };
        toDo();
    }, []);

  return (
    <div>
      
      { !loading ?<div></div>  :<div className="dark:text-white"> Loading....</div>}
      {gameType && (gameType.name).toLowerCase()==='match' ? <GT_Match gameType={gameType} idDeckStr={idDeckStr ? idDeckStr : ''}></GT_Match> : <div></div>}
      {message ? <MessageCard type="hearts" size="text-xl">{message}</MessageCard> : <div></div>}
    </div>
    
  )
}

export default Match