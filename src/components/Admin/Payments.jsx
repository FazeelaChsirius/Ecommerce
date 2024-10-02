import React, { useState } from 'react'
import Layout from './Layout';

const Payments = () => {
  const [payments, setPayments] = useState([
      {
        paymentId: '#rty24545',
        customerName: 'Rohan Kumar',
        email: 'example@gmail.com',
        mobile: '+1 4098765434',
        amount: 5000,
        date: '12-10-2024',
      },
      {
        paymentId: '#rty24545',
        customerName: 'Rohan Kumar',
        email: 'example@gmail.com',
        mobile: '+1 4098765434',
        amount: 5000,
        date: '12-10-2024',
      },
      {
        paymentId: '#rty24545',
        customerName: 'Rohan Kumar',
        email: 'example@gmail.com',
        mobile: '+1 4098765434',
        amount: 5000,
        date: '12-10-2024',
      },
      {
        paymentId: '#rty24545',
        customerName: 'Rohan Kumar',
        email: 'example@gmail.com',
        mobile: '+1 4098765434',
        amount: 5000,
        date: '12-10-2024',
      },
      {
        paymentId: '#rty24545',
        customerName: 'Rohan Kumar',
        email: 'example@gmail.com',
        mobile: '+1 4098765434',
        amount: 5000,
        date: '12-10-2024',
      },
      {
        paymentId: '#rty24545',
        customerName: 'Rohan Kumar',
        email: 'example@gmail.com',
        mobile: '+1 4098765434',
        amount: 5000,
        date: '12-10-2024',
      },
      
  ]
);

  return (
    <Layout>
        <div>
            <h1 className='text-lg font-semibold'>Payments</h1>

            <div className='mt-6'>
                <table className='w-full'>

                  <thead>
                      <tr className='bg-rose-400 text-white'>
                          <th>Customer's Name</th>
                          <th className='py-3'>Payment Id</th>
                          <th>Email</th>
                          <th>Mobile</th>
                          <th>Amount</th>
                          <th>Status</th>
                      </tr>
                  </thead>

                  <tbody>
                    {
                      payments.map((item, index) => (
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
                          
                          <td className='py-4'>{item.paymentId}</td>
                          <td>{item.email}</td>
                          <td>{item.mobile}</td>
                          <td>${item.amount.toLocaleString()}</td>
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

export default Payments;