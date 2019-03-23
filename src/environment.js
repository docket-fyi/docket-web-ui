export default {
  environment: process.env.REACT_ENV || 'development',
  apiBasePath: process.env.REACT_APP_API_BASE_PATH || 'http://localhost:3000',
  apiVersion: process.env.REACT_APP_API_VERSION || 'v1'
}
