import React from 'react'
import Layout from './Layout';

const Signup = () => {
  return (
    <div className='grid grid-cols-2 h-screen overflow-hidden bg-stone-200'>
      <div>
        <img 
          src='/images/signup.jpg' 
          alt='signup'
          className='w-9/12 justify-center items-center ml-20 mt-10'
        />
      </div>
      <div className='flex flex-col justify-center p-8'>
        <h1 className='text-3xl font-bold '>New User</h1>
        <p className='text-lg text-gray-600'>Create your account to start shopping</p>
        <form className='mt-8'>
          <div className='flex flex-col space-y-2'>
            <label className='text-xl font-semibold'>Fullname</label>
            <input 
              name='fullname'
              type='text'
              placeholder='Enter your firstname'
              className='border border-gray-300 rounded-md p-2'
              required
            />
            <label className='text-xl font-semibold mb-2'>Lastname</label>
            <input 
              name='lastname'
              type='text'
              placeholder='Enter your lastname'
              className='border border-gray-300 rounded-md p-2'
              required
            />
            <label className='text-xl font-semibold mb-2'>Email</label>
            <input 
              name='email'
              type='email'
              placeholder='example@gmail.com'
              className='border border-gray-300 rounded-md p-2'
              required
            />

            <div className='flex flex-col relative'>
              <label className='text-xl font-semibold mb-2'>Password</label>
              <input 
                name='password'
                type='password'
                placeholder='************'
                className='border border-gray-300 rounded-md p-2'
                required
              />
              <button 
                type='button'
                className='absolute top-10 right-4 hover:bg-purple-200 w-8 h-8 rounded-full hover:text-purple-600'
              >
                <i className="ri-eye-line"></i>
              </button>
            </div>

          </div>

          <button 
            className='bg-purple-600 text-white px-6 py-3 text-2xl font-semibold flex w-full rounded-md mt-10 justify-center'
          > 
            Signup
          </button>
        </form>
      </div>
    </div>
  )
}

export default Signup;