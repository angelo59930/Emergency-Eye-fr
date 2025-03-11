import AmbulanceApi from './Apis/AmbulanceService';
import { PatientApi } from './Apis/PatientService';
import { TravelApi } from './TravelService';
import { MockAuthService } from './mocks/MockAuthService';
import { MockTravelApi } from './mocks/MockTravelService';
import { MockAmbulanceApi } from './mocks/MockAmbulanceService';
import { MockPatientApi } from './mocks/MockPatientService';

const USE_MOCKS = import.meta.env.VITE_USE_MOCKS === 'true';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

export class ServiceFactory {
  static getAmbulanceService() {
    return USE_MOCKS ? new MockAmbulanceApi() : new AmbulanceApi(API_BASE_URL);
  }

  static getPatientService() {
    return USE_MOCKS ? new MockPatientApi() : new PatientApi(API_BASE_URL);
  }

  static getAuthService() {
    return USE_MOCKS ? new MockAuthService() : null; // TODO: Implement real AuthService
  }

  static getTravelService() {
    return USE_MOCKS ? new MockTravelApi() : new TravelApi(API_BASE_URL);
  }
}
