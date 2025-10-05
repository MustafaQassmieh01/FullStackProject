import { authFetch } from "../auth/auth";

export const courses= {
    getAllCourses:async()=>{
        try{ 
            const response = await authFetch('/courses', {
                method: 'GET'
            });
            const data = await response.json();
            return data.data;
        }catch (error) {
            console.error('Error fetching courses:', error);
            throw error;
        }
    },
    
    getCourseByCode: async (code) =>{
        try{
            const response = await authFetch('/courses/' + code, {
                method: 'GET'
            });
            if (!response.ok) {
                throw new Error(`Error fetching course with code ${code}: ${response.statusText}`);
            }
            const data = await response.json();
            return data;
        }catch (error) {
            console.error('Error fetching course by code:', error);
            throw error;
        }
    },

    editCourse: async (courseCode, updatedData) => {
        try {
            const response = await authFetch(`/courses/${courseCode}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedData)
            });
            if (!response.ok) {
                throw new Error(`Error editing course ${courseCode}: ${response.statusText}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error editing course:', error);
            throw error;
        }
    },
}