import {createBrowserRouter, Outlet, RouterProvider} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProductDetails from './pages/ProductDetails';
import AddProducts from './admin/AddProduct';
import EditProducts from './admin/EditProduct';
import ProductsList from './admin/ProductList';
import Navbar from './components/Navbar';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import CheckoutAddress from './pages/CheckoutAddress';
import OrderSuccess from './pages/OrderSuccess';

function Layout(){
  return(
    <>
      <Navbar/>
      <Outlet/>
    </>
  );
};

const router = createBrowserRouter([
  {
    element : <Layout/>,
    children : [
      { path: '/', element: <Home /> },
      { path: '/login', element: <Login /> },
      { path: '/signup', element: <Signup /> },
      { path: '/product/:id', element: <ProductDetails /> },
       { path: '/cart', element: <Cart /> },
      { path: '/admin/products', element: <ProductsList
         /> },
      { path: '/admin/products/add', element: <AddProducts /> },
      { path: '/admin/products/update/:id', element: <EditProducts /> },
      { path: '/checkout-address', element: <CheckoutAddress /> },
      { path: '/checkout', element: <Checkout /> },
      { path: '/order-success/:id', element: <OrderSuccess /> },
    ],
  },

]);

export default function App(){
  return <RouterProvider router={router}/>
}
