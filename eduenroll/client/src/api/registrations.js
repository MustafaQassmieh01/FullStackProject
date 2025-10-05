import { authFetch } from "../auth/auth";

export const registrations = {
    addRegistration: async (courseCode) => {
        try {
            const response = await authFetch(`/registrations/${courseCode}`, {
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

    createRegistration: async (userId, courseCode) => {
        try {
            const response = await authFetch(`/registrations/admin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userId, courseCode })
            });
            if (!response.ok) {
                throw new Error(`Error creating registration for user ${userId} in course ${courseCode}: ${response.statusText}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error creating registration as admin:', error);
            throw error;
        }
    },

    getUserRegistrations: async () => {
        try {
            const response = await authFetch(`/registrations/user`, {
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
            const response = await authFetch(`/registrations/course/${courseCode}`, {
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
            const response = await authFetch(`/registrations/${registrationId}`, {
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

    changeStatus: async (registrationId, newStatus) => {
        try{
            const response = await authFetch(`/registrations/${registrationId}/status`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ status: newStatus })
            });
            if (!response.ok) {
                throw new Error(`Error changing status of registration ${registrationId}: ${response.statusText}`);
            }
        } catch (error) {
            console.error('Error changing registration status:', error);
            throw error;
        }
    },

    removeRegistration: async (registrationId) => {
        try {
            const response = await authFetch(`/registrations/${registrationId}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error(`Error removing registration ${registrationId}: ${response.statusText}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error removing registration:', error);
            throw error;
        }
    },

    getRegistrationsByUser: async (userId) => {
        try {
            const response = await authFetch(`/registrations/${userId}/admin`, {
                method: 'GET'
            });
            if (!response.ok) {
                throw new Error(`Error fetching registrations for user ${userId}: ${response.statusText}`);
            }
        } catch (error) {
            console.error('Error fetching registrations by user:', error);
            throw error;
        }
    },

    getAllRegistrations: async () => {
        try {
            const response = await authFetch(`/registrations`, {
                method: 'GET'
            });
            if (!response.ok) {
                throw new Error(`Error fetching all registrations: ${response.statusText}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching all registrations:', error);
            throw error;
        }
    }
}
