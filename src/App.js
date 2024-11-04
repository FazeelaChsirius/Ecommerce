import './App.css';
import 'animate.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NotFound from './components/NotFound';
import Orders from './components/Admin/Orders';
import Payments from './components/Admin/Payments';
import Dashboard from './components/Admin/Dashboard';
import Settings from './components/Admin/Settings';
import Logout from './components/Admin/Logout';
import Customers from './components/Admin/Customers';
import Home from './components/Home';
import Products from './components/Products';
import Category from './components/Category';
import AdminProducts from './components/Admin/Products';
import Login from './components/Login';
import Signup from './components/Signup';
import Contact from './components/Contact';
import ProtectedLogin from './components/ProtectedRoute/ProtectedLogin';
import Cart from './components/Cart';
import Profile from './components/Profile';


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
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Elements>
  );
}

export default App;
