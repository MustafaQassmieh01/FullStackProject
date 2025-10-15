import { useEffect, useState } from "react";
// import { Assignment } from "../../../api/Assignments.js";
import {userApi} from "../../../api/userApi"
import {ChevronDownIcon, ChevronUpIcon }from '@heroicons/react/16/solid'
import Prerequisites from "./Prerequesites";

function CourseDisplay() {

  return (
    <div className="courses justify-self-center w-full max-w-3xl bg-white p-6 rounded-lg shadow-md border border-teal-600">
      <CoursesMain />
    </div>
  );
}

function CoursesMain() {
  const [courses,setCourses] = useState([]);
  
    async function fetchCourses(){
      const [allCoursesResponse, registeredCoursesResponse] = await Promise.all([
        userApi.getAllCourses(),
        userApi.getRegistrations()
      ]);
      const data = await filterUnregistered(allCoursesResponse, registeredCoursesResponse);
      setCourses(data)
    }

    useEffect(()=>{ 
      fetchCourses()
    },[]);
    

  // so here i made headers
  const headers = [
  {id:1,KEY:'code', label:'Course Code'},
  {id:2,KEY:'title',label:'Title'},
  {id:3,KEY:'teacher_id',label: 'Teacher Id'}
  ]
  const [sort,setSort] = useState({keyToSort:'code',direction:"asc"});
  // made a function that checks if the key is asc changes it and vice versa
  function handleLabelClick(key) {
    setSort(prevSort => ({
      keyToSort: key,
      direction: key === prevSort.keyToSort
        ? (prevSort.direction === 'asc' ? 'desc' : 'asc')
        : 'desc'
  }));
}


  // function that takes the sort direction and basically if its top then ascending and if its bottom its decending
  function getSortedArray(array) {
  const sorted = [...array]; // shallow copy
  if (sort.direction === "asc") {
    sorted.sort((a, b) => getValueFromPath(a, sort.keyToSort) >= getValueFromPath(b, sort.keyToSort) ? 1 : -1);
  } else {
    sorted.sort((a, b) => getValueFromPath(a, sort.keyToSort) >= getValueFromPath(b, sort.keyToSort) ? -1 : 1);
  }
  return sorted;
}


  return (
    <section className="space-y-4">
      <div className="p-4 bg-teal-50 rounded-lg shadow-sm flex flex-col items-center">
        <h2 className="text-2xl font-bold text-teal-600 mb-4">Available Courses</h2>
        <select
          value={sort.keyToSort}
          onChange={(e) => handleLabelClick(e.target.value)}
          className="w-full max-w-xs px-3 py-2 border border-teal-600 rounded-lg text-sm text-gray-800 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
        >
          <option value="" disabled>Select sort option</option>
          {headers.map((header) => (
            <option key={header.id} value={header.KEY}>
              {header.label}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-4">
        {courses.length === 0 ? (
          <p className="text-gray-500 text-sm text-center">No courses available.</p>
        ) : (
          getSortedArray(courses).map((course) => (
            <CourseCard key={course.code} course={course} refreshCourses={fetchCourses} />
          ))
        )}
      </div>
    </section>
  );
}


function CourseCard({course, refreshCourses}){
  const [visible, setVisible] = useState(false)
  const mainHeaders = [
  { KEY: 'code', label: 'Course Code' },
  { KEY: 'title', label: 'Title' },
  { KEY: 'teacher_id', label: 'Teacher Id' }
  ];

  const extraHeaders = [
  { KEY: 'description', label: 'Description' },
  { KEY: 'capacity', label: 'Capacity' }
  ];
// const code = course.code;
  const handleClick = async (courseCode)=>{
    await registerToCourse(courseCode);
    await refreshCourses();
  }
  return (
    <div className="course-card bg-white border border-teal-600 p-4 rounded-lg shadow-md">
      <div className="mb-3 space-y-1">
        {mainHeaders.map(({ KEY, label }) => (
          <div key={KEY} className="text-sm text-gray-800">
            <strong className="text-teal-600">{label}:</strong> {course[KEY] || 'N/A'}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          className="inline-block rounded-full bg-teal-600 px-6 py-2 text-xs font-medium uppercase text-white hover:bg-teal-700 focus:ring-2 focus:ring-teal-500 focus:outline-none transition"
          onClick={() => handleClick(course.code)}
        >
          Register
        </button>
        <button
          onClick={() => setVisible((prev) => !prev)}
          className="p-1 rounded-full hover:bg-teal-100 transition"
        >
          <ChevronDownIcon
            className={`h-5 w-5 text-teal-600 transform transition-transform duration-200 ${visible ? 'rotate-180' : ''}`}
          />
        </button>
      </div>
      {visible && (
        <div className="mt-3 p-3 bg-teal-50 rounded-lg">
          <div className="text-sm text-gray-800 space-y-1">
            {extraHeaders.map(({ KEY, label }) => (
              <div key={KEY}>
                <strong className="text-teal-600">{label}:</strong> {course[KEY] || 'N/A'}
              </div>
            ))}
          </div>
          <Prerequisites courseCode={course.code} />
        </div>
      )}
    </div>
  );
}


async function registerToCourse(courseCode) {
  try {
    await userApi.register(courseCode)
    alert(`Successfully registered for course: ${courseCode}`);
  } catch (error) {
    console.error('Error registering for course:', error);
  }

}


function filterUnregistered(allCourses, registeredCoursesrResponse) {
  const registeredCourses = registeredCoursesrResponse.data;
  if (registeredCourses.length === 0) return allCourses;
  const registeredIds = new Set(registeredCourses.map(c => c.course_code));

  return allCourses.filter(course => !registeredIds.has(course.code));
}


function getValueFromPath(obj, path) {
  return path.split('.').reduce((o, p) => (o ? o[p] : undefined), obj);
}


export default CourseDisplay;