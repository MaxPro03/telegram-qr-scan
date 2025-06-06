import axios from "axios"

// const API_BASE_URL = import.meta.env.VITE_API_URL
// axios.defaults.baseURL = API_BASE_URL
axios.defaults.baseURL = "https://admin.gogomarket.uz/api/v2"

axios.interceptors.request.use((config) => {
  config.headers["Authorization"] = "Basic Z29nb21hcmtldDoxMjM0NTYhQQ=="
  config.headers["Accept-Language"] = "ru"
  config.headers["Content-Type"] = "application/json"
  return config
})

// Перехватчик запросов, добавляющий параметр telegramId
// axios.interceptors.request.use(
//   (config) => {
//     // Добавляем параметр telegramId во все запросы
//     if (!config.params) {
//       config.params = {}
//     }
//     config.params.telegram_user_id = 363900684 // Ваш telegramId
//
//     return config
//   },
//   (error) => {
//     return Promise.reject(error)
//   },
// )

export default axios
