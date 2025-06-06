// stores/global.js
import { defineStore } from "pinia"
import { useTelegram } from "@/utils/composable/useTelegram"

const { tg } = useTelegram()

// Создаем хранилище с уникальным идентификатором "global"
export const useGlobalStore = defineStore("global", {
  state: () => ({
    TELEGRAM_BOT_ID: tg?.initDataUnsafe?.user?.id,
  }),
})
