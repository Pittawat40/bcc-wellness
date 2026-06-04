<template>
  <section
    ref="sectionRef"
    class="py-8 md:py-14 bg-warm-100 scroll-reveal relative overflow-hidden select-none"
  >
    <div
      class="absolute left-[-12%] top-[-10%] w-[55%] md:w-[40%] h-[110%] opacity-[0.10] pointer-events-none text-sage-500 element-parallax transform -rotate-12"
      data-speed="-0.03"
    >
      <svg
        class="w-full h-full"
        viewBox="0 0 400 700"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M250 50 C350 150, 150 250, 300 380 C420 480, 230 580, 280 700"
          stroke="currentColor"
          stroke-width="2.5"
          stroke-linecap="round"
        />
        <path
          d="M130 70 C50 180, 320 270, 160 400 C40 500, 330 610, 180 720"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-dasharray="5 5"
        />
        <line
          x1="185"
          y1="110"
          x2="275"
          y2="120"
          stroke="currentColor"
          stroke-width="1.5"
        />
        <line
          x1="190"
          y1="210"
          x2="230"
          y2="215"
          stroke="currentColor"
          stroke-width="1.5"
        />
        <line
          x1="260"
          y1="315"
          x2="210"
          y2="330"
          stroke="currentColor"
          stroke-width="1.5"
        />
        <line
          x1="310"
          y1="430"
          x2="160"
          y2="445"
          stroke="currentColor"
          stroke-width="1.5"
        />
        <line
          x1="260"
          y1="520"
          x2="210"
          y2="525"
          stroke="currentColor"
          stroke-width="1.5"
        />
        <line
          x1="200"
          y1="620"
          x2="290"
          y2="615"
          stroke="currentColor"
          stroke-width="1.5"
        />
        <path
          d="M80 150 C70 135, 90 120, 80 105"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
        />
        <path
          d="M92 147 C102 132, 82 123, 92 108"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
        />
        <circle cx="86" cy="126" r="2" fill="currentColor" />
        <path
          d="M70 480 L90 470 L105 485 L100 505 L80 515 Z"
          stroke="currentColor"
          stroke-width="1"
          fill="none"
        />
        <circle cx="70" cy="480" r="2" fill="currentColor" />
        <circle cx="105" cy="485" r="2" fill="currentColor" />
      </svg>
    </div>

    <div
      class="absolute right-[-10%] top-[-5%] w-[55%] md:w-[40%] h-[110%] opacity-[0.10] pointer-events-none text-sage-500 element-parallax"
      data-speed="0.05"
    >
      <svg
        class="w-full h-full"
        viewBox="0 0 400 700"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M250 50 C350 150, 150 250, 300 380 C420 480, 230 580, 280 700"
          stroke="currentColor"
          stroke-width="2.5"
          stroke-linecap="round"
        />
        <path
          d="M130 70 C50 180, 320 270, 160 400 C40 500, 330 610, 180 720"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-dasharray="5 5"
        />
        <line
          x1="185"
          y1="110"
          x2="275"
          y2="120"
          stroke="currentColor"
          stroke-width="1.5"
        />
        <line
          x1="190"
          y1="210"
          x2="230"
          y2="215"
          stroke="currentColor"
          stroke-width="1.5"
        />
        <line
          x1="260"
          y1="315"
          x2="210"
          y2="330"
          stroke="currentColor"
          stroke-width="1.5"
        />
        <line
          x1="310"
          y1="430"
          x2="160"
          y2="445"
          stroke="currentColor"
          stroke-width="1.5"
        />
        <line
          x1="260"
          y1="520"
          x2="210"
          y2="525"
          stroke="currentColor"
          stroke-width="1.5"
        />
        <line
          x1="200"
          y1="620"
          x2="290"
          y2="615"
          stroke="currentColor"
          stroke-width="1.5"
        />
      </svg>
    </div>

    <div class="container-wide relative z-10">
      <div class="text-center max-w-2xl mx-auto mb-14 item-reveal">
        <p class="tag bg-sage-100 text-sage-700 mb-4">{{ t.services.badge }}</p>
        <h2 class="section-title whitespace-pre-line">
          {{ t.services.title }}
        </h2>
        <p class="section-subtitle">
          {{ t.services.subtitle }}
        </p>
      </div>

      <div class="sm:hidden px-2">
        <Swiper
          :modules="[SwiperPagination, SwiperAutoplay]"
          :slides-per-view="1"
          :space-between="16"
          :pagination="{ clickable: true }"
          :loop="true"
          :autoplay="{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }"
          class="services-swiper pb-10"
        >
          <SwiperSlide
            v-for="(service, index) in services"
            :key="service.id"
            class="pb-14 md:pb-0"
          >
            <NuxtLink
              :to="`/services#${service.id}`"
              class="group relative flex flex-col bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-elevated transition-all duration-500 item-reveal active"
            >
              <div class="relative h-56 w-full overflow-hidden bg-neutral-100">
                <img
                  :src="service.image || '/images/default-service.jpg'"
                  :alt="lang === 'th' ? service.titleTh : service.titleEn"
                  loading="lazy"
                  class="w-full h-full object-cover transition-transform duration-750 ease-out"
                />
                <div
                  class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"
                ></div>
              </div>

              <div
                class="relative flex-1 bg-white px-5 pb-6 pt-10 flex flex-col justify-between"
              >
                <div
                  class="absolute -top-7 left-6 w-14 h-14 rounded-2xl bg-white shadow-md flex items-center justify-center"
                >
                  <div
                    class="w-11 h-11 rounded-xl flex items-center justify-center"
                    :class="service.iconBg || 'bg-brand-50'"
                  >
                    <svg
                      class="w-5 h-5"
                      :class="service.iconColor || 'text-brand-600'"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      stroke-width="1.8"
                      v-html="service.iconPath"
                    />
                  </div>
                </div>

                <div>
                  <h3
                    class="font-serif line-clamp-1 text-lg font-semibold text-neutral-900 mb-2"
                  >
                    {{ lang === "th" ? service.titleTh : service.titleEn }}
                  </h3>
                  <p
                    class="text-sm text-neutral-500 leading-relaxed line-clamp-2"
                  >
                    {{ lang === "th" ? service.descTh : service.descEn }}
                  </p>
                </div>

                <div
                  class="mt-4 flex items-center justify-end gap-1 text-sm font-medium text-brand-600"
                >
                  <span>{{ t.services.learnMore }}</span>
                  <svg
                    class="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </NuxtLink>
          </SwiperSlide>
        </Swiper>
      </div>

      <div
        class="hidden sm:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        <NuxtLink
          v-for="(service, index) in services"
          :key="service.id"
          :to="`/services#${service.id}`"
          class="group relative flex flex-col bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-elevated transition-all duration-500 hover:-translate-y-2 item-reveal opacity-0"
          :style="{ transitionDelay: `${index * 150}ms` }"
        >
          <div class="relative h-56 w-full overflow-hidden bg-neutral-100">
            <img
              :src="service.image || '/images/default-service.jpg'"
              :alt="lang === 'th' ? service.titleTh : service.titleEn"
              loading="lazy"
              class="w-full h-full object-cover transition-transform duration-750 ease-out group-hover:scale-110"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"
            ></div>
          </div>

          <div
            class="relative flex-1 bg-white px-5 pb-6 pt-10 flex flex-col justify-between"
          >
            <div
              class="absolute -top-7 left-6 w-14 h-14 rounded-2xl bg-white shadow-md flex items-center justify-center transition-transform duration-500 group-hover:rotate-6"
            >
              <div
                class="w-11 h-11 rounded-xl flex items-center justify-center transition-colors duration-300"
                :class="service.iconBg || 'bg-brand-50'"
              >
                <svg
                  class="w-5 h-5"
                  :class="service.iconColor || 'text-brand-600'"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  stroke-width="1.8"
                  v-html="service.iconPath"
                />
              </div>
            </div>

            <div>
              <h3
                class="font-serif line-clamp-1 text-lg font-semibold text-neutral-900 mb-2 group-hover:text-brand-700 transition-colors duration-300"
              >
                {{ lang === "th" ? service.titleTh : service.titleEn }}
              </h3>
              <p class="text-sm text-neutral-500 leading-relaxed line-clamp-2">
                {{ lang === "th" ? service.descTh : service.descEn }}
              </p>
            </div>

            <div
              class="mt-4 flex items-center justify-end gap-1 text-sm font-medium text-brand-600 group-hover:text-brand-700"
            >
              <span
                class="relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 group-hover:after:w-full after:bg-brand-700 after:transition-all after:duration-300"
              >
                {{ t.services.learnMore }}
              </span>
              <svg
                class="w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>
        </NuxtLink>
      </div>

      <div
        class="text-center mt-6 md:mt-10 item-reveal opacity-0"
        :style="{ transitionDelay: '600ms' }"
      >
        <NuxtLink
          to="/services"
          class="btn-primary inline-flex items-center justify-center w-[60%] sm:w-auto mx-auto text-center"
        >
          {{ t.services.viewAll }}
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
// 1. นำเข้ามอดูล Autoplay เพิ่มเข้ามาที่นี่
import {
  Pagination as SwiperPagination,
  Autoplay as SwiperAutoplay,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const lang = useLang();
const t = useT();

const sectionRef = ref<HTMLElement | null>(null);
let observer: IntersectionObserver | null = null;

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observer?.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 },
  );
  if (sectionRef.value) observer.observe(sectionRef.value);
});

