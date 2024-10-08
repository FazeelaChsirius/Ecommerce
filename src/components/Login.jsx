import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from './Layout';

const Login = () => {
  const [passwordType, setPasswordType] = useState('password')

  return (
    <Layout>

      <div className='grid md:grid-cols-2 md:h-screen md:overflow-hidden bg-white'>

        <div className='flex flex-col justify-center'>
          <img 
            src='/images/signup.png' 
            alt='login'
            className='md:h-[500px] md:m-20 h-60 md:shadow-md object-cover mt-8'
          />
        </div>

        <div className='flex flex-col justify-center md:p-16 p-6 md:mr-12'>
          <h1 className='text-3xl font-bold '>Login</h1> 
          <p className='text-lg text-gray-600 mt-3'>Enter profile details to login</p>

          <form className='mt-8'>
            <div className='flex flex-col space-y-2'>

              <div className='flex flex-col my-3'>
                <label className='text-xl font-semibold mb-2'>Email</label>
                <input 
                  name='email'
                  type='email'
                  placeholder='example@gmail.com'
                  className='border border-gray-300 rounded-md p-2'
                  required
                />
              </div>

              <div className='flex flex-col relative my-3'>
                <label className='text-xl font-semibold mb-2'>Password</label>
                <input 
                  name='password'
                  type={passwordType}
                  placeholder='************'
                  className='border border-gray-300 rounded-md p-2 mt-1'
                  required
                />
                <button 
                  type='button'
                  onClick={() => setPasswordType(passwordType === 'password' ? 'text' : 'password')}
                  className='absolute top-10 right-4 hover:bg-purple-200 w-8 h-8 rounded-full hover:text-purple-600'
                >
                  {
                    passwordType === 'password' 
                      ? <i className="ri-eye-line"></i> 
                      : <i className="ri-eye-off-line"></i>
                  }
                </button>
              </div>

            </div>

            <button 
              className='bg-purple-600 text-white px-6 py-3 text-2xl font-semibold flex w-full rounded-md mt-10 justify-center'
            > 
              Login
            </button>
          </form>

          <div className='mt-2 text-gray-600'>
            Don't have an account ? <Link to='/signup' className='text-purple-600'>Register now</Link>
          </div>

        </div>
      </div>
    </Layout>
  )
}

export default Login;