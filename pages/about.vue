<template>
  <div>
    <section
      class="relative pt-16 pb-16 md:pt-32 md:pb-32 border-b border-neutral-200/60 bg-cover bg-center bg-no-repeat overflow-hidden"
      style="background-image: url(&quot;/images/bg-banner.jpg&quot;)"
    >
      <div class="absolute inset-0 bg-black/30 z-0"></div>

      <div class="container-narrow text-center relative z-10">
        <p class="tag bg-white/90 text-brand-800 mb-4 backdrop-blur-sm">
          {{ lang === "th" ? "เกี่ยวกับเรา" : "About Us" }}
        </p>
        <h1
          class="font-serif text-3xl md:text-4xl font-bold text-white mb-4 drop-shadow-sm"
        >
          {{
            lang === "th"
              ? "ความเชี่ยวชาญและความใส่ใจ"
              : "Expertise & Compassionate Care"
          }}
        </h1>
        <p
          class="text-white/90 md:text-lg leading-relaxed max-w-xl mx-auto drop-shadow-sm"
        >
          {{
            lang === "th"
              ? "เราก่อตั้งมานานกว่า 15 ปี ด้วยพันธกิจสร้างครอบครัวให้สมบูรณ์"
              : "Established for over 15 years with a mission to complete your family dreams."
          }}
        </p>
      </div>
    </section>

    <section class="py-6 md:py-16 bg-white overflow-hidden">
      <div class="container-wide">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div class="scroll-reveal item-reveal-up">
            <h2
              class="section-title mb-5"
              v-html="
                lang === 'th'
                  ? 'ทำไมถึงเลือก<br />BCC IVF Wellness?'
                  : 'Why Choose<br />BCC IVF Wellness?'
              "
            ></h2>
            <p class="text-neutral-600 leading-relaxed mb-6">
              {{
                lang === "th"
                  ? "เราเชื่อว่าทุกคู่สมควรได้รับโอกาสในการมีบุตร ด้วยประสบการณ์กว่า 15 ปีและทีมแพทย์เฉพาะทาง เราพัฒนาโปรโตคอลการรักษาที่ปรับเฉพาะบุคคล เพื่อให้ได้ผลลัพธ์ที่ดีที่สุด"
                  : "We believe every couple deserves the chance to conceive. With over 15 years of experience and our specialist team, we develop personalized treatment protocols tailored to achieve the highest success rates."
              }}
            </p>

            <div class="space-y-4">
              <div
                v-for="value in values"
                :key="value.titleTh"
                class="flex gap-4"
              >
                <div
                  class="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  :class="value.iconBg"
                >
                  <svg
                    class="w-5 h-5"
                    :class="value.iconColor"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    v-html="value.icon"
                  />
                </div>
                <div>
                  <h3 class="font-semibold text-neutral-900 mb-0.5">
                    {{ lang === "th" ? value.titleTh : value.titleEn }}
                  </h3>
                  <p class="text-sm text-neutral-500">
                    {{ lang === "th" ? value.descTh : value.descEn }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div
              v-for="(stat, index) in highlights"
              :key="stat.labelTh"
              class="card text-center border border-solid scroll-reveal item-reveal-up"
              :class="[stat.cardClass, stat.gradient]"
              :style="{ transitionDelay: `${index * 150}ms` }"
            >
              <div
                class="font-serif text-3xl md:text-4xl font-semibold mb-1"
                :class="stat.valueColor"
              >
                <template v-if="stat.isCounter"> {{ displayValue }}% </template>
                <template v-else>
                  {{ stat.value }}
                </template>
              </div>
              <div class="text-sm font-medium mb-1" :class="stat.labelColor">
                {{ lang === "th" ? stat.labelTh : stat.labelEn }}
              </div>
              <div class="text-xs" :class="stat.subColor">
                {{ lang === "th" ? stat.subTh : stat.subEn }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-14 bg-neutral-50 overflow-hidden">
      <div class="container-wide">
        <h2
          class="section-title text-center mb-10 scroll-reveal item-reveal-up"
        >
          {{
            lang === "th" ? "การรับรองและมาตรฐาน" : "Accreditations & Standards"
          }}
        </h2>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-5">
          <div
            v-for="(cert, index) in certs"
            :key="cert.name"
            class="bg-white rounded-3xl p-6 text-center border border-neutral-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 scroll-reveal item-reveal-up"
            :style="{ transitionDelay: `${index * 100}ms` }"
          >
            <div
              class="w-24 h-24 rounded-2xl bg-white border border-neutral-100 flex items-center justify-center mx-auto mb-4 overflow-hidden"
            >
              <img
                :src="cert.image"
                :alt="cert.name"
                loading="lazy"
                class="w-24 h-24 object-contain"
              />
            </div>

            <p class="text-sm md:text-base font-semibold text-neutral-800">
              {{ cert.name }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="py-8 md:py-14 bg-neutral-100 relative overflow-hidden">
      <div class="container-wide p-0 md:p-4 relative z-10">
        <div
          class="text-center max-w-xl mx-auto mb-14 scroll-reveal item-reveal-up"
        >
          <p class="tag bg-warm-200 text-warm-800 mb-4">
            {{ lang === "th" ? "ทีมแพทย์" : "Medical Team" }}
          </p>
          <h2 class="section-title">
            {{
              lang === "th"
                ? "ผู้เชี่ยวชาญด้านเวชศาสตร์"
                : "Reproductive Medicine"
            }}<br />
            {{ lang === "th" ? "การเจริญพันธุ์" : "Specialists" }}
          </h2>
        </div>

        <!-- Loading -->
        <div v-if="doctorPending" class="grid grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="i in 3" :key="i" class="card animate-pulse py-12">
            <div class="w-52 h-52 rounded-full bg-neutral-200 mx-auto mb-6" />
            <div class="h-5 bg-neutral-200 rounded w-3/4 mx-auto mb-3" />
            <div class="h-4 bg-neutral-100 rounded w-1/2 mx-auto" />
          </div>
        </div>

        <!-- Swiper -->
        <swiper
          v-else
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
          :breakpoints="{
            640: { slidesPerView: 2, spaceBetween: 20, centeredSlides: false },
            1024: { slidesPerView: 3, spaceBetween: 24, centeredSlides: false },
          }"
          class="doctors-swiper !pb-8"
        >
          <swiper-slide
            v-for="(doctor, index) in doctorList"
            :key="doctor.id || doctor.nameTh"
            class="!h-auto pb-4"
          >
            <div
              class="card text-center hover:shadow-elevated transition-all duration-300 py-6 bg-white rounded-2xl overflow-hidden h-full"
            >
              <div class="flex justify-center pt-6">
                <img
                  v-if="doctor.photo"
                  :src="apiStorageBase + doctor.photo"
                  :alt="lang === 'th' ? doctor.nameTh : doctor.nameEn"
                  loading="lazy"
                  class="w-52 h-52 rounded-full object-cover"
                />
                <div
                  v-else
                  class="w-52 h-52 rounded-full bg-gradient-to-br flex items-center justify-center"
                  :class="doctor.avatarGrad || 'from-brand-400 to-brand-600'"
                >
                  <svg
                    class="w-20 h-20 text-white/50"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
              </div>
              <h3
                class="mt-3 font-serif text-lg font-semibold text-neutral-900 px-4"
              >
                {{ lang === "th" ? doctor.nameTh : doctor.nameEn }}
              </h3>
              <p class="text-sm text-brand-600 font-medium mt-0.5 mb-3 px-4">
                {{ lang === "th" ? doctor.titleTh : doctor.titleEn }}
              </p>
              <p class="text-sm text-neutral-500 leading-relaxed px-4">
                {{ lang === "th" ? doctor.bioTh : doctor.bioEn }}
              </p>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

const swiperModules = [Pagination, Autoplay];

const config = useRuntimeConfig();
const apiStorageBase = (config.public.apiBase as string).replace("/api", "");

const { data: apiDoctors, pending: doctorPending } = await useDoctors();

const doctorList = computed(() => {
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
      bioTh: doc.bio,
      bioEn: doc.bio_en || doc.bio,
    }));
  }
  // fallback static
  return doctors.map((d) => ({
    ...d,
    photo: null,
    bioTh: d.descTh,
    bioEn: d.descEn,
  }));
});

