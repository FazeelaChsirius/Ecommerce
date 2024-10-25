import React, { useEffect, useState } from 'react'
import Layout from './Layout';
import firebaseAppConfig from '../utils/firebase-config';
import { getFirestore, addDoc, collection } from 'firebase/firestore';
import { onAuthStateChanged, getAuth } from 'firebase/auth';

const db = getFirestore(firebaseAppConfig)
const auth = getAuth(firebaseAppConfig)

const Cart = () => {
  const [session, setSession] = useState(null)
  const [products, setProducts] = useState([
    {
      title: 'Smart Phone',
      price: 20000,
      discount: 15,
      image: '/products/l.jpg'
    },
    {
      title: 'Smart Phone',
      price: 20000,
      discount: 15,
      image: '/products/k.jpg'
    },
    {
      title: 'Smart Phone',
      price: 20000,
      discount: 15,
      image: '/products/j.jpg'
    },
    {
      title: 'Smart Phone',
      price: 20000,
      discount: 15,
      image: '/products/i.jpg'
    },
    {
      title: 'Smart Phone',
      price: 20000,
      discount: 15,
      image: '/products/f.jpg'
    }
  ]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if(user){
        setSession(user)

      } else {
        setSession(null)

      }
    })
  }, []);

  return (
    <Layout>
      <div className='md:my-16 my-0 md:mx-auto md:w-7/12  text-purple-600 bg-white shadow-xl p-6 border rounded-xl'>
        <div className='flex items-center gap-6 justify-center'>
            <i className="ri-shopping-cart-line text-3xl font-semibold"></i>
            <h1 className='text-3xl font-bold'>Add to Cart</h1>
        </div>
        <hr className='my-6'/>

        <div className='space-y-8'>
          {
            products.map((item, index) => (
              <div key={index} className='md:flex md:gap-10 md:justify-center md:items-center md:space-y-4 md:space-y-0'>
                <img 
                  src={item.image} 
                  alt='pic' 
                  className='w-fit md:w-[250px] rounded-md shadow-xl'
                />
                <div className='space-y-2 text-center md:text-left'>
                  <h1 className='font-semibold text-xl md:text-2xl capitalize'>{item.title}</h1>
                  <div className='space-x-2'>
                    <label className='text-lg font-semibold text-gray-800'>
                      ${item.price - (item.price * item.discount) / 100}
                    </label>
                    <del className='text-gray-500'>${item.price}</del>
                    <label className='text-gray-600'>{item.discount}% Discount</label>
                  </div>
                  <button className='w-full md:w-fit bg-rose-500 text-white px-3 py-3 rounded-lg font-semibold'>
                    <i className="ri-delete-bin-line mr-2"></i>
                    Remove
                  </button>
                </div>
              </div>
            ))
          }
        </div>


        {/* <div className='space-y-8'>
          {
            products.map((item, index) => (
              <div key={index} className='md:flex gap-10 md:space-y-0'>
                <img 
                  src={item.image} 
                  alt='pic' 
                  className='md:w-[300px] w-[200px] rounded-md shadow-xl'
                />
                <div className='space-y-2'>
                  <h1 className='font-semibold text-2xl capitalize'>{item.title}</h1>
                  <div className='space-x-2'>
                    <label className='text-lg font-semibold text-gray-800'>${item.price - (item.price*item.discount)/100}</label>
                    <del>${item.price}</del>
                    <label className='text-gray-600'>{item.discount}% Discount</label>
                  </div>
                  <button className='w-fit bg-rose-500 text-white px-3 py-3 rounded-lg font-semibold'>
                    <i className="ri-delete-bin-line mr-2"></i>
                    Remove
                  </button>
                </div>
              </div>
            ))
          }
        </div> */}

        
        <hr className='my-6'/>

        <div className='flex justify-between items-center'>
          <h1 className='text-2xl font-semibold'>Total : $56,000</h1>
          <button className='w-fit bg-green-500 text-white px-3 py-2 rounded-lg font-semibold text-xl'>
            <i className="ri-shopping-bag-4-line mr-2 text-xl font-semibold"></i>
            Buy Now
          </button>
        </div>

      </div>
    </Layout>
  )
}

export default Cart;