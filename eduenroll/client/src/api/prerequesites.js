import { authFetch } from "../auth/auth";

export const prerequisites = {
    getPrerequisitesByCourseCode: async (courseCode) => {
        try{
            const response = await authFetch(`/eduenroll/api/prerequisites/${courseCode}`, {
                method: 'GET'
            });
            if (!response.ok) {
                throw new Error(`Error fetching prerequisites for course ${courseCode}: ${response.statusText}`);
            }
            const data = await response.json();
            return data;
        }catch (error) {
            console.error('Error fetching prerequisites by course code:', error);
            throw error;
        }
    },
}