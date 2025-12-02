import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { BASE_URL } from '../utils/constent'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utils/feedSlice'
import UserCard from './UserCard'
const feed = () => {
  

  const feed = useSelector((store)=>store.feed)
  const dispatch = useDispatch()
  const [error, setError] = useState("")
  const getFeed = async()=>{
    try {
      if(feed){
        return;
      }
      const response = await axios.get(BASE_URL+ "/feed", {withCredentials: true})
       
      dispatch(addFeed(response?.data?.data));
    } catch (error) {
      setError(error.response.data || "Something went wrong")
    } 
  }
   useEffect(()=>{
    getFeed()
   },[]);

if (!feed) return;

if(feed.length <= 0){
    return <h1 className='text-center text-4xl my-[50vh]'>No feed</h1>
}
  return (
  feed && (
    <div className="flex justify-center my-10"> 
    < UserCard user={feed[0]}/>
    </div>
  )
)
  
}

export default feed