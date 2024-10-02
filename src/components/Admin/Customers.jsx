import React, { useState } from 'react'
import Layout from './Layout';

const Customers = () => {
    const [customers, setCustomers] = useState([
        {
            customerName: 'Rohan Kumar',
            email: 'example@gmail.com',
            mobile: '+1 4098765434',
            date: '12-10-2024',
            address: '2487 Hudson Street, Jersey City'
        },
        {
            customerName: 'Rohan Kumar',
            email: 'example@gmail.com',
            mobile: '+1 4098765434',
            date: '12-10-2024',
            address: '2487 Hudson Street, Jersey City'
        },
        {
            customerName: 'Rohan Kumar',
            email: 'example@gmail.com',
            mobile: '+1 4098765434',
            date: '12-10-2024',
            address: '2487 Hudson Street, Jersey City'
        },
        {
            customerName: 'Rohan Kumar',
            email: 'example@gmail.com',
            mobile: '+1 4098765434',
            date: '12-10-2024',
            address: '2487 Hudson Street, Jersey City'
        },
        {
            customerName: 'Rohan Kumar',
            email: 'example@gmail.com',
            mobile: '+1 4098765434',
            date: '12-10-2024',
            address: '2487 Hudson Street, Jersey City'
        },
        {
            customerName: 'Rohan Kumar',
            email: 'example@gmail.com',
            mobile: '+1 4098765434',
            date: '12-10-2024',
            address: '2487 Hudson Street, Jersey City'
        },
        {
            customerName: 'Rohan Kumar',
            email: 'example@gmail.com',
            mobile: '+1 4098765434',
            date: '12-10-2024',
            address: '2487 Hudson Street, Jersey City'
        },
        {
            customerName: 'Rohan Kumar',
            email: 'example@gmail.com',
            mobile: '+1 4098765434',
            date: '12-10-2024',
            address: '2487 Hudson Street, Jersey City'
        },
        {
            customerName: 'Rohan Kumar',
            email: 'example@gmail.com',
            mobile: '+1 4098765434',
            date: '12-10-2024',
            address: '2487 Hudson Street, Jersey City'
        },
       
        
    ]
);

  return (
    <Layout>
        <div>
            <h1 className='text-lg font-semibold'>Customers</h1>

            <div className='mt-6'>
                <table className='w-full'>
                    <thead>
                        <tr className='bg-rose-400 text-white'>
                            <th>Customer's Name</th>
                            <th>Email</th>
                            <th>Mobile</th>
                            <th>Date</th>
                            <th>Address</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            customers.map((item, index) => (
                                <tr 
                                    key={index}
                                    className='bg-white text-center'
                                    style={{ backgroundColor: (index+1)%2 === 0 ? '#e2e8f0' : 'white' }}
                                >
                                    <div className='flex justify-center text-center gap-4 p-3'>
                                        <img src='/images/image.avif' alt='pic'
                                            className='w-10 rounded-full'
                                    />
                                        <div className='flex flex-col'>
                                            <td className='capitalize'>{item.customerName}</td>
                                            <small>
                                                <td>{item.date}</td>
                                            </small>
                                        </div>
                                    </div>
                                    
                                    <td>{item.email}</td>
                                    <td>{item.mobile}</td>
                                    <td>{item.date}</td>
                                    <td>{item.address}</td>
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

export default Customers;