import { useState } from 'react'
import { useParams } from 'react-router-dom'

const chat = () => {
    const {targetUserId} = useParams();
    console.log(targetUserId);

    // storing previous messsage/conversation
const [messages, setMessages] = useState([
  { text: "Hello there!", senderName: "User1" }
]);
  return (
    <div className='w-1/2 mx-auto border-2 rounded-lg h-[70vh] flex flex-col'>
        <h1 className='p-5 border-b border-grey-600'>Chat</h1>

        <div className='flex-1 overflow-scroll p-5'>
            {messages.map((msg,index)=>{
            return(   <div key={index} className="chat chat-start">
  <div className="chat-header">
    Deepak Malik
    <time className="text-xs opacity-50">2 hours ago</time>
  </div>
  <div className="chat-bubble">You were the Chosen One!</div>
  <div className="chat-footer opacity-50">Seen</div>
</div>         );
             })}
        </div>


        <div className='p-5 mt-5 border-grey-600  bg-base-200 w-full '>
            <input className='input' type="text" placeholder="Enter message" />
        </div>
        <div className='p-5 border-grey-600'>
            <button className='btn btn-primary'>Send</button>
        </div>
    </div>
    
  )
}

export default chat