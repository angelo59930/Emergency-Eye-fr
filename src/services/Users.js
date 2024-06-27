class UserApi {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async getEnployed() {
    const response = await fetch(`${this.baseURL}/users`, {
      headers: {
        authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    });
    if (!response.ok) {
      throw new Error(`An error has occurred: ${response.status}`);
    }
    return response.json();
  }

  async addEmployee(data) {
    const response = await fetch(`${this.baseURL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + sessionStorage.getItem("token"),
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`An error has occurred: ${response.status}`);
    }
    return response.json();
  }
}


export default UserApi;
