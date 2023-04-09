import React from 'react';
import './css/App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductDetails from './pages/ProductDetails';
import ViewOrder from './pages/ViewOrder';
import { Profile } from './pages/Profile';
import 'bootstrap/dist/css/bootstrap.min.css';
import ViewCart from './pages/ViewCart';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import { ProductList } from './pages/ProductList';
import Navbar from './pages/Navbar';
import PlaceOrder from './pages/PlaceOrder'
import UpdateProfile from '../src/pages/UpdateProfile'
import ChangePassword from './pages/ChangePassword'
import ForgotPassword from './pages/ForgotPassword'
import ScrollToTopButton from './pages/ScrollToTopButton';
import ErrorPage from './pages/ErrorPage';

<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css"
  integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi"
  crossorigin="anonymous"
/>


function App() {
  return (
    <React.Fragment>

      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<ProductList />} />
          <Route path='/productlist' element={<ProductList />} />
          {/* <Route path='/productdetails' element={<ProductDetails />} /> */}
          <Route path='/productdetails/:id' element={<ProductDetails />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/viewcart' element={<ViewCart />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/placeorder' element={<PlaceOrder />} />
          <Route path='/vieworder' element={<ViewOrder />} />
          <Route path='/profile' element={<Profile />} />

          <Route path='/update-profile' element={<UpdateProfile />} />
          <Route path='/change-password' element={<ChangePassword />} />
          <Route path='*' element={<ErrorPage />} />

        </Routes>
      </Router>
      <ScrollToTopButton />
    </React.Fragment>
  );
}

export default App;


