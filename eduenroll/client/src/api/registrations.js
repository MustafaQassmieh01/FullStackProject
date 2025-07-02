import { authFetch } from "../auth/auth";

export const registrations = {
    addRegistration: async (courseCode) => {
        try {
            const response = await authFetch(`/eduenroll/api/registrations/${courseCode}`, {
                method: 'POST'
            });
            if (!response.ok) {
                throw new Error(`Error registering for course ${courseCode}: ${response.statusText}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error adding registration:', error);
            throw error;
        }
    },
    getRegistrationsByUser: async () => {
        try {
            const response = await authFetch(`/eduenroll/api/registrations/user`, {
                method: 'GET'
            });
            if (!response.ok) {
                throw new Error(`Error fetching user registrations: ${response.statusText}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching registrations by user:', error);
            throw error;
        }
    },
    getRegistrationsByCourse: async (courseCode) => {
        try {
            const response = await authFetch(`/eduenroll/api/registrations/course/${courseCode}`, {
                method: 'GET'
            });
            if (!response.ok) {
                throw new Error(`Error fetching registrations for course ${courseCode}: ${response.statusText}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching registrations by course:', error);
            throw error;
        }
    },
    editRegistration: async (registrationId, updatedData) => {
        try {
            const response = await authFetch(`/eduenroll/api/registrations/${registrationId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedData)
            });
            if (!response.ok) {
                throw new Error(`Error editing registration ${registrationId}: ${response.statusText}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error editing registration:', error);
            throw error;
        }
    },
}
