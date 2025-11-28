import axios from "axios"
import { API_URL } from "../utils/constent"
import { removeFeed } from "../utils/feedSlice"
import { useDispatch } from "react-redux"

const userCard = ({user}) => {
  const {_id, firstName, lastName, about, photoUrl, gender, } =user

  const dispatch = useDispatch();
  const sendRequestHandler = async(status,requestId)=>{
    try {
      const response = await axios.post(API_URL+"/request/send/"+status+"/"+requestId ,{}, {withCredentials: true});
      dispatch(removeFeed(requestId))
    } catch (error) {
      console.log(error)
    }
  }
  return (          
  
  <div className="card bg-base-300 w-96 shadow-sm">
  <figure>
    <img
      src={photoUrl}
      alt="Shoes" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{firstName} {lastName}</h2>
    <p>{about}</p>
   
    <div className="card-actions justify-center my-4 ">
      <button className="btn btn-primary" onClick={()=>sendRequestHandler("ignored",_id)}>Ignore</button>
       <button className="btn btn-secondary" onClick={()=>sendRequestHandler("interested",_id)}>Interested</button>
    </div>
  </div>
</div>
  )
}

export default userCard