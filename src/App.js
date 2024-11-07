import './App.css';
import 'animate.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NotFound from './components/NotFound.jsx';
import Orders from './components/Admin/Orders.jsx';
import Payments from './components/Admin/Payments.jsx';
import Dashboard from './components/Admin/Dashboard.jsx';
import Settings from './components/Admin/Settings.jsx';
import Logout from './components/Admin/Logout.jsx';
import Customers from './components/Admin/Customers.jsx';
import Home from './components/Home.jsx';
import Products from './components/Products.jsx';
import Category from './components/Category.jsx';
import AdminProducts from './components/Admin/Products.jsx';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import Contact from './components/Contact.jsx';
import ProtectedLogin from './components/ProtectedRoute/ProtectedLogin.jsx';
import Cart from './components/Cart.jsx';
import Profile from './components/Profile.jsx';
import Failed from './components/Failed.jsx';

import { loadStripe } from '@stripe/stripe-js'; // Import loadStripe
import { Elements } from '@stripe/react-stripe-js'; // Import Elements


// Initialize Stripe with your publishable key
const stripePromise = loadStripe('pk_test_51QGOlSRtGbxG8XdkGhkzfZbkHxCtw79RMZfOAOPRcT5omu4crAwobQ1KUn5iw7MA1bOOsUvurT85RKxYaPoHsjRd00SZBNYuQg');

function App() {
  return (
    <Elements stripe={stripePromise}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/products' element={<Products /> } />
          <Route path='/category' element={<Category />}/>
          <Route path='/cart' element={<Cart />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/success' element={<Profile />} />
          <Route element={<ProtectedLogin />}>
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
          </Route>
          <Route path='/contact-us' element={<Contact />} />
          <Route path='/admin'>
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='customers' element={<Customers />} />
            <Route path='products' element={<AdminProducts />} />
            <Route path='orders' element={<Orders />} />
            <Route path='payments' element={<Payments />} />
            <Route path='settings' element={<Settings />} />
            <Route path='logout' element={<Logout />} />
          </Route>
          <Route path='/failed' element={<Failed />}/>
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Elements>
  );
}

export default App;
