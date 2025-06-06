<template>
  <button @click="sendData">Send Data</button>
</template>

<script setup>

// const tg = window.Telegram.WebApp;

function sendData() {
  console.log('test')
  // tg.sendData("Hello, Telegram!"); // Sends data to Telegram
}
</script>

<style scoped>
button {
  padding: 10px 20px;
  font-size: 16px;
  color: white;
  background-color: #0088cc;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0077b3;
}
</style>
