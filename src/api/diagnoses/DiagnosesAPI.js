import { client } from "../instance";

class DiagnosesApi {
  async getAllDiagnoses() {
    const { data } = await client.get("/Diagnosis/GetAll", {});
    return data;
  }

  async getDiagnosisById(id) {
    const { data } = await client.get("/Diagnosis/GetById", { params: { id } });
    return data;
  }

  async addDiagnosis(diagnosis) {
    const { data } = await client.post("/Diagnosis/add", diagnosis);
    return data;
  }

  async deleteDiagnosis(id) {
    const { data } = await client.delete("/Diagnosis/Delete", {
      params: { id },
    });
    return data;
  }

  async updateDiagnosis(diagnosis) {
    const { data } = await client.put("/Diagnosis/Update", diagnosis, {
      params: { id: diagnosis.id },
    });
    return data;
  }
}

export default new DiagnosesApi();
