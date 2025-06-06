<template>
  <div class="container">
    <button @click="showScanQrPopup">Отсканировать QR</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useTelegram } from '@/utils/composable/useTelegram'

const { tg } = useTelegram()
const scannedData = ref('')

async function showScanQrPopup(linksOnly) {
  Telegram.WebApp.showScanQrPopup(
    {
      text: linksOnly ? 'with any link' : 'for test purposes',
    },
    async function (text) {
      if (linksOnly) {
        scannedData.value = text.toString().toLowerCase()

        try {
          const response = await fetch(`https://tl.gogomarket.uz/telegram-admin-bot/check-registration`, {
            method: 'POST',
            body: JSON.stringify({
              qrCode: scannedData.value,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
          })

          if (!response.ok) {
            tg.showAlert(response.data.message)
          }
          tg.showAlert(response.data.message)
          return true
        } catch (error) {
          tg.showAlert(error.message)
        }
      }
    }
  )
}

onMounted(() => {
  tg.ready()
})
</script>

<style scoped>
.container {
  margin-top: auto;
  text-align: center;
  padding: 20px;
}

button {
  padding: 10px 20px;
  width: 100%;
  font-size: 16px;
  cursor: pointer;
  background-color: #0088cc;
  color: white;
  border: none;
  border-radius: 5px;
}

button:hover {
  background-color: #0077b3;
}
</style>