const lang = useLang();

// จัดการ SEO Meta ให้รองรับ 2 ภาษาแบบไดนามิก
useSeoMeta({
  title: computed(() =>
    lang.value === "th"
      ? "เกี่ยวกับเรา | BCC IVF Wellness"
      : "About Us | BCC IVF Wellness",
  ),
  description: computed(() =>
    lang.value === "th"
      ? "BCC IVF Wellness ศูนย์รักษาภาวะมีบุตรยากก่อตั้งมากกว่า 15 ปี อัตราความสำเร็จ 68% รับรองโดยสมาคมเวชศาสตร์การเจริญพันธุ์"
      : "BCC IVF Wellness, an infertility treatment center established for over 15 years with a 68% success rate, accredited by reproductive medicine societies.",
  ),
});

/* =========================
   Counter Animation
========================= */
const displayValue = ref(0);
let hasAnimated = false;

const startCounter = () => {
  if (hasAnimated) return;
  hasAnimated = true;

  const target = 68;
  const duration = 1500;
  const incrementTime = duration / target;
  let current = 0;

  const counter = setInterval(() => {
    current++;
    displayValue.value = current;
    if (current >= target) {
      clearInterval(counter);
    }
  }, incrementTime);
};

/* =========================
   Mounted Lifecycle
========================= */
onMounted(() => {
  startCounter();

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -20px 0px",
    },
  );

  document.querySelectorAll(".scroll-reveal").forEach((el) => {
    observer.observe(el);
  });
});

