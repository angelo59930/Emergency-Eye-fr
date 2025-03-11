// Mock data for local development
export const mockAmbulances = [
  {
    id: 1,
    licensePlate: "ABC123",
    status: "AVAILABLE",
    telephone: "099123456",
    location: { lat: -31.41895036757332, lng: -64.18806943065226 }
  },
  {
    id: 2,
    licensePlate: "XYZ789",
    status: "ON_DUTY",
    telephone: "099789012",
    location: { lat: -31.45258230636035, lng: -64.1886027433417 }
  },
  {
    id: 3,
    licensePlate: "DEF456",
    status: "MAINTENANCE",
    telephone: "099456789",
    location: { lat: -31.42895036757332, lng: -64.19806943065226 }
  },
  {
    id: 4,
    licensePlate: "GHI789",
    status: "OUT_OF_SERVICE",
    telephone: "099345678",
    location: { lat: -31.43895036757332, lng: -64.17806943065226 }
  },
  {
    id: 5,
    licensePlate: "JKL012",
    status: "AVAILABLE",
    telephone: "099901234",
    location: { lat: -31.44895036757332, lng: -64.16806943065226 }
  }
];

export const mockPatients = [
  {
    id: 1,
    name: "Juan Pérez",
    document: "12345678",
    socialSecurity: "SS123",
    address: "Av. 18 de Julio 1234",
    phone: "099123456"
  },
  {
    id: 2,
    name: "María García",
    document: "87654321",
    socialSecurity: "SS456",
    address: "Bulevar Artigas 4321",
    phone: "098765432"
  }
];

export const mockUsers = [
  {
    id: 1,
    username: 'admin',
    password: 'admin123',
    role: 'ADMIN',
    name: 'Administrador',
    email: 'admin@emergency.com'
  },
  {
    id: 2,
    username: 'operator',
    password: 'operator123',
    role: 'OPERATOR',
    name: 'Operador',
    email: 'operator@emergency.com'
  }
];

export const mockTravels = [
  {
    id: 1,
    patientId: 1,
    ambulanceId: 1,
    status: "IN_PROGRESS",
    origin: "Hospital de Clínicas",
    destination: "Sanatorio Americano",
    startTime: "2025-03-11T14:30:00",
    estimatedArrival: "2025-03-11T15:00:00"
  },
  {
    id: 2,
    patientId: 2,
    ambulanceId: 2,
    status: "COMPLETED",
    origin: "CASMU",
    destination: "Hospital Británico",
    startTime: "2025-03-11T10:00:00",
    estimatedArrival: "2025-03-11T10:30:00"
  }
];
