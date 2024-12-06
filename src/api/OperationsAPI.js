import { client } from "./instance";

class OperationsApi {
  constructor() {
    this.token = localStorage.getItem("accessToken");
  }

  setToken(token) {
    this.token = token;
  }

  async getAllOperations() {
    const { data } = await client.get("/Operation/GetAll", {
      headers: { Authorization: `Bearer ${this.token}` },
    });
    return data;
  }

  async getOperationById(id) {
    const { data } = await client.get("/Operation/GetById", {
      params: { id },
      headers: { Authorization: `Bearer ${this.token}` },
    });
    return data;
  }

  async addOperation(operation) {
    const { data } = await client.post("/Operation/add", operation, {
      headers: { Authorization: `Bearer ${this.token}` },
    });
    return data;
  }

  async deleteOperation(id) {
    const { data } = await client.delete("/Operation/Delete", {
      params: { id },
      headers: { Authorization: `Bearer ${this.token}` },
    });
    return data;
  }

  async updateOperation(operation) {
    const { data } = await client.put("/Operation/Update", operation, {
      params: { id: operation.id },
      headers: { Authorization: `Bearer ${this.token}` },
    });
    return data;
  }
}

export default new OperationsApi();
