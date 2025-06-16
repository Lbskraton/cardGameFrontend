import  { useEffect, useState } from 'react'

import { RoundService } from '../services/round.service'
import { useParams } from 'react-router-dom'
import { Score } from '../models/Score'

import { GameParticipant } from '../models/GameParticipant'



function ListScores() {



  const [message,setMessage]=useState('')
  const [loading,setLoading]=useState(true)
  const [scores,setScores]=useState<Score[]>([])

  const { gameid } = useParams();

async function receiveList(){//Creo funcion por useEffect no puede async
  try {
    const gamedata:GameParticipant=await RoundService.getScoresByUserAndGame(Number(gameid) ? Number(gameid) : 0 )
    setScores(gamedata.scores ? gamedata.scores :[])
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
                Game
              </th>
              <th scope="col" className="px-6 py-3">
                Round
              </th>
              <th scope="col" className="px-6 py-3">
                Value
              </th>
              <th scope="col" className="px-6 py-3">
                Winner
              </th>
              
            </tr>
          </thead>
          <tbody>
            {scores.map(score=><tr key={score.idGameParticipant+'_'+score.idRound}  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {gameid}
              </th>
              <td className="px-6 py-4">
                {score.round?.gameid}
              </td>
              <td className="px-6 py-4">
                {score.value}
              </td>
              <td className="px-6 py-4">
                {score.winner}
              </td>
              
            </tr>)}
            
            
          </tbody>
        </table>
      </div>

    </>
  )
}

export default ListScores