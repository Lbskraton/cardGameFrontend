import { useEffect, useState } from "react"


import { GameTypeService } from "../services/gameType.service"
import GameType from "../models/GameType"



function GameTypeList() {

  const [message,setMessage]=useState('')
  const [loading,setLoading]=useState(true)
  const [gameTypes,setGameTypes]=useState<GameType[]>([])

async function receiveList(){//Creo funcion por useEffect no puede async
  try {
    const GamTypesList=await GameTypeService.getGameTypes()
    console.log(GamTypesList)
    setGameTypes(GamTypesList)
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
        <span className="dark:text-white">{message}</span>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 ">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Min Rounds
              </th>
              <th scope="col" className="px-6 py-3">
                Max Rounds
              </th>
              <th scope="col" className="px-6 py-3">
                Min Users
              </th>
              <th scope="col" className="px-6 py-3">
                Max Users
              </th>
              
            </tr>
          </thead>
          <tbody>
            {gameTypes.map(gameType=><tr key={gameType.name}  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {gameType.time}
              </th>
              <td className="px-6 py-4">
                {gameType.minRounds}
              </td>
              <td className="px-6 py-4">
                {gameType.maxRounds}
              </td>
              <td className="px-6 py-4">
                {gameType.minUsers}
              </td>
              <td className="px-6 py-4">
                {gameType.maxUsers}
              </td>
              
            </tr>)}
            
            
          </tbody>
        </table>
      </div>

    </>
  )
}

export default GameTypeList