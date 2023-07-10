import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { clearAccesTokenLST, getAccesTokenLST, setAccesTokenLST } from "./Auth";

class Http {
  instance: AxiosInstance;
  private accesToken: string;
  constructor() {
    this.accesToken = getAccesTokenLST();
    this.instance = axios.create({
      baseURL: "https://localhost:44305/api/",
      // baseURL: "http://192.168.1.15/api/",
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });
    this.instance.interceptors.request.use(
      (config) => {
        if (this.accesToken && config.headers) {
          config.headers.Authorization = "Bearer" + " " + this.accesToken;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    this.instance.interceptors.response.use(
      (response: AxiosResponse) => {
        const { url } = response.config;
        if (url === "User/login") {
          this.accesToken = response.data.data.token;
          setAccesTokenLST(this.accesToken);
        }
        // else if (url === "User/logout") {
        //   this.accesToken = "";
        //   clearAccesTokenLST();
        // }
        return response;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }
}

const http = new Http().instance;

export default http;
