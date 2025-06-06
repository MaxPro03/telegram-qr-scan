<script setup lang="ts">
import { RouterView } from 'vue-router'
import { ref } from 'vue'
import { useTelegram } from '@/utils/composable/useTelegram.ts'
import UiOrderCard from '@/components/order/UiOrderCard.vue'
import { useApi } from '@/utils/composable/useApi'
import { useGlobalStore } from './stores/global'

// const globalStore = useGlobalStore()

const { tg } = useTelegram()

const userId = ref(tg?.initDataUnsafe?.user?.id)
const username = ref(tg?.initDataUnsafe?.user?.username)
const chatId = ref(tg?.initDataUnsafe?.chat?.id)

// const orders = ref([
//     {
//         id: 123,
//         number: '725',
//         status: 1,
//         count: 12,
//     },
//     {
//         id: 123,
//         number: '724',
//         status: 1,
//         count: 12,
//     },
//     {
//         id: 123,
//         number: '723',
//         status: 2,
//         count: 12,
//     },
//     {
//         id: 123,
//         number: '722',
//         status: 2,
//         count: 6,
//     },
//     {
//         id: 123,
//         number: '721',
//         status: 2,
//         count: 3,
//     },
// ])

// onMounted(() => {
//   tg?.lockOrientation()
// })
</script>

<template>
  <div id="app" class="scroll-container">
    <div>
      <!--      {{ globalStore.TELEGRAM_BOT_ID }}-->
      <!--          <button @click="tg?.addToHomeScreen()">Добавить на главный экран</button>-->
      <p>User ID: {{ userId }}</p>
      <p>Username: {{ username }}</p>
      <p v-if="chatId">Chat ID: {{ chatId }}</p>
      <p v-else>Chat ID не доступен</p>
    </div>
    <RouterView />
  </div>
</template>

<style scoped>
.scroll-container {
  height: 100dvh; /* Высота окна */
}
</style>
