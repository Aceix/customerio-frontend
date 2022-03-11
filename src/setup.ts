import { afterAll, afterEach, beforeAll } from "vitest"
import { setupServer } from 'msw/node'
import { rest } from 'msw'
import Customer from './models/Customer.model'

const API_BASE_URL = process.env.VITE_API_BASE_URL

const mockCustomers: Customer[] = [
  {
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
  },
  {
    id: 2,
    last_updated: 1598781234,
    attributes: {
      first_name: 'Kwesi',
      last_name: 'Doe',
      email: 'kwesi.doe@example.com',
      created_at: '1598781234',
    },
    events: {
      page: 1,
      like: 1,
    }
  }
]

const mockCustomer: Customer = {
  id: 12345,
  attributes: {
    "created_at": "1560964022",
    "email": "example@customer.io",
    "first_name": "example"
  },
  events: {},
  last_updated: 1560964022
}

export const restHandlers = [
  rest.post(`${API_BASE_URL}/customers`, (req, res, ctx) => {
    return res(ctx.status(201), ctx.json(mockCustomer))
  }),

  rest.get(`${API_BASE_URL}/customers`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockCustomers))
  }),

  rest.patch(`${API_BASE_URL}/customers/:id`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockCustomer))
  }),

  rest.delete(`${API_BASE_URL}/customers/:id`, (req, res, ctx) => {
    return res(ctx.status(204))
  }),
]

const server = setupServer(...restHandlers)


beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
afterAll(() => server.close())
afterEach(() => server.resetHandlers())

export { mockCustomers, mockCustomer}
