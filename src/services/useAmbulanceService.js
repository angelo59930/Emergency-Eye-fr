import { ref } from 'vue';
import { ServiceFactory } from './ServiceFactory';

const useAmbulanceService = () => {
    const api = ServiceFactory.getAmbulanceService();
    const ambulances = ref([]);
    const error = ref(null);

    const getAmbulances = async () => {
        try {
            ambulances.value = await api.getAmbulance();
            return ambulances.value;
        } catch (error) {
            console.error('Error fetching ambulances:', error);
            throw error;
        }
    };

    const addAmbulance = async (ambulance) => {
        try {
            await api.postAmbulance(ambulance);
            await getAmbulances();
        } catch (error) {
            console.error('Error adding ambulance:', error);
            throw error;
        }
    };

    const updateAmbulance = async (ambulance) => {
        try {
            await api.putAmbulance(ambulance);
            await getAmbulances();
        } catch (error) {
            console.error('Error updating ambulance:', error);
            throw error;
        }
    };

    const removeAmbulance = async (id) => {
        try {
            await api.deleteAmbulance(id);
            await getAmbulances();
        } catch (error) {
            console.error('Error removing ambulance:', error);
            throw error;
        }
    };

    return {
        ambulances,
        error,
        getAmbulances,
        addAmbulance,
        updateAmbulance,
        removeAmbulance,
    };
};

export default useAmbulanceService;
