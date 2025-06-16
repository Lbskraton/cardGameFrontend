import { useEffect, useState } from "react"

import { useNavigate } from "react-router-dom"
import { GameService } from "../services/game.service"
import { Game } from "../models/Game"
import MessageCard from "../components/MessageCard"



function GameList() {

  const [message,setMessage]=useState('')
  const [loading,setLoading]=useState(true)
  const [games,setGames]=useState<Game[]>([])

  //Para navegar a los scores
  const navigate = useNavigate();

async function receiveList(){//Creo funcion por useEffect no puede async
  try {
    const GamesList=await GameService.getGames()
    
    setGames(GamesList)
  } catch (error) {
    const msg= error instanceof Error ? error.message : "Error desconocido"
      setMessage(msg)
  }finally{
    setLoading(false)
  }
}

  useEffect(()=>{
    //Llamada a la apy
    receiveList()
    
  },[]) //solo la 1º vez

  if(loading){
    return <div className="dark:text-white"> Loading....</div>
  }

  return (
    <>  
    <br/>
      <div className="relative overflow-x-auto">
        {message ?<MessageCard size="text-xl">{message}</MessageCard> :<div></div>}
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 ">
                Id juego
              </th>
              <th scope="col" className="px-6 py-3">
                Id tipo Juego
              </th>
              <th scope="col" className="px-6 py-3">
                Id Creador
              </th>
              <th scope="col" className="px-6 py-3">
                Numero de Rondas
              </th>
              
              <th scope="col" className="px-6 py-3">
                Scores
              </th>
              
            </tr>
          </thead>
          <tbody>
            {games.map(game=><tr key={game.id}  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {game.id}
              </th>
              <td className="px-6 py-4">
                {game.idGameType}
              </td>
              <td className="px-6 py-4">
                {game.idUserCreator}
              </td>
              <td className="px-6 py-4">
                {game.rounds?.length}
              </td>
              
              <td className="px-6 py-4">
                <button onClick={() => navigate(`/scores/${game.id}`)}>Scores</button>
              </td>
              
            </tr>)}
            
            
          </tbody>
        </table>
      </div>

    </>
  )
}

export default GameList