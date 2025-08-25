import { userApi } from '../../../api/userApi';
import React, { useEffect, useState } from 'react';

function Registrations() {
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
    <div className="registrations">
      <div className="registration-list space-y-4">
        {registrations.length === 0 ? (
          <p className="text-gray-500 text-sm text-center">No registrations found.</p>
        ) : (
          registrations.map(registration => (
            <RegistrationCard key={registration.registration_id} {...registration} />
          ))
        )}
      </div>
    </div>
  );
}

function RegistrationCard(registration) {
  const handleRemoveRegistration = async (registrationId) => {
    try {
      await userApi.removeRegistration(registrationId);
      // Refresh the page to reflect the changes
      window.location.reload();
    } catch (error) {
      console.error('Error removing registration:', error);
    }
  };

  return (
    <div className="registration-card w-full border border-teal-600 p-6 rounded-lg shadow-md bg-white">
      <h3 className="text-lg font-semibold text-teal-600 mb-3">Registration ID: {registration.registration_id}</h3>
      <div className="mb-2 text-sm text-gray-800">
        <strong className="text-teal-600">Course:</strong>
        <span className="ml-2">{registration.course_code?.title || registration.course_code || 'N/A'}</span>
      </div>
      <div className={`mb-2 text-sm font-semibold ${
        registration.status === "approved" ? "text-green-600" :
        registration.status === "pending" ? "text-yellow-600" :
        "text-red-600"
      }`}>
        <strong className="text-teal-600">Status:</strong> <span className="ml-2">{registration.status}</span>
      </div>
      <div className="mt-4 flex justify-end">
        <button
          className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md shadow hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition"
          onClick={() => handleRemoveRegistration(registration.registration_id)}
        >
          Unregister
        </button>
      </div>
    </div>
  );
}
/* registration_id: {type: String, required: true, unique: true},
  username: {type: String, ref: "User", required: true},
  course_code: {type: String,ref: "Course",required: true,},
  status: {type: String, required: true,
        enum: ["pending", "approved", "rejected"],
        default: "pending"}
});*/

export default Registrations;