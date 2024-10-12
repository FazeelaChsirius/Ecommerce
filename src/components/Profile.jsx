import React, { useEffect, useState } from 'react'
import Layout from './Layout';
import firebaseAppConfig from '../utils/firebase-config';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';

const auth = getAuth(firebaseAppConfig);
const storage = getStorage();

const Profile = () => {
    const navigate = useNavigate()
    const [session, setSession] = useState(null)
    const [formValue, setFormValue] = useState({
        name: '',
        email: '',
        address: '',
        mobile: '',
        city: '',
        state: ''
    })

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if(user) {
                setSession(user)

            } else {
                setSession(false)
                navigate('/login')
            }
        })
    }, [navigate]);

    const setProfilePhoto = async (e) => {
        const input = e.target;
        const file = input.files[0];

        const storageRef = ref(storage, `profile-photos/${file.name}`);

        uploadBytes(storageRef, file).then((snapshot) => {
            console.log('File uploaded successfully');
            console.log(snapshot)

        }).catch((error) => {
            console.error('Error uploading file:', error);
        })
    }


    const handleFormValue = (e) => {
        const input = e.target
        const name = input.name
        const value = input.value
        setFormValue({
            ...formValue,
            [name]: value
        })
    }

    if(session === null) {
        return (
          <div className='flex justify-center items-center h-screen'>
            <button type="button" className="bg-purple-600 text-white font-bold py-2 px-4 rounded inline-flex items-center" disabled>
              <svg className="animate-spin h-8 w-8 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {/* Smooth, thinner circle moved */}
                <circle className="opacity-52" cx="8" cy="8" r="8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" transform="translate(5, 5)"></circle>
              </svg>
              Processing...
            </button>
          </div>
        );
      }

  return (
    <Layout>
        <div className='md:my-16 p-8 border shadow-lg mx-auto md:w-7/12 rounded-md'>
            <div className='flex gap-4 font-semibold text-3xl'>
                <i className="ri-user-line"></i>
                <h1>Profile</h1>
            </div>
            <hr className='my-6'/>

            <div className='relative flex justify-center items-center mt-4 mx-auto w-24 h-24'>
                <img 
                    src='/images/image.avif' 
                    alt='pic'
                    className='w-24 h-24 rounded-full cursor-pointer'
                />
                <input 
                    type='file' 
                    accept='image/*' 
                    className='absolute w-full top-0 left-0 p-20 opacity-0'
                    onChange={setProfilePhoto}
                />
            </div>

            <div className='-mt-8'>
            <form>
                    <div className='flex flex-col space-y-2 md:mr-20 m-10'>

                        <div className='flex flex-col md:my-3'>
                            <label className='text-xl font-semibold mb-2'>Your name</label>
                            <input 
                                onChange={handleFormValue}
                                name='name'
                                type='text'
                                placeholder='Enter your name'
                                className='border border-gray-300 rounded-md p-2'
                                required
                                value={session.displayName}
                            />
                        </div>

                        <div className='flex flex-col my-3'>
                            <label className='text-xl font-semibold mb-2'>Email</label>
                            <input 
                                onChange={handleFormValue}
                                name='email'
                                type='email'
                                placeholder='example@gmail.com'
                                className='border border-gray-300 rounded-md p-2'
                                required
                                value={session.email}
                            />
                        </div>

                        <div className='flex flex-col my-3'>
                            <label className='text-xl font-semibold mb-2'>Address</label>
                            <input
                                onChange={handleFormValue}
                                name='address'
                                type='text'
                                placeholder='Enter your address'
                                className='border border-gray-300 rounded-md p-2'
                                value={formValue.address}
                            />
                        </div>

                        <div className='flex flex-col my-3'>
                            <label className='text-xl font-semibold mb-2'>Mobile</label>
                            <input
                                onChange={handleFormValue}
                                name='mobile'
                                type='number'
                                placeholder='Enter your mobile'
                                className='border border-gray-300 rounded-md p-2'
                                value={formValue.mobile}
                            />
                        </div>

                        <div className='flex flex-col my-3'>
                            <label className='text-xl font-semibold mb-2'>City</label>
                            <input
                                onChange={handleFormValue}
                                name='city'
                                type='text'
                                placeholder='Enter your city'
                                className='border border-gray-300 rounded-md p-2'
                                value={formValue.city}
                            />
                        </div>

                        <div className='flex flex-col my-3'>
                            <label className='text-xl font-semibold mb-2'>State</label>
                            <input
                                onChange={handleFormValue}
                                name='state'
                                type=''
                                placeholder='Enter your state'
                                className='border border-gray-300 rounded-md p-2'
                                value={formValue.state}
                            />
                        </div>

                    </div>

                    <div className='md:mr-20 m-10'>

                        <button 
                            className='bg-purple-600 text-white px-6 py-3 text-2xl font-semibold flex w-full rounded-xl md:mt-10 justify-center mb-8'
                        > 
                            Save
                        </button>
                    </div>

                </form>
            </div>
        </div>
    </Layout>
  )
}

export default Profile;