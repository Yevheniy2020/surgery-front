import { client } from "./instance";
class MedicalCaseApi {
  async getAllMedicalCases() {
    const { data } = await client.get("/MedicalCase/GetAll", {});
    return data;
  }

  async getMedicalCaseById(id) {
    const { data } = await client.get("/MedicalCase/GetById", {
      params: { id },
    });
    return data;
  }

  async addMedicalCase(medicalCase) {
    const { data } = await client.post("/MedicalCase/add", medicalCase);
    return data;
  }

  async deleteMedicalCase(id) {
    const { data } = await client.delete("/MedicalCase/Delete", {
      params: { id },
    });
    return data;
  }

  async updateMedicalCase(medicalCase) {
    const { data } = await client.put("/MedicalCase/Update", medicalCase, {
      params: { id: medicalCase.id },
    });
    return data;
  }
}

export default new MedicalCaseApi();
