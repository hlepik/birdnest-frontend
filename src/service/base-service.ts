import Axios, { AxiosError } from "axios";
import { ApiBaseUrl } from "../configuration";
import { IFetchResponse } from "../types/IFetchResponse";

export abstract class BaseService {
  protected static axios = Axios.create({
    baseURL: ApiBaseUrl,
    headers: {
      "Content-Type": "application/json",
    },
  });

  static async getAll<TEntity>(
    apiEndpoint: string,
  ): Promise<IFetchResponse<TEntity[]>> {
    try {
      let response = await this.axios.get<TEntity[]>(
        apiEndpoint
      );
      return {
        ok: response.status <= 299,
        statusCode: response.status,
        data: response.data,
      };
    } catch (err) {
      let error = err as AxiosError;
      return {
        ok: false,
        statusCode: error.response?.status ?? 500,
      };
    }
  }
}
