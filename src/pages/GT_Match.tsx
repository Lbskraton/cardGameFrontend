
import modelCard from '../models/Card';
import GameType from '../models/GameType';

import { DeckService } from '../services/deck.service';
import Card from '../components/Card';

import Temporizador from '../components/Temporizador';
import { GameService } from '../services/game.service';

import { RoundService } from '../services/round.service';
import { ScoreService } from '../services/score.service';
import { useEffect, useState } from 'react';
import MessageCard from '../components/MessageCard';

interface GT_Match_Props{
    gameType:GameType,
    idDeckStr:string
}


function GT_Match({gameType,idDeckStr}:GT_Match_Props) {

    

    //Para controlar si estan dadas la vuelta las cartas

    interface modelCardVuelta extends Partial<modelCard> {
        turned: boolean;
        cleared:boolean
        }

  const myDeck:modelCardVuelta[]=[]
  
  const ncards=12

  const [deck,setDeck]=useState(myDeck)

  
  const [message, setMessage] = useState("")
  


  const handleFlip = (idx: number) => {
        if(deck[idx].cleared===false){
            setDeck(prev =>
                prev.map((val, i) =>({ ...val, turned: i === idx ? !val.turned : val.turned })
        

            ));

        }
        
        //numero de cartas boca arriba
        const cardTurned = deck.filter(card => (!card.turned && !card.cleared));

        if(cardTurned.length>=2){
            if(cardTurned[0].id===cardTurned[1].id ){
                cardTurned[0].cleared=true
                cardTurned[1].cleared=true
                setDeck({...deck,...cardTurned})

            }else{

                //Si no coinciden tras un rato les doy la vuelta

                setTimeout(() => {
                    setDeck(prev =>
                        prev.map((val) =>({ ...val, turned: val.id === cardTurned[0].id || val.id === cardTurned[1].id ? !val.turned : val.turned })
        
                        ));        
                        }, 2000);
            }
        }

        if(deck.filter(card=>card.cleared).length===deck.length){
            endgame()
        }

    };

  const getDecks=async ()=>{
      try {
        
        const idDeck=idDeckStr ? Number(idDeckStr) : undefined;
        if(!idDeck ){
            throw new Error("Deck no encontrado")
        }
        const res=await DeckService.getDeckCards(idDeck)
    
        //Extrae cartas aletorias
        const extraeCartas = [...res.Cards].sort(() => Math.random() - 0.5).slice(0, Math.floor(ncards/2))
        
        const duplicaCartas=[...extraeCartas] .flatMap(card => [{ ...card },{ ...card } ]).sort(() => Math.random() - 0.5);
       
        //Añado propiedades para el juego
        const propbaseCartas=duplicaCartas.map((card:modelCardVuelta) => ({...card,turned: true,cleared:false}))


        setDeck(propbaseCartas)
      
        setMessage("Deck with cards safully retrieved")
  
        //redirigir a otra pagina
        
      } catch (error) {
        const msg = error instanceof Error ? error.message : "Error desconocido al obtner el deck"
        setMessage(msg)
  
      }
    };

    // Invierto solo una carta
    

    

    const endgame=async ()=>{

        const score=deck.filter(card=>card.cleared).length

        let game,round
        try{
            game={
            idGameTypeid:gameType.id ? gameType.id  : 0,
            }
            game=await GameService.createGame(game)

        }catch(error){
            const msg = error instanceof Error ? error.message : "Error guardando el juego"
            setMessage(msg)
        }

         const newGameId=game.id ? game.id : 0

        try{
            GameService.enterGame(newGameId)

        }catch(error){
            const msg = error instanceof Error ? error.message : "Error al añadirte como participante al juego"
            setMessage(msg)
        }

        try{
            round= await RoundService.createRound(newGameId,{})

            ScoreService.createScore(round.id,{value:score})

        }catch(error){
            const msg = error instanceof Error ? error.message : "Error al añadir la ronda con su score"
            setMessage(msg)
        }

    }

    

     useEffect(() => {
        const toDo = async () => {
            //Cargo los gametypes nada más empezar
            getDecks()
    
        };
        toDo();
    }, []);
  

  


  return (
    <div>
        {Temporizador({tiempoInicial:gameType.time ? gameType.time : 10000,AlAcabar:()=>endgame()})}
    <div>
      <br />
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 justify-items-center">
        {deck.map((card, idx) => (
          <Card
            key={idx}
            suit={card.suit ? card.suit : 'Heart'}
            value={card.value ? card.value : 'A'}
            entity={card.entity ? card.entity : '🃏'}
            backEntity="🂠"
            turned={card.turned}
            onClickCard={() => handleFlip(idx)}
            // Puedes ajustar size y sizeUnit según tu diseño
            size={100}
            sizeUnit="px"
          />
        ))}
      </div>
    </div>
    {message ? <MessageCard type="hearts" size="text-xl">{message}</MessageCard> : <div></div>}
    </div>
  )
}

export default GT_Match