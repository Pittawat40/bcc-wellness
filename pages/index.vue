<template>
  <div>
    <HeroSection />
    <TrustBar />
    <ServicesSection />
    <TreatmentSteps />
    <GallerySection />
    <ReviewsSection />
    <CtaSection />

    <button
      :class="[
        'group fixed bottom-6 right-6 z-50 flex h-14 w-14 animate-bounce items-center justify-center overflow-hidden rounded-full bg-[#06C755] text-white shadow-2xl transition-all duration-500 hover:w-36 hover:animate-none',
        showButton
          ? 'translate-y-0 opacity-100'
          : 'pointer-events-none translate-y-5 opacity-0',
      ]"
      aria-label="LINE Contact"
    >
      <div
        class="absolute flex items-center justify-center transition-all duration-500 group-hover:-translate-x-10"
      >
        <div
          class="flex h-8 w-8 items-center justify-center rounded-full bg-white"
        >
          <span class="text-[10px] font-black tracking-tight text-[#06C755]">
            LINE
          </span>
        </div>
      </div>

      <span
        class="translate-x-10 text-sm font-semibold tracking-wide opacity-0 transition-all duration-500 group-hover:translate-x-4 group-hover:opacity-100 whitespace-nowrap"
      >
        {{ lang === "th" ? "คุยกับเรา" : "Contact Us" }}
      </span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from "vue";

const lang = useLang();
const showButton = ref(false);

const handleScroll = () => {
  showButton.value = window.scrollY > 300;
};

// onMounted(() => {
//   window.addEventListener("scroll", handleScroll, { passive: true });
//   handleScroll();
// });

// onUnmounted(() => {
//   window.removeEventListener("removeEventListener", handleScroll);
// });

useSeoMeta({
  title: computed(() =>
    lang.value === "th"
      ? "BCC IVF Wellness – คลินิกรักษาภาวะมีบุตรยาก กรุงเทพ"
      : "BCC IVF Wellness – Fertility Clinic Bangkok",
  ),
  description: computed(() =>
    lang.value === "th"
      ? "คลินิกการรักษาภาวะมีบุตรยากด้วยเทคโนโลยี IVF ที่ทันสมัย ดูแลโดยทีมแพทย์เฉพาะทาง นัดหมายปรึกษาฟรี"
      : "Advanced fertility treatment clinic delivering world-class IVF technology under certified specialists. Free consultation.",
  ),
  ogTitle: computed(() =>
    lang.value === "th"
      ? "BCC IVF Wellness – คลินิกรักษาภาวะมีบุตรยาก กรุงเทพ"
      : "BCC IVF Wellness – Fertility Clinic Bangkok",
  ),
  ogDescription: computed(() =>
    lang.value === "th"
      ? "คลินิกการรักษาภาวะมีบุตรยากด้วยเทคโนโลยี IVF ที่ทันสมัย"
      : "Advanced fertility treatment clinic delivering world-class IVF technology.",
  ),
  ogType: "website",
  twitterCard: "summary_large_image",
});

// ── เพิ่มระบบ Structured Data (Schema Markup) รูปแบบสมบูรณ์
useHead({
  script: [
    {
      type: "application/ld+json",
      children: computed(() =>
        JSON.stringify({
          "@context": "https://schema.org",
          "@type": "MedicalClinic",
          "@id": "https://bccivfwellness.com/#clinic",
          name: "BCC IVF Wellness Center",
          alternateName:
            lang.value === "th"
              ? "ศูนย์การรักษาภาวะมีบุตรยากบีซีซี"
              : "BCC Fertility Clinic",
          description:
            lang.value === "th"
              ? "ศูนย์การรักษาภาวะมีบุตรยากด้วยเทคโนโลยี IVF ครบวงจร ดูแลโดยทีมแพทย์และนักเพาะเลี้ยงตัวอ่อนผู้เชี่ยวชาญ"
              : "Comprehensive fertility treatment center utilizing advanced IVF technology managed by certified physicians and embryologists.",
          url: "https://bccivfwellness.com",
          logo: "https://bccivfwellness.com/images/logo.png",
          image: "https://bccivfwellness.com/images/og-image.jpg",
          telephone: "+6620123456",
          medicalSpecialty: "ObstetricsAndGynecology",
          priceRange: "$$$",
          address: {
            "@type": "PostalAddress",
            streetAddress: "123 Sukhumvit Road",
            addressLocality: lang.value === "th" ? "เขตวัฒนา" : "Watthana",
            addressRegion: lang.value === "th" ? "กรุงเทพมหานคร" : "Bangkok",
            postalCode: "10110",
            addressCountry: "TH",
          },
          geo: {
            "@type": "GeoCoordinates",
            latitude: "13.736712",
            longitude: "100.547634",
          },
          openingHoursSpecification: [
            {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
              ],
              opens: "08:00",
              closes: "17:00",
            },
          ],
          sameAs: [
            "https://www.facebook.com/yourprofile",
            "https://www.instagram.com/yourprofile",
            "https://line.me/R/ti/p/@yourline",
          ],
        }),
      ),
    },
  ],
});
</script>

<style>
.scroll-reveal .item-reveal {
  opacity: 0;
  transform: translateY(35px);
  transition:
    opacity 1.4s cubic-bezier(0.16, 1, 0.3, 1),
    transform 1.4s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform, opacity;
}

.scroll-reveal.active .item-reveal {
  opacity: 1;
  transform: translateY(0);
}

.scroll-reveal.active .step-timeline-line {
  transform: scaleY(1);
}
</style>
