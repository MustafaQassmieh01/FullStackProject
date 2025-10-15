import {userApi} from '../../../api/userApi';
import { useEffect, useState } from 'react';


function Prerequisites({ courseCode }) {
  const [prereqs, setPrereqs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPrereqs() {
      try {
        const response = await userApi.getCoursePrerequisites(courseCode);
        console.log('API response for prerequisites:', response);
        const data = await Promise.all(response.map(prereqs => processPrerequisites(prereqs)));
        console.log('Fetched prerequisites:', data);
        setPrereqs(data);

      } catch (e) {
        console.log('CourseCards.Prerequisites > ', e);
      } finally {
        setLoading(false);
      }
    }
    fetchPrereqs();
  }, [courseCode]);


  if (loading) {
    return (
      <div className="text-sm text-teal-600 font-medium flex items-center gap-2">
        <p>Loading prerequisites...</p>
        <div className="animate-spin h-4 w-4 border-2 border-teal-600 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="mt-3">
      <h4 className="text-sm font-semibold text-teal-600">Prerequisites</h4>
      {prereqs.length === 0 ? (
        <p className="text-sm text-gray-500">No prerequisites.</p>
      ) : (
        <ul className="list-disc ml-6 mt-1 text-sm text-gray-800">
          {prereqs.map((requirement) => (
            <li key={requirement.code || requirement.prerequisite_code}>
              {requirement.title }
              {requirement.additional && <p className="text-sm text-gray-600">{requirement.additional}</p>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
async function processPrerequisites(prerequisite){
    try {   
        const course = await userApi.getCourseByCode(prerequisite.course_code);
        const courseTitle = course.data.title || course.data.code;
        const additional = prerequisite.additional ? ` - ${prerequisite.additional}` : '';
    return { title: courseTitle, additional: additional };
    } catch (error) {
        console.error('Error fetching course:', error);
    }
}
export default Prerequisites;