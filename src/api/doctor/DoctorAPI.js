import { client } from "../instance";

class DoctorApi {
  async getAllDoctors() {
    const { data } = await client.get("/api/Doctor/GetAll", {});
    return data;
  }

  //   async addDoctor(doctor) {
  //     const { data } = await client.post("/api/Doctor/add", doctor);
  //     return data;
  //   }
}

export default new DoctorApi();
