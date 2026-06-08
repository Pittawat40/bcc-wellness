<template>
  <section
    v-if="reviews.length"
    ref="sectionRef"
    class="py-8 md:py-14 bg-warm-100 scroll-reveal relative overflow-hidden select-none"
  >
    <div
      class="absolute left-[-5%] top-[-10%] w-[50%] h-[120%] opacity-[0.15] pointer-events-none text-brand-400 element-parallax"
      data-speed="-0.08"
    >
      <svg
        class="w-full h-full"
        viewBox="0 0 400 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M-100 100C50 150 100 50 250 180C400 310 200 450 450 550"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
        />
        <path
          d="M-120 140C40 190 90 90 240 220C390 350 190 490 440 590"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-dasharray="4 4"
        />
        <path
          d="M-80 60C60 110 110 10 260 140C410 270 210 410 460 510"
          stroke="currentColor"
          stroke-width="1"
          opacity="0.5"
          stroke-linecap="round"
        />
      </svg>
    </div>

    <div class="container-wide relative z-10">
      <div class="text-center max-w-xl mx-auto mb-10 item-reveal opacity-0">
        <p class="tag bg-brand-100 text-brand-700 mb-4">
          {{
            lang === "th"
              ? "รีวิวจากประสบการณ์จริง"
              : "Real Patient Experiences"
          }}
        </p>
        <h2 class="section-title">
          <template v-if="lang === 'th'">
            เสียงจากครอบครัว<br />ที่เราดูแล
          </template>
          <template v-else>
            Voices from the Families<br />We Have Guided
          </template>
        </h2>
      </div>

      <div
        v-if="!reviewPending && reviews.length > 0"
        class="item-reveal opacity-0"
        :style="{ transitionDelay: '250ms' }"
      >
        <swiper
          :modules="swiperModules"
          :slides-per-view="1"
          :space-between="24"
          :pagination="{ clickable: true }"
          :autoplay="{ delay: 4000, disableOnInteraction: false }"
          :breakpoints="{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }"
          class="reviews-swiper !pb-14"
        >
          <swiper-slide
            v-for="review in reviews"
            :key="review.id"
            class="!h-auto"
          >
            <div
              class="card relative h-full flex flex-col justify-between bg-white/90 backdrop-blur-sm border border-white shadow-soft hover:shadow-elevated transition-all duration-500"
            >
              <div>
                <div class="flex gap-0.5 mb-4">
                  <svg
                    v-for="i in review.rating"
                    :key="i"
                    class="w-4 h-4 text-warm-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    />
                  </svg>
                </div>

                <!-- ข้อความรีวิวแยกภาษา -->
                <p class="text-neutral-600 text-sm leading-relaxed mb-6">
                  "{{ lang === "th" ? review.quoteTh : review.quoteEn }}"
                </p>
              </div>

              <div
                class="flex items-center gap-3 pt-4 border-t border-neutral-100 mt-auto"
              >
                <div
                  class="w-9 h-9 rounded-full flex items-center justify-center text-white font-semibold text-sm bg-gradient-to-br from-brand-400 to-warm-400"
                >
                  {{ lang === "th" ? review.nameTh[0] : review.nameEn[0] }}
                </div>
                <div>
                  <div class="font-semibold text-neutral-900 text-sm">
                    {{ lang === "th" ? review.nameTh : review.nameEn }}
                  </div>
                  <div class="text-xs text-neutral-400">
                    {{
                      lang === "th" ? review.treatmentTh : review.treatmentEn
                    }}
                    <template v-if="review.date">
                      | {{ formatApiDate(review.date, lang) }}
                    </template>
                  </div>
                </div>
              </div>
            </div>
          </swiper-slide>
        </swiper>
      </div>

      <div v-else-if="reviewPending" class="text-center py-12 text-neutral-400">
        Loading reviews...
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const lang = useLang();
const swiperModules = [Pagination, Autoplay];

/* ── Intersection Observer สำหรับ Animation ──────────────── */
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

const { data: reviewData, pending: reviewPending } = await useReviews({
  limit: "9",
  status: "published",
});

const formatApiDate = (dateString: string, currentLang: string) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const locale = currentLang === "th" ? "th-TH" : "en-US";
  return date.toLocaleDateString(locale, {
    year: "numeric",
    month: "short",
  });
};

const reviews = computed(() => {
  const list = reviewData.value?.reviews || [];
  if (list.length > 0) {
    return list.map((item: any) => ({
      id: item.id,
      nameTh: item.author_name || item.name,
      nameEn: item.author_name_en || item.author_name || item.name,
      date: item.date,
      treatmentTh: item.category || item.treatment,
      treatmentEn: item.category_en || item.category || item.treatment,
      rating: item.rating || 5, // fallback เป็น 5 ดาวกรณีข้อมูลไม่มีมา
      quoteTh: item.content || item.quote,
      quoteEn: item.content_en || item.content || item.quote,
    }));
  }
  return [];
});
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
