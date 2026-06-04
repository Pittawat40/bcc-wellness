<template>
  <div>
    <section
      v-if="blog"
      class="relative pt-32 pb-24 bg-cover bg-center bg-no-repeat overflow-hidden"
      :style="`background-image: url('${coverImage}')`"
    >
      <div class="absolute inset-0 bg-black/40 z-0"></div>
      <div class="container mx-auto max-w-6xl px-4 md:px-6 relative z-10">
        <p
          class="tag bg-white/90 text-brand-800 mb-4 backdrop-blur-sm inline-block"
        >
          {{
            blog.category
              ? blog.category.charAt(0).toUpperCase() + blog.category.slice(1)
              : ""
          }}
        </p>
        <h1
          class="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-5 drop-shadow-sm leading-tight max-w-3xl"
        >
          {{ lang === "th" ? blog.title : blog.title_en }}
        </h1>
        <p class="text-white/85 text-base md:text-lg leading-relaxed max-w-2xl">
          {{ lang === "th" ? blog.excerpt : blog.excerpt_en }}
        </p>
      </div>
    </section>

    <!-- Loading -->
    <section v-else-if="pending" class="py-32 text-center">
      <div class="flex justify-center gap-2">
        <div
          v-for="i in 3"
          :key="i"
          class="w-3 h-3 rounded-full bg-brand-400 animate-bounce"
          :style="`animation-delay:${i * 0.1}s`"
        />
      </div>
    </section>

    <!-- Not found -->
    <section v-else class="py-32 text-center">
      <h2 class="font-serif text-2xl font-semibold text-neutral-800 mb-3">
        {{ lang === "th" ? "ไม่พบบทความนี้" : "Article Not Found" }}
      </h2>
      <p class="text-neutral-500 mb-6">
        {{
          lang === "th"
            ? "บทความที่คุณค้นหาอาจถูกลบหรือเปลี่ยน URL แล้ว"
            : "The article you're looking for may have been removed or the URL changed."
        }}
      </p>
      <NuxtLink
        to="/blog"
        class="inline-flex items-center gap-2 px-6 py-3 bg-brand-600 text-white font-semibold rounded-xl hover:bg-brand-700 transition-colors"
      >
        ← {{ lang === "th" ? "กลับสู่หน้าบทความ" : "Back to Articles" }}
      </NuxtLink>
    </section>

    <article v-if="blog && !pending" class="py-6 md:py-16 bg-white">
      <div class="container mx-auto max-w-6xl px-4 md:px-6">
        <div class="flex flex-col lg:flex-row gap-12">
          <div class="flex-1 min-w-0">
            <div
              class="prose prose-neutral prose-lg max-w-none prose-headings:font-serif prose-headings:text-neutral-900 prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-p:text-neutral-600 prose-p:leading-relaxed prose-a:text-brand-600 prose-a:no-underline hover:prose-a:underline"
              v-html="blogContent"
            />
            <div class="mt-6 pt-0 md:mt-12 md:pt-8 border-t border-neutral-100">
              <NuxtLink
                to="/blog"
                class="inline-flex items-center gap-2 text-brand-600 font-semibold hover:text-brand-700 transition-colors"
              >
                ←
                {{
                  lang === "th"
                    ? "กลับสู่บทความทั้งหมด"
                    : "Back to All Articles"
                }}
              </NuxtLink>
            </div>
          </div>

          <aside v-if="relatedArticles.length" class="w-full lg:w-80 shrink-0">
            <div class="lg:sticky lg:top-28 space-y-6">
              <div
                class="lg:bg-neutral-50/60 lg:border lg:border-neutral-100 lg:rounded-3xl lg:p-6"
              >
                <h3
                  class="font-serif text-lg font-semibold text-neutral-900 mb-5 pb-2 border-b border-neutral-200/60 px-0 sm:px-6 lg:px-0"
                >
                  {{
                    lang === "th" ? "บทความที่เกี่ยวข้อง" : "Related Articles"
                  }}
                </h3>

                <div class="lg:hidden w-full overflow-hidden">
                  <Swiper
                    :modules="[
                      SwiperFreeMode,
                      SwiperAutoplay,
                      SwiperPagination,
                    ]"
                    :slides-per-view="1"
                    :space-between="16"
                    :free-mode="true"
                    :pagination="{ clickable: true }"
                    :breakpoints="{
                      480: { slidesPerView: 1 },
                      640: { slidesPerView: 2, spaceBetween: 20 },
                    }"
                    class="!h-auto px-4 sm:px-6"
                  >
                    <SwiperSlide
                      v-for="related in relatedArticles"
                      :key="'mb-' + related.id"
                      class="!h-full pb-12"
                    >
                      <NuxtLink
                        :to="`/blog/${related.slug || blogSlug(related)}`"
                        class="flex flex-col h-full bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md border border-neutral-100 transition-all duration-300 group"
                      >
                        <div
                          class="relative h-52 w-full overflow-hidden bg-neutral-100 shrink-0"
                        >
                          <img
                            :src="relatedImageUrl(related)"
                            :alt="related.title || related.titleTh"
                            loading="lazy"
                            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <span
                            class="absolute bottom-3 left-3 z-10 inline-block text-xs bg-white/90 backdrop-blur-sm text-brand-700 font-semibold px-2.5 py-1 rounded-md shadow-sm"
                          >
                            {{
                              lang === "th"
                                ? related.category_th
                                : related.category_en
                            }}
                          </span>
                        </div>

                        <div class="p-4 flex-1">
                          <div class="flex items-center min-h-[44px]">
                            <p
                              class="text-neutral-800 font-semibold line-clamp-2 group-hover:text-brand-600 transition-colors leading-snug"
                            >
                              {{
                                lang === "th" ? related.title : related.title_en
                              }}
                            </p>
                          </div>
                        </div>
                      </NuxtLink>
                    </SwiperSlide>
                  </Swiper>
                </div>

                <div class="hidden lg:block space-y-5">
                  <NuxtLink
                    v-for="related in relatedArticles"
                    :key="'dt-' + related.id"
                    :to="`/blog/${related.slug || blogSlug(related)}`"
                    class="block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md border border-neutral-100 transition-all duration-300 group"
                  >
                    <div
                      class="relative h-40 w-full overflow-hidden bg-neutral-100 shrink-0"
                    >
                      <img
                        :src="relatedImageUrl(related)"
                        :alt="related.title || related.titleTh"
                        loading="lazy"
                        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span
                        class="absolute bottom-3 left-3 z-10 inline-block text-xs bg-white/90 backdrop-blur-sm text-brand-700 font-semibold px-2.5 py-1 rounded-md shadow-sm"
                      >
                        {{
                          lang === "th"
                            ? related.category_th
                            : related.category_en
                        }}
                      </span>
                    </div>

                    <div class="p-4">
                      <div class="flex items-center min-h-[44px]">
                        <p
                          class="text-neutral-800 font-semibold line-clamp-2 group-hover:text-brand-600 transition-colors leading-snug"
                        >
                          {{ lang === "th" ? related.title : related.title_en }}
                        </p>
                      </div>
                    </div>
                  </NuxtLink>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </article>
  </div>
