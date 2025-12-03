import axios from "axios"
import { BASE_URL } from "../utils/constent"
import { removeFeed } from "../utils/feedSlice"
import { useDispatch } from "react-redux"

const userCard = ({user}) => {
  const {_id, firstName, lastName, about, photoUrl, gender, } =user

  const dispatch = useDispatch();
  const sendRequestHandler = async(status,requestId)=>{
    try {
      const response = await axios.post(BASE_URL+"/request/send/"+status+"/"+requestId ,{}, {withCredentials: true});
      dispatch(removeFeed(requestId))
    } catch (error) {
      console.log(error)
    }
  }
  return (
  <div
    className="
      w-full 
      max-w-xs sm:max-w-sm md:max-w-md 
      mx-auto
    "
  >
    <div className="card bg-base-300 shadow-sm my-20">

    
      <figure className="px-4 pt-4 flex justify-center">
        <img
          src={photoUrl}
          alt="User"
          className="
            rounded-xl object-cover 
            w-32 h-32
            sm:w-40 sm:h-40 
            md:w-48 md:h-48
          "
        />
      </figure>

      <div className="card-body items-center text-center">
        
        <h2 className="card-title text-lg sm:text-xl">
          {firstName} {lastName}
        </h2>

        <p className="text-sm sm:text-base">{about}</p>

       
        <div className="card-actions flex flex-col sm:flex-row justify-center gap-3 mt-4 w-full">
          <button
            className="btn btn-primary mx-auto w-1/3 sm:w-auto"
            onClick={() => sendRequestHandler("ignored", _id)}
          >
            Ignore
          </button>

          <button
            className="btn btn-secondary mx-auto  w-1/3 sm:w-auto"
            onClick={() => sendRequestHandler("interested", _id)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  </div>
);
}

export default userCard