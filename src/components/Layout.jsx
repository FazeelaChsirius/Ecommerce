import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Layout = ({ children }) => {

  const [open, setOpen] = useState(false);
  const navigate = useNavigate()

  const menus = [
    {
      label: 'Home',
      href: '/'
    },
    {
      label: 'Products',
      href: '/products'
    },
    {
      label: 'Category',
      href: '/category'
    },
    {
      label: 'Contact us',
      href: '/contact-us'
    }
  ];

  function redirectToHome() {
    window.location.href = '/';
  }

  const mobileLink = (href) => {
    navigate(href)
    setOpen(false)
  }

  return (
    <div>
      <nav className='sticky shadow-lg p-4 top-0 left-0 bg-white'>
        <div className='w-10/12 mx-auto flex items-center justify-between'>
          <img 
            src='/images/logo.jpeg'
            alt='pic'
            onClick={redirectToHome}
            className='md:w-32 w-32 md:-ml-20 -ml-10 cursor-pointer'
          />

          <button 
            className='md:hidden'
            onClick={() => setOpen(!open)}
          >
            <i className="ri-menu-2-fill text-2xl"></i>
          </button>

          <ul className='md:flex gap-9 justify-between items-center hidden'>
            {
              menus.map((item, index) => (
                <li 
                  key={index}
                >
                  <Link  
                    to={item.href}
                    className='text-purple-600 font-semibold text-md px-3 py-3'
                  >
                    {item.label}
                  </Link>
                </li>
              ))
            }
            <Link 
              to='/login'
              className='font-semibold text-md text-purple-600 rounded-md px-3 py-3'
            >
              Login
            </Link>
            <Link 
              to='/signup'
              className='bg-purple-600 font-semibold text-md text-white rounded-md px-5 py-3'
            >
              Signup
            </Link>
          </ul>

        </div>
      </nav>

      <div>{children}</div>

      <footer className='bg-purple-600 p-8 text-white py-16'>
        <div className='w-10/12 mx-auto grid md:grid-cols-4 md:gap-0 gap-8 '>

          <div className='flex flex-col'>
            <h1 className='text-2xl font-semibold mb-4'>Brand Details</h1>
            <p className='text-gray-200'>Lorem ipsum dolor sit aipsum in deserunt, saepe moLorem ipsum dolor sit aipsum in deserunt, saepe molestias eius dignissimos optio delectus.</p>
            <img 
              src='/images/logo.jpeg'
              alt='pic'
              className='w-32 mt-8'
            />
          </div>

          <div className='flex flex-col ml-20'>
            <h1 className='text-2xl font-semibold mb-4'>Website Links</h1>
            <ul className='space-y-3'>
              {
                menus.map((item,index) => (
                  <li key={index} className='text-gray-200'>
                    <Link to={item.href}>{item.label}</Link>
                  </li>
                ))
              }
              <li className='flex flex-col space-y-3 text-gray-200'>
                <Link to='/login'>Login</Link>
                <Link to='/signup'>Signup</Link>
              </li>
            </ul>
          </div>

          <div className='flex flex-col ml-20'>
            <h1 className='text-2xl font-semibold mb-4'>Follow us</h1>
            <ul className='space-y-3'>
              <li className='flex flex-col space-y-3 text-gray-200'>
                <Link to='https://www.facebook.com/login/'>Facebook</Link>
                <Link to='https://www.instagram.com/accounts/login/?next=https%3A%2F%2Fwww.instagram.com%2Faccounts%2Fedit%2F%3F__coig_login%3D1'>Insatagram</Link>
                <Link to='https://www.linkedin.com/login'>LinkedIn</Link>
                <Link to='https://www.twitter.com/login'>Twitter</Link>
              </li>
            </ul>
          </div>

          <div className='flex flex-col'>
            <h1 className='text-2xl font-semibold mb-4'>Contact us</h1>
            <form className='flex flex-col space-y-6'>
              <input 
                name='Fullname'
                required
                placeholder='Your name'
                className='w-full rounded-sm p-1'
              />
              <input
                name='email'
                required
                placeholder='Enter your email'
                className='w-full rounded-sm p-1'
              />
              
              <textarea 
                name='messages'
                required
                placeholder='Enter your message'
                className='w-full rounded-sm p-1'
                rows={3}
              />

              <button className='text-xl p-2 bg-purple-800'>Submit</button>
              
            </form>
          </div>

        </div>
      </footer>

      <aside 
        className='md:hidden bg-purple-800 h-full top-0 left-0 w-[300px] fixed z-50 overflow-hidden'
        style={{
          width: (open ? 250 : 0),
          transition: '0.5s'
        }}
      >
        <div className='flex flex-col text-white p-6 mr-20 gap-7 z-50 text-xl'>
          {
            menus.map((item, index) => (
              <button 
                key={index}
                onClick={() => mobileLink(item.href)}
              >
                {item.label}
              </button>
            ))
          }
        </div>
      </aside>
   

    </div>
  )
}

export default Layout;