</template>

<script setup lang="ts">
import { blogSlug, idFromSlug } from "~/utils/slugify";

import { Swiper, SwiperSlide } from "swiper/vue";
import { FreeMode, Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/autoplay";
import "swiper/css/pagination";
const SwiperFreeMode = FreeMode;
const SwiperAutoplay = Autoplay;
const SwiperPagination = Pagination;

const lang = useLang();
const route = useRoute();
const config = useRuntimeConfig();
const apiStorageBase = (config.public.apiBase as string).replace("/api", "");
const slug = route.params.slug as string;

/* ── Hardcode fallback blogs ──────────────────────────────── */
const fallbackBlogs = [
  {
    id: 1,
    title: "เตรียมตัวอย่างไรก่อนทำ IVF เพื่อเพิ่มอัตราความสำเร็จสูงสูด",
    titleTh: "เตรียมตัวอย่างไรก่อนทำ IVF เพื่อเพิ่มอัตราความสำเร็จสูงสูด",
    titleEn: "How to Prepare for IVF to Maximize Your Clinical Success Rates",
    excerpt:
      "เจาะลึกแนวทางการเตรียมพร้อมทางร่างกาย อาหารที่ควรรับประทาน และการดูแลสภาพจิตใจ",
    descTh:
      "เจาะลึกแนวทางการเตรียมพร้อมทางร่างกาย อาหารที่ควรรับประทาน และการดูแลสภาพจิตใจของคู่สมรสก่อนเข้าสู่กระบวนการเก็บไข่",
    descEn:
      "A comprehensive guide on physical conditioning, recommended nutritional diets, and emotional management before starting your egg retrieval cycle.",
    cover_image:
      "https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=1200&auto=format&fit=crop",
    image:
      "https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=1200&auto=format&fit=crop",
    category: "การเตรียมตัว",
    tagTh: "การเตรียมตัว",
    tagEn: "Preparation",
    content: `<h2>ทำไมการเตรียมตัวก่อน IVF จึงสำคัญ?</h2><p>การเตรียมพร้อมร่างกายและจิตใจก่อนเริ่มกระบวนการ IVF เป็นหนึ่งในปัจจัยสำคัญที่ส่งผลต่ออัตราความสำเร็จโดยตรง แพทย์ผู้เชี่ยวชาญแนะนำให้เริ่มเตรียมตัวอย่างน้อย 3 เดือนก่อนเริ่มรอบการรักษา</p><h2>โภชนาการที่เหมาะสม</h2><p>รับประทานอาหารที่อุดมด้วยกรดโฟลิก วิตามินดี และสารต้านอนุมูลอิสระ ลดอาหารแปรรูป น้ำตาล และแอลกอฮอล์ให้น้อยที่สุด</p>`,
    slug: `ivf-preparation-${Date.now()}`,
  },
  {
    id: 2,
    title: "ไขข้อข้องใจ: ความแตกต่างระว่างการรักษาแบบ IUI และ IVF/ICSI",
    titleTh: "ไขข้อข้องใจ: ความแตกต่างระว่างการรักษาแบบ IUI และ IVF/ICSI",
    titleEn: "IUI vs. IVF/ICSI: Understanding Key Differences",
    excerpt:
      "ไขความแตกต่างในด้านขั้นตอน ค่าใช้จ่าย และความเหมาะสมกับปัญหาสุขภาพ",
    descTh:
      "ไขความแตกต่างในด้านขั้นตอน ค่าใช้จ่าย และความเหมาะสมกับปัญหาสุขภาพ เพื่อช่วยให้คู่รักเลือกวิธีที่ตอบโจทย์",
    descEn:
      "Demystifying procedure timelines, cost factors, and success probabilities.",
    cover_image:
      "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=1200&auto=format&fit=crop",
    image:
      "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=1200&auto=format&fit=crop",
    category: "ความรู้ทั่วไป",
    tagTh: "ความรู้ทั่วไป",
    tagEn: "Medical Info",
    content: `<h2>IUI คืออะไร?</h2><p>การฉีดเชื้อเข้าโพรงมดลูก (IUI) เป็นวิธีที่ใช้เชื้ออสุจิที่ผ่านการคัดเลือกและล้างแล้วฉีดเข้าสู่มดลูกโดยตรงในช่วงที่ไข่ตก</p><h2>IVF/ICSI คืออะไร?</h2><p>การทำเด็กหลอดแก้ว (IVF) คือการนำไข่และอสุจิมาปฏิสนธินอกร่างกายในห้องแล็บ</p>`,
    slug: `iui-vs-ivf-icsi-${Date.now()}`,
  },
  {
    id: 3,
    title: "การแช่แข็งไข่ (Egg Freezing) ในวัย 30+ ปลอดภัยและคุ้มค่าจริงไหม?",
    titleTh: "การแช่แข็งไข่ (Egg Freezing) ในวัย 30+ ปลอดภัยและคุ้มค่าจริงไหม?",
    titleEn: "Is Social Egg Freezing at Age 30+ Safe and Truly Worth It?",
    excerpt: "ทำความเข้าใจข้อดีของการแช่แข็งไข่ด้วยเทคนิคหยุดอายุเซลล์",
    descTh:
      "ทำความเข้าใจข้อดีของการแช่แข็งไข่ด้วยเทคนิคหยุดอายุเซลล์เพื่อเพิ่มความมั่นใจในการวางแผนอนาคตครอบครัว",
    descEn:
      "Explore the clinical benefits of ultra-rapid Vitrification technology.",
    cover_image:
      "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=1200&auto=format&fit=crop",
    image:
      "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=1200&auto=format&fit=crop",
    category: "วางแผนอนาคต",
    tagTh: "วางแผนอนาคต",
    tagEn: "Family Planning",
    content: `<h2>Egg Freezing คืออะไร?</h2><p>การแช่แข็งไข่ด้วยเทคนิค Vitrification คือการแช่แข็งไข่ที่เก็บได้อย่างรวดเร็วมากเพื่อป้องกันการเกิดผลึกน้ำแข็งที่ทำลายเซลล์</p>`,
    slug: `egg-freezing-age-30-${Date.now()}`,
  },
];

/* ── Try API first, fallback to hardcode ──────────────────── */
const idFromTail = idFromSlug(slug);

const { data: apiArticle, pending } = await useArticle(slug).catch(() =>
  useAsyncData(`fallback-${slug}`, async () => null),
);

const blog = computed(() => {
  // API returned data
  if (apiArticle.value && !apiArticle.value.error) return apiArticle.value;

  // Fallback: match by id from slug or by slug match
  if (idFromTail) {
    const found = fallbackBlogs.find((b) => String(b.id) === idFromTail);
    if (found) return found;
  }
  return (
    fallbackBlogs.find((b) => blogSlug(b) === slug || b.slug === slug) ?? null
  );
});

/* ── Computed helpers ─────────────────────────────────────── */
const coverImage = computed(() => {
  if (!blog.value) return "";
  const img = blog.value.cover_image || blog.value.image || "";
  if (!img) return "";
  return img.startsWith("http") ? img : apiStorageBase + img;
});

const blogContent = computed(() => {
  if (!blog.value) return "";
  if (lang.value === "th") {
    return blog.value.content || "";
  } else {
    return blog.value.content_en || blog.value.content || "";
  }
});

/* ── Related articles ─────────────────────────────────────── */
const { data: relatedData } = await useArticles({
  status: "published",
  limit: "6",
});

const relatedArticles = computed(() => {
  const list = relatedData.value?.articles || [];
  const source = list.length > 0 ? list : fallbackBlogs;
  return source
    .filter((a) => String(a.id) !== String(blog.value?.id))
    .slice(0, 2);
});

function relatedImageUrl(item: any): string {
  const img = item.cover_image || item.image || "";
  if (!img) return "";
  return img.startsWith("http") ? img : apiStorageBase + img;
}

/* ── SEO ──────────────────────────────────────────────────── */
useSeoMeta({
  title: computed(() =>
    blog.value
      ? `${blog.value.title || (lang.value === "th" ? blog.value.title : blog.value.title_en)} – BCC IVF Wellness`
      : "Article Not Found – BCC IVF Wellness",
  ),
  description: computed(() =>
    blog.value
      ? blog.value.excerpt ||
        (lang.value === "th" ? blog.value.excerpt : blog.value.excerpt_en)
      : "",
  ),
  ogImage: computed(() => coverImage.value),
});
</script>

<style scoped>
:deep(.related-swiper) {
  padding-left: 1rem !important;
  padding-right: 1rem !important;
  overflow: visible !important;
}

:deep(.swiper-pagination) {
  bottom: 0px !important;
  left: 0 !important;
  width: 100% !important;
  text-align: center !important;
}

:deep(.swiper-pagination-bullet-active) {
  background: #b45309 !important;
  width: 16px !important;
  border-radius: 4px !important;
}

:deep(.swiper-pagination-bullet) {
  transition: all 0.3s ease;
}

@media (min-width: 640px) {
  :deep(.related-swiper) {
    padding-left: 1.5rem !important;
    padding-right: 1.5rem !important;
  }
}
</style>
