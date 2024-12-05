import { client } from "./instance";

class DoctorApi {
  async getAllDoctors() {
    const { data } = await client.get("/Doctor/GetAll", {});
    return data;
  }

  async getBusyDoctors() {
    const { data } = await client.get("/Doctor/GetBusyDoctors", {});
    return data;
  }

  async getBestDoctors() {
    const { data } = await client.get("/Doctor/GetBestDoctors", {});
    return data;
  }

  async getDoctorById(id) {
    const { data } = await client.get("/Doctor/GetById", {
      params: { id },
    });
    return data;
  }

  async addDoctor(doctor) {
    const { data } = await client.post("/Doctor/add", doctor);
    return data;
  }

  async deleteDoctor(id) {
    const { data } = await client.delete("/Doctor/Delete", {
      params: { id },
    });
    return data;
  }

  async updateDoctor(doctor) {
    const { data } = await client.put("/Doctor/Update", doctor, {
      params: { id: doctor.id },
    });
    return data;
  }

  // async assignOperation(doctorId, operationDetails) {
  //   const { data } = await client.post("/Doctor/AssignOperation", {
  //     doctorId,
  //     ...operationDetails,
  //   });
  //   return data;
  // }

  // async assignMedicalCase(doctorId, medicalCaseDetails) {
  //   const { data } = await client.post("/Doctor/AssignMedicalCase", {
  //     doctorId,
  //     ...medicalCaseDetails,
  //   });
  //   return data;
  // }
}
export default new DoctorApi();
