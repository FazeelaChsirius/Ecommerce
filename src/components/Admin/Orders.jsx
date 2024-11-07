import React, { useEffect, useState } from 'react'
import Layout from './Layout';
import firebaseAppConfig from '../../utils/firebase-config';
import { getFirestore, getDocs, collection } from 'firebase/firestore';

const db = getFirestore(firebaseAppConfig)

const Orders = () => {

   const [orders, setOrders] = useState([])

   useEffect(() => {
    const req = async () => {
        const snapshot = await getDocs(collection(db, 'orders'))

    }
    req()
   }, [])

  return (
    <Layout>
        <div>
            <h1 className='text-lg font-semibold'>Orders</h1>

            <div className='mt-6'>
                <table className='w-full'>
                    <thead>
                        <tr className='bg-purple-600 text-white'>
                            <th className='py-3'>Order Id</th>
                            <th>Customer's Name</th>
                            <th>Email</th>
                            <th>Mobile</th>
                            <th>Product</th>
                            <th>Amount</th>
                            <th>Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            orders.map((item, index) => (
                                <tr 
                                key={index}
                                className='bg-white text-center'
                                style={{ backgroundColor: (index+1)%2 === 0 ? '#e2e8f0' : 'white' }}
                                >
                                    <td className='py-4'>{item.orderId}</td>
                                    <td className='capitalize'>{item.customerName}</td>
                                    <td>{item.email}</td>
                                    <td>{item.mobile}</td>
                                    <td className='capitalize'>{item.product}</td>
                                    <td>${item.amount.toLocaleString()}</td>
                                    <td>{item.date}</td>
                                    <td className='capitalize'>
                                        <select className='border p-1 border-gray-300'>
                                            <option value='pending'>Pending</option>
                                            <option value='processing'>Processing</option>
                                            <option value='dispatched'>Dispatched</option>
                                            <option value='returned'>Returned</option>
                                        </select>
                                    </td>
                                </tr>
                            ))
                        }
                       

                    </tbody>
                </table>
            </div>
        </div>
    </Layout>
  )
}

export default Orders;