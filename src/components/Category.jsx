import React, { useState } from 'react'
import Layout from './Layout';

const Category = () => {
    const [category, setCategory] = useState([
        {
            title: "Electronics"
        },
        {
            title: "Men's Fashion"
        },
        {
            title: "Women's Fashion"
        },
        {
            title: "Health Care"
        },
        {
            title: "Beauty"
        },
        {
            title: "Gift Cards"
        },
        {
            title: "Sports"
        },
        {
            title: "Accessories"
        }
    ])

  return (
    <Layout>
        <div className='md:p-16 p-8'>
            <div className='md:w-10/12 p-16 mx-auto grid md:grid-cols-4 md:gap-16 gap-8'>
            {
                category.map((item, index) => (
                    <div 
                        key={index}
                        className='bg-white shadow-lg flex flex-col p-8 justify-center items-center border rounded-md hover:bg-purple-600 hover:text-white'
                    >
                        <i className="ri-menu-search-line text-2xl mb-2"></i>
                        <h1 className='text-2xl font-semibold text-center'>{item.title}</h1>

                    </div>
                ))
            }

            </div>
        </div>
    </Layout>
  )
}

export default Category;