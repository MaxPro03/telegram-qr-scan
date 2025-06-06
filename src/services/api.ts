// services/api.ts
const API_URL = 'https://admin.gogomarket.uz/api/v2'

// Создание нового пользователя (POST)
export const confirmOrderDelivery = async (id: number) => {
  const response = await fetch(`${API_URL}/order/confirm-order-delivery?id=${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  if (!response.ok) {
    throw new Error('Failed to create user')
  }
  return await response.json()
}
