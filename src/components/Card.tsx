import React, { useState } from 'react'

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
    frontImg?:string,
    backImg?:string,
    turned?:boolean
}



function Card({entity,backEntity,frontImg,backImg,turned=false}:CardProps) {
    //Por defecto esta bocaarriba
    

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
    

  return (
    <div>
        <div className="rounded-lg bg-white flex items-center justify-center h-full border-6 py-3 px-2 border-black">
          <div className="leading-none -mt-3" >{turned ? chooseImg('\u1F0A1',frontImg,entity) : chooseImg('\u1F0A0',frontImg,entity)}</div>
        </div>
    </div>
  )
}

export default Card