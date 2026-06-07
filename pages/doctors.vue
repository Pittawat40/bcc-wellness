<template>
  <div>
    <!-- ─── Section 1: Banner ─── -->
    <section
      class="relative pt-10 pb-10 md:pt-32 md:pb-32 border-b border-neutral-200/60 bg-cover bg-center bg-no-repeat overflow-hidden"
      style="background-image: url(&quot;/images/bg-banner.jpg&quot;)"
    >
      <div class="absolute inset-0 bg-black/30 z-0"></div>
      <div class="container-narrow text-center relative z-10">
        <p class="tag bg-white/90 text-brand-800 mb-4 backdrop-blur-sm">
          {{ lang === "th" ? "ทีมแพทย์" : "Medical Team" }}
        </p>
        <h1
          class="font-serif text-2xl md:text-4xl font-bold text-white mb-4 drop-shadow-sm"
        >
          {{ lang === "th" ? "ผู้เชี่ยวชาญของเรา" : "Our Specialists" }}
        </h1>
        <p
          class="text-white/90 md:text-lg leading-relaxed max-w-xl mx-auto drop-shadow-sm"
        >
          {{
            lang === "th"
              ? "ทีมแพทย์เฉพาะทางด้านเวชศาสตร์การเจริญพันธุ์ที่มากประสบการณ์"
              : "Highly experienced reproductive endocrinologists and fertility specialists."
          }}
        </p>
      </div>
    </section>

    <section class="pt-8 pb-0 md:py-16 bg-neutral-50">
      <div class="container-wide p-0 md:p-4">
        <!-- Loading State -->
        <div
          v-if="pending"
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <div v-for="i in 3" :key="i" class="card animate-pulse py-12">
            <div class="w-52 h-52 rounded-full bg-neutral-200 mx-auto mb-6" />
            <div class="h-5 bg-neutral-200 rounded w-3/4 mx-auto mb-3" />
            <div class="h-4 bg-neutral-100 rounded w-1/2 mx-auto" />
          </div>
        </div>

        <template v-else>
          <!-- Mobile: Swiper -->
          <div class="block md:hidden">
            <swiper
              :modules="swiperModules"
              :slides-per-view="1.15"
              :space-between="16"
              :centered-slides="true"
              :pagination="{ clickable: true }"
              :loop="true"
              :autoplay="{
                delay: 2500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }"
              class="doctors-swiper !pb-12 mb-6"
            >
              <swiper-slide
                v-for="doctor in doctors"
                :key="doctor.id || doctor.nameTh"
                class="!h-auto"
              >
                <DoctorCard
                  :doctor="doctor"
                  :lang="lang"
                  :api-storage-base="apiStorageBase"
                />
              </swiper-slide>
            </swiper>
          </div>

          <!-- Desktop: Grid -->
          <div
            class="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6 items-stretch"
          >
            <DoctorCard
              v-for="doctor in doctors"
              :key="doctor.id || doctor.nameTh"
              :doctor="doctor"
              :lang="lang"
              :api-storage-base="apiStorageBase"
            />
          </div>
        </template>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

const swiperModules = [Pagination, Autoplay];

const lang = useLang();

useSeoMeta({
  title: computed(() =>
    lang.value === "th"
      ? "ทีมแพทย์เฉพาะทาง IVF | BCC IVF Wellness"
      : "Fertility Specialists & IVF Team | BCC IVF Wellness",
  ),
  description: computed(() =>
    lang.value === "th"
      ? "ทีมแพทย์ผู้เชี่ยวชาญด้านเวชศาสตร์การเจริญพันธุ์ IVF IUI ICSI ประสบการณ์กว่า 15 ปี"
      : "Meet our board-certified reproductive endocrinologists and embryologists with over 15 years of IVF clinical experience.",
  ),
});

const config = useRuntimeConfig();
const apiStorageBase = (config.public.apiBase as string).replace("/api", "");