/* =========================
   Core Values Data
========================= */
const values = [
  {
    titleTh: "การดูแลส่วนบุคคล",
    titleEn: "Personalized Care",
    descTh: "แผนการรักษาออกแบบเฉพาะสำหรับแต่ละคู่ ไม่มีสูตรสำเร็จ",
    descEn:
      "Treatment plans customized specifically for each couple, with no one-size-fits-all approach.",
    iconBg: "bg-brand-100",
    iconColor: "text-brand-600",
    icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>',
  },
  {
    titleTh: "เทคโนโลยีทันสมัย",
    titleEn: "Advanced Technology",
    descTh: "ห้องปฏิบัติการ IVF มาตรฐานระดับนานาชาติ อุปกรณ์ล่าสุด",
    descEn:
      "International standard IVF laboratories equipped with the latest embryology technologies.",
    iconBg: "bg-sage-100",
    iconColor: "text-sage-600",
    icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>',
  },
  {
    titleTh: "ทีมสหวิชาชีพ",
    titleEn: "Multidisciplinary Team",
    descTh: "แพทย์ นักวิทยาศาสตร์ พยาบาล และนักจิตวิทยาทำงานร่วมกัน",
    descEn:
      "Fertility doctors, embryologists, specialized nurses, and counselors collaborating together.",
    iconBg: "bg-warm-100",
    iconColor: "text-warm-700",
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 12a5 5 0 100-10 5 5 0 000 10z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 20a8 8 0 0116 0"/>',
  },
];

