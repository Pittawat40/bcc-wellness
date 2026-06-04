<template>
  <footer class="bg-neutral-950 text-neutral-300">
    <div class="container-wide py-12 md:py-16">
      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12"
      >
        <div class="lg:col-span-1">
          <div class="flex items-center gap-3 mb-4">
            <div
              class="w-9 h-9 rounded-xl bg-brand-600 flex items-center justify-center"
            >
              <svg
                class="w-5 h-5 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"
                />
                <path
                  d="M8 12c0-2.21 1.79-4 4-4s4 1.79 4 4-1.79 4-4 4-4-1.79-4-4z"
                />
              </svg>
            </div>
            <div>
              <div
                class="font-serif text-lg font-semibold text-white leading-none"
              >
                BCC IVF
              </div>
              <div class="text-xs text-neutral-500 tracking-wide">
                Wellness Center
              </div>
            </div>
          </div>
          <p class="text-sm leading-relaxed text-neutral-400">
            {{
              lang === "th"
                ? "คลินิกรักษาภาวะมีบุตรยาก ด้วยเทคโนโลยี IVF ที่ทันสมัย ดูแลโดยทีมแพทย์ผู้เชี่ยวชาญ"
                : "Infertility treatment clinic utilizing advanced IVF technology, guided by our team of fertility specialists."
            }}
          </p>

          <div class="flex gap-3 mt-5 flex-wrap">
            <template v-if="socialList.length">
              <a
                v-for="s in socialList"
                :key="s.platform"
                :href="s.url"
                :aria-label="s.platform"
                target="_blank"
                rel="noopener"
                class="w-9 h-9 rounded-lg bg-neutral-800 hover:bg-brand-600 flex items-center justify-center transition-colors"
              >
                <svg
                  class="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  v-html="socialIcon(s.platform)"
                />
              </a>
            </template>
            <template v-else>
              <a
                href="#"
                aria-label="Facebook"
                class="w-9 h-9 rounded-lg bg-neutral-800 hover:bg-brand-600 flex items-center justify-center transition-colors"
              >
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"
                  />
                </svg>
              </a>
              <a
                href="#"
                aria-label="Instagram"
                class="w-9 h-9 rounded-lg bg-neutral-800 hover:bg-brand-600 flex items-center justify-center transition-colors"
              >
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"
                  />
                </svg>
              </a>
              <a
                href="#"
                aria-label="YouTube"
                class="w-9 h-9 rounded-lg bg-neutral-800 hover:bg-brand-600 flex items-center justify-center transition-colors"
              >
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
                  />
                </svg>
              </a>
            </template>
          </div>
        </div>

        <div>
          <h4
            class="text-white font-semibold mb-4 text-sm tracking-wide uppercase"
          >
            {{ lang === "th" ? "บริการ" : "Services" }}
          </h4>
          <ul class="space-y-2.5">
            <li v-for="s in services" :key="s.href">
              <NuxtLink
                :to="s.href"
                class="text-sm text-neutral-400 hover:text-white transition-colors"
              >
                {{ lang === "th" ? s.labelTh : s.labelEn }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <div>
          <h4
            class="text-white font-semibold mb-4 text-sm tracking-wide uppercase"
          >
            {{ lang === "th" ? "ข้อมูล" : "Information" }}
          </h4>
          <ul class="space-y-2.5">
            <li v-for="item in infoLinks" :key="item.href">
              <NuxtLink
                :to="item.href"
                class="text-sm text-neutral-400 hover:text-white transition-colors"
              >
                {{ lang === "th" ? item.labelTh : item.labelEn }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <div>
          <h4
            class="text-white font-semibold mb-4 text-sm tracking-wide uppercase"
          >
            {{ lang === "th" ? "ติดต่อ" : "Contact Us" }}
          </h4>
          <ul class="space-y-3">
            <li
              v-for="info in footerContactList"
              :key="info.key"
              class="flex gap-3 text-sm text-neutral-400"
            >
              <svg
                class="w-4 h-4 mt-0.5 shrink-0 text-brand-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                stroke-width="2"
                v-html="footerIcon(info.icon || info.key)"
              />
              <a
                v-if="info.href"
                :href="info.href"
                class="hover:text-white transition-colors"
              >
                {{ lang === "en" ? info.value_en || info.value : info.value }}
              </a>
              <span v-else>
                {{ lang === "en" ? info.value_en || info.value : info.value }}
              </span>
            </li>
            <!-- <li
              v-if="hoursText"
              class="text-sm text-neutral-500 pt-1"
              v-html="hoursText"
            /> -->
          </ul>
        </div>
      </div>

      <div
        class="mt-10 pt-8 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-600"
      >
        <p>
          © {{ new Date().getFullYear() }} Bangkok Central Clinic.
          {{ lang === "th" ? "สงวนลิขสิทธิ์" : "All Rights Reserved." }}
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from "vue";

const lang = useLang();

// ── Social + Contact จาก API
const { data: socialData } = await useSocialMedia();
const { data: contactData } = await useContactInfo();

const socialList = computed(() => socialData.value || []);

const footerContactList = computed(() => {
  const list: any[] = contactData.value?.contactInfo || [];

  if (!list.length) {
    return [
      {
        key: "address",
        displayValue:
          lang.value === "th"
            ? "87/3 อาคารออลซีซั่นส์เพลส ชั้น 1 ถนนวิทยุ กทม 10330"
            : "87/3 All Seasons Place, 1st Floor, Wireless Road, Bangkok 10330",
        href: null,
        icon: "map",
      },
      {
        key: "phone",
        displayValue: "02-252-3420",
        href: "tel:+6622523420",
        icon: "phone",
      },
      {
        key: "email",
        displayValue: "info@bccivfwellness.com",
        href: "mailto:info@bccivfwellness.com",
        icon: "email",
      },
    ];
  }

  return list.filter((c) => ["address", "phone", "email"].includes(c.key));
});

const hoursText = computed(() => {
  const h: any[] = contactData.value?.businessHours || [];
  if (!h.length) {
    return lang.value === "th"
      ? "จันทร์–ศุกร์: 8:00–18:00 น.<br/>เสาร์: 9:00–16:00 น."
      : "Mon–Fri: 8:00 AM – 6:00 PM<br/>Sat: 9:00 AM – 4:00 PM";
  }
  return h
    .filter((x) => !x.is_closed)
    .map((x) => {
      const dayLabel =
        lang.value === "th" ? x.day_label : x.day_label_en || x.day_label;
      const hoursValue = lang.value === "th" ? x.hours : x.hours_en || x.hours;
      return `${dayLabel}: ${hoursValue}`;
    })
    .join("<br/>");
});

// ── Icon helpers
const footerIconPaths: Record<string, string> = {
  map: '<path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>',
  address:
    '<path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>',
  phone:
    '<path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>',
  email:
    '<path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>',
  line: '<path stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>',
};

function footerIcon(key: string) {
  return footerIconPaths[key] || footerIconPaths.phone;
}

const socialIconPaths: Record<string, string> = {
  facebook:
    '<path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>',
  instagram:
    '<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />',
  youtube:
    '<path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>',
  line: '<path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.064-.022.134-.032.2-.032.211 0 .391.09.51.25l2.444 3.317V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/>',
  tiktok:
    '<path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.77 1.52V6.75a4.85 4.85 0 01-1-.06z"/>',
  twitter:
    '<path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>',
};

function socialIcon(platform: string) {
  return socialIconPaths[platform] || socialIconPaths.facebook;
}

const services = [
  {
    href: "/services#ivf",
    labelTh: "IVF (การปฏิสนธินอกร่างกาย)",
    labelEn: "IVF (In Vitro Fertilization)",
  },
  {
    href: "/services#iui",
    labelTh: "IUI (การผสมเทียม)",
    labelEn: "IUI (Intrauterine Insemination)",
  },
  {
    href: "/services#icsi",
    labelTh: "ICSI (การฉีดอสุจิเข้าไข่)",
    labelEn: "ICSI (Intracytoplasmic Sperm Injection)",
  },
  {
    href: "/services#egg-freezing",
    labelTh: "การแช่แข็งไข่",
    labelEn: "Egg Freezing (Oocyte Cryopreservation)",
  },
  {
    href: "/services#pgt",
    labelTh: "การตรวจพันธุกรรมตัวอ่อน",
    labelEn: "PGT (Preimplantation Genetic Testing)",
  },
];

const infoLinks = [
  { href: "/about", labelTh: "เกี่ยวกับเรา", labelEn: "About Us" },
  {
    href: "/doctors",
    labelTh: "ทีมแพทย์ผู้เชี่ยวชาญ",
    labelEn: "Our Specialists",
  },
  { href: "/faq", labelTh: "คำถามที่พบบ่อย", labelEn: "FAQs" },
  { href: "/contact", labelTh: "นัดหมายแพทย์", labelEn: "Book Appointment" },
];
</script>

<style>
.hover\:bg-brand-600 {
  overflow: hidden !important;
  border-radius: 50% !important;
  transition: all 0.3s ease !important;
}

.hover\:bg-brand-600:active {
  transform: scale(0.9);
}

.hover\:bg-brand-600:hover .w-4.h-4 {
  animation: slide-in-top 0.3s both;
}

.hover\:bg-brand-600 svg path,
.hover\:bg-brand-600 :deep(svg path) {
  fill: #ffffff !important;
}

@keyframes slide-in-top {
  0% {
    transform: translateY(-50px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

.hover\:bg-brand-600 {
  overflow: hidden !important;
  transition: all 0.3s ease !important;
}
.hover\:bg-brand-600:active {
  transform: scale(0.9);
}
.hover\:bg-brand-600:hover .w-4.h-4 {
  animation: slide-in-top 0.3s both;
}

.hover\:bg-brand-600:nth-child(1):hover {
  background-color: #0072b1 !important;
}
.hover\:bg-brand-600:nth-child(2):hover {
  background-color: #e1306c !important;
}
.hover\:bg-brand-600:nth-child(3):hover {
  background-color: #06c755 !important;
}
.hover\:bg-brand-600:nth-child(4):hover {
  background-color: #ff0000 !important;
}

@keyframes slide-in-top {
  0% {
    transform: translateY(-50px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
