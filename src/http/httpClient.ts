import axios from 'axios';
import dotenv = require('dotenv');
dotenv.config();

export class HttpClient {
  private url: string = process.env.API_EXTERNAL;
  constructor() {}

  public async get(endpoint: string, hasUrl: boolean = false): Promise<any> {
    const uri: string = hasUrl ? endpoint : `${this.url}${endpoint}`;
    return axios
      .get(uri)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        throw err;
      });
  }
}
