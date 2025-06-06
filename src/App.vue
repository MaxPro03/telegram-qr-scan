<script setup lang="ts">
import { RouterView } from 'vue-router'
import { ref } from 'vue'
import { useTelegram } from '@/utils/composable/useTelegram.ts'

const { tg } = useTelegram()

const userId = ref(tg?.initDataUnsafe?.user?.id)
const username = ref(tg?.initDataUnsafe?.user?.username)
const chatId = ref(tg?.initDataUnsafe?.chat?.id)
</script>

<template>
  <div id="app" class="scroll-container">
    <div>
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
