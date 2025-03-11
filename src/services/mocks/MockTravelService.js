import { mockTravels } from './mockData';

export class MockTravelApi {
  constructor() {
    this.travels = [...mockTravels];
  }

  async createTravel(travel) {
    const newTravel = {
      ...travel,
      id: this.travels.length + 1,
      status: 'PENDING'
    };
    this.travels.push(newTravel);
    return newTravel;
  }

  async setAmbulance(travelId, ambulanceId) {
    const travel = this.travels.find(t => t.id === travelId);
    if (!travel) throw new Error('Travel not found');
    travel.ambulanceId = ambulanceId;
    travel.status = 'ASSIGNED';
    return travel;
  }

  async setCompleted(travelId) {
    const travel = this.travels.find(t => t.id === travelId);
    if (!travel) throw new Error('Travel not found');
    travel.status = 'COMPLETED';
    return travel;
  }

  async setCancelled(travelId) {
    const travel = this.travels.find(t => t.id === travelId);
    if (!travel) throw new Error('Travel not found');
    travel.status = 'CANCELLED';
    return travel;
  }

  async getAllTravels() {
    return [...this.travels];
  }
}
