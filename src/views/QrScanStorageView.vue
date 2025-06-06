<script setup lang="ts">
import { QrcodeStream } from 'vue-qrcode-reader'
import { onMounted, ref } from 'vue'
import UiBadge from '@/components/order/UiBadge.vue'
import { useTelegram } from '@/utils/composable/useTelegram'

const { tg } = useTelegram()

const modalContent = ref()
const showModal = ref(false)
const touchStartY = ref(0)
const touchEndY = ref(0)
const translateY = ref(0)
const initialTranslateY = ref(0)
const transitionStyle = ref('transform 0.3s ease-out') // Smooth transition

const isSuccessMessage = ref(false)
const isErrorMessage = ref(false)
const result = ref(null)
const errorMessage = ref('')
const loading = ref(false)

const selectedConstraints = ref({ facingMode: 'environment' })
const cameraFacingMode = ref('environment') // По умолчанию используем заднюю камеру
const defaultConstraintOptions = [
    { label: 'rear camera', constraints: { facingMode: 'environment' } },
    // { label: "front camera", constraints: { facingMode: "user" } },
]
const constraintOptions = ref(defaultConstraintOptions)
const torchActive = ref(false)

function paintOutline(detectedCodes, ctx) {
    for (const detectedCode of detectedCodes) {
        const [firstPoint, ...otherPoints] = detectedCode.cornerPoints

        ctx.strokeStyle = 'orange'

        ctx.beginPath()
        ctx.moveTo(firstPoint.x, firstPoint.y)
        for (const { x, y } of otherPoints) {
            ctx.lineTo(x, y)
        }
        ctx.lineTo(firstPoint.x, firstPoint.y)
        ctx.closePath()
        ctx.stroke()
    }
}

async function onCameraReady(capabilities) {
    console.log('onCameraReady', capabilities)

    // NOTE: on iOS we can't invoke `enumerateDevices` before the user has given
    // camera access permission. `QrcodeStream` internally takes care of
    // requesting the permissions. The `camera-on` event should guarantee that this
    // has happened.
    const devices = await navigator.mediaDevices.enumerateDevices()
    const videoDevices = devices.filter(({ kind }) => kind === 'videoinput')
    console.log('devices', devices)

    constraintOptions.value = [
        ...defaultConstraintOptions,
        ...videoDevices.map(({ deviceId, label }) => ({
            label: `${label} (ID: ${deviceId})`,
            constraints: { deviceId },
        })),
    ]
}

function onDetect(detectedCodes) {
    console.log('detected', detectedCodes[0]?.rawValue)
    result.value = JSON.stringify(detectedCodes.map((code) => code.rawValue))
    // detectedCodes.map((code) => code.rawValue)
    sendPostRequest(detectedCodes[0]?.rawValue)
    // console.log('detected', result.value)
}

