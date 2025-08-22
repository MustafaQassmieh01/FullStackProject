import {userApi} from '../../../api/userApi';
import React, { useEffect, useState } from 'react';

function Registrations(){
    const [registrations, setRegistrations] = useState([]);

    useEffect(() => {
        async function fetchRegistrations() {
            try {
                const response = await userApi.getRegistrations();
                setRegistrations(response.data);
            } catch (error) {
                console.error('Error fetching registrations:', error);
            }
        }
        fetchRegistrations();
    }, []);

    return (
        <div className="registrations align-items-center">
            <h1>My Registrations</h1>
            <div className="registration-list">
                {registrations.map(registration => (
                    <RegistrationCard key={registration.registration_id} {...registration} />
                ))}
            </div>
        </div>
    );
}

function RegistrationCard(registration){
    return (

    <div className="registration-card w-96 border border-gray-200 p-6 rounded-xl shadow-lg mb-6 transform transition duration-300 hover:scale-105 hover:shadow-2xl bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50">
        <h3 className="text-xl font-bold text-purple-600 mb-3">Registration ID: {registration.registration_id}</h3>
        
        <div className="mb-2">
            <strong className="text-gray-700">Course:</strong> 
            <span className="ml-2 text-indigo-700 font-medium">{registration.course_code.title}</span>
        </div>

        <div className={`mb-2 font-semibold ${
            registration.status === "approved" ? "text-green-500" :
            registration.status === "pending" ? "text-yellow-500" :
            "text-red-500"
        }`}>
            <strong>Status:</strong> <span className="ml-2">{registration.status}</span>
        </div>

        <button className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700 hover:shadow-md transition">
            View Details
        </button>
    </div>
    )
}
/* registration_id: {type: String, required: true, unique: true},
  username: {type: String, ref: "User", required: true},
  course_code: {type: String,ref: "Course",required: true,},
  status: {type: String, required: true,
        enum: ["pending", "approved", "rejected"],
        default: "pending"}
});*/
export default Registrations;