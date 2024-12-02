import { client } from "../instance";

class InsuranceApi {
  async getAllInsurancePlans() {
    const { data } = await client.get("/Insurance/GetAll", {});
    return data;
  }

  async getInsuranceById(id) {
    const { data } = await client.get("/Insurance/GetById", {
      params: { id },
    });
    return data;
  }

  async addInsurance(insurance) {
    const { data } = await client.post("/Insurance/add", insurance);
    return data;
  }

  async deleteInsurance(id) {
    const { data } = await client.delete("/Insurance/Delete", {
      params: { id },
    });
    return data;
  }

  async updateInsurance(insurance) {
    const { data } = await client.put("/Insurance/Update", insurance, {
      params: { id: insurance.id },
    });
    return data;
  }
}
export default new InsuranceApi();
