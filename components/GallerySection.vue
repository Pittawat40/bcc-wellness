<template>
  <section
    v-if="galleryItems.length"
    ref="sectionRef"
    class="pt-0 pb-8 md:pb-16 bg-white scroll-reveal relative overflow-hidden"
  >
    <div
      class="absolute right-[-10%] bottom-[-5%] w-[40%] h-[80%] opacity-[0.1] pointer-events-none text-sage-500 element-parallax"
      data-speed="0.06"
    >
      <svg class="w-full h-full" viewBox="0 0 400 400" fill="none">
        <circle
          cx="200"
          cy="200"
          r="150"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-dasharray="6 6"
        />
        <circle
          cx="200"
          cy="200"
          r="100"
          stroke="currentColor"
          stroke-width="1"
        />
      </svg>
    </div>

    <div class="container-wide relative z-10">
      <div class="text-center max-w-xl mx-auto mb-6 item-reveal opacity-0">
        <p class="tag bg-sage-100 text-sage-700 mb-4">{{ t.gallery.badge }}</p>
      </div>

      <div
        v-if="loading"
        class="grid grid-cols-1 md:grid-cols-12 gap-5 md:auto-rows-[240px]"
      >
        <div
          v-for="i in 4"
          :key="i"
          class="rounded overflow-hidden bg-neutral-100 animate-pulse h-[240px]"
          :class="i === 1 ? 'md:col-span-8' : 'md:col-span-4'"
        />
      </div>

      <div
        v-else
        class="grid grid-cols-1 md:grid-cols-12 gap-5 md:auto-rows-[240px]"
      >
        <div
          v-for="(item, index) in galleryItems"
          :key="item.id || index"
          class="group relative rounded overflow-hidden bg-neutral-100 shadow-soft hover:shadow-elevated transition-all duration-500 hover:-translate-y-1 item-reveal opacity-0 active"
          :class="[
            item.col_span || 'md:col-span-4',
            item.row_span || 'md:row-span-1',
            'h-[240px] md:h-full',
          ]"
          :style="{ transitionDelay: `${index * 150}ms` }"
        >
          <img
            v-if="item.media_type !== 'video'"
            :src="fullUrl(item.media_url)"
            :alt="item.caption_th"
            loading="lazy"
            class="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
          />

          <video
            v-else
            :src="fullUrl(item.media_url)"
            autoplay
            muted
            loop
            playsinline
            class="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
          >
            <source :src="fullUrl(item.media_url)" type="video/mp4" />
          </video>

          <div
            class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6"
          >
            <span class="text-white font-medium text-sm leading-snug">
              {{
                lang === "th"
                  ? item.caption_th
                  : item.caption_en || item.caption_th
              }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const lang = useLang();
const t = useT();
const config = useRuntimeConfig();
const apiBase = (config.public.apiBase as string).replace("/api", "");

const sectionRef = ref<HTMLElement | null>(null);
const galleryItems = ref<any[]>([]);
const loading = ref(true);

function fullUrl(url: string) {
  if (!url) return "";
  if (
    url.startsWith("/images") ||
    url.startsWith("blob:") ||
    url.startsWith("http")
  ) {
    return url;
  }
  return apiBase + url;
}

async function fetchGallery() {
  try {
    const res = await fetch(`${config.public.apiBase}/gallery`);
    if (!res.ok) throw new Error("Fetch failed");
    const data = await res.json();

    if (data && data.length > 0) {
      galleryItems.value = data;
    }
  } catch (err) {
    console.warn("API Error or Empty, using Backup Gallery");
  } finally {
    setTimeout(() => {
      loading.value = false;
    }, 300);
  }
}

let observer: IntersectionObserver | null = null;

onMounted(async () => {
  await fetchGallery();

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          // สั่งให้ element ลูกๆ reveal ออกมา
          entry.target.querySelectorAll(".item-reveal").forEach((el) => {
            (el as HTMLElement).style.opacity = "1";
          });
          observer?.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 },
  );
  if (sectionRef.value) observer.observe(sectionRef.value);
});

onUnmounted(() => {
  if (observer) observer.disconnect();
});
</script>

<style scoped>
.item-reveal {
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translateY(20px);
}
.active .item-reveal {
  opacity: 1 !important;
  transform: translateY(0);
}
</style>
