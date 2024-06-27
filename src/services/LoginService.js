export class LoginApi {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }
  async login(credentials) {
    const formBody = Object.keys(credentials)
      .map(
        (key) =>
          encodeURIComponent(key) + "=" + encodeURIComponent(credentials[key])
      )
      .join("&");

    console.log(formBody);

    const response = await fetch("http://localhost:8081/api/v1/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formBody    
    });
    return response.text();
  }
}
