
import React, { useEffect, useState } from "react";
import { Api } from "../../../../src/api/userApi";
import CircleProgress from "./CircleProgress";

const RegistrationDisplay = () => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        const registrationsData = await Api.admin.registrations.getAll();
        setRegistrations(registrationsData || []);
      } catch {
        // Optionally handle error
      }
      setLoading(false);
    };
    fetchStats();
  }, []);

  // Calculate statistics
  const numRegistrations = registrations.length;
  const accepted = registrations.filter(r => r.status === "accepted").length;
  const waiting = registrations.filter(r => r.status === "waiting").length;
  const rejected = registrations.filter(r => r.status === "rejected").length;

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-6 w-full max-w-2xl mx-auto flex items-center gap-6 transition-transform duration-200 hover:scale-105 hover:shadow-xl">
      <div className="flex-shrink-0">
        <CircleProgress
          value={numRegistrations ? Math.round((accepted / numRegistrations) * 100) : 0}
          color="#a21caf"
          label={`${accepted}`}
          size={72}
        />
      </div>
      <div className="flex-1">
        <h2 className="text-2xl font-bold mb-4 text-purple-700">Registration Statistics</h2>
        {loading ? (
          <div className="flex justify-center items-center h-24">
            <span className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></span>
          </div>
        ) : (
          <ul className="space-y-2 text-gray-700">
            <li className="font-semibold">Total Registrations: <span className="font-normal">{numRegistrations}</span></li>
            <li className="font-semibold">Accepted: <span className="font-normal">{accepted}</span></li>
            <li className="font-semibold">Waiting: <span className="font-normal">{waiting}</span></li>
            <li className="font-semibold">Rejected: <span className="font-normal">{rejected}</span></li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default RegistrationDisplay;
