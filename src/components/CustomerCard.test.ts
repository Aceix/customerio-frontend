import { mount, VueWrapper } from '@vue/test-utils'
import { beforeEach, describe, expect, test } from 'vitest'
import CustomerCard from './CustomerCard.vue'
import Customer from '../models/Customer.model'

const mockCustomer: Customer = {
  id: 1,
  last_updated: 1598781234,
  attributes: {
    first_name: 'John',
    last_name: 'Doe',
    email: 'john.doe@example.com',
    created_at: '1598781234',
  },
  events: {
    page: 1,
  }
}


describe('CustomerCard component', () => {
  let wrapper: VueWrapper<any>

  beforeEach(() => {
    wrapper = mount(CustomerCard, {
      props: {
        customer: mockCustomer,
      },
    })
  })

  test('should display email name', () => {
    expect(wrapper.text()).toContain(mockCustomer.attributes.email)
  })

  test('should display name', () => {
    expect(wrapper.text()).toContain(`${mockCustomer.attributes.first_name} ${mockCustomer.attributes.last_name}`)
  })

  test('should contain a link to customer page', () => {
    expect(wrapper.find(`router-link[to="/customers/${mockCustomer.id}"]`).exists()).toEqual(true)
  })
  
})
