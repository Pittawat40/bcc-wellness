<template>
  <header
    class="sticky top-0 z-50 bg-warm-50/95 backdrop-blur-sm border-b border-neutral-200/60"
    :class="{ 'shadow-soft': scrolled }"
  >
    <div class="container-wide">
      <div class="flex items-center justify-between h-16 lg:h-18">
        <NuxtLink to="/" class="flex items-center gap-3 group">
          <div
            class="w-9 h-9 rounded-xl bg-brand-600 flex items-center justify-center shadow-sm group-hover:bg-brand-700 transition-colors"
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
              class="font-serif text-lg font-semibold text-neutral-900 leading-none"
            >
              BCC IVF
            </div>
            <div class="text-xs text-neutral-500 tracking-wide">
              Wellness Center
            </div>
          </div>
        </NuxtLink>

        <nav class="hidden lg:flex items-center gap-1">
          <NuxtLink
            v-for="item in navItems"
            :key="item.href"
            :to="item.href"
            class="btn-ghost text-sm whitespace-nowrap"
            :class="
              route.path === item.href ? 'text-brand-600 bg-brand-50' : ''
            "
          >
            {{ item.label }}
          </NuxtLink>
        </nav>

        <div class="hidden lg:flex items-center gap-3">
          <a
            :href="phoneHref"
            class="hidden xl:inline-flex btn-ghost text-sm whitespace-nowrap"
          >
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
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            {{ phoneNumber }}
          </a>

          <NuxtLink
            to="/contact"
            class="hidden xl:inline-flex btn-primary text-sm whitespace-nowrap"
          >
            {{ t.nav?.cta }}
          </NuxtLink>

          <div class="inline-block select-none">
            <div
              class="tabs relative flex bg-neutral-100 border border-neutral-200/80 rounded-full p-0.5 shadow-inner"
            >
              <input
                v-model="lang"
                value="th"
                name="language-icon-tabs"
                id="lang-icon-th"
                type="radio"
                class="peer/th hidden"
              />
              <label
                for="lang-icon-th"
                class="tab relative z-10 flex items-center justify-center h-7 w-8 cursor-pointer transition-transform duration-200 active:scale-95"
              >
                <div
                  class="w-5 h-5 rounded-full overflow-hidden border border-neutral-200/40 shrink-0 shadow-2xs"
                >
                  <img
                    src=" /images/th.png"
                    alt="TH"
                    class="w-full h-full object-cover"
                  />
                </div>
              </label>

              <input
                v-model="lang"
                value="en"
                name="language-icon-tabs"
                id="lang-icon-en"
                type="radio"
                class="peer/en hidden"
              />
              <label
                for="lang-icon-en"
                class="tab relative z-10 flex items-center justify-center h-7 w-8 cursor-pointer transition-transform duration-200 active:scale-95"
              >
                <div
                  class="w-5 h-5 rounded-full overflow-hidden border border-neutral-200/40 shrink-0 shadow-2xs"
                >
                  <img
                    src=" /images/en.png"
                    alt="EN"
                    class="w-full h-full object-cover"
                  />
                </div>
              </label>

              <span
                class="glider absolute top-0.5 bottom-0.5 left-0.5 w-8 bg-warm-300 rounded-full z-0 shadow-sm transition-transform duration-300 ease-out peer-checked/th:translate-x-0 peer-checked/en:translate-x-full"
              ></span>
            </div>
          </div>
        </div>

        <button
          @click="mobileOpen = !mobileOpen"
          class="lg:hidden p-2 rounded-lg hover:bg-neutral-100 transition-colors"
          :aria-label="mobileOpen ? t.nav?.closeMenu : t.nav?.openMenu"
        >
          <svg
            v-if="!mobileOpen"
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
          <svg
            v-else
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>

    <Transition name="slide-down">
      <div
        v-if="mobileOpen"
        class="lg:hidden border-t border-neutral-200 bg-warm-50"
      >
        <div class="container-wide py-4 space-y-1">
          <NuxtLink
            v-for="item in navItemsMobile"
            :key="item.href"
            :to="item.href"
            class="block px-4 py-3 rounded-xl text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900 transition-colors"
            @click="mobileOpen = false"
          >
            {{ item.label }}
          </NuxtLink>

          <div class="pt-3 border-t border-neutral-200 flex flex-col gap-2">
            <a
              :href="phoneHref"
              class="flex items-center gap-2 px-4 py-3 text-neutral-600"
            >
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
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              {{ phoneNumber }}
            </a>
            <NuxtLink
              to="/contact"
              class="btn-primary justify-center"
              @click="mobileOpen = false"
            >
              {{ t.nav?.cta }}
            </NuxtLink>

            <div
              class="mt-2 bg-white/70 border border-neutral-200/50 rounded-2xl p-4 backdrop-blur-xs flex flex-col gap-2.5"
            >
              <div
                class="text-[11px] font-bold text-neutral-400 tracking-wider text-center uppercase"
              >
                {{ t.nav?.changeLang }}
              </div>

              <div
                class="relative w-full grid grid-cols-2 bg-neutral-100 border border-neutral-200/60 rounded-xl p-1"
              >
                <input
                  v-model="lang"
                  value="th"
                  name="language-mobile-tabs"
                  id="lang-mob-th"
                  type="radio"
                  class="peer/mob-th hidden"
                />
                <label
                  for="lang-mob-th"
                  class="relative z-10 flex items-center justify-center gap-2.5 h-10 cursor-pointer text-sm font-semibold text-neutral-500 transition-colors duration-300 peer-checked/mob-th:text-brand-600"
                >
                  <div
                    class="w-6 h-6 rounded-full overflow-hidden border border-neutral-200/50 shrink-0"
                  >
                    <img
                      src="https://flagcdn.com/w40/th.png"
                      alt="TH"
                      class="w-full h-full object-cover"
                    />
                  </div>
                </label>

                <input
                  v-model="lang"
                  value="en"
                  name="language-mobile-tabs"
                  id="lang-mob-en"
                  type="radio"
                  class="peer/mob-en hidden"
                />
                <label
                  for="lang-mob-en"
                  class="relative z-10 flex items-center justify-center gap-2.5 h-10 cursor-pointer text-sm font-semibold text-neutral-500 transition-colors duration-300 peer-checked/mob-en:text-brand-600"
                >
                  <div
                    class="w-6 h-6 rounded-full overflow-hidden border border-neutral-200/50 shrink-0"
                  >
                    <img
                      src="https://flagcdn.com/w40/gb.png"
                      alt="EN"
                      class="w-full h-full object-cover"
                    />
                  </div>
                </label>

                <span
                  class="absolute top-1 bottom-1 left-1 w-[calc(50%-4px)] bg-white border border-neutral-200 rounded-lg z-0 transition-transform duration-300 cubic-bezier(0.4, 0, 0.2, 1) peer-checked/mob-th:translate-x-0 peer-checked/mob-en:translate-x-full"
                ></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </header>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from "vue";

