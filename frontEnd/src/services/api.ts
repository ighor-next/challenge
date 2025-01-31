import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:5000/tasks'
})

export default api
