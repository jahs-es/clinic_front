// eslint-disable-next-line import/no-mutable-exports
let API_ROUTE

// eslint-disable-next-line no-unused-expressions
process.env.NODE_ENV === 'development'
  ? API_ROUTE = 'http://localhost:3001/api'
  : API_ROUTE = '/api'

export default API_ROUTE
