import React, { useState } from 'react'
import Card from '../components/Card'

function Match() {

  const[isFlipped,setIsFlipped]=useState(false);


  return (
    <div>
      <Card deck={0} size={100} suit={'heart'} value={'A'} entity={'\u{1F0A1}'} backEntity={'\u{1F0A0}'} turned={isFlipped} onClickCard={()=>setIsFlipped(f => !f)}></Card>
      <Card deck={0} size={500} suit={'heart'} value={'A'} entity={'\u{1F0A1}'} backEntity={'\u{1F0A0}'} turned={isFlipped} onClickCard={()=>setIsFlipped(f => !f)}></Card>
      
      
      
    </div>
    
  )
}

export default Match