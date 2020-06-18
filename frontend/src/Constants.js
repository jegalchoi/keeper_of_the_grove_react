const prod = {
  url: {
    API_URL_LOGIN_STATUS: '/api/v1/logged_in',
    API_URL_LOGIN: '/api/v1/login',
    API_URL_LOGOUT: '/api/v1/logout',
    API_URL_SIGNUP: '/api/v1/users',
    API_URL_USER_DESTROY: `/api/v1/users/`,
    API_URL_USER_PATCH: `/api/v1/users/`,
    API_URL_USER_PLANTS: `/api/v1/users/`,
    API_URL_ALL_PLANTS: `/api/v1/plants/`,
    API_URL_PLANT_GET: `/api/v1/plants/`,
    API_URL_PLANT_CREATE: '/api/v1/plants',
    API_URL_PLANT_DESTROY: `/api/v1/users/`,
    API_URL_PLANT_PATCH: `/api/v1/users/`,
    API_URL_IMAGE_GET: `/api/v1/images/`,
    API_URL_IMAGE_CREATE: '/api/v1/images',
    API_URL_IMAGE_DESTROY: `/api/v1/images/`,
  },
}

const dev = {
  url: {
    API_URL_LOGIN_STATUS: 'http://localhost:3001/api/v1/logged_in',
    API_URL_LOGIN: 'http://localhost:3001/api/v1/login',
    API_URL_LOGOUT: 'http://localhost:3001/api/v1/logout',
    API_URL_SIGNUP: 'http://localhost:3001/api/v1/users',
    API_URL_USER_DESTROY: `http://localhost:3001/api/v1/users/`,
    API_URL_USER_PATCH: `http://localhost:3001/api/v1/users/`,
    API_URL_USER_PLANTS: `http://localhost:3001/api/v1/users/`,
    API_URL_ALL_PLANTS: `http://localhost:3001/api/v1/plants/`,
    API_URL_PLANT_GET: `http://localhost:3001/api/v1/plants/`,
    API_URL_PLANT_CREATE: 'http://localhost:3001/api/v1/plants',
    API_URL_PLANT_DESTROY: `http://localhost:3001/api/v1/users/`,
    API_URL_PLANT_PATCH: `http://localhost:3001/api/v1/users/`,
    API_URL_IMAGE_GET: `http://localhost:3001/api/v1/images/`,
    API_URL_IMAGE_CREATE: 'http://localhost:3001/api/v1/images',
    API_URL_IMAGE_DESTROY: `http://localhost:3001/api/v1/images/`,
  },
}

export const config =
  process.env.NODE_ENV === 'development' ? dev : prod