const sendPostRequest = async (id) => {
    loading.value = true
    errorMessage.value = ''

    try {
        const response = await fetch(
            `https://admin.gogomarket.uz/api/v2/telegram-bot/scan-product-barcode?telegram_user_id=${tg?.initDataUnsafe?.user?.id}&barcode=${id}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept-Language': 'ru',
                    Authorization: 'Basic Z29nb21hcmtldDoxMjM0NTYhQQ==',
                },
            }
        )

        if (!response.ok) {
            throw new Error('Ошибка. Попробуйте снова')
        }
        isSuccessMessage.value = true
        openModal()
    } catch (error) {
        isSuccessMessage.value = false
        errorMessage.value = error.message
        openModal()
    } finally {
        loading.value = false
    }
}

function openModal() {
    showModal.value = true
    document.body.style.overflow = 'hidden' // Disable body scroll
}

function closeModal() {
    transitionStyle.value = 'transform 0.2s ease-out' // Faster closing animation
    translateY.value = window.innerHeight // Move the modal out of view
    showModal.value = false
    translateY.value = 0 // Reset translateY
    transitionStyle.value = 'transform 0.3s ease-out' // Restore smooth transition
    document.body.style.overflow = '' // Enable body scroll
    document.location.reload()
}

function handleOutsideClick(event) {
    // Check if the click is outside the modal-content
    if (event.target !== modalContent.value) {
        closeModal()
    }
}

function onTouchStart(event) {
    touchStartY.value = event.touches[0].clientY
    initialTranslateY.value = translateY.value
}

function onTouchMove(event) {
    const touchCurrentY = event.touches[0].clientY
    translateY.value = Math.max(
        0,
        initialTranslateY.value + touchCurrentY - touchStartY.value
    )
}

function onTouchEnd() {
    if (translateY.value > 100) {
        closeModal()
    } else {
        translateY.value = 0 // Reset to initial position if swipe is not sufficient
    }
}

onMounted(() => {
    console.log(tg?.ready())
    // tg?.ready()
    onCameraReady()
})
</script>

<template>
    <div v-if="showModal" class="overlay" @click="handleOutsideClick">
        <div
            class="modal-content"
            ref="modalContent"
            @touchstart="onTouchStart"
            @touchmove="onTouchMove"
            @touchend="onTouchEnd"
            :style="{ transform: `translateY(${translateY}px)` }"
        >
            <span class="line"></span>
            <h1 class="modal-content-title">Получение товара</h1>
            <div
                class="rounded-2xl bg-white p-10 flex justify-center"
                v-if="isSuccessMessage"
            >
                <UiBadge color="green">Успешно</UiBadge>
            </div>
            <div class="rounded-2xl bg-white p-10 flex justify-center" v-else>
                <UiBadge color="yellow">{{ errorMessage }}</UiBadge>
            </div>
            <!--      <div class="modal-content-description">-->
            <!--        Лимит — это сумма, на которую вы<br />-->
            <!--        можете покупать в рассрочку сейчас <br />и в будущем. Лимит уменьшается-->
            <!--        после<br />-->
            <!--        покупки и восстанавливается, когда вы<br />-->
            <!--        вносите плановые платежи-->
            <!--      </div>-->
            <button @click="closeModal" class="modal-button">Закрыть</button>
        </div>
    </div>
    <div class="fullscreen bg-black pt-[50px] pb-[120px]">
        <div
            class="relative fullscreen mt-[50px] mb-[120px] rounded-[30px] overflow-hidden"
        >
            <span
                class="absolute mt-[35px] flex w-full justify-center z-20 text-white text-[20xp]"
                >Баркод сканнер</span
            >
            <div class="w-full flex justify-center">
                <img
                    class="absolute z-20 w-full top-[140px] justify-center max-w-[270px]"
                    src="@/assets/images/qr-borders.svg"
                    alt=""
                />
            </div>
            <QrcodeStream
                :torch="torchActive"
                :constraints="selectedConstraints"
                :track="paintOutline"
                :formats="['qr_code', 'code_128']"
                @detect="onDetect"
                :facingMode="cameraFacingMode"
                @camera-on="onCameraReady"
            >
            </QrcodeStream>
            <div class="absolute right-[22px] top-[20px] z-20">
                <RouterLink to="/">
                    <img src="@/assets/images/exit.svg" alt="" />
                </RouterLink>
            </div>
            <div class="absolute bottom-[22px] right-[20px] z-20">
                <img
                    @click="torchActive = !torchActive"
                    src="@/assets/images/flash.svg"
                    alt=""
                />
            </div>
        </div>
    </div>
</template>

<style scoped>
.fullscreen {
    position: fixed;
    z-index: 10;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
}

.overlay {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;
}

.modal-content {
    background-color: #eef2f5;
    width: 100%;
    max-width: 500px;
    height: 272px;
    border-radius: 24px 24px 0 0;
    padding: 16px;
    position: relative;
    touch-action: none; /* Prevent default scrolling */
    display: grid;
    grid-template-rows: auto 1fr auto;
}

.line {
    position: absolute;
    top: 14px;
    right: 50%;
    transform: translateX(50%);
    background-color: #c5c7ca;
    width: 48px;
    height: 5px;
    border-radius: 7px;
}

.modal-content-title {
    margin-top: 10px;
    margin-bottom: 12px;
    font-size: 18px;
    line-height: 32px;
    font-weight: 500;
    text-align: center;
}

.modal-content-description {
    font-size: 16px;
    line-height: 24px;
    font-weight: 500;
    margin-bottom: auto;
}

.modal-button {
    color: #212121;
    padding: 12px;
    border-radius: 7px;
    display: flex;
    justify-content: center;
    text-align: center;
    border: 1px solid #cdcdcd;
    margin: 20px 0 40px 0;
    font-size: 16px;
    font-weight: 600;
    height: 48px;
}
</style>
