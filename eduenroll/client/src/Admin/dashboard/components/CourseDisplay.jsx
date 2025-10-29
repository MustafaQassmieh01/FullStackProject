
import React, { useEffect, useState } from "react";
import { Api } from "../../../../src/api/userApi";
import CircleProgress from "./CircleProgress";

const CourseDisplay = () => {
  const [courses, setCourses] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        const coursesData = await Api.admin.courses.getAll();
        const registrationsData = await Api.admin.registrations.getAll();
        setCourses(coursesData || []);
        setRegistrations(registrationsData || []);
      } catch {
        // Optionally handle error
      }
      setLoading(false);
    };
    fetchStats();
  }, []);

  // Calculate statistics
  const numCourses = courses.length;
  const avgApplications = numCourses ? (registrations.length / numCourses).toFixed(2) : 0;
  const acceptedRegs = registrations.filter(r => r.status === "accepted");
  const avgAccepted = numCourses ? (acceptedRegs.length / numCourses).toFixed(2) : 0;

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-6 w-full max-w-lg mx-auto flex items-center gap-6 transition-transform duration-200 hover:scale-105 hover:shadow-xl">
      <div className="flex-shrink-0">
        <CircleProgress
          value={Math.min(Number(avgAccepted) * 20, 100)}
          color="#22c55e"
          label={`${avgAccepted}`}
          size={72}
        />
      </div>
      <div className="flex-1">
        <h2 className="text-2xl font-bold mb-4 text-green-700">Course Statistics</h2>
        {loading ? (
          <div className="flex justify-center items-center h-24">
            <span className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-500"></span>
          </div>
        ) : (
          <ul className="space-y-2 text-gray-700">
            <li className="font-semibold">Total Courses: <span className="font-normal">{numCourses}</span></li>
            <li className="font-semibold">Average Applications per Course: <span className="font-normal">{avgApplications}</span></li>
            <li className="font-semibold">Average Accepted per Course: <span className="font-normal">{avgAccepted}</span></li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default CourseDisplay;
