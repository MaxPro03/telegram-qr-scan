import { ref } from "vue"
import axios from "@/api/axios"

// import api from "@/axios"

export function useApi<T>(url: string) {
  const data = ref<T | null>(null) // Данные из API
  const error = ref<string | null>(null) // Сообщение об ошибке
  const loading = ref(false) // Индикатор загрузки

  const fetchData = async (params = { telegram_user_id: 363900684 }) => {
    loading.value = true
    error.value = null
    try {
      const response = await axios.get(url, { params })
      data.value = response.data
    } catch (err: any) {
      error.value =
        err.response?.data?.message || err.message || "Ошибка загрузки"
    } finally {
      loading.value = false
    }
  }

  const postData = async (body: object) => {
    loading.value = true
    error.value = null
    try {
      const response = await axios.post(url, body)
      data.value = response.data
    } catch (err: any) {
      error.value =
        err.response?.data?.message || err.message || "Ошибка отправки данных"
    } finally {
      loading.value = false
    }
  }

  return { data, error, loading, fetchData, postData }
}
