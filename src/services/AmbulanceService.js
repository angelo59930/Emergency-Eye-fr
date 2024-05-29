class AmbulanceApi {
  constructor(baseURL){
    this.baseURL = baseURL;
  }

  async getAmbulance(){
    const response = await fetch(`${this.baseURL}/ambulance`);
    if (!response.ok) {
      throw new Error(`An error has occurred: ${response.status}`);
    }
    return response.json();
  }

  async postAmbulance(data){
    const response = await fetch(`${this.baseURL}/ambulance/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      authorization: "Bearer " + localStorage.getItem("token"),
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`An error has occurred: ${response.status}`);
    }
    return response.json();
  }

  // no tiene un update de esta manera
  // TODO: discutir este metodo
  async putAmbulance(id, data){
    const response = await fetch(`${this.baseURL}/ambulance/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      authorization: "Bearer " + localStorage.getItem("token"),
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`An error has occurred: ${response.status}`);
    }
    return response.json();
  }

  async deleteAmbulance(id){
    const response = await fetch(`${this.baseURL}/ambulance/delete/${id}`, {
      method: "DELETE",
      authorization: "Bearer " + localStorage.getItem("token"),
    });
    if (!response.ok) {
      throw new Error(`An error has occurred: ${response.status}`);
    }
    return response.json();
  }

}

export default AmbulanceApi;