/* =========================
   Doctors Data
========================= */
const doctors = [
  {
    nameTh: "รศ.ดร.นพ. วิชัย สุขใจ",
    nameEn: "Assoc. Prof. Wichai Sukjai, MD, PhD",
    titleTh: "แพทย์เฉพาะทางเวชศาสตร์การเจริญพันธุ์",
    titleEn: "Reproductive Medicine Specialist",
    descTh:
      "ประสบการณ์มากกว่า 20 ปี ในการรักษาภาวะมีบุตรยาก จบการศึกษาจากมหาวิทยาลัยมหิดล",
    descEn:
      "Over 20 years of experience in fertility treatments. Graduated from Mahidol University.",
    image: "/images/doc-2.jpg",
  },
  {
    nameTh: "พญ. ศิริพร มานะดี",
    nameEn: "Siriporn Manadee, MD",
    titleTh: "สูตินรีแพทย์เฉพาะทาง IVF",
    titleEn: "Obstetrician & Gynecologist, IVF Specialist",
    descTh:
      "เชี่ยวชาญด้าน ICSI และการตรวจพันธุกรรมตัวอ่อน ผ่านการฝึกอบรมจากสหรัฐอเมริกา",
    descEn:
      "Expertise in ICSI and Preimplantation Genetic Testing (PGT). Trained in the USA.",
    image: "/images/doc-1.jpg",
  },
  {
    nameTh: "นพ. ธนกร ภูมิใจ",
    nameEn: "Thanakorn Phumjai, MD",
    titleTh: "สูตินรีแพทย์และนักวิทยาศาสตร์ห้องปฏิบัติการ",
    titleEn: "OB/GYN & Clinical Embryologist",
    descTh: "ผู้เชี่ยวชาญด้านการแช่แข็งไข่และตัวอ่อน มีประสบการณ์กว่า 15 ปี",
    descEn:
      "Specialist in oocyte and embryo cryopreservation with over 15 years of clinical practice.",
    image: "/images/doc-3.jpg",
  },
];

/* =========================
   Highlights Data
========================= */
const highlights = [
  {
    value: "15+",
    labelTh: "ปีประสบการณ์",
    labelEn: "Years of Experience",
    subTh: "ก่อตั้งปี 2553",
    subEn: "Established in 2010",
    gradient: "from-brand-50/50 to-white",
    cardClass: "border-brand-500",
    valueColor: "text-brand-500",
    labelColor: "text-neutral-700",
    subColor: "text-neutral-400",
    isCounter: false,
  },
  {
    value: "68%",
    labelTh: "อัตราความสำเร็จ",
    labelEn: "Success Rate",
    subTh: "สูงกว่าค่าเฉลี่ยประเทศ",
    subEn: "Above national average",
    // เขียวทั้งตัวหนังสือ (emerald-600) เส้นขอบ (emerald-500) และพื้นหลังไล่เฉดเขียวอ่อน (from-emerald-50 to-emerald-100/40)
    gradient: "from-emerald-50 to-emerald-100/40",
    cardClass: "border-emerald-500",
    valueColor: "text-emerald-600",
    labelColor: "text-emerald-800",
    subColor: "text-emerald-600/70",
    isCounter: true,
  },
  {
    value: "2,500+",
    labelTh: "เด็กแรกเกิด",
    labelEn: "Successful Births",
    subTh: "จากการรักษาของเรา",
    subEn: "Through our treatments",
    gradient: "from-brand-50/50 to-white",
    cardClass: "border-brand-500",
    valueColor: "text-brand-500",
    labelColor: "text-neutral-700",
    subColor: "text-neutral-400",
    isCounter: false,
  },
  {
    value: "12",
    labelTh: "แพทย์เฉพาะทาง",
    labelEn: "Specialists",
    subTh: "ทีมสหวิชาชีพ",
    subEn: "Multidisciplinary team",
    gradient: "from-brand-50/50 to-white",
    cardClass: "border-brand-500",
    valueColor: "text-brand-500",
    labelColor: "text-neutral-700",
    subColor: "text-neutral-400",
    isCounter: false,
  },
];

/* =========================
   Certifications Data
========================= */
const certs = [
  { name: "JCI Accredited", image: "/images/jci.png" },
  { name: "ISO 15189 Laboratory", image: "/images/iso.png" },
  { name: "RTAC Certified", image: "/images/rtac.png" },
  { name: "HA (Hospital Accreditation Thailand)", image: "/images/ha.png" },
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
