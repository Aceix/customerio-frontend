import { afterEach, expect, spyOn, test, vi } from 'vitest'

import CustomerService from './customers.service'
import { baseService } from './base'
import { mockCustomer, mockCustomers } from '../setup'


afterEach(() => {
  vi.restoreAllMocks()
})

test('should get all customers', async () => {
  const baseServiceSpy = spyOn(baseService, 'get')
  const res = await CustomerService.getCustomers()

  expect(baseServiceSpy).toHaveBeenCalledTimes(1)
  expect(res.data).toEqual(mockCustomers)
  expect(res.status).toBe(200)
})

// test('should create a customer', async () => {
//   const baseServiceSpy = spyOn(baseService, 'post')
//   const res = await CustomerService.createCustomer(mockCustomer)
//   
//   expect(baseServiceSpy).toHaveBeenCalledTimes(1)
//   expect(res.data).toEqual(mockCustomer)
// })

// test('should update a customer', async () => {
//   const baseServiceSpy = spyOn(baseService, 'patch')
//   const res = await CustomerService.updateCustomer(mockCustomer)
//   
//   expect(baseServiceSpy).toHaveBeenCalledTimes(1)
//   expect(res.data).toEqual(mockCustomer)
// })

test('should delete a customer', async () => {
  const baseServiceSpy = spyOn(baseService, 'delete')
  const res = await CustomerService.deleteCustomer(mockCustomer.id)

  expect(baseServiceSpy).toHaveBeenCalledTimes(1)
  expect(res.data).toBeFalsy()
  expect(res.status).toBe(204)
})
