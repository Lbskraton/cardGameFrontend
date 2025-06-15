import React, { useState } from 'react'
import ReactCardFlip from 'react-card-flip';

const englishDeckEntities = {
  spades: {
    A: '&#x1F0A1;', // As de espadas
    2: '&#x1F0A2;',
    3: '&#x1F0A3;',
    4: '&#x1F0A4;',
    5: '&#x1F0A5;',
    6: '&#x1F0A6;',
    7: '&#x1F0A7;',
    8: '&#x1F0A8;',
    9: '&#x1F0A9;',
    10: '&#x1F0AA;',
    J: '&#x1F0AB;', // Jack of Spades
    Q: '&#x1F0AD;', // Queen of Spades
    K: '&#x1F0AE;'  // King of Spades
  },
  hearts: {
    A: '&#x1F0B1;', // As de corazones
    2: '&#x1F0B2;',
    3: '&#x1F0B3;',
    4: '&#x1F0B4;',
    5: '&#x1F0B5;',
    6: '&#x1F0B6;',
    7: '&#x1F0B7;',
    8: '&#x1F0B8;',
    9: '&#x1F0B9;',
    10: '&#x1F0BA;',
    J: '&#x1F0BB;', // Jack of Hearts
    Q: '&#x1F0BD;', // Queen of Hearts
    K: '&#x1F0BE;'  // King of Hearts
  },
  diamonds: {
    A: '&#x1F0C1;', // As de diamantes
    2: '&#x1F0C2;',
    3: '&#x1F0C3;',
    4: '&#x1F0C4;',
    5: '&#x1F0C5;',
    6: '&#x1F0C6;',
    7: '&#x1F0C7;',
    8: '&#x1F0C8;',
    9: '&#x1F0C9;',
    10: '&#x1F0CA;',
    J: '&#x1F0CB;', // Jack of Diamonds
    Q: '&#x1F0CD;', // Queen of Diamonds
    K: '&#x1F0CE;'  // King of Diamonds
  },
  clubs: {
    A: '&#x1F0D1;', // As de tréboles
    2: '&#x1F0D2;',
    3: '&#x1F0D3;',
    4: '&#x1F0D4;',
    5: '&#x1F0D5;',
    6: '&#x1F0D6;',
    7: '&#x1F0D7;',
    8: '&#x1F0D8;',
    9: '&#x1F0D9;',
    10: '&#x1F0DA;',
    J: '&#x1F0DB;', // Jack of Clubs
    Q: '&#x1F0DD;', // Queen of Clubs
    K: '&#x1F0DE;'  // King of Clubs
  }
};

interface CardProps{
    deck: number,
    suit:string,
    value:string,
    entity:string,
    backEntity:string,
    lenght?:number,
    cardWidth?:number|null,
    cardHeight?:number|null,
    size?:number,
    frontImg?:string,
    backImg?:string,
    turned:boolean,
    onClickCard:() => void,
    onHoverCard?:() =>void
}



function Card({entity,size=500,backEntity,frontImg,backImg,turned=false,onClickCard=()=>{turned=!turned},onHoverCard=()=>{turned=!turned}}:CardProps) {
    //Por defecto esta bocaarriba
    
    const cardHeight=size
    const cardWidth=size*(2/3.0)

    const chooseImg=(vdefault:string,frontImg?:string,entity?:string)=>{
        let frontal=vdefault
        if(frontImg){
          frontal= `${frontImg}`
        } 
        else {
          if(entity) frontal=entity
        } 
       
        return frontal
    }

    const cardStyle = {
    width: cardWidth ? `${cardWidth}px` : undefined,
    height: cardHeight ? `${cardHeight}px` : undefined,
    aspectRatio: '2 / 3', // Opcional, para mantener proporción si solo se pasa uno de los dos

    };

  // El emoji ocupa todo el espacio posible
  const emojiStyle = {
    fontSize: `${(cardHeight ? cardHeight :100) *0.8}px`,
  
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    lineHeight: 1.05,
    //Para problemas de los emojis con la fuente que me los descentra la seteo a mano
    fontFamily: '"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"',
    
  };
    

  return (
    <div className='w-screen h-screen flex items-center '>

      <ReactCardFlip isFlipped={turned} >

      <div key="front" className="rounded-lg bg-white border-6 border-black " style={cardStyle}>
        
          <span style={emojiStyle} onClick={onClickCard} >{chooseImg('\u1F0A1',frontImg,entity) }</span>
        
      </div>
      <div key="back" className="rounded-lg bg-white border-6 border-black " style={cardStyle}>
        
          <span style={emojiStyle} onClick={onClickCard} >{chooseImg('\u1F0A1',backImg,backEntity) }</span>
    
      </div>
    </ReactCardFlip>
    </div>
    
      

    
    
    
  )
}

export default Card