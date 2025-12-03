
import axios from 'axios'
import { BASE_URL } from '../utils/constent'
import { addConnections } from '../utils/connectionSlice';
import { useDispatch } from 'react-redux';
import  { useEffect }  from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
const Connection = () => {
    

    const connections = useSelector((state)=>state.connection)
   
   const dispatch = useDispatch();
    const fetchConnection = async()=>{
        try{
            const response = await axios.get(BASE_URL+"/user/connections", {
                withCredentials: true
            })
        
            dispatch(addConnections(response?.data.data))
        }
        catch(error){
            console.log(error)
        }
    }
    useEffect(()=>{
        fetchConnection()
    },[])
    if(!connections) return;
    if(connections.length ===0) return <h1 className='flex text-4xl my-[50vh] items-center justify-center'>No connections</h1>
    
    return (
  <div className="text-center my-30">
    <h1 className="font-bold text-4xl">Connection</h1>

    {connections.map((connection) => {
      const { _id, firstName, lastName, about, photoUrl } = connection;

      return (
        <div
          key={_id}
          className="
            flex flex-col md:flex-row 
            items-center 
            gap-4 md:gap-2
            p-4 mb-4  
            border-2 rounded-lg 
            w-1/2 sm:w-3/4 md:w-2/3 lg:w-1/2 
            mx-auto
          "
        >
          {/* LEFT - Profile Image */}
          <img
            className="w-20 h-20 rounded-full object-cover"
            src={photoUrl}
            alt="userPhoto"
          />

          {/* MIDDLE - User Bio */}
          <div className="text-center md:text-left flex-1">
            <h1 className="font-bold uppercase text-lg md:text-xl">
              {firstName} {lastName}
            </h1>

            <p className="text-sm md:text-base mt-1">{about}</p>
          </div>

          {/* RIGHT - Chat button on large screens */}
          <div className="w-1/4 md:w-auto md:ml-auto">
            <Link to={`/chat/${_id}`}>
              <button className="btn btn-primary mt-3 w-full md:w-auto">
                Chat
              </button>
            </Link>
          </div>
        </div>
      );
    })}
  </div>
);

}

export default Connection