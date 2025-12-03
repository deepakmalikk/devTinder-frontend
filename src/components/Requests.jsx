import React, { useEffect } from 'react'
import axios from 'axios'
import { BASE_URL  } from '../utils/constent'
import { useDispatch } from 'react-redux'
import { addRequest } from '../utils/requestSlice'
import { useSelector } from 'react-redux'
import { removeRequest } from '../utils/requestSlice'

const Requests = () => {
    const request = useSelector((state)=>state.request)
    const dispatch = useDispatch()
 
    const fetchRequest = async()=>{
    try {
        const response = await axios.get( BASE_URL+"/user/requests/received", {
                withCredentials: true
            })
       
        dispatch(addRequest(response?.data.data))
    } catch (error) {
            console.log(error)
        }
    }

    const requestHandler = async(status,requestId)=>{
        try {
            const response= await axios.post(BASE_URL+"/request/review/"+status+ "/"+ requestId, {}, {
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
         
     return (
  <div
    key={_id}
    className="
      flex flex-col md:flex-row
      items-center md:items-center
      justify-between
      gap-4
      m-auto mb-4
      p-4
      border-2 rounded-lg
      w-1/2 sm:w-3/4 md:w-2/3 lg:w-1/2
    "
  >
    
    <div className="flex-shrink-0">
      <img
        className="w-20 h-20 rounded-full object-cover"
        src={photoUrl}
        alt="userPhoto"
      />
    </div>

   
    <div className="text-center md:text-left mx-0 md:mx-4 flex-1">
      <h1 className="font-bold uppercase text-lg">
        {firstName} {lastName}
      </h1>
      <p className="text-sm mt-1">{about}</p>
    </div>

  
    <div className="flex flex-col sm:flex-row items-center gap-2 mt-2 md:mt-0">
      <button
        className="btn btn-info w-full sm:w-auto"
        onClick={() => requestHandler("rejected", requestId)}
      >
        Reject
      </button>
      <button
        className="btn btn-success w-full sm:w-auto"
        onClick={() => requestHandler("accepted", requestId)}
      >
        Accept
      </button>
    </div>
  </div>
);
})}
    
    </div>

  )
}

export default Requests