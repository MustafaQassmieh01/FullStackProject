import { authFetch } from "../auth/auth";
import { parseResponse } from './response';

export const courses= {
    getAllCourses:async()=>{
        try{ 
            const response = await authFetch('/courses', {
                method: 'GET'
            });
            return await parseResponse(response);
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
            return await parseResponse(response);
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
            return await parseResponse(response);
        } catch (error) {
            console.error('Error editing course:', error);
            throw error;
        }
    },
    createCourse: async (courseData) => {
        try {
            const response = await authFetch('/courses', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(courseData)
            });
            return await parseResponse(response);
        } catch (error) {
            console.error('Error creating course:', error);
            throw error;
        }
    },
    updateCourseCapacity: async (courseId, capacityPayload) => {
        try {
            const response = await authFetch(`/courses/${courseId}/capacity`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(capacityPayload)
            });
            return await parseResponse(response);
        } catch (error) {
            console.error('Error updating course capacity:', error);
            throw error;
        }
    },
    deleteCourse: async (courseCode) => {
        try {
            const response = await authFetch(`/courses/${courseCode}`, {
                method: 'DELETE'
            });
            return await parseResponse(response, { raw: true });
        } catch (error) {
            console.error('Error deleting course:', error);
            throw error;
        }
    },
}