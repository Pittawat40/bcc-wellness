<template>
  <Transition name="fade" appear>
    <div
      v-if="visible"
      class="fixed bottom-4 left-1/2 z-[9999] w-[calc(100%-24px)] -translate-x-1/2 rounded-2xl border border-neutral-200 bg-white/90 p-5 shadow-2xl backdrop-blur-xl md:bottom-6 md:left-auto md:right-6 md:w-auto md:max-w-2xl md:translate-x-0"
    >
      <div
        class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
      >
        <div>
          <h3 class="text-base font-semibold text-black">
            {{ lang === "th" ? "เว็บไซต์นี้ใช้คุกกี้" : "We Use Cookies" }}
          </h3>

          <p class="mt-1 text-sm leading-relaxed text-neutral-600">
            {{
              lang === "th"
                ? "เราใช้คุกกี้เพื่อพัฒนาประสบการณ์การใช้งานของคุณ วิเคราะห์การเข้าชมเว็บไซต์ และนำเสนอเนื้อหาที่เหมาะสมกับความสนใจของคุณ"
                : "We use cookies to improve your browsing experience, analyze site traffic, and deliver personalized content tailored to your interests."
            }}
          </p>
        </div>

        <div class="flex gap-2 shrink-0">
          <button
            @click="acceptCookies"
            class="rounded-full bg-warm-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-warm-500"
          >
            {{ lang === "th" ? "ยอมรับ" : "Accept All" }}
          </button>

          <button
            @click="rejectCookies"
            class="rounded-full border border-neutral-300 px-5 py-2 text-sm font-medium text-warm-500 transition hover:bg-neutral-100"
          >
            {{ lang === "th" ? "ปฏิเสธ" : "Decline" }}
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

// เรียกใช้งานระบบตรวจจับภาษาหลักของโปรเจกต์คุณ
const lang = useLang();

const visible = ref(false);

onMounted(() => {
  const consent = localStorage.getItem("cookie-consent");

  if (!consent) {
    visible.value = true;
  }
});

const acceptCookies = () => {
  localStorage.setItem("cookie-consent", "accepted");
  visible.value = false;
};

const rejectCookies = () => {
  localStorage.setItem("cookie-consent", "rejected");
  visible.value = false;
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

/* เพิ่มความสมูทในการ Fade และเลื่อนขึ้นขยับลงตาม Style ดั้งเดิมของคุณ */
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translate(-50%, 20px);
}

@media (min-width: 768px) {
  .fade-enter-from,
  .fade-leave-to {
    transform: translateY(20px);
  }
}
</style>
