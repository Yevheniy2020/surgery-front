import { client } from "./instance";

class InsuranceApi {
  constructor() {
    this.token = localStorage.getItem("accessToken");
  }

  setToken(token) {
    this.token = token;
  }

  async getAllInsurancePlans() {
    const { data } = await client.get("/Insurance/GetAll", {
      headers: { Authorization: `Bearer ${this.token}` },
    });
    return data;
  }

  async getInsuranceById(id) {
    const { data } = await client.get("/Insurance/GetById", {
      params: { id },
      headers: { Authorization: `Bearer ${this.token}` },
    });
    return data;
  }

  async addInsurance(insurance) {
    const { data } = await client.post("/Insurance/add", insurance, {
      headers: { Authorization: `Bearer ${this.token}` },
    });
    return data;
  }

  async deleteInsurance(id) {
    const { data } = await client.delete("/Insurance/Delete", {
      params: { id },
      headers: { Authorization: `Bearer ${this.token}` },
    });
    return data;
  }

  async updateInsurance(insurance) {
    const { data } = await client.put("/Insurance/Update", insurance, {
      params: { id: insurance.id },
      headers: { Authorization: `Bearer ${this.token}` },
    });
    return data;
  }
}
export default new InsuranceApi();
