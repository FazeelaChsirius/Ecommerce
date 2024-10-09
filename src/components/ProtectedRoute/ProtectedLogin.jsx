import React, { useEffect, useState } from 'react';
import firebaseAppConfig from '../../utils/firebase-config';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Navigate, Outlet } from 'react-router-dom';

const auth = getAuth(firebaseAppConfig);

const ProtectedLogin = () => {
    const [session, setSession] = useState(null)

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if(user){
                setSession(user)
            } else {
                setSession(false)
            }
        }) 
    }, []);

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

    if(session){
        return <Navigate to='/' />
    }

    return <Outlet />

}

export default ProtectedLogin;