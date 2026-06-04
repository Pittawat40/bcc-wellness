<template>
  <section class="bg-white border-y border-neutral-100 py-5">
    <div class="container-wide">
      <div
        class="flex flex-wrap items-center justify-start md:justify-center gap-x-8 gap-y-4 text-sm text-neutral-500"
      >
        <div
          v-for="trust in trustItems"
          :key="trust"
          class="flex items-center gap-2"
        >
          <svg
            class="w-4 h-4 text-sage-500 shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            stroke-width="2.5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
          {{ trust }}
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue"; 

const lang = useLang();
const t = useT();

const trustItemsTh = [
  "เริ่มการรักษาได้ทันทีโดยไม่ต้องรอคิว",
  "ปรึกษาออนไลน์แบบยืดหยุ่นตาม lifestyle ของคุณ",
  "ทีมแพทย์ผู้เชี่ยวชาญที่สามารถสื่อสารได้หลายภาษา",
  "วางแผนการรักษาเฉพาะบุคคลตามความต้องการของคุณ",
  "ราคาชัดเจน ครอบคลุมทุกอย่าง ไม่มีค่าใช้จ่ายแอบแฝง",
];

const trustItemsEn = [
  "Start your treatment immediately with no waiting lists",
  "Flexible online consultations that fit your lifestyle",
  "A multilingual team of expert physicians",
  "Personalized treatment plans tailored to your needs",
  "Transparent pricing with no hidden fees",
];

const trustItems = computed(() => {
  return lang.value === "th" ? trustItemsTh : trustItemsEn;
});
</script>
