<template>
  <div>
    <section
      class="relative pt-16 pb-16 md:pt-32 md:pb-32 border-b border-neutral-200/60 bg-cover bg-center bg-no-repeat overflow-hidden"
      style="background-image: url(&quot;/images/bg-banner.jpg&quot;)"
    >
      <div class="absolute inset-0 bg-black/30 z-0"></div>

      <div class="container-narrow text-center relative z-10">
        <p class="tag bg-white/90 text-brand-800 mb-4 backdrop-blur-sm">FAQ</p>
        <h1
          class="font-serif text-3xl md:text-4xl font-bold text-white mb-4 drop-shadow-sm"
        >
          {{ lang === "th" ? "คำถามที่พบบ่อย" : "Frequently Asked Questions" }}
        </h1>
        <p
          class="text-white/90 md:text-lg leading-relaxed max-w-xl mx-auto drop-shadow-sm"
        >
          {{
            lang === "th"
              ? "ตอบทุกข้อสงสัยเกี่ยวกับการรักษาภาวะมีบุตรยาก"
              : "Find answers to all your questions regarding fertility treatments."
          }}
        </p>
      </div>
    </section>

    <section class="py-6 md:py-16 bg-white">
      <div class="container-narrow">
        <div v-if="pending" class="space-y-6">
          <div v-for="i in 3" :key="i" class="animate-pulse">
            <div class="h-5 bg-neutral-200 rounded w-1/3 mb-4" />
            <div class="space-y-3">
              <div v-for="j in 2" :key="j" class="card !p-4">
                <div class="h-4 bg-neutral-200 rounded w-3/4" />
              </div>
            </div>
          </div>
        </div>

        <template v-else>
          <div v-for="(group, gi) in faqGroups" :key="gi" class="mb-10">
            <h2
              class="font-serif text-xl text-neutral-700 mb-5 pb-3 border-b border-neutral-200"
            >
              {{ lang === "th" ? group.categoryTh : group.categoryEn }}
            </h2>
            <div class="space-y-3">
              <div
                v-for="(faq, fi) in group.items"
                :key="faq.id || fi"
                class="card !p-0 overflow-hidden"
              >
                <button
                  class="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-neutral-50 transition-colors"
                  @click="toggle(gi, fi)"
                >
                  <span class="font-medium text-neutral-800 pr-4">
                    {{ lang === "th" ? faq.qTh : faq.qEn }}
                  </span>
                  <svg
                    class="w-5 h-5 text-neutral-400 shrink-0 transition-transform duration-200"
                    :class="isOpen(gi, fi) ? 'rotate-180' : ''"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                <Transition
                  @enter="onEnter"
                  @after-enter="onAfterEnter"
                  @leave="onLeave"
                  @after-leave="onAfterLeave"
                >
                  <div v-if="isOpen(gi, fi)">
                    <div class="px-6 pt-3 pb-5">
                      <p
                        class="text-neutral-600 text-sm leading-relaxed whitespace-pre-line"
                      >
                        {{ lang === "th" ? faq.aTh : faq.aEn }}
                      </p>
                    </div>
                  </div>
                </Transition>
              </div>
            </div>
          </div>
        </template>

        <div class="card bg-brand-50 border border-brand-200 text-center mt-10">
          <h3 class="font-serif text-xl text-neutral-900 mb-2">
            {{ lang === "th" ? "ยังมีคำถามอื่น?" : "Still have questions?" }}
          </h3>
          <p class="text-neutral-500 text-sm mb-5">
            {{
              lang === "th"
                ? "ทีมแพทย์พร้อมตอบทุกข้อสงสัย ปรึกษาฟรีไม่มีค่าใช้จ่าย"
                : "Our specialist team is ready to assist you. Contact us for a free initial consultation."
            }}
          </p>
          <NuxtLink
            to="/contact"
            class="btn-primary inline-flex items-center justify-center w-[100%] sm:w-auto mx-auto text-center"
          >
            {{ lang === "th" ? "ติดต่อเรา" : "Contact Us" }}
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

const lang = useLang();

useSeoMeta({
  title: computed(() =>
    lang.value === "th"
      ? "คำถามที่พบบ่อย | BCC IVF Wellness"
      : "FAQ | BCC IVF Wellness",
  ),
  description: computed(() =>
    lang.value === "th"
      ? "ตอบทุกคำถามเกี่ยวกับการรักษาภาวะมีบุตรยากด้วย IVF IUI ICSI ค่าใช้จ่าย ขั้นตอน และอัตราความสำเร็จ"
      : "Answers to common questions about infertility treatments including IVF, IUI, ICSI, processes, and success rates.",
  ),
});

