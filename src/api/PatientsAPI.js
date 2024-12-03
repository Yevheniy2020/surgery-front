import { client } from "./instance";
class PatientsApi {
  async getAllPatients() {
    const { data } = await client.get("/Patient/GetAll", {});
    return data;
  }

  async getPatientById(id) {
    const { data } = await client.get("/Patient/GetById", {
      params: { id },
    });
    return data;
  }

  async addPatient(patient) {
    const { data } = await client.post("/Patient/add", patient);
    return data;
  }

  async deletePatient(id) {
    const { data } = await client.delete("/Patient/Delete", {
      params: { id },
    });
    return data;
  }

  async updatePatient(patient) {
    const { data } = await client.put("/Patient/Update", patient, {
      params: { id: patient.id },
    });
    return data;
  }
}

export default new PatientsApi();
