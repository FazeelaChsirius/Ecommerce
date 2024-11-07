import firebaseAppConfig from '../utils/firebase-config';
import { getAuth, onAuthStateChanged, updateProfile } from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getFirestore, collection, addDoc, getDocs, query, where, updateDoc, doc } from 'firebase/firestore';

import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Layout from './Layout';
import Swal from 'sweetalert2';

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(firebaseAppConfig);
const auth = getAuth(firebaseAppConfig);
const storage = getStorage(firebaseAppConfig);

const Profile = () => {
    const navigate = useNavigate()
    const [orders, setOrders] = useState([])
    const [session, setSession] = useState(null)
    const [uploading, setUploading] = useState(false)
    const [isAddress, setIsAddress] = useState(false)
    const [docId, setDocId] = useState(null)
    const [isUpdated, setIsUpdated] = useState(false)
    const [formValue, setFormValue] = useState({
        name: '',
        email: '',
        mobile: '', 
    });

    const [formValueAddress, setFormValueAddress] = useState({
        address: '',
        city: '',
        state: '',
        pincode: '',
        userId: ''
    });

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

    console.log(session)

    useEffect(() => {

        const req = async () => {
            if(session){
                setFormValueAddress({
                    ...formValueAddress,
                    userId: session.uid
                });
    
                // Fetch collection of docs related to the specific userId (if user is login) 
                const q = query(collection(db, "addresses"), where("userId", "==", session.uid));
                
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    setDocId(doc.id)
                  const formAddress = doc.data()
                  setFormValueAddress({
                    ...formValueAddress,
                    ...formAddress
                  });
                //   console.log(doc.data())
                });
                                
                // Get all the collections from firebase
                /*
                const snapshotAll = await getDocs(collection(db, "addresses"))

                snapshotAll.forEach((doc) => {
                    const res = doc.data()
                    console.log(res)
                });
                */
            }
        }
        req()

    }, [session, isUpdated]);

    useEffect(() => {
        const req = async () => {
            if(session) {
                const col = collection(db, 'orders')
                const q = query(col, where('userId', '==', session.uid))
                const snapshot = await getDocs(q)
                const temp = []
                snapshot.forEach((doc) => {
                    temp.push(doc.data())
                });
                setOrders(temp)
            }
        }
        req()
    }, [session])

    const setProfilePhoto = async (e) => {
        const input = e.target;
        const file = input.files[0];

        const storageRef = ref(storage, `profile-photos/${file.name}`);
        setUploading(true)
        const snapshot = await uploadBytes(storageRef, file);
    
        await uploadBytes(storageRef, file).then((snapshot) => {
            console.log('File uploaded successfully');
            
        }).catch((error) => {
            console.error('Error uploading file:', error);
        });

        const url = await getDownloadURL(snapshot.ref);
        await updateProfile(auth.currentUser, {
            photoURL: url
        });
        setSession({
            ...session,
            photoURL: url
        });
        setUploading(false)
    }

    const handleFormValue = (e) => {
        const input = e.target
        const name = input.name
        const value = input.value
        setFormValue({
            ...formValue,
            [name]: value
        });
    }

    const saveProfileInfo = async (e) => {
        e.preventDefault()
        await updateProfile(auth.currentUser, {
            displayName: formValue.name,
            phoneNumber: formValue.mobile
        });
        new Swal({
            icon: 'success',
            title: 'Profile updated'
        });
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValueAddress({
          ...formValueAddress,
          [name]: value
        });
    };

    const saveAddressForm = async (e) => {
        e.preventDefault();
        try {
          // Add form data to "addresses" collection in Firestore
          await addDoc(collection(db, "addresses"), formValueAddress);
          setIsAddress(true)
          setIsUpdated(!isUpdated)
          new Swal({
            icon: 'success',
            title: 'Address Saved!'
          });
        } catch (error) {
            new Swal({
                icon: 'error',
                title: 'Failed to save address!'
            });
        }
      };

      const updateAddress = async (e) => {
        try {
            e.preventDefault()
            const ref = doc(db, 'addresses', docId)
            await updateDoc(ref, formValueAddress)
            setIsAddress(true)
            setIsUpdated(!isUpdated)

            new Swal({
                icon: 'success',
                title: 'Address updated!'
            });

            setFormValueAddress(null)
           
            
        } catch (error) {
            new Swal({
                icon: 'error',
                title: 'Failed to update address!'
            });
        }
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
            <div className='flex gap-4 font-semibold text-3xl text-purple-600'>
                <i className="ri-shopping-cart-line"></i>
                <h1>Orders</h1>
            </div>
            <hr className='my-6'/>

            {
                orders.map((item, index) => (
                    <div 
                        key={index}
                        className='flex gap-5 my-6'
                    >
                        <img 
                            src={item.image} 
                            alt='order images'
                            className='w-60'
                        />
                        <div>
                            <h1 className='font-bold capitalize text-2xl'>{item.title}</h1>
                            <p className='text-gray-600'>{item.description.slice(0,50)}</p>
                            <div className='space-x-2'>
                                <label>
                                    {item.price - (item.price * item.discount) / 100}
                                </label>
                                <del>${item.price}</del>
                                <label>({item.discount} Off)%</label>
                            </div>
                            <button className='mt-3 bg-green-300 px-3 py-1 rounded capitalize'>
                                {item.status ? item.status : 'Pending'}
                            </button>
                        </div>
                    </div>
                ))
            }

           
        </div>
        <div className='md:my-16 p-8 border shadow-lg mx-auto md:w-7/12 rounded-md'>
            <div className='flex gap-4 font-semibold text-3xl text-purple-600'>
                <i className="ri-user-line"></i>
                <h1>Profile</h1>
            </div>
            <hr className='my-6'/>

            <div className='relative flex justify-center items-center mt-4 mx-auto w-22 h-22'>
                {
                    uploading ? 
                    <img src='/images/loader.gif' alt='Upload-photo'/>
                    : 
                    <img 
                        src={session.photoURL ? session.photoURL : '/images/image.avif'}
                        alt='Upload-photo'
                        className='w-24 h-24 rounded-full cursor-pointe'
                    />
                }
                <input 
                    type='file' 
                    accept='image/*' 
                    className='absolute w-full top-0 left-0 p-7 opacity-0'
                    onChange={setProfilePhoto}
                />
            </div>

            <div className='-mt-8'>
                <form onSubmit={saveProfileInfo}>
                    <div className='flex flex-col space-y-2 md:mr-20 m-10'>

                        <div className='flex flex-col my-3'>
                            <label className='text-xl font-semibold mb-2'>Name</label>
                            <input
                                onChange={handleFormValue}
                                name='name'
                                type='text'
                                placeholder='Enter your city'
                                className='border border-gray-300 rounded-md p-2'
                                value={session.displayName}
                            />
                        </div>

                        <div className='flex flex-col my-3'>
                            <label className='text-xl font-semibold mb-2'>Email</label>
                            <input 
                                onChange={handleFormValue}
                                readOnly
                                disabled
                                name='email'
                                type='email'
                                placeholder='example@gmail.com'
                                className='border border-gray-300 rounded-md p-2'
                                value={session.email}
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
                                // value={formValue.mobile}
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

        <div className='md:my-16 p-8 border shadow-lg mx-auto md:w-7/12 rounded-md'>
            <div className='flex gap-4 font-semibold text-3xl text-purple-600'>
                <i className="ri-links-line"></i>
                <h1>Delivery Address</h1>
            </div>
            <hr className='my-6'/>

            <div className='-mt-8'>
                <form onSubmit={isAddress ? updateAddress : saveAddressForm}>
                    <div className='flex flex-col space-y-2 md:mr-20 m-10'>
                        <div className='flex flex-col my-3'>
                            <label className='text-xl font-semibold mb-2'>Address</label>
                            <input
                                type='text'
                                name='address'
                                onChange={handleChange}
                                value={formValueAddress?.address || ''}
                                placeholder='Enter your address'
                                className='border border-gray-300 rounded-md p-2'
                            />
                        </div>

                        <div className='flex flex-col my-3'>
                            <label className='text-xl font-semibold mb-2'>City</label>
                            <input
                                type='text'
                                name='city'
                                onChange={handleChange}
                                value={formValueAddress?.city || ''}
                                placeholder='Enter your city'
                                className='border border-gray-300 rounded-md p-2'
                            />
                        </div>

                        <div className='flex flex-col my-3'>
                            <label className='text-xl font-semibold mb-2'>State</label>
                            <input
                                type='text'
                                name='state'
                                onChange={handleChange}
                                value={formValueAddress?.state || ''}
                                placeholder='Enter your state'
                                className='border border-gray-300 rounded-md p-2'
                            />
                        </div>

                        <div className='flex flex-col my-3'>
                            <label className='text-xl font-semibold mb-2'>Pincode</label>
                            <input
                                type='number'
                                name='pincode'
                                onChange={handleChange}
                                value={formValueAddress?.pincode || ''}
                                placeholder='Enter your pincode'
                                className='border border-gray-300 rounded-md p-2'
                            />
                        </div>

                    </div>

                    {
                        isAddress ? 
                            <button 
                                className='bg-purple-600 text-white px-6 py-3 text-2xl font-semibold flex w-full rounded-xl md:mt-10 justify-center mb-8'
                            > 
                                Save
                            </button>
                        : 
                        <button 
                            className='bg-green-600 text-white px-6 py-3 text-2xl font-semibold flex w-full rounded-xl md:mt-10 justify-center mb-8'
                        > 
                            Submit
                        </button>
                    }

                    
                </form>

                <div>

                </div>

             </div>
        </div>

    </Layout>
  )
}

export default Profile;