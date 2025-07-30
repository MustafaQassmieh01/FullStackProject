import { useEffect, useState } from "react";
// import { Assignment } from "../../../api/Assignments.js";
import {userApi} from "../../../api/userApi"
import {ChevronDownIcon, ChevronUpIcon }from '@heroicons/react/16/solid'
import './Assignments.css';

function CourseDisplay() {
  const [courses,setCourses] = useState([]);
  useEffect(()=>{
    async function fetchCourses(){ 
      const data = await userApi.getAllCourses()
      setCourses(data)
    }
    fetchCourses()
  },[]);
  

  return (
    <div className="courses">
      <h1>Available Courses</h1>
      <CoursesMain courses={courses} />
    </div>
  );
}


function CoursesMain({courses}) {
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
    sorted.sort((a, b) => getValueFromPath(a, sort.keyToSort) > getValueFromPath(b, sort.keyToSort) ? 1 : -1);
  } else {
    sorted.sort((a, b) => getValueFromPath(a, sort.keyToSort) > getValueFromPath(b, sort.keyToSort) ? -1 : 1);
  }
  return sorted;
}


  return (
    <section>
      <div id='courses-header'>
        <select value={sort.keyToSort} onChange={(e) => handleLabelClick(e.target.value)}>
          <option value="" disabled>Select sort option</option>
            {headers.map((header) => (
              <option key={header.id} value={header.KEY}>
               {header.label}
              </option>
            ))}
        </select>

      </div>
      {/* this ends the whole presenting the headlines you can also see the onclick for the t */}
      <div id='courses-main'>
        {getSortedArray(courses).map((course) => (
          <CourseCard course = {course}/>
        ))}
      </div>
    </section>
  );
}

function CourseCard({course}){
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
  const handleClick = (courseCode)=>{
    userApi.register(courseCode);
  }
  return (
      <div className="course-card border p-4 rounded shadow-md mb-4">
      <div className="mb-2">
        {mainHeaders.map(({ KEY, label }) => (
          <div key={KEY}>
            <strong>{label}:</strong> {course[KEY]}
          </div>
        ))}
      </div>
      <button
        type="button"
        className="inline-block rounded-full bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-200 focus:bg-primary-accent-200 focus:outline-none focus:ring-0 active:bg-primary-accent-200 motion-reduce:transition-none dark:bg-primary-300 dark:hover:bg-primary-400 dark:focus:bg-primary-400 dark:active:bg-primary-400"
        onClick={()=>handleClick(course.code)}>
        
      </button>
      
      <br/>
     <button
      onClick={() => setVisible((prev) => !prev)}
      className="p-1"
      >
        <ChevronDownIcon
          className={`h-5 w-5 transform transition-transform duration-200 ${
            visible ? 'rotate-180' : ''
          }`}
        />
      </button>

      {visible &&
      <>
      <div className="text-sm text-gray-700 mt-2">
        {extraHeaders.map(({ KEY, label }) => (
          <div key={KEY}>
            <strong>{label}:</strong> {course[KEY]}
          </div>
        ))}
      </div>
       <Prerequisites courseCode={course.code} />
       </>  
      }
    </div>
  )
}

function Prerequisites({ courseCode }) {
  const [prereqs, setPrereqs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    async function fetchPrereqs() {
      try {
        const data = await userApi.getPrerequisitesByCourseCode(courseCode);
        setPrereqs(data);
      } catch (e) {
        console.log('CourseCards.Prerequisites > ',e)
        // Optional: show error to user, but your API already logs it
      } finally {
        setLoading(false);
      }
    }

    fetchPrereqs();
  }, [courseCode]);

  if (loading) return <p>Loading prerequisites...</p>;

  return (
    <div>
      <h4 className="font-semibold">Prerequisites</h4>
      {prereqs.length === 0 ? (
        <p className="text-sm text-gray-500">No prerequisites.</p>
      ) : (
        <ul className="list-disc ml-6 mt-1 text-sm text-gray-800">
          {prereqs.map((requirement) => (
            <li key={requirement.prerequisite_code.code || requirement.prerequisite_code}>
              {requirement.prerequisite_code.title || requirement.prerequisite_code.code}
              {requirement.description && <p>{requirement.description}</p>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
function getValueFromPath(obj, path) {
  return path.split('.').reduce((o, p) => (o ? o[p] : undefined), obj);
}

export default CourseDisplay;
