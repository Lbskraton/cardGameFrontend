

interface MessageCardProps{
    text:string,
    type?:string
}

function MessageCard({text,type}:MessageCardProps) {

  const suites=new Map([["spades", "♠"],["hearts",  "♥"],["joker","🃏"]])


  const suite=suites.get(type || "spades") 

  return (
    <div className="text-black bg-white m-2.5 text-center rounded-lg grid grid-cols-3 content-between gap-4"><div>{suite}</div><div>{text}</div><div>{suite}</div></div> 
  )
}

export default MessageCard
