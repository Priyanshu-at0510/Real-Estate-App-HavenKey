import React, { useState ,useEffect} from 'react'
import { useNavigate ,Link} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart,signInSuccess,signInFailure,clearError } from '../redux/user/userSlice';
import { OAuth } from '../components/OAuth';
export const SignIn = () => {

  const dispatch=useDispatch();
  const {loading,error}=useSelector((state)=>state.user);
  const navigate=useNavigate();
  const [formData,setFormData]=useState({});

  // Clear error when component mounts
  useEffect(() => {
    dispatch(clearError());
  }, []);
  
  const handleChange=(e)=>{
    setFormData({...formData,[e.target.id]:e.target.value});
    dispatch(clearError());
    console.log(formData);
  }
  const handleSubmit=async (e)=>{
    e.preventDefault();
    try{
      dispatch(signInStart());
      const res= await fetch("/api/auth/signin",{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
        },
        body:JSON.stringify(formData)
      });
      const data=await res.json();
      console.log(data);
      if(data.success==false){
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data ));
      dispatch(clearError());
      navigate("/home");
    }
    catch(error){
      dispatch(signInFailure(error.message));
    }
    
  };
  return (
    
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4 mx-auto'>
        <input
         type='text' 
         placeholder='Ishu@example.com' 
         className='border p-3 rounded-lg ' 
         id="email"
         onChange={handleChange}
        />
        <input
         type='password' 
         placeholder='Password' 
         className='border p-3 rounded-lg ' 
         id="password"
         onChange={handleChange}
        />
        <button disabled={loading} className='bg-slate-700 text-white p-2 cursor-pointer rounded-lg uppercase hover:opacity-95 disabled:opacity-0 '>
          {loading ? "Loading...":"Sign In"}
        </button>
        <OAuth/>
      </form>
      <div className='flex gap-2 mt-5'>
        <p className=''>Don't Have an account ?</p>
        <Link to={"/SignUp"}>
        <span className='text-blue-700'>Sign Up</span>
        </Link>
      </div>
      {error && <p className='text-red-500 m '>{error}</p> }
    </div>
  )
}
