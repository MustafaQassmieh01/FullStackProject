import { userApi } from "../../../api/users";
import {useUser} from '../../../context/authProvider'
import { useNavigate } from "react-router-dom";
import './style.css'

function SignupForm() {
   
    const { setUser } = useUser();
    const navigate = useNavigate();
    // const { setToken } = useToken();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const userData = {
            username: formData.get('username'),
            name: formData.get('name'),
            email: formData.get('email'),
            password: formData.get('password'),
            admin: formData.get('admin') === 'on' // Convert checkbox to boolean
        };

        userApi.signup(userData)
            .then(response => {
                console.log('Signup successful:', response);
                userApi.login(userData.username, userData.password)
                .then(loginResponse => {
                    console.log('Login successful:', loginResponse);
                    setUser(loginResponse.data)
                    navigate('/dashboard')
                })
                // Handle successful signup, e.g., redirect or show a message
            })
            .catch(error => {
                console.error('Signup failed:', error);
                // Handle signup failure, e.g., show an error message
            });
        }

    return (
        <div className="signup-form" class= "">
            <br />
            <h2 class= "font-bold">Sign Up</h2>
            <br />
            <form onSubmit={handleSubmit} class= "bg-gray-50 border-2 border-gray-300 p-4 rounded-lg shadow-md">
                <div className="mb-4"> {/* Margin-bottom for spacing between fields */}
                    <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">Username:</label>
                    <input
                    type="text"
                    id="username"
                    name="username"
                    required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    </div>

                    <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
                    <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    </div>

                    <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
                    <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    </div>

                    <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password:</label>
                    <input
                    type="password"
                    id="password"
                    name="password"
                    required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    </div>

                    <div className="mb-4 flex items-center"> {/* Use flex to align checkbox and label */}
                    <label htmlFor="admin" className="block text-gray-700 text-sm font-bold mr-2">Admin:</label>
                    <input
                    type="checkbox"
                    id="admin"
                    name="admin"
                    className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                    />
                </div>
                <button type="submit"class= "text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Sign Up</button>
            </form>
        </div>
    );
}
export default SignupForm;