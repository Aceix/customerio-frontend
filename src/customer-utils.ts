import Customer from "./models/Customer.model";

export function customerHasName(customer: Customer) {
  return customer.attributes.first_name || customer.attributes.last_name
}

export function getCustomerName(customer: Customer) {
  const customerAttributes = customer.attributes;
  return `${customerAttributes.first_name ?? ''} ${customerAttributes.last_name ?? ''}`
}
