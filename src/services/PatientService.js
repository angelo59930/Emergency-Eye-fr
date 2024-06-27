export class PatientApi {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  // Método auxiliar para hacer solicitudes fetch
  async request(endpoint, method = "GET", body = null) {
    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(`${this.baseURL}${endpoint}`, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  // Obtener todos los pacientes
  getPatients() {
    return this.request("/patients");
  }

  // Obtener paciente por ID
  getPatientById(id) {
    return this.request(`/patients/id?id=${id}`);
  }

  // Obtener paciente por seguridad social
  getPatientBySocialSecurity(socialSecurity) {
    return this.request(
      `/patients/socialSecurity?socialSecurity=${socialSecurity}`
    );
  }

  // Obtener paciente por documento
  getPatientByDocument(document) {
    return this.request(`/patients/byDocument?document=${document}`);
  }

  // Crear nuevo paciente
  createPatient(patient) {
    return this.request("/patients/create", "POST", patient);
  }

  // Actualizar paciente
  updatePatient( patient) {
    return this.request(`/patients/update`, "PUT", patient);
  }

  // Eliminar paciente
  deletePatient(id) {
    return this.request(`/patients/delete?id=${id}`, "DELETE");
  }

  // Obtener lista de documentos
  listDocuments() {
    return this.request("/patients/documents");
  }
}
