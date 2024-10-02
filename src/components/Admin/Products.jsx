import React, { useState } from 'react'
import Layout from './Layout';

const AdminProducts = () => {
  const [products, setProducts] = useState([
    {
      title: "Men's blue shirt denim",
      description: "I am related to mens's product",
      price: 2000,
      discount: 15,
      image: '/products/a.jpg'
    },
    {
      title: "Men's blue shirt denim",
      description: "I am related to mens's product",
      price: 2000,
      discount: 15,
      image: '/products/j.jpg'
    },
    {
      title: "Men's blue shirt denim",
      description: "I am related to mens's product",
      price: 2000,
      discount: 15,
      image: '/products/k.jpg'
    },
    {
      title: "Men's blue shirt denim",
      description: "I am related to mens's product",
      price: 2000,
      discount: 15,
      image: '/products/c.jpg'
    },
    {
      title: "Men's blue shirt denim",
      description: "I am related to mens's product",
      price: 2000,
      discount: 15,
      image: '/products/d.jpg'
    },
    {
      title: "Men's blue shirt denim",
      description: "I am related to mens's product",
      price: 2000,
      discount: 15,
      image: '/products/e.jpg'
    },
    {
      title: "Men's blue shirt denim",
      description: "I am related to mens's product",
      price: 2000,
      discount: 15,
      image: '/products/f.jpg'
    },
    {
      title: "Men's blue shirt denim",
      description: "I am related to mens's product",
      price: 2000,
      discount: 15,
      image: '/products/g.jpg'
    },
    {
      title: "Men's blue shirt denim",
      description: "I am related to mens's product",
      price: 2000,
      discount: 15,
      image: '/products/i.jpg'
    },
    {
      title: "Men's blue shirt denim",
      description: "I am related to mens's product",
      price: 2000,
      discount: 15,
      image: '/products/j.jpg'
    },
    {
      title: "Men's blue shirt denim",
      description: "I am related to mens's product",
      price: 2000,
      discount: 15,
      image: '/products/k.jpg'
    },
    {
      title: "Men's blue shirt denim",
      description: "I am related to mens's product",
      price: 2000,
      discount: 15,
      image: '/products/l.jpg'
    }
  ])

  return (
    <Layout>
      <div>
        <h1 className='text-lg font-semibold mb-4'>Products</h1>

        <div className='grid md:grid-cols-4 gap-6'>
          {
            products.map((item, index) => (
              <div 
                key={index} 
                className='bg-white rounded-md shadow-xl'
              > 
                <img 
                  src={item.image} 
                  alt='pic'
                  className='rounded-t-lg w-full object-cover'
                />
                <div className='p-3'>
                  <h1 className='font-semibold text-lg'>{item.title}</h1>
                  <p className='text-gray-600'>{item.description.slice(0,50)}...</p>

                  <div className='flex gap-1 mt-2'>
                    <label>${item.price-(item.price * item.discount) / 100}</label>
                    <del className='text-rose-300 font-semibold'>{item.price}</del>
                    <label className='text-gray-400'>({item.discount}% Off)</label>
                  </div>
                   
                </div> 
              </div>
            ))
          }
        </div>
      </div>
    </Layout>
  )
}

export default AdminProducts;