// ── API Hook
const {
  data: apiGroups,
  pending,
  refresh,
} = await useFaqs({ lang: lang.value });

watch(lang, () => refresh());
/* ==========================================
   Fallback Data (TH & EN Localized) - เพิ่มคำถามยอดนิยม
========================================== */
const fallbackGroups = [
  {
    categoryTh: "เกี่ยวกับ IVF และขั้นตอนการรักษา",
    categoryEn: "General IVF & Procedures",
    items: [
      {
        qTh: "IVF คืออะไร?",
        qEn: "What is IVF?",
        aTh: "IVF (In Vitro Fertilization) หรือการปฏิสนธินอกร่างกาย คือกระบวนการที่นำไข่จากรังไข่และอสุจิมาผสมกันในห้องปฏิบัติการ แล้วเลี้ยงให้กลายเป็นตัวอ่อน จากนั้นจึงนำตัวอ่อนที่มีคุณภาพดีกลับเข้าสู่โพรงมดลูก",
        aEn: "IVF (In Vitro Fertilization) is a process where eggs are retrieved from the ovaries and combined with sperm in a specialized laboratory. The fertilized eggs develop into embryos before being transferred back into the uterus.",
      },
      {
        qTh: "IVF กับ ICSI แตกต่างกันอย่างไร?",
        qEn: "What is the difference between IVF and ICSI?",
        aTh: "IVF คือการปล่อยให้อสุจิหลายตัวว่ายไปปฏิสนธิกับไข่เองในจานเพาะเลี้ยง ส่วน ICSI (Intracytoplasmic Sperm Injection) เป็นการใช้เข็มขนาดเล็กคัดเอาอสุจิที่แข็งแรงที่สุดเพียงตัวเดียว ฉีดเข้าไปในไข่โดยตรงเพื่อช่วยปฏิสนธิ เหมาะมากสำหรับฝ่ายชายที่มีปัญหาเรื่องคุณภาพอสุจิ",
        aEn: "In standard IVF, thousands of sperm are placed near an egg in a dish to fertilize naturally. ICSI (Intracytoplasmic Sperm Injection) involves injecting a single, high-quality sperm directly into the egg using a microscopic needle, making it highly effective for male infertility factors.",
      },
      {
        qTh: "กระบวนการทำเด็กหลอดแก้วใช้เวลานานแค่ไหน?",
        qEn: "How long does the entire IVF process take?",
        aTh: "ตั้งแต่เริ่มต้นกระตุ้นไข่จนถึงขั้นตอนการย้ายตัวอ่อน โดยทั่วไปจะใช้เวลาประมาณ 4-6 สัปดาห์ (ประมาณ 1 รอบเดือน) อย่างไรก็ตาม หากมีการตรวจโครโมโซมตัวอ่อน (PGT) หรือการแช่แข็งตัวอ่อนรอบธรรมชาติ ระยะเวลาอาจยืดหยุ่นตามความพร้อมของร่างกายคนไข้",
        aEn: "An average IVF cycle takes about 4 to 6 weeks from the initial ovarian stimulation to embryo transfer. However, if Preimplantation Genetic Testing (PGT) or a frozen embryo transfer (FET) plan is chosen, the timeline will expand slightly depending on the patient's hormonal readiness.",
      },
      {
        qTh: "IVF เหมาะสำหรับใครบ้าง?",
        qEn: "Who is IVF suitable for?",
        aTh: "IVF เหมาะสำหรับผู้ที่มีปัญหาท่อนำไข่อุดตัน ภาวะมีบุตรยากที่ไม่ทราบสาเหตุ ปัญหาอสุจิรุนแรง หรือเคยรักษาด้วยวิธีอื่นแล้วไม่สำเร็จ",
        aEn: "IVF is ideal for individuals or couples facing blocked fallopian tubes, unexplained infertility, severe male factor issues, or those who have had unsuccessful results with other treatments like IUI.",
      },
    ],
  },
  {
    categoryTh: "การเตรียมตัวและโอกาสความสำเร็จ",
    categoryEn: "Preparation & Success Rates",
    items: [
      {
        qTh: "อัตราความสำเร็จในการทำ IVF/ICSI เป็นอย่างไร?",
        qEn: "What is the success rate of IVF/ICSI?",
        aTh: "อัตราความสำเร็จขึ้นอยู่กับหลายปัจจัย โดยเฉพาะอย่างยิ่ง 'อายุของฝ่ายหญิง' และคุณภาพของตัวอ่อน สำหรับคนไข้ที่อายุต่ำกว่า 35 ปี ประกอบกับการตรวจคัดกรองโครโมโซมตัวอ่อน (PGT) อัตราการตั้งครรภ์สำเร็จอาจสูงถึง 60-75% ต่อการย้ายตัวอ่อนหนึ่งครั้ง",
        aEn: "Success rates depend heavily on several factors, primarily the woman's age and embryo quality. For women under 35 who undergo Preimplantation Genetic Testing (PGT-A), the success rate can be as high as 60-75% per single embryo transfer.",
      },
      {
        qTh: "ต้องเตรียมตัวอย่างไรก่อนเริ่มเข้าสู่กระบวนการกระตุ้นไข่?",
        qEn: "How should I prepare myself before starting the treatment?",
        aTh: "คนไข้ควรพักผ่อนให้เพียงพออย่างน้อย 7-8 ชั่วโมง, งดสูบบุหรี่และเครื่องดื่มแอลกอฮอล์, ทานอาหารที่มีโปรตีนและสารต้านอนุมูลอิสระสูง ควบคู่กับการทานกรดโฟลิก (Folic Acid) ล่วงหน้าอย่างน้อย 1-3 เดือนตามแพทย์สั่ง และพยายามลดความเครียด",
        aEn: "Patients should prioritize getting 7-8 hours of sleep, avoid smoking and alcohol, maintain a balanced diet rich in protein and antioxidants, and take folic acid supplements at least 1-3 months prior. Managing and reducing emotional stress is also vital.",
      },
    ],
  },
  {
    categoryTh: "ค่าใช้จ่ายและการชำระเงิน",
    categoryEn: "Costs & Payments",
    items: [
      {
        qTh: "ค่าใช้จ่าย IVF เป็นเท่าไร?",
        qEn: "How much does IVF treatment cost?",
        aTh: "ค่าใช้จ่ายขึ้นอยู่กับแผนการรักษาแต่ละบุคคล โดยทั่วไปอยู่ที่ 120,000–200,000 บาทต่อรอบ กรุณาปรึกษาแพทย์เพื่อรับใบเสนอราคาที่แน่นอน",
        aEn: "The cost varies depending on personalized treatment plans. On average, it ranges from 120,000 to 200,000 THB per cycle. Please consult our specialists for a precise financial estimation.",
      },
    ],
  },
];

