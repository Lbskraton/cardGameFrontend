import ReactCardFlip from 'react-card-flip';



interface CardProps{
    suit:string,
    value:string,
    entity:string,
    backEntity:string,
    lenght?:number,
    size?:number,
    sizeUnit?:string,
    frontImg?:string,
    backImg?:string,
    turned:boolean,
    onClickCard:() => void,
    //onHoverCard?:() =>void //,onHoverCard=()=>{turned=!turned}
}





function Card({entity,size=500,sizeUnit='px',backEntity,frontImg,backImg,turned=false,onClickCard=()=>{turned=!turned}}:CardProps) {
    //Por defecto esta bocaarriba
    const BadEmoji:string[]=['🃏'];

    //Cojo la altura como referencia del tamaño
    const cardHeight=size
    let cardWidth,line
    if(sizeUnit=='%'){
      cardWidth=size
      line=0.9
    }else{
      cardWidth=size*(2/3.0)
      line=1
    }

    //Emojis que necesitan correcciones
    const isBadEmoji=BadEmoji.includes(entity)

    

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
    
      height: cardHeight ? cardHeight+sizeUnit : undefined,
      width: cardWidth ? cardWidth+sizeUnit : undefined,
      aspectRatio: '2 / 3', // Opcional, para mantener proporción si solo se pasa uno de los dos
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textalign: 'center',
      backgroundColor: 'white',      // Fondo blanco
      border: '6px solid black', 
    };

    const badEmojiCardStyle={
      ...cardStyle,
      backgroundColor: 'transparent', // o elimina la propiedad si prefieres
      border: 'none'
    }


    

  // El emoji ocupa todo el espacio posible
  const emojiStyle = {
      fontSize: `${(cardHeight ? cardHeight :100) *0.8}`+sizeUnit,
  
      display: 'block',
      width: '100%',
      height: '100%',
      textalign: 'center',
      
      lineHeight: line,
    //Para problemas de los emojis con la fuente que me los descentra la seteo a mano
    fontFamily: '"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"',
    
    
  };

  const badEmojiStyle = {
    ...emojiStyle,
    lineHeight: 1,
    marginTop: '1%', // Ajusta este valor según lo que veas visualmente
    marginLeft: '-28%', // Opcional: para centrar horizontalmente si sigue desviado
  };
    

  return (
    <div className=' flex items-center justify-center ' >

      <ReactCardFlip isFlipped={turned} >

      <div key="front" className="rounded-lg  items-center text-center justify-center" style={!isBadEmoji ?cardStyle :badEmojiCardStyle}>
        
          {isBadEmoji ? <span style={badEmojiStyle} onClick={onClickCard} >{chooseImg('\u1F0A1',frontImg,entity) }</span> :<span style={emojiStyle} onClick={onClickCard} >{chooseImg('\u1F0A1',frontImg,entity) }</span>}
        
      </div>
      <div key="back" className="rounded-lg  items-center text-center justify-center" style={cardStyle}>
        
          <span style={emojiStyle} onClick={onClickCard} >{chooseImg('\u1F0A1',backImg,backEntity) }</span>
    
      </div>
    </ReactCardFlip>
    </div>
    
      

    
    
    
  )
}

export default Card