const route = useRoute();
const scrolled = ref(false);
const mobileOpen = ref(false);

// ── Contact Info จาก API (ชุดเดียวกับ Footer)
const { data: contactData } = await useContactInfo();

const phoneNumber = computed(() => {
  const phone = contactData.value?.contactInfo?.find(
    (c: any) => c.key === "phone",
  );
  return phone ? phone.value : "02-252-3420"; // คืนค่า default ถ้าใน API ไม่มีข้อมูล
});

const phoneHref = computed(() => {
  // ลบอักขระที่ไม่ใช่ตัวเลขออกเพื่อใช้ใน tel:
  const cleanNumber = phoneNumber.value.replace(/[^0-9]/g, "");
  return `tel:${cleanNumber}`;
});

// ── Language Handling
const langCookie = useCookie<string>("user-lang", {
  maxAge: 60 * 60 * 24 * 30, // 30 วัน
  path: "/",
});

const systemLang = useLang();
const currentLanguage = langCookie.value || systemLang.value || "th";

systemLang.value = currentLanguage;
const lang = ref(currentLanguage);
const t = useT();

watch(lang, (newLang) => {
  langCookie.value = newLang;
  systemLang.value = newLang;
});

// ── Navigation
const navItems = computed(() => [
  { href: "/about", label: t.value?.nav?.about || "" },
  { href: "/services", label: t.value?.nav?.services || "" },
  { href: "/blog", label: t.value?.nav?.blog || "" },
  { href: "/faq", label: t.value?.nav?.faq || "" },
  { href: "/contact", label: t.value?.nav?.contact || "" },
]);

const navItemsMobile = computed(() => [
  { href: "/", label: t.value?.nav?.home || "" },
  ...navItems.value,
]);

// ── Scroll Event
onMounted(() => {
  const handleScroll = () => {
    scrolled.value = window.scrollY > 8;
  };
  window.addEventListener("scroll", handleScroll, { passive: true });
  onUnmounted(() => window.removeEventListener("scroll", handleScroll));
});
</script>

<style scoped>
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.2s ease;
}
.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
