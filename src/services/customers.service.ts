import Customer from "../models/Customer.model";
import { baseService, ENDPONTS } from "./base";


class CustomerService {

  static createCustomer(customer: Customer) {
    return baseService.post(`${ENDPONTS.CREATE_CUSTOMER}`, { customer });
  }
  
  static getCustomers({
    id = '',
    email = '',
    page = 1,
    perPage = 25,
  } = {
    id: '',
    email: '',
    page: 1,
    perPage: 25,
  }) {
    return baseService.get(`${ENDPONTS.GET_ALL_CUSTOMERS}?id=${id}&email=${email}&page=${page}&per_page=${perPage}`);
  }
  
  static getCustomer(id: string) {
    return baseService.get(`${ENDPONTS.GET_CUSTOMER}/${id}`);
  }
  
  static updateCustomer(customer: Customer, id?: string) {
    return baseService.patch(`${ENDPONTS.UPDATE_CUSTOMER}/${id || customer.id}`, { customer });
  }
  
  static deleteCustomer(id: number) {
    return baseService.delete(`${ENDPONTS.DELETE_CUSTOMER}/${id}`);
  }

}

export default CustomerService;
