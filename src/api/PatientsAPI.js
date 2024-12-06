import { client } from "./instance";

class PatientsApi {
  constructor() {
    this.token = localStorage.getItem("accessToken");
  }

  setToken(token) {
    this.token = token;
  }

  async getAllPatients() {
    const { data } = await client.get("/Patient/GetAll", {
      headers: { Authorization: `Bearer ${this.token}` },
    });
    return data;
  }

  async getPatientById(id) {
    const { data } = await client.get("/Patient/GetById", {
      params: { id },
      headers: { Authorization: `Bearer ${this.token}` },
    });
    return data;
  }

  async addPatient(patient) {
    const { data } = await client.post("/Patient/add", patient, {
      headers: { Authorization: `Bearer ${this.token}` },
    });
    return data;
  }

  async deletePatient(id) {
    const { data } = await client.delete("/Patient/Delete", {
      params: { id },
      headers: { Authorization: `Bearer ${this.token}` },
    });
    return data;
  }

  async updatePatient(patient) {
    const { data } = await client.put("/Patient/Update", patient, {
      params: { id: patient.id },
      headers: { Authorization: `Bearer ${this.token}` },
    });
    return data;
  }
}

export default new PatientsApi();
