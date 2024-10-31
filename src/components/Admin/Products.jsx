import React, { useEffect, useRef, useState } from 'react'
import firebaseAppConfig from '../../utils/firebase-config';
import { getFirestore, addDoc, collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Layout from './Layout';
import Swal from 'sweetalert2';
import uploadFile from '../../utils/storage';

const db = getFirestore(firebaseAppConfig)
const storage = getStorage(firebaseAppConfig);

const AdminProducts = () => {
  
  const model = {
    title: '',
    price: '',
    discount: '',
    description: ''
  }
  const [products, setProducts] = useState([])
  const [updateUI, setUpadteUI] = useState(false)
  const [productForm, setProductForm] = useState(model)
  const [productModal, setProductModal] = useState(false)
  const modalContainer = useRef(null)

  useEffect(() => {
    const req = async () => {
     const snapshot = await getDocs(collection(db, 'products'))
     const temp = []
     snapshot.forEach((doc) => {
      // console.log(doc.id)
      const allProducts = doc.data()
      allProducts.id = doc.id
      temp.push(allProducts)
    })
    setProducts(temp)

    }
    req()

  }, [updateUI])

  const handleProductForm = (e) => {
    const input = e.target
    const name = input.name
    const value = input.value
    setProductForm({
      ...productForm,
      [name]: value
    })
  }

  const createProduct = async (e) => {
    try {
      e.preventDefault()
      await addDoc(collection(db, 'products'), productForm)
      setProductForm(model)
      setProductModal(false)
      setUpadteUI(!updateUI)

      new Swal({
        icon: 'success',
        title: 'Product added successfully'
      })
    } catch (error) {
      new Swal({
        icon: 'error',
        title: 'Failed!',
        text: error.message
      })
    }
  }

  
  const uploadProductImage = async (e, id) => {
    e.preventDefault()
    const input = e.target
    const file = input.files[0]

    const path = `products/${file?.name}`
    const url = await uploadFile(file, path)
    const ref = doc(db, 'products', id)
    await updateDoc(ref, {image: url})
    setUpadteUI(!updateUI)
  }
    

  return (
    <Layout>
      <div>
        <div className='flex justify-between items-center'>
          <h1 className='text-lg font-semibold mb-4'>Products</h1>
          <button 
            onClick={() => setProductModal(true)}
            className='bg-purple-600 text-white px-3 py-3 rounded-md font-semibold text-lg'
          >
            <i className="ri-sticky-note-add-line mr-2"></i>
            New Product
          </button>
        </div>
          
        <div className='grid md:grid-cols-4 gap-6 mt-8'>

          {
            products.map((item, index) => (
              <div 
                key={index} 
                className='bg-white rounded-md shadow-xl'
              > 
                <div className='relative'>
                  <img 
                    src={item.image ? item.image : '/images/product.webp'}
                    alt='pic'
                    className='rounded-t-lg w-full object-cover'
                  />
                  <input 
                    type='file'
                    onChange={(e)=>uploadProductImage(e, item.id)}
                    className='absolute w-full h-full top-0 left-0 opacity-0'
                  />
                </div>

                <div className='p-3'>
                  <h1 className='font-semibold text-2xl capitalize'>{item.title}</h1>
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

        {
          productModal && 
            <div 
              ref={modalContainer}
              className='bg-black animate__animated animate__fadeIn bg-opacity-60 absolute top-0 left-0 w-full h-full flex justify-center items-center'
            >
              <div className='relative bg-white w-6/12 p-4 rounded-xl px-5 py-5 mt-20'>
                <button 
                  onClick={() => setProductModal(false)}
                  className='absolute top-4 right-3 p-2 rounded-full'>
                  <i className="ri-close-line"></i>
                </button>
                <h1 className='text-lg font-bold'>New Product</h1>

                <form
                  onSubmit={createProduct}
                  className='grid grid-cols-2 mt-4 gap-5'
                >
                  <input 
                    name='title'
                    type='text'
                    required
                    placeholder='Enter product title here'
                    className='p-2 border border-gray-300 rounded-lg col-span-2'
                    onChange={handleProductForm}
                    value={productForm.title}
                  />
                  <input 
                    name='price'
                    type='number'
                    required
                    placeholder='Price'
                    className='p-2 border border-gray-300 rounded-lg'
                    onChange={handleProductForm}
                    value={productForm.price}
                  />
                  <input 
                    name='discount'
                    type='number'
                    required
                    placeholder='Discount'
                    className='p-2 border border-gray-300 rounded-lg'
                    onChange={handleProductForm}
                    value={productForm.discount}
                  />
                  <textarea
                    name='description'
                    type='text'
                    rows={4}
                    placeholder='Description'
                    className='p-2 border border-gray-300 rounded-lg col-span-2'
                    onChange={handleProductForm}
                    value={productForm.description}
                  />
                  <button 
                    className='bg-purple-600 text-white px-6 py-3 text-2xl font-semibold flex w-full rounded-xl mt-3 justify-center col-span-2'
                  > 
                    Submit
                  </button>

                </form>
              </div>
            </div>
        }

      </div>
    </Layout>
  )
}

export default AdminProducts;