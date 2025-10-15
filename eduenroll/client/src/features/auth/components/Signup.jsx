import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../../core/context/authProvider';
import { userApi } from '../../../api/userApi';

function SignupForm() {
  const navigate = useNavigate();
  const { setUser } = useUser();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(e.target);
    const username = formData.get('username');
    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');
    const admin = formData.get('admin') === 'on';
    const userData = { username, name, email, password, admin };
    try {
      const response = await userApi.signup(userData);
      const { user } = response.data;
      setUser(user);
      navigate('/home');
    } catch (err) {
      console.error('Signup failed:', err);
      setError('Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-96 h-[28rem] flex flex-col items-center justify-center bg-white rounded-xl">
      <h2 className="text-xl sm:text-2xl font-bold text-center text-teal-600 mb-4">
        Create an Account
      </h2>

      {error && (
        <div className="mb-4 text-black text-xs text-center">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="w-full space-y-3 px-6">
        <div>
          <label htmlFor="username" className="block text-xs font-semibold text-black">
            Username
          </label>
          <input
            id="username"
            name="username"
            required
            type="text"
            className="mt-1 block w-full px-3 py-2 border border-teal-600 rounded-lg shadow-sm focus:ring-teal-500 focus:border-teal-500 text-sm text-black"
          />
        </div>

        <div>
          <label htmlFor="name" className="block text-xs font-semibold text-black">
            Name
          </label>
          <input
            id="name"
            name="name"
            required
            type="text"
            className="mt-1 block w-full px-3 py-2 border border-teal-600 rounded-lg shadow-sm focus:ring-teal-500 focus:border-teal-500 text-sm text-black"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-xs font-semibold text-black">
            Email
          </label>
          <input
            id="email"
            name="email"
            required
            type="email"
            className="mt-1 block w-full px-3 py-2 border border-teal-600 rounded-lg shadow-sm focus:ring-teal-500 focus:border-teal-500 text-sm text-black"
          />
        </div>

        <div className="relative">
          <label htmlFor="password" className="block text-xs font-semibold text-black">
            Password
          </label>
          <input
            id="password"
            name="password"
            required
            type={showPassword ? 'text' : 'password'}
            className="mt-1 block w-full px-3 py-2 border border-teal-600 rounded-lg shadow-sm focus:ring-teal-500 focus:border-teal-500 text-sm text-black"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-7 text-xs text-teal-600 hover:text-teal-800"
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>

        <div className="flex items-center">
          <input
            id="admin"
            name="admin"
            type="checkbox"
            className="h-4 w-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
          />
          <label htmlFor="admin" className="ml-2 block text-xs text-black">
            Register as Admin
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition disabled:opacity-60 text-sm"
        >
          {loading ? 'Signing up...' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
}

export default SignupForm;