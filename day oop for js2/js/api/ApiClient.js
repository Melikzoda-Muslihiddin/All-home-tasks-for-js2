export class ApiClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async get(path) {
    const { data } = await axios.get(this.baseURL + path);
    return data;
  }

  async post(path, body) {
    const { data } = await axios.post(this.baseURL + path, body);
    return data;
  }

  async put(path, body) {
    const { data } = await axios.put(this.baseURL + path, body);
    return data;
  }

  async delete(path) {
    const { data } = await axios.delete(this.baseURL + path);
    return data;
  }
}