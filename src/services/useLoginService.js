import { LoginApi } from '@/services/Apis/LoginService';

export const useLoginService = () => {
    const api = new LoginApi('http://localhost:8081/api/v1');

    const loginUser = async (credentials) => {
        try {
            const response = await api.login(credentials);
            return response;
        } catch (error) {
            console.error('Error en el servicio de login:', error);
            throw error;
        }
    };

    return {
        loginUser,
    };
};
