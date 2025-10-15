
import React, { useEffect, useState } from "react";
import { Api } from "../../../../src/api/userApi";
import CircleProgress from "./CircleProgress";

const UserDisplay = () => {
  const [users, setUsers] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        const usersData = await Api.admin.users.getAll();
        const registrationsData = await Api.admin.registrations.getAll();
        setUsers(usersData || []);
        setRegistrations(registrationsData || []);
      } catch {
        // Optionally handle error
      }
      setLoading(false);
    };
    fetchStats();
  }, []);

  // Calculate statistics
  const numUsers = users.length;
  const avgAppliedCourses = numUsers ? (registrations.length / numUsers).toFixed(2) : 0;
  const acceptedRegs = registrations.filter(r => r.status === "accepted");
  const avgAcceptedCourses = numUsers ? (acceptedRegs.length / numUsers).toFixed(2) : 0;

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-6 w-full max-w-lg mx-auto flex items-center gap-6 transition-transform duration-200 hover:scale-105 hover:shadow-xl">
      <div className="flex-shrink-0">
        <CircleProgress
          value={Math.min(Number(avgAcceptedCourses) * 20, 100)}
          color="#3b82f6"
          label={`${avgAcceptedCourses}`}
          size={72}
        />
      </div>
      <div className="flex-1">
        <h2 className="text-2xl font-bold mb-4 text-blue-700">User Statistics</h2>
        {loading ? (
          <div className="flex justify-center items-center h-24">
            <span className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></span>
          </div>
        ) : (
          <ul className="space-y-2 text-gray-700">
            <li className="font-semibold">Total Users: <span className="font-normal">{numUsers}</span></li>
            <li className="font-semibold">Average Applied Courses per User: <span className="font-normal">{avgAppliedCourses}</span></li>
            <li className="font-semibold">Average Accepted Courses per User: <span className="font-normal">{avgAcceptedCourses}</span></li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default UserDisplay;
