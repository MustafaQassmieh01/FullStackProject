import {userApi} from '../../../api/users.js';
import {  useUser, useToken } from '../../../context/authProvider.jsx';
// import { useNavigate } from 'react-router-dom';



function LoginForm() {
    // const navigate = useNavigate();

    const { setUser } = useUser();
    const { setToken } = useToken();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        const username = formData.get('username');
        const password = formData.get('password');
            
        
        userApi.Login(username, password).then(response => {
            
            console.log('Login successful:', response);
            const { user } = response.data
            const token  =  response.token
            // Set user and token in context
            setUser(user);
            setToken(token);
            
            // Handle successful login, e.g., redirect or show a message
            // navigate('/dashboard'); // Redirect to home page or dashboard

        }).catch(error => {
            console.error('Login failed:', error);
            // Handle login failure, e.g., show an error message
        })
    }
    return(
        <div className="login-form" class="">
            <br />
            <h2 class= "font-bold">login</h2>
            <br />
            <form onSubmit={handleSubmit} class="bg-gray-50 border-2 border-gray-300 p-4 rounded-lg shadow-md">
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
                    <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password:</label>
                    <input
                    type="password"
                    id="password"
                    name="password"
                    required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    </div>
                <button type="submit" class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Login</button>
            </form>
        </div>
    )
}
export default LoginForm;