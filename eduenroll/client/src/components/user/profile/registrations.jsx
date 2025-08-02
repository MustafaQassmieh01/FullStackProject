import {userApi} from '../../../api/userApi';
import React, { useEffect, useState } from 'react';

function Registrations(){
    const [registrations, setRegistrations] = useState([]);
    
    useEffect(() => {
        async function fetchRegistrations() {
            try {
                const data = await userApi.getRegistrations();
                setRegistrations(data);
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
                    <RegistrationCard {...registration} />
                ))}
            </div>
        </div>
    );
}

function RegistrationCard(registration){
    return (
        
        <div className="registration-card w-9 border p-4 rounded shadow-md mb-4">
            <h3 className="text-red-400 self-start">Registration ID: {registration.registration_id}</h3>
            <div className="mb-2">
                <strong>Course:</strong> {registration.course_code.title}
            </div>
            <div className="mb-2 text-green-400">
                <strong>Status:</strong> {registration.status}
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