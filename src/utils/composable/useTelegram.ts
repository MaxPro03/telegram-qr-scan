// composables/useTelegram.js
import { onMounted } from 'vue';

export function useTelegram() {
    const tg = window.Telegram?.WebApp;

    onMounted(() => {
        if (tg) {
            tg.ready(); // Уведомляем Telegram, что приложение загружено
        }
    });

    return { tg };
}