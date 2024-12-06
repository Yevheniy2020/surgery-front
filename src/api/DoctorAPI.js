import { client } from "./instance";

class DoctorApi {
  constructor() {
    this.token = localStorage.getItem("accessToken");
  }

  setToken(token) {
    this.token = token;
  }

  async getAllDoctors() {
    const { data } = await client.get("/Doctor/GetAll", {
      headers: { Authorization: `Bearer ${this.token}` },
    });
    return data;
  }

  async getBusyDoctors() {
    const { data } = await client.get("/Doctor/GetBusyDoctors", {
      headers: { Authorization: `Bearer ${this.token}` },
    });
    return data;
  }

  async getBestDoctors() {
    const { data } = await client.get("/Doctor/GetBestDoctors", {
      headers: { Authorization: `Bearer ${this.token}` },
    });
    return data;
  }

  async getDoctorById(id) {
    const { data } = await client.get("/Doctor/GetById", {
      params: { id },
      headers: { Authorization: `Bearer ${this.token}` },
    });
    return data;
  }

  async addDoctor(doctor) {
    const { data } = await client.post("/Doctor/add", doctor, {
      headers: { Authorization: `Bearer ${this.token}` },
    });
    return data;
  }

  async deleteDoctor(id) {
    const { data } = await client.delete("/Doctor/Delete", {
      params: { id },
      headers: { Authorization: `Bearer ${this.token}` },
    });
    return data;
  }

  async updateDoctor(doctor) {
    const { data } = await client.put("/Doctor/Update", doctor, {
      params: { id: doctor.id },
      headers: { Authorization: `Bearer ${this.token}` },
    });
    return data;
  }

  async assignOperation(doctorId, operationDetails) {
    const { data } = await client.post(
      "/Doctor/AssignOperation",
      {
        doctorId,
        ...operationDetails,
      },
      {
        headers: { Authorization: `Bearer ${this.token}` },
      }
    );
    return data;
  }

  async assignMedicalCase(doctorId, medicalCaseDetails) {
    const { data } = await client.post(
      "/Doctor/AssignMedicalCase",
      {
        doctorId,
        ...medicalCaseDetails,
      },
      {
        headers: { Authorization: `Bearer ${this.token}` },
      }
    );
    return data;
  }
}
export default new DoctorApi();
