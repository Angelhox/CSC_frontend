/* eslint-disable no-useless-catch */
import axios from "../../libs/axios";
interface IUserCredentials {
  usuario: string;
  clave: string;
}
export class Auth {
  async login(credentials: IUserCredentials) {
    try {
      const response = await axios.post("/auth/login", credentials);
      const { token } = response.data;
      console.log("Response: ", response);
      return token;
    } catch (error) {
      throw error;
    }
  }
  async profile() {
    try {
      const response = await axios.post("usuarios/profile");
      console.log("Profile: ", response);
      return response.data;
    } catch (error) {
      console.log("Error: ", error);
      throw error;
    }
  }
  async checkAuth() {
    try {
      await axios.get("/auth/check");
    } catch (error) {
      throw error;
    }
  }
}
