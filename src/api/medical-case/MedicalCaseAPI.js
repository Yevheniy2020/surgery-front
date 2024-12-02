import { client } from "../instance";

class MedicalCaseApi {
  async getAllMedicalCases() {
    const { data } = await client.get("/MedicalCase/GetAll", {});
    return data;
  }

  // {
  //   "caseStartDate": "2023-12-01T00:00:00Z",
  //   "caseEndDate": null,
  //   "patientId": 1,
  //   "insuranceId": 2,
  //   "diagnoseId": 3,
  //   "details": "string"
  // }

  async addMedicalCase(medicalCase) {
    const { data } = await client.post("/MedicalCase/add", medicalCase);
    return data;
  }
}

export default new MedicalCaseApi();