const fallbackDoctors = [
  {
    nameTh: "รศ.ดร.นพ. วิชัย สุขใจ",
    nameEn: "Assoc. Prof. Wichai Sukjai, M.D., Ph.D.",
    titleTh: "แพทย์เฉพาะทางเวชศาสตร์การเจริญพันธุ์",
    titleEn: "Reproductive Endocrinologist & IVF Specialist",
    avatarGrad: "from-brand-400 to-brand-600",
    photo: null,
    eduTh: [
      "แพทยศาสตร์บัณฑิต มหาวิทยาลัยมหิดล",
      "วุฒิบัตร สูตินรีเวชศาสตร์",
      "ประกาศนียบัตรผู้เชี่ยวชาญ IVF, Harvard Medical School",
    ],
    eduEn: [
      "Doctor of Medicine (M.D.), Mahidol University",
      "Thai Board of Obstetrics and Gynecology",
      "Clinical Fellowship in IVF, Harvard Medical School",
    ],
    tagsTh: ["IVF", "ICSI", "ตรวจโครโมโซมตัวอ่อน PGT"],
    tagsEn: ["IVF", "ICSI", "PGT-A Screening"],
  },
  {
    nameTh: "พญ. ศิริพร มานะดี",
    nameEn: "Siriporn Manadee, M.D.",
    titleTh: "สูตินรีแพทย์เฉพาะทางเวชศาสตร์การเจริญพันธุ์",
    titleEn: "Obstetrician & Infertility Specialist",
    avatarGrad: "from-sage-400 to-sage-600",
    photo: null,
    eduTh: [
      "แพทยศาสตร์บัณฑิต จุฬาลงกรณ์มหาวิทยาลัย",
      "วุฒิบัตร อนุสาขาเวชศาสตร์การเจริญพันธุ์",
      "ประกาศนียบัตรเวชศาสตร์การเจริญพันธุ์ Stanford University",
    ],
    eduEn: [
      "Doctor of Medicine (M.D.), Chulalongkorn University",
      "Thai Subspecialty Board of Reproductive Medicine",
      "Research Fellowship, Stanford University",
    ],
    tagsTh: ["IUI", "ฝากไข่/แช่แข็งไข่", "ICSI"],
    tagsEn: ["IUI", "Egg Freezing", "ICSI"],
  },
  {
    nameTh: "ดร. ธนกร ภูมิใจ",
    nameEn: "Thanakorn Phoomjai, Ph.D.",
    titleTh: "ผู้เชี่ยวชาญและหัวหน้าห้องปฏิบัติการคัดเลือกตัวอ่อน",
    titleEn: "Chief Embryologist & Lab Director",
    avatarGrad: "from-warm-400 to-warm-600",
    photo: null,
    eduTh: [
      "วิทยาศาสตร์บัณฑิต ชีววิทยาประยุกต์",
      "ปริญญาเอก เวชศาสตร์การเจริญพันธุ์คลินิก",
      "ใบรับรองนักเพาะเลี้ยงตัวอ่อนมาตรฐานยุโรป (ESHRE Certified)",
    ],
    eduEn: [
      "Bachelor of Science in Applied Biology",
      "Ph.D. in Clinical Reproductive Medicine",
      "ESHRE Certified Senior Clinical Embryologist",
    ],
    tagsTh: ["ห้องแล็บตัวอ่อน", "การแช่แข็งตัวอ่อน", "คัดกรองโครโมโซม"],
    tagsEn: ["Embryology", "Vitrification", "PGT-A Analysis"],
  },
];

const { data: apiDoctors, pending } = await useDoctors();

const doctors = computed(() => {
  const list = (apiDoctors.value as any[]) || [];
  if (list.length > 0) {
    return list.map((doc: any) => ({
      id: doc.id,
      photo: doc.photo,
      avatarGrad: doc.avatar_grad,
      nameTh: doc.name,
      nameEn: doc.name_en || doc.name,
      titleTh: doc.title,
      titleEn: doc.title_en || doc.title,
      eduTh: Array.isArray(doc.education) ? doc.education : [],
      eduEn: Array.isArray(doc.education_en)
        ? doc.education_en
        : Array.isArray(doc.education)
          ? doc.education
          : [],
      tagsTh: Array.isArray(doc.specialties) ? doc.specialties : [],
      tagsEn: Array.isArray(doc.specialties) ? doc.specialties : [], // API ไม่มี specialties_en ใช้อันเดียวกัน
    }));
  }
  return fallbackDoctors;
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
