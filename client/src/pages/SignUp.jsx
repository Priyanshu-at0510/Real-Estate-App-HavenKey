import React, { useState } from 'react'
import { useNavigate ,Link} from 'react-router-dom';
import { OAuth } from '../components/OAuth';
export const SignUp = () => {
  const [error,setError]=useState(null);
  const [loading,setLoading]=useState(false);
  const [formData,setFormData]=useState({});
  const navigate=useNavigate();
  const handleChange=(e)=>{
    setFormData({...formData,[e.target.id]:e.target.value});
    console.log(formData);
  }
  const handleSubmit=async (e)=>{
    e.preventDefault();
    try{
      setLoading(true);
      const res= await fetch("/api/auth/signup",{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
        },
        body:JSON.stringify(formData)
      });
      const data=await res.json();
      console.log(data);
      if(data.success==false){
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate("/SignIn")
    }
    catch(error){
      setLoading(false);
      setError(error.message);
    }
    
  };
  return (
    
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4 mx-auto'>
        <input
         type='text' 
         placeholder='Username' 
         className='border p-3 rounded-lg ' 
         id="userName"
         onChange={handleChange}
        />
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
          {loading ? "Loading...":"Sign Up"}
        </button>
        <OAuth/>
      </form>
      <div className='flex gap-2 mt-5'>
        <p className=''>Have an account ?</p>
        <Link to={"/SignIn"}>
        <span className='text-blue-700'>Sign In</span>
        </Link>
      </div>
      {error && <p className='text-red-500 m '>{error}</p> }
    </div>
  )
}
