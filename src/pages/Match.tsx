import React, { useState } from 'react'
import Card from '../components/Card'

function Match() {

  const[isFlipped,setIsFlipped]=useState(false);


  return (
    <div>
      <div className='w-screen h-screen flex items-center justify-center'><Card deck={0} suit={'heart'} value={'A'} entity={'\u{1F0A1}'} backEntity={'\u{1F0A0}'} turned={isFlipped} onClickCard={()=>setIsFlipped(f => !f)}></Card></div>
      <div className='w-50px h-50px flex items-center justify-center'><Card cardWidth={100} cardHeight={200} deck={0} suit={'heart'} value={'A'} entity={'\u{1F0A1}'} backEntity={'\u{1F0A0}'} turned={isFlipped} onClickCard={()=>setIsFlipped(f => !f)}></Card></div>
    </div>
    
  )
}

export default Match