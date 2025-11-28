
import { useState } from 'react'
import UserCard from './UserCard'
import Profile from './Profile'
import { useDispatch } from 'react-redux'
import { addUser } from '../utils/userSlice'
import { API_URL } from '../utils/constent'
import axios from 'axios'
 
const EditProfile = ({user}) => {

  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [about, setAbout] = useState(user.about);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
    const [toast, setToast] = useState(false)
 
  const dispatch = useDispatch()
    const clickHandler = async()=>{
        try{
            const response = await axios.patch(API_URL+"/profile/edit", {
                firstName,
                lastName,
                about,
                photoUrl
            },
            {withCredentials: true})
            
            dispatch(addUser(response?.data?.data))
            const interval = setInterval(() => {
                setToast(true)
            }, 1000);
            setTimeout(() => {
                clearInterval(interval)
                setToast(false)
            }, 3000);
        }
        catch(error){
            console.log(error)
        }
    }
return (
    <>
   <div className='flex justify-center  my-10 '>
        <div className='flex justify-center mx-10'>
            <fieldset className="fieldset bg-base-300 border-base-300 rounded-box w-xs border p-4">
            <legend className="fieldset-legend">Edit Profile</legend>

            <label className="label">First Name</label>
            <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="input" placeholder="First Name" />

            <label className="label">Last Name</label>
            <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className="input" placeholder="Last Name" />

            <label className="label">About</label>
            <input type="text" value={about} onChange={(e) => setAbout(e.target.value)} className="input" placeholder="About" />

            <label className="label">Photo URL</label>
            <input type="text" value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} className="input" placeholder="Photo URL" />

             <button className="btn btn-neutral mt-4" onClick={clickHandler}>Update Profile</button>
        </fieldset>
        </div>
    
             <UserCard user={{firstName,lastName,about,photoUrl }}/>
        
   </div>
   <div className="toast toast-top toast-center">
{toast && <div className="alert alert-success">
    <span>Data updated successfully.</span>
  </div>}
</div>
</>
    
)
}
export default EditProfile