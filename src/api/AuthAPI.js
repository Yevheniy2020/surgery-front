import { client } from "./instance";

class AuthAPI {
  async register(user) {
    const { data } = await client.post("/Authentication/register", user);
    return data;
  }

  async login(credentials) {
    const { data } = await client.post("/Authentication/login", credentials);
    return data;
  }
}

export default new AuthAPI();
