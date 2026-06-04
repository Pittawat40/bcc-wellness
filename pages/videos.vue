<template>
  <div>
    <!-- ─── Banner ─── -->
    <section
      class="relative pt-16 pb-16 md:pt-32 md:pb-32 border-b border-neutral-200/60 bg-cover bg-center bg-no-repeat overflow-hidden"
      style="background-image: url('/images/6.jpg')"
    >
      <div class="absolute inset-0 bg-black/30 z-0"></div>
      <div class="container-narrow text-center relative z-10">
        <p class="tag bg-white/90 text-brand-800 mb-4 backdrop-blur-sm">
          {{ lang === "th" ? "วิดีโอแชร์ประสบการณ์" : "Video Stories" }}
        </p>
        <h1 class="font-serif text-3xl md:text-4xl font-bold text-white mb-4 drop-shadow-sm">
          {{ lang === "th" ? "วิดีโอแนะนำทั้งหมด" : "All Inspirational Videos" }}
        </h1>
        <p class="text-white/90 md:text-lg leading-relaxed max-w-xl mx-auto drop-shadow-sm">
          {{
            lang === "th"
              ? "เส้นทางที่ไม่ยอมแพ้ จากครอบครัวที่ก้าวผ่านทุกอุปสรรค"
              : "Never-give-up roadmaps, shared directly from the heart of every family."
          }}
        </p>
      </div>
    </section>

    <!-- ─── Video Grid ─── -->
    <section class="py-10 md:py-14 bg-neutral-50">
      <div class="container-wide">

        <!-- Loading -->
        <div v-if="videoPending" class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div v-for="i in 6" :key="i" class="bg-white rounded-2xl p-3 border border-neutral-100 animate-pulse">
            <div class="w-full h-44 rounded-xl bg-neutral-200 mb-4" />
            <div class="h-4 bg-neutral-200 rounded w-3/4 mb-2" />
            <div class="h-3 bg-neutral-100 rounded w-1/2" />
          </div>
        </div>

        <!-- Empty -->
        <div v-else-if="!videos.length" class="text-center py-20 text-neutral-400 text-sm">
          {{ lang === "th" ? "ยังไม่มีวิดีโอในขณะนี้" : "No videos available at the moment." }}
        </div>

        <!-- Grid -->
        <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            v-for="video in videos"
            :key="video.id"
            class="bg-white rounded p-4 border border-neutral-100 shadow-sm group hover:shadow-elevated transition-all duration-300 cursor-pointer"
            @click="openVideo(video)"
          >
            <div class="w-full h-44 rounded mb-3 flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-brand-200 to-warm-200">
              <img
                v-if="video.thumbnail"
                :src="video.isFallback ? video.thumbnail : apiStorageBase + video.thumbnail"
                :alt="lang === 'th' ? video.titleTh : video.titleEn"
                class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div class="w-14 h-14 rounded-full bg-white/80 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-200 relative z-10 backdrop-blur-sm">
                <svg class="w-6 h-6 text-brand-600 ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
            <h3 class="font-serif text-base font-semibold text-neutral-900 mb-1 line-clamp-2 px-1">
              {{ lang === "th" ? video.titleTh : video.titleEn }}
            </h3>
            <p class="text-sm text-neutral-500 line-clamp-2 px-1">
              {{ lang === "th" ? video.descriptionTh : video.descriptionEn }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── CTA ─── -->
    <section class="py-8 md:py-10 bg-gradient-to-br from-brand-600 to-brand-700">
      <div class="container-narrow text-center">
        <h2 class="font-serif text-2xl md:text-3xl text-white mb-4">
          {{ lang === "th" ? "พร้อมเริ่มต้นแล้วหรือยัง?" : "Ready to Start Your Journey?" }}
        </h2>
        <p class="text-brand-100 mb-7 max-w-lg mx-auto">
          {{
            lang === "th"
              ? "ปรึกษาทีมแพทย์ผู้เชี่ยวชาญของเราฟรี เพื่อรับแผนการรักษาที่เหมาะสมกับคุณ"
              : "Book a free consultation with our fertility specialists for a personalized treatment plan."
          }}
        </p>
        <NuxtLink
          to="/contact"
          class="inline-flex items-center justify-center gap-2 w-[100%] sm:w-auto mx-auto px-7 py-3.5 bg-white text-brand-700 font-semibold rounded-xl hover:bg-brand-50 transition-colors shadow-sm text-center"
        >
          {{ lang === "th" ? "ปรึกษาแพทย์ฟรี" : "Free Consultation" }}
        </NuxtLink>
      </div>
    </section>

    <!-- ─── Video Modal ─── -->
    <div
      v-if="activeVideo"
      class="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
      @click.self="activeVideo = null"
    >
      <div class="bg-white rounded-2xl overflow-hidden w-full max-w-3xl">
        <div class="flex items-center justify-between px-5 py-4 border-b">
          <h3 class="font-semibold text-neutral-900">
            {{ lang === "th" ? activeVideo.titleTh : activeVideo.titleEn }}
          </h3>
          <button @click="activeVideo = null" class="text-neutral-400 hover:text-neutral-700 text-2xl leading-none">×</button>
        </div>
        <div class="aspect-video bg-black">
          <iframe
            v-if="youtubeId(activeVideo.url)"
            :src="`https://www.youtube.com/embed/${youtubeId(activeVideo.url)}?autoplay=1`"
            class="w-full h-full"
            frameborder="0"
            allowfullscreen
            allow="autoplay"
          />
          <video v-else-if="activeVideo.url" :src="activeVideo.url" controls autoplay class="w-full h-full" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

const lang = useLang();

useSeoMeta({
  title: computed(() =>
    lang.value === "th"
      ? "วิดีโอแนะนำ | BCC IVF Wellness"
      : "Inspirational Videos | BCC IVF Wellness",
  ),
  description: computed(() =>
    lang.value === "th"
      ? "รับชมวิดีโอประสบการณ์จริงและความรู้เกี่ยวกับการรักษาภาวะมีบุตรยาก"
      : "Watch real-life testimonials and expert knowledge videos on fertility treatment.",
  ),
});

const apiStorageBase = (useRuntimeConfig().public.apiBase as string).replace("/api", "");

const fallbackVideos = [
  {
    id: 1,
    titleTh: "ความประทับใจจากคุณแม่ปาริชาต (IVF ความสำเร็จในรอบที่ 2)",
    titleEn: "Heartwarming Testimonial from Mrs. Parichat (Successful 2nd IVF Cycle)",
    descriptionTh: "แชร์ประสบการณ์ทำ IVF สำเร็จกับความรู้สึกที่เปลี่ยนไปของครอบครัวเรา",
    descriptionEn: "Sharing our intimate IVF success milestone and how it brought profound joy to our home.",
    thumbnail: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?q=80&w=600&auto=format&fit=crop",
    url: "https://www.youtube.com/watch?v=YWrgyHn0VSY",
    isFallback: true,
  },
  {
    id: 2,
    titleTh: "เตรียมตัวอย่างไรก่อนเข้าสู่กระบวนการเด็กหลอดแก้ว",
    titleEn: "Clinical Protocols: Essential Preparations for Advanced IVF Success",
    descriptionTh: "ขั้นตอนการดูแลตัวเองและเตรียมความพร้อมของร่างกายจากแพทย์ผู้เชี่ยวชาญ",
    descriptionEn: "Crucial biological optimization and mental health guidance shared by our primary physicians.",
    thumbnail: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=600&auto=format&fit=crop",
    url: "https://www.youtube.com/watch?v=YWrgyHn0VSY",
    isFallback: true,
  },
  {
    id: 3,
    titleTh: "เทคโนโลยีคัดกรองโครโมโซมตัวอ่อนช่วยเพิ่มอัตราความสำเร็จได้อย่างไร",
    titleEn: "How PGT-A Embryo Chromosome Screening Drives Higher Success Rates",
    descriptionTh: "เจาะลึกเทคโนโลยีห้องแล็บมาตรฐานระดับสากลที่ BCC IVF Wellness",
    descriptionEn: "An inside look into our world-class, ISO-accredited embryology labs.",
    thumbnail: "https://images.unsplash.com/photo-1531983412531-1f49a365ffed?q=80&w=600&auto=format&fit=crop",
    url: "https://www.youtube.com/watch?v=YWrgyHn0VSY",
    isFallback: true,
  },
];

const { data: videoData, pending: videoPending } = await useVideos({ limit: "12" });

const videos = computed(() => {
  const list = videoData.value?.videos || [];
  if (list.length > 0) {
    return list.map((item: any) => ({
      id: item.id,
      titleTh: item.title,
      titleEn: item.title_en || item.title,
      descriptionTh: item.description,
      descriptionEn: item.description_en || item.description,
      thumbnail: item.thumbnail,
      url: item.url,
      isFallback: false,
    }));
  }
  return fallbackVideos;
});

const activeVideo = ref<any>(null);
const openVideo = (video: any) => { activeVideo.value = video; };

function youtubeId(url: string): string | null {
  if (!url) return null;
  const m = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
  return m ? m[1] : null;
}
</script>
