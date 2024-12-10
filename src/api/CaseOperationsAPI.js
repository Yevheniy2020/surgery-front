import { client } from "./instance";

class CaseOperationsApi {
  constructor() {
    this.token = localStorage.getItem("site");
  }

  setToken(token) {
    this.token = token;
  }

  async getAllCaseOperations() {
    const { data } = await client.get("/CaseOperation/GetAll", {
      headers: { Authorization: `Bearer ${this.token}` },
    });
    return data;
  }

  async getCaseOperationById(id) {
    const { data } = await client.get("/CaseOperation/GetById", {
      params: { id },
      headers: { Authorization: `Bearer ${this.token}` },
    });
    return data;
  }

  async addCaseOperation(caseOperation) {
    const { data } = await client.post("/CaseOperation/add", caseOperation, {
      headers: { Authorization: `Bearer ${this.token}` },
    });
    return data;
  }

  async deleteCaseOperation(id) {
    const { data } = await client.delete("/CaseOperation/Delete", {
      params: { id },
      headers: { Authorization: `Bearer ${this.token}` },
    });
    return data;
  }

  async updateCaseOperation(caseOperation) {
    const { data } = await client.put("/CaseOperation/Update", caseOperation, {
      params: { id: caseOperation.id },
      headers: { Authorization: `Bearer ${this.token}` },
    });
    return data;
  }
}

export default new CaseOperationsApi();
