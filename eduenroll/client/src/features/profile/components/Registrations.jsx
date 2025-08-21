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
        
    <div className="registration-card w-96 border-2 border-indigo-500 p-6 rounded-xl shadow-lg mb-6 bg-gradient-to-r from-indigo-50 to-white hover:shadow-xl transition">
    <h3 className="text-indigo-600 font-bold text-lg mb-3">
        ✨ Registration ID: {registration.registration_id}
    </h3>
    <div className="mb-3 text-gray-800">
        <strong>📘 Course:</strong> {registration.course_code.title}
    </div>
    <div className="mb-2 text-green-600 font-semibold">
        <strong>✅ Status:</strong> {registration.status}
    </div>    
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