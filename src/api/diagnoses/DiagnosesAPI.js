import { client } from "../instance";

class DiagnosesApi {
  async getAllDiagnoses() {
    const { data } = await client.get("/Diagnosis/GetAll", {});
    return data;
  }

  // {
  //"name": "string",
  //"description": "string"
  //}

  async addDiagnosis(diagnosis) {
    const { data } = await client.post("/Diagnosis/add", diagnosis);
    return data;
  }
}

export default new DiagnosesApi();
