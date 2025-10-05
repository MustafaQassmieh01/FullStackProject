import { authFetch } from "../auth/auth";

export const prerequisites = {
    getPrerequisitesByCourseCode: async (courseCode) => {
        try{
            const response = await authFetch(`/prerequisites/course/${courseCode}`, {
                method: 'GET'
            });
            if (!response.ok) {
                throw new Error(`Error fetching prerequisites for course ${courseCode}: ${response.statusText}`);
            }
            const data = await response.json();
            return data.data;
        }catch (error) {
            console.error('Error fetching prerequisites by course code:', error);
            throw error;
        }
    },
    addPrerequisite: async (courseCode, prerequisiteCode) => {
        try {
            const response = await authFetch(`/prerequisites`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ courseCode, prerequisiteCode })
            });
            if (!response.ok) {
                throw new Error(`Error adding prerequisite ${prerequisiteCode} to course ${courseCode}: ${response.statusText}`);
            }
        } catch (error) {
            console.error('Error adding prerequisite:', error);
            throw error;
        }
    },
    deletePrerequisite: async ( prerequisiteCode) => {
        try {
            const response = await authFetch(`/prerequisites/${prerequisiteCode}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error(`Error deleting prerequisite ${prerequisiteCode}: ${response.statusText}`);
            }
        } catch (error) {
            console.error('Error deleting prerequisite:', error);
            throw error;
        }
    },
}