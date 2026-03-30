import React,{useState} from 'react';
import api from '../api/axios';

export default function Signup () {
  const [form, setForm] = useState({
    name:'',
    email:'',
    password:'',
  });
  const [msg, setMsg] = useState(['']);

  const handleChange = (e) => {
    setForm({
      ...form, 
      [e.target.name] : e.target.value
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/signup', form);
      setMsg(response.data.message);

    } catch (error) {
      setMsg(error.response?.data?.message || 'An error occurred')
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>

        {msg && (
          <div className='mb-4 text-sm text-blue-600 font-medium text-center'>
            {msg}   
          </div>
        )}

        <form 
        className="space-y-4" 
        onSubmit={handleSubmit}
        >
          <input 
           name="name" 
           placeholder="Enter Name"
           onChange={handleChange} 
           className='w-full px-3 py-2 border-gray-300 rounded-md focus:outline-none focus:ring-blue-500'
           value={form.name}
           required
          />

          <input 
           name="email"
           type='email' 
           placeholder="Enter Email"
           onChange={handleChange} 
           className='w-full px-3 py-2 border-gray-300 rounded-md focus:outline-none focus:ring-blue-500'
           value={form.email}
           required
          />

          <input 
           name="password"
           type='password' 
           placeholder="Enter Password"
           onChange={handleChange} 
           className='w-full px-3 py-2 border-gray-300 rounded-md focus:outline-none focus:ring-blue-500'
           value={form.password}
           required
          />

          <button 
           className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover: bg-blue-600 transition-colors "
           type='submit'
          >
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
}


