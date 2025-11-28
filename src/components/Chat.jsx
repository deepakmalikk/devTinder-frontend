import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { createSocketConnection } from '../utils/socket';
import { useSelector } from 'react-redux';


const chat = () => {
    const {targetUserId} = useParams();
    console.log(targetUserId);
    const [newMessage, setNewMessage] = useState([]);

    // storing previous messsage/conversation
const [messages, setMessages] = useState([]);

const user = useSelector(store => store.user);
const userId = user?._id;

useEffect(() => {
  if(!userId){
    return;
  }
   const socket = createSocketConnection(); 
   socket.emit("joinChat", {userId, targetUserId});
  
  
   socket.on("receiveMessage", (firstName, message)=>{
    console.log(firstName, message);
    setMessages((messages)=> [...messages, {firstName, message}])
})
   return ()=>{
    socket.disconnect();   
   }
},[userId, targetUserId])


const sendMessage = () => {
  const socket = createSocketConnection();
  socket.emit("sendMessage", 
    {
      firstName: user.firstName, 
      userId, 
      targetUserId, 
      message: newMessage
    });
    setMessages("");
}
  return (
    <div className='w-1/2 mx-auto border-2 rounded-lg h-[70vh] flex flex-col'>
        <h1 className='p-5 border-b border-grey-600'>Chat</h1>

        <div className='flex-1 overflow-scroll p-5'>
            {messages.map((msg,index)=>{
            return(   <div key={index} className="chat chat-start">
  <div className="chat-header">
    {msg.firstName}
    <time className="text-xs opacity-50">2 hours ago</time>
  </div>
  <div className="chat-bubble">{msg.message}</div>
  <div className="chat-footer opacity-50">Seen</div>
</div>         );
             })}
        </div>


        <div className='p-5 mt-5 border-grey-600  bg-base-200 w-full '>
            <input className='input' type="text" value={newMessage} onChange={(e)=> setNewMessage(e.target.value)} placeholder="Enter message" />
        </div>
        <div className='p-5 border-grey-600'>
            <button onClick={sendMessage()} className='btn btn-primary'>Send</button>
        </div>
    </div>
    
  )
}

export default chat