import { authFetch } from "../auth/auth";
import { parseResponse } from './response';

export const registrations = {
    addRegistration: async (courseCode) => {
        try {
            const response = await authFetch(`/registrations/${courseCode}`, {
                method: 'POST'
            });
            return await parseResponse(response);
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
            return await parseResponse(response);
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
            return await parseResponse(response);
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
            return await parseResponse(response);
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
            return await parseResponse(response);
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
            const resJson = await response.json();
            if (!response.ok || (resJson && resJson.success === false)) {
                const err = new Error(resJson?.message || response.statusText || 'Error changing registration status');
                err.payload = resJson;
                throw err;
            }
            return resJson.data;
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
            return await parseResponse(response);
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
            const resJson = await response.json();
            if (!response.ok || (resJson && resJson.success === false)) {
                const err = new Error(resJson?.message || response.statusText || 'Error fetching registrations');
                err.payload = resJson;
                throw err;
            }
            return resJson.data;
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
            return await parseResponse(response);
        } catch (error) {
            console.error('Error fetching all registrations:', error);
            throw error;
        }
    }
}
