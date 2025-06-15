import { useState } from "react";
import Card from "../components/Card"

function CardShowcase() {

    const[isFlipped,setIsFlipped]=useState(false);

  return (
    <div>
      <br/>


      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 justify-items-center text-8xl">
        
        <Card  size={100} sizeUnit="%" suit={'heart'} value={'A'} entity={'\u{1F0A1}'} backEntity={'\u{1F0A0}'} turned={isFlipped} onClickCard={()=>setIsFlipped(f => !f)} ></Card>
        <Card  size={100} suit={'heart'} value={'A'} entity={'\u{1F0A1}'} backEntity={'\u{1F0A0}'} turned={isFlipped} onClickCard={()=>setIsFlipped(f => !f)}></Card>
        <Card  size={100} suit={'heart'} value={'A'} entity={'🂡'} backEntity={'🃃'} turned={isFlipped} onClickCard={()=>setIsFlipped(f => !f)}></Card>
        <div className="rounded-lg bg-white flex items-center justify-center h-full border-6 py-3 px-2 border-black">
          <div className="leading-none -mt-3" >&#x1F0CA;</div>
        </div>
        <div>
          <span className="h-auto max-w-full rounded-lg" >&#127183;</span>
        </div>
        <div className="rounded-lg bg-white flex items-center justify-center h-full border-6 py-3 px-2 border-black">
        <div className="leading-none -mt-3" >&#x1F0DB;</div>
        </div>
        <div className="rounded-lg bg-white flex items-center justify-center h-full border-6 py-3 px-2 border-black">
        <div className="leading-none -mt-3"> &#x1F0A1;</div>
        </div>
        <div>
          <span className="h-auto max-w-full rounded-lg" >&#127183;</span>
        </div>
        <div className="rounded-lg bg-white flex items-center justify-center h-full border-6 py-3 px-2 border-black">
          <div className="leading-none -mt-3" >&#x1F0A1;</div>
        </div>
        <div className="rounded-lg bg-white flex items-center justify-center h-full border-6 py-3 px-2 border-black">
          <div className="leading-none -mt-3" >&#x1F0C1;</div>
        </div>
        <div className="rounded-lg bg-white flex items-center justify-center h-full border-6 py-3 px-2 border-black">
          <div className="leading-none -mt-3" >&#x1F0A1;</div>
        </div>
        <div className="rounded-lg bg-white flex items-center justify-center h-full border-6 py-3 px-2 border-black">
          <div className="leading-none -mt-3" >&#x1F0DE;</div>
        </div>
      </div>

      


      



    </div>
  )
}

export default CardShowcase
