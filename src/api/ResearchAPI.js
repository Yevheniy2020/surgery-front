import { client } from "./instance";
class ResearchApi {
  async getAllResearch() {
    const { data } = await client.get("/Research/GetAll", {});
    return data;
  }

  async getResearchById(id) {
    const { data } = await client.get("/Research/GetById", {
      params: { id },
    });
    return data;
  }

  async addResearch(research) {
    const { data } = await client.post("/Research/add", research);
    return data;
  }

  async deleteResearch(id) {
    const { data } = await client.delete("/Research/Delete", {
      params: { id },
    });
    return data;
  }

  async updateResearch(research) {
    const { data } = await client.put("/Research/Update", research, {
      params: { id: research.id },
    });
    return data;
  }
}

export default new ResearchApi();
