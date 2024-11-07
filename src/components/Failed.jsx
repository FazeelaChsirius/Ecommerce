import React from 'react'
import { Link } from 'react-router-dom';

const Failed = () => {
  return (
    <div className='h-screen flex justify-center items-center'>
        <div className='w-2/6 text-center space-y-6'>
            <img src='/images/failed.svg' alt='pic'/>
            <h1 className='text-4xl font-bold'>Payment Failed!</h1>
            <Link 
                to='/'
                className='bg-purple-600 px-4 py-2 text-white block w-fit mx-auto rounded-md font-bold'
            >
                Go Back
            </Link>
        </div>
    </div>
  )
}

export default Failed;