import axios from "axios";

const baseService = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL as string,
})

class ENDPONTS {
  static CREATE_CUSTOMER = "customers";
  static GET_ALL_CUSTOMERS = "customers";
  static GET_CUSTOMER = "customers";
  static UPDATE_CUSTOMER = "customers";
  static DELETE_CUSTOMER = "customers";
}

export { baseService, ENDPONTS }
