<!-- Dialog.vue -->
<template>
  <div class="dialog-overlay" @click.self="close">
    <div class="dialog-container">
      <h3>{{ title }}</h3>
      <p>{{ message }}</p>
      <button @click="close" class="dialog-button">Закрыть</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    message: String,
  },
  emits: ['close'],
  setup(props, { emit }) {
    const close = () => {
      emit('close')
    }

    return { close }
  },
}
</script>

<style scoped>
.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  animation: fadeIn 0.3s ease-out;
}

.dialog-container {
  background: white;
  padding: 20px;
  border-radius: 10px;
  max-width: 250px;
  width: 100%;
  text-align: center;
  animation: slideUp 0.3s ease-out;
  font-family: sans-serif;
  position: absolute;
  top: 40%;
}

.dialog-button {
  background-color: #42b883;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
  transition: background-color 0.3s ease;
}

.dialog-button:hover {
  background-color: #38a372;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
