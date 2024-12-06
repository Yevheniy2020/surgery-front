import { client } from "./instance";

class MedicalCaseApi {
  constructor() {
    this.token = localStorage.getItem("accessToken");
  }

  setToken(token) {
    this.token = token;
  }

  async getAllMedicalCases() {
    const { data } = await client.get("/MedicalCase/GetAll", {
      headers: { Authorization: `Bearer ${this.token}` },
    });
    return data;
  }

  async getMedicalCaseById(id) {
    const { data } = await client.get("/MedicalCase/GetById", {
      params: { id },
      headers: { Authorization: `Bearer ${this.token}` },
    });
    return data;
  }

  async addMedicalCase(medicalCase) {
    const { data } = await client.post("/MedicalCase/add", medicalCase, {
      headers: { Authorization: `Bearer ${this.token}` },
    });
    return data;
  }

  async deleteMedicalCase(id) {
    const { data } = await client.delete("/MedicalCase/Delete", {
      params: { id },
      headers: { Authorization: `Bearer ${this.token}` },
    });
    return data;
  }

  async updateMedicalCase(medicalCase) {
    const { data } = await client.put("/MedicalCase/Update", medicalCase, {
      params: { id: medicalCase.id },
      headers: { Authorization: `Bearer ${this.token}` },
    });
    return data;
  }
}

export default new MedicalCaseApi();
