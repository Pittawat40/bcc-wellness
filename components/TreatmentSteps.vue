<template>
  <section
    ref="sectionRef"
    class="py-8 md:py-14 bg-white scroll-reveal relative overflow-hidden"
  >
    <div class="container-wide">
      <div
        class="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-16 items-center"
      >
        <div>
          <div class="item-reveal opacity-0 mb-10">
            <p class="tag bg-brand-100 text-brand-700 mb-4">
              {{ lang === "th" ? "ขั้นตอนการรักษา" : "Treatment Process" }}
            </p>
            <h2 class="section-title mb-4">
              <template v-if="lang === 'th'">
                เส้นทาง IVF<br />ที่เราดูแลคุณทุกก้าว
              </template>
              <template v-else>
                Your IVF Journey,<br />Guided at Every Step
              </template>
            </h2>
            <p class="text-neutral-500 leading-relaxed max-w-md">
              {{
                lang === "th"
                  ? "การรักษาด้วย IVF เป็นกระบวนการที่ต้องการความเชี่ยวชาญและความใส่ใจ เราออกแบบแผนการรักษาเฉพาะบุคคลสำหรับคุณ"
                  : "IVF treatment is a process requiring high expertise and careful attention. We design a personalized treatment plan specifically for you."
              }}
            </p>
          </div>

          <div class="relative pl-0 md:pl-2.5 space-y-6 overflow-hidden">
            <div
              class="absolute left-[17px] md:left-[26px] top-6 bottom-10 w-[2px] bg-brand-100 z-0"
            ></div>
            <div
              class="absolute left-[17px] md:left-[26px] top-6 bottom-10 w-[2px] bg-brand-600 z-0 origin-top scale-y-0 transition-transform duration-[2000ms] ease-out step-timeline-line"
            ></div>

            <div
              v-for="(step, i) in steps"
              :key="i"
              class="group flex gap-4 md:gap-5 relative z-10 item-reveal opacity-0"
              :style="{ transitionDelay: `${(i + 1) * 200}ms` }"
            >
              <div
                class="shrink-0 w-[34px] h-[34px] md:w-[35px] md:h-[35px] rounded-full flex items-center justify-center text-xs md:text-sm font-bold font-serif shadow-sm transition-all duration-500"
                :class="
                  i % 2 === 0
                    ? 'bg-brand-600 text-white'
                    : 'bg-sage-100 text-sage-700'
                "
              >
                {{ i + 1 }}
              </div>

              <div
                class="pt-0.5 transform transition-transform duration-300 group-hover:translate-x-1"
              >
                <h4
                  class="font-semibold text-neutral-900 mb-1 group-hover:text-brand-700 transition-colors duration-300"
                >
                  {{ lang === "th" ? step.titleTh : step.titleEn }}
                </h4>
                <p class="text-sm text-neutral-500 leading-relaxed max-w-md">
                  {{ lang === "th" ? step.descTh : step.descEn }}
                </p>
              </div>
            </div>
          </div>

          <div
            class="mt-10 pl-14 item-reveal opacity-0"
            :style="{ transitionDelay: '1400ms' }"
          >
            <NuxtLink to="/contact">
              <button
                class="group relative px-8 py-3 font-bold bg-warm-600 transition-all duration-300 ease-in-out text-white hover:shadow-lg overflow-hidden border-2 border-warm-600 rounded-full active:scale-95"
              >
                <span
                  class="absolute inset-0 w-full h-full bg-warm-50 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.68,-0.55,0.265,1.55)] origin-left"
                ></span>

                <span
                  class="relative z-10 flex items-center gap-3 tracking-widest text-sm uppercase transition-colors duration-300 group-hover:text-warm-600"
                >
                  {{
                    lang === "th" ? "นัดหมายปรึกษาฟรี" : " Free Consultation"
                  }}
                </span>
              </button>
            </NuxtLink>
          </div>
        </div>

        <div class="space-y-4 relative">
          <div
            class="absolute -right-4 -bottom-10 w-48 h-48 opacity-[0.03] pointer-events-none bg-[url('/images/pattern.png')] bg-contain bg-no-repeat"
          ></div>

          <div
            class="card bg-gradient-to-br from-brand-50 to-warm-50 border border-brand-100 item-reveal opacity-0 hover:shadow-elevated transition-all duration-500"
            :style="{ transitionDelay: '400ms' }"
          >
            <div class="font-serif text-3xl font-semibold text-brand-600 mb-1">
              {{ displayValue }}%
            </div>
            <div class="font-semibold text-neutral-900 mb-2">
              {{
                lang === "th" ? "อัตราความสำเร็จโดยรวม" : "Overall Success Rate"
              }}
            </div>
            <p class="text-sm text-neutral-500">
              {{
                lang === "th"
                  ? "สูงกว่าค่าเฉลี่ยประเทศ ด้วยเทคโนโลยีและทีมแพทย์ผู้เชี่ยวชาญ"
                  : "Above national average, powered by advanced technology and expert physicians."
              }}
            </p>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div
              class="card text-center item-reveal opacity-0 hover:shadow-elevated transition-all duration-500"
              :style="{ transitionDelay: '600ms' }"
            >
              <div class="font-serif text-2xl font-semibold text-sage-600 mb-1">
                2,500+
              </div>
              <div class="text-sm text-neutral-500">
                {{
                  lang === "th"
                    ? "เด็กแรกเกิดจากการรักษา"
                    : "Babies Born via Treatment"
                }}
              </div>
            </div>
            <div
              class="card text-center item-reveal opacity-0 hover:shadow-elevated transition-all duration-500"
              :style="{ transitionDelay: '750ms' }"
            >
              <div
                class="font-serif text-2xl font-semibold text-brand-600 mb-1"
              >
                15+
              </div>
              <div class="text-sm text-neutral-500">
                {{ lang === "th" ? "ปีประสบการณ์" : "Years of Experience" }}
              </div>
            </div>
          </div>

          <div
            class="card bg-sage-50 border border-sage-100 item-reveal opacity-0 hover:shadow-elevated transition-all duration-500"
            :style="{ transitionDelay: '900ms' }"
          >
            <div class="flex gap-3">
              <svg
                class="w-6 h-6 text-sage-600 shrink-0 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
              <p class="text-sm mt-1 text-sage-700">
                {{
                  lang === "th"
                    ? "ได้รับการรับรองจากสมาคมเวชศาสตร์การเจริญพันธุ์แห่งประเทศไทย"
                    : "Certified by the Thai Society for Reproductive Medicine (TSRM)"
                }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const lang = useLang();

const displayValue = ref(0);
const target = 68;

const sectionRef = ref<HTMLElement | null>(null);
let observer: IntersectionObserver | null = null;
let hasAnimated = false;

// Counter Animation
const startCounter = () => {
  if (hasAnimated) return;
  hasAnimated = true;

  const duration = 1500;
  const startTime = performance.now();

  const animate = (currentTime: number) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    displayValue.value = Math.floor(progress * target);

    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  };
  requestAnimationFrame(animate);
};

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          startCounter();
          observer?.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 },
  );

  if (sectionRef.value) {
    observer.observe(sectionRef.value);
  }
});

