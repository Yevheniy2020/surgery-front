import { client } from "../instance";
class OperationsApi {
  async getAllOperations() {
    const { data } = await client.get("/Operation/GetAll", {});
    return data;
  }

  async getOperationById(id) {
    const { data } = await client.get("/Operation/GetById", {
      params: { id },
    });
    return data;
  }

  async addOperation(operation) {
    const { data } = await client.post("/Operation/add", operation);
    return data;
  }

  async deleteOperation(id) {
    const { data } = await client.delete("/Operation/Delete", {
      params: { id },
    });
    return data;
  }

  async updateOperation(operation) {
    const { data } = await client.put("/Operation/Update", operation, {
      params: { id: operation.id },
    });
    return data;
  }
}

export default new OperationsApi();
