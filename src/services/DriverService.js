class DriverApi {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async getDriver() {
    const response = await fetch(`${this.baseURL}/driver`);
    if (!response.ok) {
      throw new Error(`An error has occurred: ${response.status}`);
    }
    return response.json();
  }

  async postDriver(data) {
    const response = await fetch(`${this.baseURL}/driver/create`, {
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

  async putDriver(id, data) {
    const response = await fetch(`${this.baseURL}/driver/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      authorization: 'Bearer ' + localStorage.getItem('token'),
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`An error has occurred: ${response.status}`);
    }
    return response.json();
  }

  async deleteDriver(id) {
    const response = await fetch(`${this.baseURL}/driver/delete/${id}`, {
      method: "DELETE",
      authorization: "Bearer " + localStorage.getItem("token"),
    });
    if (!response.ok) {
      throw new Error(`An error has occurred: ${response.status}`);
    }
    return response.json();
  }


}

export default DriverApi;