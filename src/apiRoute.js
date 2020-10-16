// eslint-disable-next-line import/no-mutable-exports
let API_ROUTE

// eslint-disable-next-line no-unused-expressions
process.env.NODE_ENV === 'development'
  ? API_ROUTE = 'http://127.0.0.1:8080/v1'
  : API_ROUTE = 'https://external_server/v1'

export default API_ROUTE
