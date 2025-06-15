import React from "react";
import { FcGoogle } from "react-icons/fc";
import { getAuth,GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { app } from "../firebase";
import {useDispatch} from "react-redux"
import {signInSuccess} from "../redux/user/userSlice.js"
import { use } from "react";
import {useNavigate} from "react-router-dom"

 
export const OAuth = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const handleGoogleClick=async ()=>{
    try {
      const provider=new GoogleAuthProvider();
      const auth=getAuth(app);
      const result= await signInWithPopup(auth,provider);
      
      const res=await fetch("/api/auth/google",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          name:result.user.displayName,
          email:result.user.email,
          photo:result.user.photoURL,
        })
      });
      const data=await res.json();
      dispatch(signInSuccess(data));
      navigate("/")

    } catch (error) {
      console.log("Could not Sign In Google ",error);
    }
  };
    
  return (
    <button onClick={handleGoogleClick} type='button'  className='flex items-center justify-center  gap-2  bg-red-700 text-white p-2 rounded-lg hover:opacity-95 cursor-pointer uppercase' >
            <FcGoogle  className='text-xl'/> 
            Continue with google
        
    </button>
  )
}
