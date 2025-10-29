import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../../core/context/authProvider';
import { userApi } from '../../../api/userApi';

function LoginForm() {
  const navigate = useNavigate();
  const { setUser } = useUser();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (username, password) => {
    setError(null);
    setLoading(true);
    try {
      const response = await userApi.login(username, password);
      const user = response.data;
      setUser(user);
      localStorage.setItem('user', JSON.stringify(user)); // Store user data in local storage
      navigate('/home');
    } catch (err) {
      const apiError = err?.response?.data?.message;
      setError(apiError || 'Invalid username or password.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(e.target);
    const username = formData.get('username');
    const password = formData.get('password');
    await handleLogin(username, password);
  };

  return (
    <div className="w-96 h-[28rem] flex flex-col items-center justify-center bg-white rounded-xl">
      <h2 className="text-xl sm:text-2xl font-bold text-center text-teal-600 mb-4">
        Login to your account
      </h2>

      {error && (
        <div className="mb-4 text-black text-xs text-center">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="w-full space-y-4 px-6">
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

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition disabled:opacity-60 text-sm"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}

export default LoginForm;