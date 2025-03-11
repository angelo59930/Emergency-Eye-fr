import { mockAmbulances } from './mockData';

export class MockAmbulanceApi {
  constructor() {
    this.ambulances = [...mockAmbulances];
  }

  async getAmbulance() {
    return Promise.resolve([...this.ambulances]);
  }

  async postAmbulance(data) {
    if (!data.licensePlate) {
      throw new Error('License plate is required');
    }

    const newAmbulance = {
      id: this.ambulances.length + 1,
      licensePlate: data.licensePlate,
      status: 'AVAILABLE',
      location: { lat: -34.9011, lng: -56.1645 }
    };

    this.ambulances.push(newAmbulance);
    return Promise.resolve(newAmbulance);
  }

  async putAmbulance(data) {
    const index = this.ambulances.findIndex(a => a.id === data.id);
    if (index === -1) {
      throw new Error('Ambulance not found');
    }

    this.ambulances[index] = { ...this.ambulances[index], ...data };
    return Promise.resolve(this.ambulances[index]);
  }

  async deleteAmbulance(id) {
    const index = this.ambulances.findIndex(a => a.id === id);
    if (index === -1) {
      throw new Error('Ambulance not found');
    }

    this.ambulances.splice(index, 1);
    return Promise.resolve({ success: true });
  }
}
