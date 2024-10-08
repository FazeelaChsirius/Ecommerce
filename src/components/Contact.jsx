import React from 'react'
import Layout from './Layout';

const Contact = () => {
  return (
    <Layout>
        <div className='md:grid grid-cols-2'>
            <div>
                <img 
                    src='/images/contactus.jpg' 
                    alt='pic'
                    className='md:w-[500px] w-72 mx-auto md:my-16 shadow-xl rounded-xl md:mt-20 mt-7'
                />
            </div>

            <div> 
                <form className='mt-8'>
                    <div className='flex flex-col space-y-2 md:mr-20 m-10'>

                        <div className='flex flex-col md:my-3'>
                            <label className='text-xl font-semibold mb-2'>Your name</label>
                            <input 
                            name='name'
                            type='text'
                            placeholder='Enter your name'
                            className='border border-gray-300 rounded-md p-2'
                            required
                            />
                        </div>

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

                        <div className='flex flex-col my-3'>
                            <label className='text-xl font-semibold mb-2'>Message</label>
                            <textarea 
                            name='message'
                            type='text'
                            placeholder='Enter your message'
                            className='border border-gray-300 rounded-md p-2'
                            rows={3}
                            />
                        </div>
                    </div>

                    <div className='md:mr-20 m-10'>

                        <button 
                            className='bg-purple-600 text-white px-6 py-3 text-2xl font-semibold flex w-full rounded-xl md:mt-10 justify-center mb-8'
                        > 
                            Submit
                        </button>
                    </div>

                </form>
            </div>
        </div>
    </Layout>
  )
}

export default Contact;