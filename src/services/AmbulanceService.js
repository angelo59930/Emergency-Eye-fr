class AmbulanceApi {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async getAmbulance() {
    const response = await fetch(`${this.baseURL}/ambulances`, {
      headers: {
        "authorization": "Bearer " + localStorage.getItem("token"),
      },
    });
    if (!response.ok) {
      throw new Error(`An error has occurred: ${response.status}`);
    }
    return response.json();
  }

  async postAmbulance(data) {
    const response = await fetch(
      `${this.baseURL}/ambulances/create?licensePlate=${data.licensePlate}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    if (!response.ok) {
      throw new Error(`An error has occurred: ${response.status}`);
    }
    return response.json();
  }

  // no tiene un update de esta manera
  async putAmbulance(data) {
    const response = await fetch(`${this.baseURL}/ambulances`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "authorization": "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`An error has occurred: ${response.status}`);
    }
    return response.json();
  }

  async deleteAmbulance(id) {
    const response = await fetch(`${this.baseURL}/ambulances/delete?id=${id}`, {
      method: "DELETE",
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    if (!response.ok) {
      throw new Error(`An error has occurred: ${response.status}`);
    }
    return response.json();
  }
}

export default AmbulanceApi;
