import { client } from "./instance";

class DiagnosesApi {
  constructor() {
    this.token = localStorage.getItem("accessToken");
  }

  setToken(token) {
    this.token = token;
  }

  async getAllDiagnoses() {
    const { data } = await client.get("/Diagnosis/GetAll", {
      headers: { Authorization: `Bearer ${this.token}` },
    });
    return data;
  }

  async getDiagnosisById(id) {
    const { data } = await client.get("/Diagnosis/GetById", {
      params: { id },
      headers: { Authorization: `Bearer ${this.token}` },
    });
    return data;
  }

  async addDiagnosis(diagnosis) {
    const { data } = await client.post("/Diagnosis/add", diagnosis, {
      headers: { Authorization: `Bearer ${this.token}` },
    });
    return data;
  }

  async deleteDiagnosis(id) {
    const { data } = await client.delete("/Diagnosis/Delete", {
      params: { id },
      headers: { Authorization: `Bearer ${this.token}` },
    });
    return data;
  }

  async updateDiagnosis(diagnosis) {
    const { data } = await client.put("/Diagnosis/Update", diagnosis, {
      params: { id: diagnosis.id },
      headers: { Authorization: `Bearer ${this.token}` },
    });
    return data;
  }
}

export default new DiagnosesApi();
