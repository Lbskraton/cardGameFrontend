

interface MessageCardProps{
    text:string
}

function MessageCard({text}:MessageCardProps) {
  return (
    <div className="text-black bg-white m-2.5 text-center rounded-lg grid grid-cols-3 content-between gap-4"><div>&#9670;</div><div>{text}</div><div>&#9670;</div></div> 
  )
}

export default MessageCard
