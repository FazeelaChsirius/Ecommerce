import React, { useState } from 'react'
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation'
import Layout from './Layout';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';

const Home = () => {
  const [products, setProducts] = useState([
    {
      title: 'New blue shirt for mens',
      price: 1200,
      discount: 15,
      thumbnail: '/products/a.jpg'
    },
    {
      title: 'New blue shirt for mens',
      price: 1200,
      discount: 15,
      thumbnail: '/products/b.jpg'
    },
    {
      title: 'New blue shirt for mens',
      price: 1200,
      discount: 15,
      thumbnail: '/products/c.jpg'
    },
    {
      title: 'New blue shirt for mens',
      price: 1200,
      discount: 15,
      thumbnail: '/products/d.jpg'
    },
    {
      title: 'New blue shirt for mens',
      price: 1200,
      discount: 15,
      thumbnail: '/products/e.jpg'
    },
    {
      title: 'New blue shirt for mens',
      price: 1200,
      discount: 15,
      thumbnail: '/products/f.jpg'
    },
    {
      title: 'New blue shirt for mens',
      price: 1200,
      discount: 15,
      thumbnail: '/products/g.jpg'
    },
    {
      title: 'New blue shirt for mens',
      price: 1200,
      discount: 15,
      thumbnail: '/products/i.jpg'
    },
    {
      title: 'New blue shirt for mens',
      price: 1200,
      discount: 15,
      thumbnail: '/products/j.jpg'
    },
    {
      title: 'New blue shirt for mens',
      price: 1200,
      discount: 15,
      thumbnail: '/products/k.jpg'
    },
    {
      title: 'New blue shirt for mens',
      price: 1200,
      discount: 15,
      thumbnail: '/products/l.jpg'
    }
  ]);

  return (
    
    <Layout>
      <div>
        <header className='md:p-16 p-10'>
          <Swiper
            style={{zIndex: '-1'}}
            spaceBetween={50}
            slidesPerView={1}
            pagination={true} 
            navigation= {true}
            modules={[Pagination, Navigation]}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
          >
            <SwiperSlide>
              <img src='/images/c1.jpg' alt='pic'/>
            </SwiperSlide>
            <SwiperSlide>
              <img src='/images/p2.jpg' alt='pic'/>
            </SwiperSlide>
            <SwiperSlide>
              <img src='/images/p3.jpg' alt='pic'/>
            </SwiperSlide>
            <SwiperSlide>
              <img src='/images/p4.jpg' alt='pic'/>
            </SwiperSlide>
            <SwiperSlide>
              <img src='/images/p5.jpg' alt='pic'/>
            </SwiperSlide>
          </Swiper>
        </header>

        <div className='md:p-16 p-16'>
          <h1 className='text-4xl font-bold text-center'>Latest Products</h1>
          <p className='flex mx-auto text-center md:w-7/12 text-gray-500 mt-6 mb-6'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Non adipisci minus nisi sunt deleniti cumque. dolores eius ratione nihil veniam Non adipisci minus nisi sunt deleniti cumque. dolores officia!</p>
          <div className='md:w-full p-16 mx-auto grid md:grid-cols-4 gap-9'>
            {
              products.map((item, index) => (
                <div 
                  key={index}
                  className='bg-white shadow-lg rounded-lg'
                >
                  <img src={item.thumbnail} alt='pic' />
                  <div className='p-4'>
                    <h1 className='text-lg font-semibold'>{item.title}</h1>
                    <div className='space-x-2'>
                      <label className='font-bold text-lg'>${(item.price*item.discount)/100}</label>
                      <del>${item.price}</del>
                      <label className='text-gray-600'>({item.discount}%)</label>
                    </div>
                    <button className='bg-green-400 p-2 w-full text-white font-bold text-xl mt-4 rounded-md  '>Buy Now</button>
                    <button className='bg-red-400 p-2 w-full text-white font-bold text-xl mt-4 rounded-md '>
                        <i className="ri-shopping-cart-line mr-4"></i>
                        Add to Cart
                      </button>
                  </div>

                </div>
              ))
            }
          </div>
        </div>

      </div>
    </Layout>
  ) 
}

export default Home;