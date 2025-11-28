import React, { useEffect } from 'react'
import axios from 'axios'
import { API_URL } from '../utils/constent'
import { useDispatch } from 'react-redux'
import { addRequest } from '../utils/requestSlice'
import { useSelector } from 'react-redux'
import { removeRequest } from '../utils/requestSlice'

const Requests = () => {
    const request = useSelector((state)=>state.request)
    const dispatch = useDispatch()
 
    const fetchRequest = async()=>{
    try {
        const response = await axios.get( API_URL+"/user/requests/received", {
                withCredentials: true
            })
       
        dispatch(addRequest(response?.data.data))
    } catch (error) {
            console.log(error)
        }
    }

    const requestHandler = async(status,requestId)=>{
        try {
            const response= await axios.post(API_URL+"/request/review/"+status+ "/"+ requestId, {}, {
                 withCredentials: true
            })
            dispatch(removeRequest(requestId))
         
            
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        fetchRequest()
    },[])
 if(!request) return;
    if(request.length ===0) return <h1 className='flex  text-4xl my-[50vh] items-center justify-center'>No Request</h1>
    
    return (
    <div className='  text-center my-30'> 
        <h1 className='text-bold  text-4xl my-5'>Request</h1>
    
    
        {request.map((request)=>{
            const { _id, firstName, lastName, about, photoUrl} = request.fromUserId;
            console.log(request);
           const requestId = request._id;
         
            return(
                <div key={_id} className='flex item-center justify-center space-in-between m-auto p-4 border-2 rounded-lg w-1/2'>
                    <div>  
                        <img className="w-20 h-20 rounded-full" src={photoUrl} alt="userPhoto" />
                    </div>
                    <div className='text-left mx-4'> 
                     <h1 className='font-bold uppercase'>{firstName} {lastName}</h1>
                   
                        <p>{about}</p>
                    </div>
                   
           <div className='flex  item-center '>
            <button className="btn btn-info mx-2" onClick={()=>requestHandler("rejected",requestId)}>Reject</button>
            <button className="btn btn-success mx-2" onClick={()=>requestHandler("accepted",requestId)}>Accept</button></div>
          
             </div>
        )})}
    
    </div>

  )
}

export default Requests