onUnmounted(() => {
  if (observer) observer.disconnect();
});

const steps = [
  {
    titleTh: "ปรึกษาแพทย์เบื้องต้น",
    titleEn: "Initial Medical Consultation",
    descTh:
      "ประเมินประวัติสุขภาพ ตรวจร่างกายเบื้องต้น และวางแผนการรักษาที่เหมาะสม",
    descEn:
      "Evaluate medical history, perform initial physical checks, and design a proper treatment plan.",
  },
  {
    titleTh: "กระตุ้นไข่",
    titleEn: "Ovarian Stimulation",
    descTh: "ใช้ยากระตุ้นให้รังไข่ผลิตไข่หลายใบ พร้อมติดตามผลอย่างใกล้ชิด",
    descEn:
      "Administer medications to stimulate multiple egg production, monitored closely via ultrasound.",
  },
  {
    titleTh: "เก็บไข่และอสุจิ",
    descTh: "ดำเนินการภายใต้การดมยาสลบ ใช้เวลาไม่นาน ผู้ป่วยรู้สึกสบาย",
    titleEn: "Egg & Sperm Retrieval",
    descEn:
      "Performed safely under light anesthesia; a quick and comfortable procedure.",
  },
  {
    titleTh: "ปฏิสนธิในห้องปฏิบัติการ",
    titleEn: "In Vitro Fertilization (IVF/ICSI)",
    descTh: "ทีมนักวิทยาศาสตร์ดูแลการปฏิสนธิและเลือกตัวอ่อนคุณภาพดีที่สุด",
    descEn:
      "Embryologists closely monitor fertilization and select the highest quality embryos.",
  },
  {
    titleTh: "ฝากตัวอ่อน",
    titleEn: "Embryo Transfer",
    descTh: "นำตัวอ่อนกลับเข้าสู่มดลูกอย่างประณีต กระบวนการรวดเร็วไม่เจ็บปวด",
    descEn:
      "Gently placing the selected embryo back into the uterus in a quick, painless process.",
  },
  {
    titleTh: "ติดตามผล",
    titleEn: "Pregnancy Monitoring",
    descTh: "ทีมแพทย์ดูแลและติดตามผลการตั้งครรภ์อย่างใกล้ชิดทุกขั้นตอน",
    descEn:
      "Our medical team continuously supports and reviews your pregnancy results step by step.",
  },
];
</script>
