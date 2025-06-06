<script setup lang="ts">
import { RouterView } from 'vue-router'
import { ref } from 'vue'
import { useTelegram } from '@/utils/composable/useTelegram'

const { tg } = useTelegram()

const userId = ref(tg?.initDataUnsafe?.user?.id)
const username = ref(tg?.initDataUnsafe?.user?.username)
const chatId = ref(tg?.initDataUnsafe?.chat?.id)
</script>

<template>
  <div id="app" class="scroll-container">
    <RouterView />
  </div>
</template>

<style scoped>
.scroll-container {
  height: 100dvh;
  display: grid;
}
</style>
