import { mockPatients } from './mockData';

export class MockPatientApi {
  constructor() {
    this.patients = [...mockPatients];
  }

  async request(endpoint, method = 'GET', body = null) {
    switch (method) {
      case 'GET':
        if (endpoint === '/patients') {
          return Promise.resolve([...this.patients]);
        }
        if (endpoint.includes('/patients/id')) {
          const id = parseInt(endpoint.split('=')[1]);
          return this.getPatientById(id);
        }
        if (endpoint.includes('/patients/socialSecurity')) {
          const ss = endpoint.split('=')[1];
          return this.getPatientBySocialSecurity(ss);
        }
        if (endpoint.includes('/patients/byDocument')) {
          const doc = endpoint.split('=')[1];
          return this.getPatientByDocument(doc);
        }
        if (endpoint === '/patients/documents') {
          return Promise.resolve(['CI', 'Pasaporte', 'Otro']);
        }
        break;
      case 'POST':
        return this.createPatient(body);
      case 'PUT':
        return this.updatePatient(body);
      case 'DELETE':
        const id = parseInt(endpoint.split('=')[1]);
        return this.deletePatient(id);
    }
    throw new Error('Invalid endpoint or method');
  }

  async getPatientById(id) {
    const patient = this.patients.find(p => p.id === id);
    if (!patient) throw new Error('Patient not found');
    return Promise.resolve(patient);
  }

  async getPatientBySocialSecurity(socialSecurity) {
    const patient = this.patients.find(p => p.socialSecurity === socialSecurity);
    if (!patient) throw new Error('Patient not found');
    return Promise.resolve(patient);
  }

  async getPatientByDocument(document) {
    const patient = this.patients.find(p => p.document === document);
    if (!patient) throw new Error('Patient not found');
    return Promise.resolve(patient);
  }

  async createPatient(patient) {
    if (!patient.document || !patient.name || !patient.socialSecurity) {
      throw new Error('Missing required fields');
    }
    const newPatient = {
      ...patient,
      id: this.patients.length + 1
    };
    this.patients.push(newPatient);
    return Promise.resolve(newPatient);
  }

  async updatePatient(patient) {
    const index = this.patients.findIndex(p => p.id === patient.id);
    if (index === -1) throw new Error('Patient not found');
    this.patients[index] = { ...this.patients[index], ...patient };
    return Promise.resolve(this.patients[index]);
  }

  async deletePatient(id) {
    const index = this.patients.findIndex(p => p.id === id);
    if (index === -1) throw new Error('Patient not found');
    this.patients.splice(index, 1);
    return Promise.resolve({ success: true });
  }
}
