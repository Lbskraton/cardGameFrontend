

interface MessageCardProps{
    
    type?:string,
    size?:string,
    children:React.ReactNode
}

function MessageCard({type,size,children}:MessageCardProps) {

  const suites=new Map([["spades", "♠"],["hearts",  "♥"],["joker","🃏"]])

  const sizeClass = size ? `${size}` : "";


  const suite=suites.get(type || "spades") 

  return (
    <div className="p-4 text-black bg-white m-2.5 text-center rounded-lg grid grid-cols-3 content-between gap-4 items-center"><div  className={sizeClass}>{suite}</div><div>{children}</div><div className={sizeClass}>{suite}</div></div> 
  )
}

export default MessageCard
