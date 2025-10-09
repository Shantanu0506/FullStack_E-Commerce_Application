import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter } from 'react-router-dom';
import Navbar from './Components/Navbar';
import App from './Components/App';
import ThemeProvider from './Contrext/ThemeContext';
import { RouterProvider } from 'react-router-dom';
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import About from './Components/About';
import Home from './Components/Home';
import Contact from './Components/Contact';
import Login from './Components/Login';
import Register from './Components/Register';
import Products from './Components/Products';
import Logout from './Components/Logout';
import ProductList from './Components/ProductList';
import PrductDetails from './Components/ProductDetails';
import Footer from './Components/Footer';
import Admin from './Components/Admin';
import Cart from './Components/Cart';
import Checkout from './Components/Checkout';


const MyRouter = createBrowserRouter([

  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: '/home',
        element: <Home />
      },
      {
        path: '/about',
        element: <About />
      },
      {
        path: '/contact',
        element: <Contact />
      },
      {
        path: '/cart',
        element: <Cart />
      },
      {
        path: '/products',
        element: <Products />
      },
      {
        path: '/productList',
        element: <ProductList/>
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/register',
        element: <Register />
      },
      {
        path: '/logout',
        element: <Logout />
      },
      {
        path: '/productdetails/:pid',
        element: <PrductDetails />
      },
      {
        path: '/checkout',
        element: <Checkout />
      },
      {
        path: '/footer',
        element: <Footer />
      },
      {
        path: '/admin',
        element: <Admin />
      }

    ]
  }
])
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <ThemeProvider>

    <RouterProvider router={MyRouter} />
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
    />

  </ThemeProvider>


);

reportWebVitals();
