import { client } from "./instance";

class ResearchApi {
  constructor() {
    this.token = localStorage.getItem("accessToken");
  }

  setToken(token) {
    this.token = token;
  }

  async getAllResearch() {
    const { data } = await client.get("/Research/GetAll", {
      headers: { Authorization: `Bearer ${this.token}` },
    });
    return data;
  }

  async getResearchById(id) {
    const { data } = await client.get("/Research/GetById", {
      params: { id },
      headers: { Authorization: `Bearer ${this.token}` },
    });
    return data;
  }

  async addResearch(research) {
    const { data } = await client.post("/Research/add", research, {
      headers: { Authorization: `Bearer ${this.token}` },
    });
    return data;
  }

  async deleteResearch(id) {
    const { data } = await client.delete("/Research/Delete", {
      params: { id },
      headers: { Authorization: `Bearer ${this.token}` },
    });
    return data;
  }

  async updateResearch(research) {
    const { data } = await client.put("/Research/Update", research, {
      params: { id: research.id },
      headers: { Authorization: `Bearer ${this.token}` },
    });
    return data;
  }
}

export default new ResearchApi();
