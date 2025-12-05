
import { useState } from 'react'
import UserCard from './UserCard'
import Profile from './Profile'
import { useDispatch } from 'react-redux'
import { addUser } from '../utils/userSlice'
import { BASE_URL } from '../utils/constent'
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
            const response = await axios.patch(BASE_URL+"/profile/edit", {
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
    <div
      className="
        flex flex-col lg:flex-row 
        justify-center 
        items-center 
        gap-8 
        my-10 
        px-4
      "
    >
      {/* FORM */}
      <div className="w-full max-w-sm">
        <fieldset className="fieldset bg-base-300 border-base-300 rounded-box border p-4">
          <legend className="fieldset-legend">Edit Profile</legend>

          <label className="label">First Name</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="input w-full"
            placeholder="First Name"
          />

          <label className="label">Last Name</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="input w-full"
            placeholder="Last Name"
          />

          <label className="label">About</label>
          <input
            type="text"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            className="input w-full"
            placeholder="About"
          />

          <label className="label">Photo URL</label>
          <input
            type="text"
            value={photoUrl}
            onChange={(e) => setPhotoUrl(e.target.value)}
            className="input w-full"
            placeholder="Photo URL"
          />

          <button
            className="btn btn-neutral mt-4 w-full lg:w-auto"
            onClick={clickHandler}
          >
            Update Profile
          </button>
        </fieldset>
      </div>

 
      <div className="w-full max-w-md flex flex-col items-center mt-6">
        <h2 className="text-lg font-semibold mb-2 text-center opacity-80">
          Profile Preview (How others see you)
        </h2>

        <UserCard
          user={{
            firstName,
            lastName,
            about,
            photoUrl,
          }}
        />
      </div>

    </div>

    <div className="toast toast-top toast-center">
      {toast && (
        <div className="alert alert-success">
          <span>Data updated successfully.</span>
        </div>
      )}
    </div>
  </>
);


}
export default EditProfile