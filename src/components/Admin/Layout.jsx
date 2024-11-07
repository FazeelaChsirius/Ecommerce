import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import 'remixicon/fonts/remixicon.css';

const Layout = ({children}) => {
    const [size, setSize] = useState(280);
    const [mobileSize, setMobileSize] = useState(0);
    const [accountMenu, setAccountMenu] = useState(false);

    const location = useLocation()
    console.log(location)

    const menus = [
        {
            label: 'Dashboard',
            icon: <i className="ri-dashboard-2-line mr-3"></i>,
            link: '/admin/dashboard'
        },
        {
            label: 'Customers',
            icon: <i className="ri-user-line mr-3"></i>,
            link: '/admin/customers'

        },
        {
            label: 'Products',
            icon: <i className="ri-shopping-cart-line mr-3"></i>,
            link: '/admin/products'
        },
        {
            label: 'Orders',
            icon: <i className="ri-shape-line mr-3"></i>,
            link: '/admin/orders'
        },
        {
            label: 'Payments',
            icon: <i className="ri-money-dollar-circle-line mr-3"></i>,
            link: '/admin/payments'
        },
        {
            label: 'Settings',
            icon: <i className="ri-settings-3-line mr-3"></i>,
            link: '/admin/settings'
        },
        
    ]

  return (
    <>
        {/* Desktop */}
        <div className='md:block hidden'>
            <aside 
                className='h-full bg-purple-600 top-0 left-0 fixed overflow-hidden'
                style={{
                    width: size,
                    transition: '0.5s'
                }}
            > 
                <div className='flex flex-col text-lg font-semibold justify-center mt-6'>
                    {
                        menus.map((item, index) => (
                        <Link 
                            to={item.link}
                            key={index}
                            className='hover:bg-white px-4 py-3'
                            style={{
                                backgroundColor: (location.pathname === item.link) ? 'white' : '#6366f1',
                                color: (location.pathname === item.link) ? '#6366f1' : 'white'
                            }}
                        >
                            {item.icon}
                            {item.label}
                        </Link>
                        ))
                    } 

                    <button
                        className='px-4 py-3 text-white text-left'
                        
                    >
                        <i className="ri-logout-circle-r-line mr-3"></i>
                        Logout
                    </button>
                </div>
            </aside>

            <section 
                className='bg-gray-100 min-h-screen'
                style={{
                    marginLeft: size,
                    transition: '0.5s'
                }}

            >
                <nav className='bg-white p-6 shadow flex justify-between items-center sticky top-0 left-0'>
                    <div className='flex gap-4 items-center'>
                        <button 
                            onClick={() => setSize(size === 280 ? 0 : 280)}
                            className='bg-gray-50 hover:bg-indigo-300 hover:text-white w-10 h-10 shadow rounded-full'
                        >
                            <i className="ri-menu-2-line text-xl"></i>
                        </button>
                        <h1 className='text-xl font-semibold'>Shop</h1>
                    </div>

                    <div>
                        <button className='relative'>
                            <img 
                                onClick={() => setAccountMenu(!accountMenu)}
                                className='w-10 h-10 rounded-full'
                                src='/images/image.avif' 
                                alt='pic'
                            />

                            {
                                accountMenu && 

                                <div className='absolute w-[200px] bg-white shadow top-16 right-0 p-2 rounded-md'>
                                    <div>
                                        <h1 className='text-xl font-semibold'>Fazila</h1>
                                        <p className='text-gray-500'>example@gmail.com</p>
                                        <div className='h-px bg-gray-400 my-2' />
                                        <button className=''>
                                            <i className="ri-logout-circle-r-line mr-2"></i>
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            }
                        </button>
                    </div>
                </nav>

                <div className='p-6'>
                    {children}
                </div>
            </section>
        </div>

        {/* Mobile */}
        <div className='md:hidden block'>
            <aside 
                className='h-full bg-indigo-500 top-0 left-0 fixed overflow-hidden z-50'
                style={{
                    width: mobileSize,
                    transition: '0.5s'
                }}
            > 
                <div className='flex flex-col text-lg font-semibold justify-center'>
                    <button
                        className='text-left mx-3 mt-4'
                        onClick={() => setMobileSize(mobileSize === 0 ? 280 : 0)}
                    >
                        <i className="ri-menu-2-fill text-white text-xl"></i>
                    </button>
                    {
                        menus.map((item, index) => (
                        <Link 
                            to={item.link}
                            key={index}
                            className='hover:bg-white p-4 mt-7'
                            style={{
                                backgroundColor: (location.pathname === item.link) ? 'white' : '#6366f1',
                                color: (location.pathname === item.link) ? '#6366f1' : 'white'
                            }}
                        >
                            {item.icon}
                            {item.label}
                        </Link>
                        ))
                    } 
                </div>
            </aside>

            <section 
                className='bg-gray-100 h-screen'
                style={{
                    marginLeft: mobileSize,
                    transition: '0.5s'
                }}

            >
                <nav className='bg-white p-6 shadow flex justify-between items-center sticky top-0 left-0'>
                    <div className='flex gap-4 items-center'>
                        <button 
                            onClick={() => setMobileSize(mobileSize === 0 ? 280 : 0)}
                            className='bg-gray-50 hover:bg-indigo-300 hover:text-white w-10 h-10 shadow rounded-full'
                        >
                            <i className="ri-menu-2-line text-xl"></i>
                        </button>
                        <h1 className='text-xl font-semibold'>Shop</h1>
                    </div>

                    <div>
                        <button className='relative'>
                            <img 
                                onClick={() => setAccountMenu(!accountMenu)}
                                className='w-10 h-10 rounded-full'
                                src='/images/image.avif' 
                                alt='pic'
                            />

                            {
                                accountMenu && 

                                <div className='absolute w-[200px] bg-white shadow top-16 right-0 p-2 rounded-md'>
                                    <div>
                                        <h1 className='text-xl font-semibold'>Fazila</h1>
                                        <p className='text-gray-500'>example@gmail.com</p>
                                        <div className='h-px bg-gray-400 my-2' />
                                        <button className=''>
                                            <i className="ri-logout-circle-r-line mr-2"></i>
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            }
                        </button>
                    </div>
                </nav>

                <div className='p-6'>
                    {children}
                </div>
            </section>
        </div>
    </>
  )
}
export default Layout;