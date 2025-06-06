// stores/user.js
import { defineStore } from "pinia"

export const useUserStore = defineStore("user", {
  state: () => ({
    telegramId: null, // Здесь будет храниться id пользователя Telegram
    username: "", // Можно добавить дополнительные данные
  }),
  actions: {
    setTelegramId(id) {
      this.telegramId = id // Устанавливаем id пользователя
    },
    setUsername(name) {
      this.username = name // Устанавливаем имя пользователя
    },
  },
})
