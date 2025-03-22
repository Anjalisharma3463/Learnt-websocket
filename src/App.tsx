import { useEffect, useRef, useState } from 'react'
 
import './App.css'



// want to connect a WebSocket server when this app component mount on browser  
function App() {
 const [socket , setsocket] = useState<WebSocket | null>(null);
 const inputref = useRef<HTMLInputElement | null>(null);
 
 function sendMessage (){
  // this will code run overy render ' '
if(!socket){
  return;
}

if(!inputref.current){
return;
}
const message = inputref.current.value;
//@ts-ignore
socket.send(message )
 }

 useEffect(() => {
  // this will run only once when component mount on browser
  // connect to websocket server
  const ws = new WebSocket('ws://localhost:8080')
  setsocket(ws);
  ws.onopen = () => {
    console.log('connected')
  } 
  ws.onmessage = (e) => {
   alert( e.data)
  }
   
  }, [])

  return (
    <>
     <div>
      <input ref={inputref} type="text" placeholder="message..." />
      <button  onClick={sendMessage}>Send</button>
     </div>
    </>
  )
}

export default App
