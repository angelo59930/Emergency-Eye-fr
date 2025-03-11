
import { ref } from 'vue';
import { ServiceFactory } from './ServiceFactory';

export const usePatientService = () => {
    const api = ServiceFactory.getPatientService();
    const patients = ref([]);
    const error = ref(null);

    const getPatients = async () => {
        try {
            patients.value = await api.request('/patients');
            return patients.value;
        } catch (error) {
            console.error('Error al obtener pacientes:', error);
            error.value = error.message;
            throw error;
        }
    };

    const getPatientById = async (id) => {
        try {
            return await api.request(`/patients/id?id=${id}`);
        } catch (error) {
            console.error('Error al obtener paciente por ID:', error);
            error.value = error.message;
            throw error;
        }
    };

    const getPatientByDocument = async (document) => {
        try {
            return await api.request(`/patients/byDocument?document=${document}`);
        } catch (error) {
            console.error('Error al obtener paciente por documento:', error);
            error.value = error.message;
            throw error;
        }
    };

    const createPatient = async (patient) => {
        try {
            const response = await api.request('/patients/create', 'POST', patient);
            await getPatients();
            return response;
        } catch (error) {
            console.error('Error al crear paciente:', error);
            error.value = error.message;
            throw error;
        }
    };

    const updatePatient = async (patient) => {
        try {
            const response = await api.request('/patients/update', 'PUT', patient);
            await getPatients();
            return response;
        } catch (error) {
            console.error('Error al actualizar paciente:', error);
            error.value = error.message;
            throw error;
        }
    };

    const deletePatient = async (id) => {
        try {
            await api.request(`/patients/delete?id=${id}`, 'DELETE');
            await getPatients();
        } catch (error) {
            console.error('Error al eliminar paciente:', error);
            error.value = error.message;
            throw error;
        }
    };

    return {
        patients,
        error,
        getPatients,
        getPatientById,
        getPatientByDocument,
        createPatient,
        updatePatient,
        deletePatient
    };
};
