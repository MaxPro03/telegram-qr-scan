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
const tgId = ref(7454281928)

async function showScanQrPopup(linksOnly) {
  Telegram.WebApp.showScanQrPopup(
    {
      text: linksOnly ? 'with any link' : 'for test purposes',
    },
    async function (text) {
      if (linksOnly) {
        scannedData.value = text.toString().toLowerCase()

        if (route.params.orderId != text) {
          tg.showAlert('Ошибка')
          return
        }

        try {
          const response = await fetch(`some api`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept-Language': 'ru',
              Authorization: 'Basic Z29nb21hcmtldDoxMjM0NTYhQQ==',
            },
          })

          if (!response.ok) {
            tg.showAlert('Неверный QR')
          }
          tg.showAlert(' Успешнно авторизован')
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
  tg?.showScanQrPopup()
})
</script>

<style scoped>
.container {
  margin: auto;
  text-align: center;
  padding: 20px;
}

button {
  padding: 10px 20px;
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
