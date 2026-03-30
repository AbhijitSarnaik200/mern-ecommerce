import { useEffect, useState } from "react";
import api from '../api/axios.js';
import {Link} from 'react-router-dom';

export default function Home(){
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState('');

  const loadProducts = async () => {
    const res = await api.get(`/products?search=${search}&category=${category}`);
    setProducts(res.data);
  };

  useEffect(() => {
    loadProducts();
  },[search, category]);

  const addToCart = async (productId) => {
    const userId = localStorage.getItem('userId');

    if(!userId){
      alert('Please log in to items to Your cart.');
      return;
    }

    const res = await api.post(`/cart/add`, {userId, productId});

    const total = res.data.cart.items.reduce(
      (sum, item) => sum + item.productId.price * item.quantity, 0
    );
    localStorage.setItem('cartCount', total);
    window.dispatchEvent(new Event('cartUpdated'));

  };


  return(
    <div className="p-6">

      {/* Search */}
      <div className="mb-4 flex gap-3">
        <input 
        placeholder="Search Products..." 
        value={search} 
        onChange={(e) => setSearch(e.target.value)}
        className="border px-3 py-2 w-1/2"
        />

        {/* Category Filterd */}

        <select 
        value={category} 
        className="border px-3 py-2 w-1/2"
        onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All Category</option>
          <option value="Laptop">Laptops</option>
          <option value="Mobiles">Mobiles</option>
          <option value="Tablets">Tablets</option>
        </select>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        {
          products.map((product) => (
            <div
              className="border p-3 rounded shadow"
              key={product._id}
            >
              <Link
                key={product._id}
                to={`/product/${product._id}`}
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-40 object-contain"
                />
                <h2 className="mt-2 font-semibold">{product.title}</h2>
                <h2 className="">₹{product.price}</h2>
              </Link>


              <button
                className="mt-2 w-full bg-blue-500 px-3 py-2 rounded hover: bg-blue-600"
                onClick={() => addToCart(product._id)}
              >
                Add to Cart
              </button>
            </div>
          ))
        }
      </div>
    </div>
  )
















}