import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaArrowLeft } from 'react-icons/fa'; // Import from react-icons

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { data } = await axios.post('http://localhost:5000/api/auth/login', {
        email: formData.email,
        password: formData.password
      });

      if (data.success) {
        localStorage.setItem('userInfo', JSON.stringify(data.user));
        localStorage.setItem('token', data.token);
        localStorage.setItem('refreshToken', data.refreshToken);
        localStorage.setItem('email', formData.email);

        toast.success(data.message || 'Login successful!');
        navigate('/');
      } else {
        setError(data.message || 'Login failed');
        toast.error(data.message || 'Login failed');
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || 'Login failed. Please try again.';
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8ZmFzaGlvbnx8fHx8fDE2ODQ3NjIwNDc&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080')"
      }}
    >
      <div className="relative bg-gray-800 bg-opacity-80 p-8 rounded-lg shadow-lg w-full max-w-md backdrop-blur-sm animate-fade-in">

        {/* Back button */}
        <button
          onClick={() => navigate('/')}
          className="absolute top-3 left-3 text-green-400 hover:text-green-300 flex items-center space-x-2 text-sm"
        >
          <FaArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <h1 className="text-3xl font-bold text-center text-white mb-6">DarkFashion</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
              minLength="6"
            />
          </div>

          {error && (
            <div className="text-red-400 text-sm text-center py-2">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 rounded-md text-white font-medium transition-colors ${loading ? 'bg-gray-600 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
              }`}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-gray-300">
          <a href="#" className="text-green-400 hover:text-green-300 transition-colors">
            Forgot password?
          </a>
          <span className="mx-2">|</span>
          <a href="/signup" className="text-green-400 hover:text-green-300 transition-colors">
            Create an account
          </a>
        </div>
      </div>
    </div>
  );
}
