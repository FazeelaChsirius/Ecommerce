import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from './Layout';
import firebaseAppConfig from '../utils/firebase-config';
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';

const auth = getAuth(firebaseAppConfig)

const Login = () => {
  const navigate = useNavigate();
  const [passwordType, setPasswordType] = useState('password');
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(null);
  const [formValue, setFormValue] = useState({
    email: '',
    password: ''
  });

  const login = async (e) => {
    try {
      e.preventDefault()
      setLoader(true)
      await signInWithEmailAndPassword(auth, formValue.email, formValue.password)
      navigate('/')
      
    } catch (error) {
      console.log(error, 'Error in Login')
    } finally {
      setLoader(false)
    }
    
  }

  const handleChange = (e) => {
    const input = e.target
    const name = input.name
    const value = input.value
    setFormValue({
      ...formValue,
      [name]: value
    })
    setError(null)

  }

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

          <form className='mt-8' onSubmit={login}>
            <div className='flex flex-col space-y-2'>

              <div className='flex flex-col my-3'>
                <label className='text-xl font-semibold mb-2'>Email</label>
                <input 
                  onChange={handleChange}
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
                  onChange={handleChange}
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

            {
              loader ?
              <h1 className='text-lg font-semibold text-gray-600'>Loading...</h1>
              :
              <button 
                className='bg-purple-600 text-white px-6 py-3 text-2xl font-semibold flex w-full rounded-md mt-10 justify-center'
              > 
                Login
              </button>
            }
          </form>

          <div className='mt-2 text-gray-600'>
            Don't have an account ? <Link to='/signup' className='text-purple-600'>Register now</Link>
          </div>

          { error && 
            <div className='flex justify-between items-center mt-3 bg-red-400 p-3 rounded-md text-white font-semibold text-center'>
              <p>Invalid Credentials, Please try again later</p>
              <button onClick={() => setError(null)}>
                <i className="ri-close-line p-2"></i>
              </button>
            </div>
          }

        </div>
      </div>
    </Layout>
  )
}

export default Login;