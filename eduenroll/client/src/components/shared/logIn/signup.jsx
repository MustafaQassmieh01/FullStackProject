import { userApi } from "../../../api/userApi.js";
import {useUser} from '../../../context/authProvider'
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function SignupForm() {
   
  const navigate = useNavigate();
  const { setUser } = useUser();

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

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

    try {
      // Assuming userApi.Signup follows a similar pattern as userApi.Login
      const response = await userApi.Signup(username, name, email, password, admin);
      const { user } = response.data;
      setUser(user);
      navigate('/dashboard');
    } catch (err) {
      console.error('Signup failed:', err);
      setError('Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };
    return (
<div>
      <h2 className="text-2xl font-bold mb-6 text-center text-green-700">Create an Account</h2>

      {error && (
        <div className="mb-4 text-red-500 text-sm text-center">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="username" className="block text-sm font-semibold text-gray-700">
            Username
          </label>
          <input
            id="username"
            name="username"
            required
            type="text"
            className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
          />
        </div>

        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-gray-700">
            Name
          </label>
          <input
            id="name"
            name="name"
            required
            type="text"
            className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
            Email
          </label>
          <input
            id="email"
            name="email"
            required
            type="email"
            className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
            Password
          </label>
          <input
            id="password"
            name="password"
            required
            type="password"
            className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
          />
        </div>

        <div className="flex items-center">
          <input
            id="admin"
            name="admin"
            type="checkbox"
            className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
          />
          <label htmlFor="admin" className="ml-2 block text-sm text-gray-700">
            Register as Admin
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition disabled:opacity-60"
        >
          {loading ? 'Signing up...' : 'Sign Up'}
        </button>
      </form>
    </div>
  );

}
export default SignupForm;