const faqGroups = computed(() => {
  const list = apiGroups.value;
  if (Array.isArray(list) && list.length > 0) {
    return list.map((group: any) => ({
      categoryTh: group.category,
      categoryEn: group.category_en || group.category,
      items: (group.items || []).map((item: any) => ({
        id: item.id,
        qTh: item.q,
        qEn: item.qEn || item.q,
        aTh: item.a,
        aEn: item.aEn || item.a,
      })),
    }));
  }
  return fallbackGroups;
});

useHead({
  script: [
    {
      type: "application/ld+json",
      children: computed(() => {
        const entities = [];
        if (faqGroups.value && faqGroups.value.length > 0) {
          for (const group of faqGroups.value) {
            if (group.items && group.items.length > 0) {
              for (const item of group.items) {
                entities.push({
                  "@type": "Question",
                  name: lang.value === "th" ? item.qTh : item.qEn,
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: lang.value === "th" ? item.aTh : item.aEn,
                  },
                });
              }
            }
          }
        }
        return JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: entities,
        });
      }),
    },
  ],
});

/* ==========================================
   Accordion Toggle Methods & Animations
========================================== */
const openItems = ref<Set<string>>(new Set());
const toggle = (gi: number, fi: number) => {
  const key = `${gi}-${fi}`;
  if (openItems.value.has(key)) openItems.value.delete(key);
  else openItems.value.add(key);
};
const isOpen = (gi: number, fi: number) => openItems.value.has(`${gi}-${fi}`);

function onEnter(el: Element) {
  const e = el as HTMLElement;
  e.style.overflow = "hidden";
  e.style.height = "0";
  e.style.opacity = "0";
  void e.scrollHeight;
  e.style.transition = "height 0.28s ease, opacity 0.28s ease";
  e.style.height = e.scrollHeight + "px";
  e.style.opacity = "1";
}
function onAfterEnter(el: Element) {
  const e = el as HTMLElement;
  e.style.height = "auto";
  e.style.overflow = "";
  e.style.transition = "";
}
function onLeave(el: Element) {
  const e = el as HTMLElement;
  e.style.overflow = "hidden";
  e.style.height = e.scrollHeight + "px";
  e.style.opacity = "1";
  void e.scrollHeight;
  e.style.transition = "height 0.24s ease, opacity 0.22s ease";
  e.style.height = "0";
  e.style.opacity = "0";
}
function onAfterLeave(el: Element) {
  const e = el as HTMLElement;
  e.style.height = "";
  e.style.overflow = "";
  e.style.transition = "";
  e.style.opacity = "";
}
</script>