onUnmounted(() => {
  if (observer) observer.disconnect();
});

const services = [
  {
    id: "iui",
    titleTh: "IUI (การผสมเทียม)",
    titleEn: "IUI (Intrauterine Insemination)",
    descTh:
      "การนำอสุจิที่คัดแล้วฉีดเข้าโพรงมดลูกโดยตรง เหมาะสำหรับผู้ที่มีบุตรยากระดับน้อยถึงปานกลาง",
    descEn:
      "Injecting selected sperm directly into the uterus, suitable for mild to moderate infertility.",
    image: "/images/2.jpg",
    iconBg: "bg-sage-100 group-hover:bg-sage-200",
    iconColor: "text-sage-600",
    iconPath:
      '<path stroke-linecap="round" stroke-linejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/>',
  },
  {
    id: "icsi",
    titleTh: "ICSI (การฉีดอสุจิเข้าไข่)",
    titleEn: "ICSI (Intracytoplasmic Sperm Injection)",
    descTh:
      "เทคนิคขั้นสูงที่นำอสุจิหนึ่งตัวฉีดเข้าไข่โดยตรง เหมาะสำหรับกรณีอสุจิผิดปกติหรือคุณภาพต่ำ",
    descEn:
      "An advanced technique injecting a single sperm directly into an egg, ideal for severe male infertility factors.",
    image: "/images/4.jpg",
    iconBg: "bg-warm-100 group-hover:bg-warm-200",
    iconColor: "text-warm-700",
    iconPath:
      '<path stroke-linecap="round" stroke-linejoin="round" d="m15 11.25 1.5 1.5.75-.75V8.758l2.276-.61a3 3 0 1 0-3.675-3.675l-.61 2.277H12l-.75.75 1.5 1.5M15 11.25l-8.47 8.47c-.34.34-.8.53-1.28.53s-.94.19-1.28.53l-.97.97-.75-.75.97-.97c.34-.34.53-.8.53-1.28s.19-.94.53-1.28L12.75 9M15 11.25 12.75 9" />',
  },
  {
    id: "pgt",
    titleTh: "การตรวจพันธุกรรมตัวอ่อน",
    titleEn: "PGT (Preimplantation Genetic Testing)",
    descTh:
      "ตรวจสอบความผิดปกติทางพันธุกรรมของตัวอ่อนก่อนการฝาก เพิ่มโอกาสตั้งครรภ์และลดความเสี่ยงโรคทางพันธุกรรม",
    descEn:
      "Screening embryos for genetic abnormalities before transfer to improve pregnancy rates and prevent hereditary diseases.",
    image: "/images/5.jpg",
    iconBg: "bg-purple-100 group-hover:bg-purple-200",
    iconColor: "text-purple-600",
    iconPath:
      '<path stroke-linecap="round" stroke-linejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"/>',
  },
  {
    id: "counseling",
    titleTh: "การปรึกษาด้านการเจริญพันธุ์",
    titleEn: "Fertility Counseling",
    descTh:
      "รับการประเมินและวางแผนการรักษาเฉพาะบุคคลโดยแพทย์ผู้เชี่ยวชาญ พร้อมทีมจิตวิทยาที่ดูแลด้านอารมณ์",
    descEn:
      "Personalized evaluations and treatment planning by fertility specialists, paired with compassionate emotional support.",
    image: "/images/1.jpg",
    iconBg: "bg-rose-100 group-hover:bg-rose-200",
    iconColor: "text-rose-600",
    iconPath:
      '<path stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>',
  },
];
</script>

<style scoped>
:deep(.swiper-pagination) {
  bottom: 0px !important;
  left: 0 !important;
  width: 100% !important;
  text-align: center !important;
}

:deep(.swiper-pagination-bullet) {
  transition: all 0.3s ease;
}

:deep(.swiper-pagination-bullet-active) {
  background: #b45309 !important;
  width: 16px !important;
  border-radius: 4px !important;
}
</style>
