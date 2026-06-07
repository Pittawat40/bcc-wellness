<template>
  <div>
    <section
      class="relative pt-10 pb-10 md:pt-32 md:pb-32 border-b border-neutral-200/60 bg-cover bg-center bg-no-repeat overflow-hidden"
      style="background-image: url(&quot;/images/bg-banner.jpg&quot;)"
    >
      <div class="absolute inset-0 bg-black/30 z-0"></div>

      <div class="container-narrow text-center relative z-10">
        <p class="tag bg-white/90 text-brand-800 mb-4 backdrop-blur-sm">
          {{ lang === "th" ? "บริการของเรา" : "Our Services" }}
        </p>
        <h1
          class="font-serif text-2xl md:text-4xl font-bold text-white mb-4 drop-shadow-sm"
        >
          {{
            lang === "th"
              ? "การรักษาภาวะมีบุตรยากครบวงจร"
              : "Comprehensive Fertility Treatments"
          }}
        </h1>
        <p
          class="text-white/90 md:text-lg leading-relaxed max-w-xl mx-auto drop-shadow-sm"
        >
          {{
            lang === "th"
              ? "เราเสนอทางเลือกการรักษาหลากหลาย เพื่อเพิ่มโอกาสการมีบุตรให้สูงสุด"
              : "We offer tailored medical solutions to maximize your chances of a successful pregnancy."
          }}
        </p>
      </div>
    </section>

    <section class="py-6 md:py-16 bg-white overflow-hidden">
      <div class="container-wide space-y-8 md:space-y-24">
        <div
          v-for="(service, i) in services"
          :key="service.id"
          :id="service.id"
          class="scroll-reveal scroll-mt-24"
        >
          <div
            class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center"
          >
            <div
              :class="[
                i % 2 === 1
                  ? 'md:order-2 item-reveal-right'
                  : 'item-reveal-left',
                'opacity-0',
              ]"
            >
              <div class="tag mb-4 inline-block" :class="service.tagClass">
                {{ lang === "th" ? service.tagTh : service.tagEn }}
              </div>
              <h2 class="font-serif text-2xl md:text-3xl text-neutral-900 mb-4">
                {{ lang === "th" ? service.titleTh : service.titleEn }}
              </h2>
              <p class="text-neutral-600 leading-relaxed mb-5">
                {{ lang === "th" ? service.descTh : service.descEn }}
              </p>

              <ul class="space-y-2.5 mb-8">
                <li
                  v-for="point in lang === 'th'
                    ? service.pointsTh
                    : service.pointsEn"
                  :key="point"
                  class="flex gap-3 text-sm text-neutral-600"
                >
                  <svg
                    class="w-5 h-5 text-sage-500 shrink-0 mt-0.5"
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
                  {{ point }}
                </li>
              </ul>
            </div>

            <div
              class="h-64 md:h-[400px] rounded-2xl flex items-center justify-center bg-cover bg-no-repeat bg-center shadow-soft hover:shadow-elevated transition-all duration-1000"
              :style="{ backgroundImage: `url(${service.image})` }"
              :class="[
                i % 2 === 1
                  ? 'md:order-1 item-reveal-left'
                  : 'item-reveal-right',
                service.bgClass,
                'opacity-0',
              ]"
            ></div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-8 md:py-14 bg-brand-600">
      <div class="container-narrow text-center">
        <h2 class="font-serif text-2xl md:text-3xl text-white mb-4">
          {{
            lang === "th"
              ? "ไม่แน่ใจว่าควรเริ่มจากตรงไหน?"
              : "Not sure where to begin?"
          }}
        </h2>
        <p class="text-brand-100 mb-7">
          {{
            lang === "th"
              ? "ปรึกษาแพทย์ของเราฟรี เพื่อรับการประเมินและคำแนะนำที่เหมาะกับคุณ"
              : "Schedule a complimentary initial session with our specialists for a personalized assessment."
          }}
        </p>
        <NuxtLink
          to="/contact"
          class="inline-flex items-center justify-center gap-2 w-[100%] sm:w-auto mx-auto px-7 py-3.5 bg-white text-brand-700 font-semibold rounded-xl hover:bg-brand-50 transition-colors shadow-sm text-center"
        >
          {{ lang === "th" ? "นัดหมายปรึกษาฟรี" : "Free Consultation" }}
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from "vue";

const lang = useLang();

useSeoMeta({
  title: computed(() =>
    lang.value === "th"
      ? "บริการของเรา | BCC IVF Wellness"
      : "Our Services | BCC IVF Wellness",
  ),
  description: computed(() =>
    lang.value === "th"
      ? "บริการ IVF, IUI, ICSI, การแช่แข็งไข่ และการตรวจพันธุกรรมตัวอ่อน ดูแลโดยทีมแพทย์เฉพาะทาง"
      : "Providing IVF, IUI, ICSI, Egg Freezing, and PGT testing under the care of fertility specialists.",
  ),
});

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -40px 0px",
    },
  );

  document.querySelectorAll(".scroll-reveal").forEach((el) => {
    observer.observe(el);
  });
});

