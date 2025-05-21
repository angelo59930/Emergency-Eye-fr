const STORAGE_KEYS = {
  AMBULANCES: 'mock_ambulances',
  TRANSFERS: 'mock_transfers',
  CREW: 'mock_crew'
};

// Datos iniciales por defecto
const DEFAULT_DATA = {
  ambulances: [
    {
      id: 1,
      licensePlate: 'ABC123',
      status: 'AVAILABLE',
      location: { lat: -31.4201, lng: -64.1888 },
      telephone: '+54 351 123-4567',
      model: 'Toyota Hiace 2022'
    },
    {
      id: 2,
      licensePlate: 'XYZ789',
      status: 'ON_DUTY',
      location: { lat: -31.4150, lng: -64.1810 },
      telephone: '+54 351 765-4321',
      model: 'Mercedes Sprinter 2023'
    }
  ],
  transfers: [
    {
      id: 1,
      patient: {
        name: 'Juan',
        lastName: 'Pérez',
        document: '12345678',
        socialSecurity: 'OSDE',
        socialSecurityNumber: '123456789'
      },
      origin: 'Hospital Central',
      destination: 'Clínica San Martín',
      priority: 'Alta',
      status: 'Pendiente',
      scheduledTime: '14:30',
      notes: 'Paciente requiere oxígeno'
    }
  ],
  crew: [
    {
      id: 1,
      name: 'Dr. Juan Pérez',
      role: 'Médico',
      license: 'MED-12345',
      status: 'AVAILABLE'
    },
    {
      id: 2,
      name: 'Lic. María García',
      role: 'Enfermera',
      license: 'ENF-67890',
      status: 'AVAILABLE'
    }
  ]
};

// Funciones auxiliares para localStorage
const getStoredData = (key) => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS[key]);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error(`Error reading ${key} from localStorage:`, error);
    return null;
  }
};

const setStoredData = (key, data) => {
  try {
    localStorage.setItem(STORAGE_KEYS[key], JSON.stringify(data));
  } catch (error) {
    console.error(`Error writing ${key} to localStorage:`, error);
  }
};

// Inicializar datos si no existen
const initializeData = () => {
  Object.keys(STORAGE_KEYS).forEach(key => {
    const lowercaseKey = key.toLowerCase();
    if (!getStoredData(key)) {
      setStoredData(key, DEFAULT_DATA[lowercaseKey]);
    }
  });
};

// Servicio Mock
export const mockService = {
  // Ambulancias
  getAllAmbulances: async () => {
    return getStoredData('AMBULANCES') || [];
  },

  updateAmbulance: async (ambulance) => {
    const ambulances = getStoredData('AMBULANCES');
    const index = ambulances.findIndex(a => a.id === ambulance.id);
    if (index !== -1) {
      ambulances[index] = ambulance;
      setStoredData('AMBULANCES', ambulances);
    }
    return ambulance;
  },

  addAmbulance: async (ambulance) => {
    const ambulances = getStoredData('AMBULANCES');
    const newAmbulance = {
      ...ambulance,
      id: Math.max(...ambulances.map(a => a.id), 0) + 1
    };
    ambulances.push(newAmbulance);
    setStoredData('AMBULANCES', ambulances);
    return newAmbulance;
  },

  deleteAmbulance: async (id) => {
    const ambulances = getStoredData('AMBULANCES');
    const filtered = ambulances.filter(a => a.id !== id);
    setStoredData('AMBULANCES', filtered);
  },

  // Traslados
  getAllTransfers: async () => {
    return getStoredData('TRANSFERS') || [];
  },

  addTransfer: async (transfer) => {
    const transfers = getStoredData('TRANSFERS');
    const newTransfer = {
      ...transfer,
      id: Math.max(...transfers.map(t => t.id), 0) + 1,
      createdAt: new Date().toISOString()
    };
    transfers.push(newTransfer);
    setStoredData('TRANSFERS', transfers);
    return newTransfer;
  },

  updateTransfer: async (transfer) => {
    const transfers = getStoredData('TRANSFERS');
    const index = transfers.findIndex(t => t.id === transfer.id);
    if (index !== -1) {
      transfers[index] = transfer;
      setStoredData('TRANSFERS', transfers);
    }
    return transfer;
  },

  deleteTransfer: async (id) => {
    const transfers = getStoredData('TRANSFERS');
    const filtered = transfers.filter(t => t.id !== id);
    setStoredData('TRANSFERS', filtered);
  },

  // Personal médico
  getAllCrew: async () => {
    return getStoredData('CREW') || [];
  },

  updateCrewStatus: async (crewId, status) => {
    const crew = getStoredData('CREW');
    const member = crew.find(c => c.id === crewId);
    if (member) {
      member.status = status;
      setStoredData('CREW', crew);
    }
    return member;
  },

  // Utilidades
  resetMockData: () => {
    Object.keys(STORAGE_KEYS).forEach(key => {
      const lowercaseKey = key.toLowerCase();
      setStoredData(key, DEFAULT_DATA[lowercaseKey]);
    });
  }
};

// Inicializar datos al importar el servicio
initializeData();

export default mockService; 