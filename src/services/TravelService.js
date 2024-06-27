export class TravelApi {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async createTravel(travel) {
    const response = await fetch(this.baseURL + "/api/v1/routes/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + sessionStorage.getItem("token"),
      },
      body: JSON.stringify(travel),
    });
    return response.json();
  }

  async setAmbulance(travelId, ambulanceId) {
    const response = await fetch(
      this.baseURL +
        `/api/v1/routes/setAmbulance?idRoute=${travelId}&idAmbulance=${ambulanceId}`,
      {
        method: "Put",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      }
    );
    return response.json();
  }

  async setCompleted(travelId) {
    const response = await fetch(
      this.baseURL + `/api/v1/routes/setCompleted?idRoute=${travelId}`,
      {
        method: "Put",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      }
    );
    return response.json();
  }

  async setCancelled(travelId) {
    const response = await fetch(
      this.baseURL + `/api/v1/routes/setCancelled?idRoute=${travelId}`,
      {
        method: "Put",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      }
    );
    return response.json();
  }

  async getAllTravels() {
    const response = await fetch(this.baseURL + "/api/v1/routes", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    });
    return response.json();
  }
}