/* ==========================================
   Services Data Matrix (TH & EN Localized)
========================================== */
const services = [
  {
    id: "ivf",
    tagTh: "การรักษาหลัก",
    tagEn: "Primary Treatment",
    tagClass: "bg-brand-100 text-brand-700",
    image: "/images/2.jpg",
    titleTh: "IVF – การปฏิสนธินอกร่างกาย",
    titleEn: "IVF – In Vitro Fertilization",
    descTh:
      "IVF (In Vitro Fertilization) คือกระบวนการนำไข่และอสุจิมาผสมกันในห้องปฏิบัติการ แล้วนำตัวอ่อนที่ได้กลับเข้าไปฝากในมดลูก เป็นการรักษาที่มีประสิทธิภาพสูงสำหรับหลากหลายสาเหตุของภาวะมีบุตรยาก",
    descEn:
      "IVF is the process of combining eggs and sperm in a specialized laboratory environment. The resulting embryo is then carefully transferred into the uterus. Highly effective for various causes of infertility.",
    pointsTh: [
      "เหมาะกับภาวะมีบุตรยากทุกประเภท",
      "อัตราความสำเร็จสูงถึง 68%",
      "ดูแลโดยทีมแพทย์และนักวิทยาศาสตร์เฉพาะทาง",
      "สามารถแช่แข็งตัวอ่อนส่วนเกินได้",
    ],
    pointsEn: [
      "Suitable for all types of fertility challenges.",
      "High success rates reaching up to 68%.",
      "Monitored by expert physicians and embryologists.",
      "Viable remaining embryos can be safely cryopreserved.",
    ],
    bgClass: "bg-gradient-to-br from-brand-100 to-warm-100",
  },
  {
    id: "iui",
    tagTh: "การรักษาเบื้องต้น",
    tagEn: "Initial Treatment",
    tagClass: "bg-sage-100 text-sage-700",
    image: "/images/3.jpg",
    titleTh: "IUI – การผสมเทียม",
    titleEn: "IUI – Intrauterine Insemination",
    descTh:
      "IUI (Intrauterine Insemination) เป็นการฉีดอสุจิที่ผ่านการคัดเลือกเข้าไปในโพรงมดลูกโดยตรงในช่วงที่ไข่ตก เป็นขั้นตอนที่ง่ายกว่า IVF เหมาะกับคู่ที่มีปัญหาระดับเบาถึงปานกลาง",
    descEn:
      "IUI involves injecting highly concentrated, washed sperm directly into the uterus around the exact time of ovulation. A less invasive approach than IVF, ideal for mild to moderate fertility issues.",
    pointsTh: [
      "ขั้นตอนรวดเร็ว ไม่ต้องดมยาสลบ",
      "ราคาประหยัดกว่า IVF",
      "เหมาะกับอสุจิคุณภาพปานกลาง",
      "สามารถทำซ้ำได้หลายรอบ",
    ],
    pointsEn: [
      "Quick procedure with no sedation required.",
      "More cost-effective compared to advanced IVF.",
      "Perfect fit for moderate-quality sperm parameters.",
      "Can be safely repeated over multiple cycles.",
    ],
    bgClass: "bg-gradient-to-br from-sage-100 to-warm-50",
  },
  {
    id: "icsi",
    tagTh: "เทคโนโลยีขั้นสูง",
    tagEn: "Advanced Tech",
    tagClass: "bg-warm-200 text-warm-800",
    image: "/images/4.jpg",
    titleTh: "ICSI – การฉีดอสุจิเข้าไข่",
    titleEn: "ICSI – Intracytoplasmic Sperm Injection",
    descTh:
      "ICSI (Intracytoplasmic Sperm Injection) คือเทคนิคที่นำอสุจิตัวเดียวฉีดเข้าไปในไข่โดยตรงด้วยเข็มขนาดเล็กมาก เหมาะสำหรับคู่ที่มีปัญหาด้านอสุจิอย่างรุนแรง",
    descEn:
      "ICSI is a specialized technique where a single high-quality sperm is directly injected into a mature egg using a high-precision microneedle. Highly recommended for severe male factor infertility.",
    pointsTh: [
      "แก้ปัญหาอสุจิน้อย เคลื่อนที่ช้า หรือรูปร่างผิดปกติ",
      "ใช้ในกรณีที่ IVF ปกติล้มเหลว",
      "อัตราการปฏิสนธิสูงกว่า IVF ทั่วไป",
      "เทคนิคที่ต้องอาศัยความเชี่ยวชาญสูง",
    ],
    pointsEn: [
      "Overcomes low count, poor motility, or abnormal morphology.",
      "Recommended choice if prior standard IVF cycles yielded low fertilization.",
      "Provides higher fertilization assurance than standard IVF.",
      "Requires high-precision embryological expertise.",
    ],
    bgClass: "bg-gradient-to-br from-warm-100 to-brand-50",
  },
  {
    id: "egg-freezing",
    tagTh: "วางแผนอนาคต",
    tagEn: "Future Planning",
    tagClass: "bg-blue-100 text-blue-700",
    image: "/images/5.jpg",
    titleTh: "การแช่แข็งไข่ (Egg Freezing)",
    titleEn: "Egg Freezing (Oocyte Cryopreservation)",
    descTh:
      "การแช่แข็งไข่ด้วยเทคนิค Vitrification ช่วยให้คุณเก็บรักษาไข่ในขณะที่ยังมีคุณภาพดี เพื่อใช้ในอนาคตเมื่อพร้อม เหมาะสำหรับผู้หญิงที่ต้องการวางแผนครอบครัว",
    descEn:
      "Oocyte cryopreservation utilizing fast-freezing Vitrification stops biological aging of eggs, maintaining peak quality for future use. Perfect for women wanting to secure their family planning roadmap.",
    pointsTh: [
      "เหมาะสำหรับวัย 20–35 ปี",
      "ไข่คงคุณภาพได้นานกว่า 10 ปี",
      "ใช้เทคนิค Vitrification ที่ทันสมัย",
      "อัตราการอยู่รอดของไข่หลังละลายแช่แข็งสูงกว่า 90%",
    ],
    pointsEn: [
      "Optimally recommended for ages between 20 and 35.",
      "Preserves prime egg quality for more than 10 years.",
      "Employs advanced ultra-rapid Vitrification technology.",
      "Yields post-thaw egg survival rates exceeding 90%.",
    ],
    bgClass: "bg-gradient-to-br from-blue-50 to-sage-50",
  },
  {
    id: "pgt",
    tagTh: "ความแม่นยำสูง",
    tagEn: "High Precision",
    tagClass: "bg-brand-100 text-brand-700",
    image: "/images/6.jpg",
    titleTh: "การตรวจพันธุกรรมตัวอ่อน (PGT)",
    titleEn: "PGT – Preimplantation Genetic Testing",
    descTh:
      "การตรวจพันธุกรรมตัวอ่อนด้วยเทคโนโลยี Next-Generation Sequencing (NGS) ช่วยคัดกรองความผิดปกติของโครโมโซมก่อนการฝังตัว เพิ่มอัตราความสำเร็จในการตั้งครรภ์ และลดความเสี่ยงการส่งต่อโรคทางพันธุกรรมสู่ลูกน้อย",
    descEn:
      "Preimplantation Genetic Testing utilizes Next-Generation Sequencing (NGS) to screen for chromosomal abnormalities prior to embryo transfer. This significantly maximizes pregnancy success rates and prevents the transmission of genetic disorders.",
    pointsTh: [
      "ลดความเสี่ยงภาวะดาวน์ซินโดรม และโรคทางพันธุกรรม",
      "เพิ่มอัตราความสำเร็จในการฝังตัวและการตั้งครรภ์",
      "ใช้เทคโนโลยี NGS ที่มีความแม่นยำสูงถึง 99.9%",
      "วิเคราะห์โครโมโซมได้ครบทั้ง 23 คู่ รู้ผลชัดเจนก่อนย้ายตัวอ่อน",
    ],
    pointsEn: [
      "Minimizes the risks of Down syndrome and hereditary genetic conditions.",
      "Improves embryo implantation success and ongoing pregnancy rates.",
      "Employs advanced NGS technology with 99.9% testing accuracy.",
      "Screens all 23 pairs of chromosomes before embryo transfer takes place.",
    ],
    bgClass: "bg-gradient-to-br from-indigo-100 to-blue-50",
  },
];
</script>

<style scoped>
.scroll-reveal .item-reveal-left {
  opacity: 0;
  transform: translateX(-50px);
  transition:
    opacity 1.8s cubic-bezier(0.25, 1, 0.3, 1),
    transform 1.8s cubic-bezier(0.25, 1, 0.3, 1);
}

.scroll-reveal .item-reveal-right {
  opacity: 0;
  transform: translateX(50px);
  transition:
    opacity 1.8s cubic-bezier(0.25, 1, 0.3, 1),
    transform 1.8s cubic-bezier(0.25, 1, 0.3, 1);
}

.scroll-reveal.active .item-reveal-left,
.scroll-reveal.active .item-reveal-right {
  opacity: 1;
  transform: translateX(0);
}
</style>
