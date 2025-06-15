import React from 'react'
import { FaSearchengin } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import {useSelector} from "react-redux";
export const Headers = () => {

  const {currentUser}=useSelector((state)=>state.user);
  return (
    <header className='bg-slate-200 shadow-md'>
        <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
            <Link to="/">
            <h1 className='font-bold text-sm sm:text-xl'>
                <span className='text-slate-700'>Heaven Key</span>
            </h1>
            </Link>
            <form className='flex items-center bg-slate-100 p-3 rounded-lg'>
                <input type='text' placeholder='search....' className='bg-transparent focus:outline-none w-24 sm:w-64'/>
                <FaSearchengin className='text-slate-600 cursor-pointer'/>
            </form>
            <ul className='flex gap-4'>
                <Link to="/">
                <li className='hidden sm:inline text-slate-700 hover:underline cursor-pointer'>Home</li>
                </Link>
                <Link to="/about">
                <li className='hidden sm:inline text-slate-700 hover:underline cursor-pointer'>About</li>
                </Link>
                <Link to="/Profile">
                  {currentUser ?(
                    <img src={ currentUser.avatar } alt="avatar" className='w-8 h-8 rounded-full object-cover '/>
                  ):(
                    <li className='sm:inline text-slate-700 hover:underline cursor-pointer'>Sign In</li>
                  )}
                </Link>
            </ul>
        </div>
    </header>
  )
}
