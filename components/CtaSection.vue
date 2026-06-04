<template>
  <section class="py-14 bg-gradient-to-br from-brand-600 to-brand-700">
    <div class="container-narrow text-center item-reveal opacity-1">
      <h2 class="font-serif text-3xl md:text-4xl text-white mb-4">
        {{
          lang === "th"
            ? "พร้อมเริ่มต้นแล้วหรือยัง?"
            : "Ready to Start Your Journey?"
        }}
      </h2>

      <p class="text-brand-100 text-lg leading-relaxed mb-8 max-w-lg mx-auto">
        {{
          lang === "th"
            ? "นัดหมายปรึกษาแพทย์ผู้เชี่ยวชาญของเราฟรี ไม่มีค่าใช้จ่าย เพื่อรับการประเมินเบื้องต้นและวางแผนการรักษา"
            : "Schedule a free consultation with our fertility specialists today for an initial assessment and personalized treatment planning."
        }}
      </p>

      <div class="flex flex-col sm:flex-row gap-3 justify-center items-center">
        <NuxtLink
          to="/contact"
          class="inline-flex items-center justify-center gap-2 w-[100%] sm:w-auto px-7 py-3.5 bg-white text-brand-700 font-semibold rounded-xl hover:bg-brand-50 transition-colors shadow-sm text-center"
        >
          {{ lang === "th" ? "นัดหมายฟรีวันนี้" : "Free Consultation" }}
        </NuxtLink>

        <a
          :href="phoneHref"
          class="inline-flex items-center justify-center gap-2 w-[100%] sm:w-auto px-7 py-3.5 border-2 border-white/40 text-white font-medium rounded-xl hover:bg-white/10 transition-colors text-center"
        >
          <svg
            class="w-4 h-4 shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            />
          </svg>
          <span>{{
            lang === "th" ? "โทร " + phoneNumber : "Call " + phoneNumber
          }}</span>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue";

const lang = useLang();

const { data: contactData } = await useContactInfo();

const phoneNumber = computed(() => {
  const phone = contactData.value?.contactInfo?.find(
    (c: any) => c.key === "phone",
  );
  return phone ? phone.value : "02-252-3420";
});

const phoneHref = computed(() => {
  const cleanNumber = phoneNumber.value.replace(/[^0-9]/g, "");
  return `tel:${cleanNumber}`;
});
</script>
