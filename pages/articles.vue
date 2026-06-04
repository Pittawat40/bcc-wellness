<template>
  <div>
    <section
      class="relative pt-16 pb-16 md:pt-32 md:pb-32 border-b border-neutral-200/60 bg-cover bg-center bg-no-repeat overflow-hidden"
      style="background-image: url(&quot;/images/bg-banner.jpg&quot;)"
    >
      <div class="absolute inset-0 bg-black/30 z-0"></div>
      <div class="container-narrow text-center relative z-10">
        <p class="tag bg-white/90 text-brand-800 mb-4 backdrop-blur-sm">
          {{ lang === "th" ? "คลังความรู้" : "Knowledge Base" }}
        </p>
        <h1
          class="font-serif text-3xl md:text-4xl font-bold text-white mb-4 drop-shadow-sm"
        >
          {{ lang === "th" ? "บทความและความรู้" : "Articles & Insights" }}
        </h1>
        <p
          class="text-white/90 md:text-lg leading-relaxed max-w-xl mx-auto drop-shadow-sm"
        >
          {{
            lang === "th"
              ? "เคล็ดลับ เทคโนโลยี และแนวทางดูแลตัวเองเพื่อเตรียมพร้อมสำหรับก้าวสำคัญ"
              : "Tips, medical advancements, and self-care guides to prepare for your fertility journey."
          }}
        </p>
      </div>
    </section>

    <section
      class="sticky top-0 z-20 bg-white border-b border-neutral-100 shadow-sm"
    >
      <div class="container-wide">
        <div
          class="flex items-center gap-2 overflow-x-auto py-5 scrollbar-hide"
        >
          <button
            v-for="cat in allCategories"
            :key="cat.value"
            @click="selectedCategory = cat.value"
            :class="[
              'flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer',
              selectedCategory === cat.value
                ? 'bg-brand-600 text-white shadow-sm'
                : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200',
            ]"
          >
            {{ lang === "th" ? cat.labelTh : cat.labelEn }}
          </button>
        </div>
      </div>
    </section>

    <section class="py-8 md:py-12 bg-neutral-50">
      <div class="container-wide">
        <div class="mb-8 md:mb-10 border-l-4 border-brand-600 pl-4">
          <h2 class="font-serif text-2xl font-bold text-neutral-900 mb-1">
            {{
              lang === "th"
                ? "บทความและสาระน่ารู้ทั้งหมด"
                : "All Articles & Insights"
            }}
          </h2>
          <p class="text-sm md:text-base text-neutral-500">
            {{
              lang === "th"
                ? "เจาะลึกเทคโนโลยีทางการแพทย์ เคล็ดลับการเตรียมตัว และคำแนะนำจากผู้เชี่ยวชาญ"
                : "Explore medical advancements, preparation guides, and expert fertility advice."
            }}
          </p>
        </div>
        <div
          v-if="pending"
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <div
            v-for="i in 6"
            :key="i"
            class="bg-white rounded-2xl overflow-hidden border border-neutral-100 animate-pulse"
          >
            <div class="h-48 bg-neutral-200" />
            <div class="p-5 space-y-3">
              <div class="h-3 bg-neutral-200 rounded w-1/3" />
              <div class="h-4 bg-neutral-200 rounded w-full" />
              <div class="h-3 bg-neutral-100 rounded w-4/5" />
            </div>
          </div>
        </div>

        <div v-else-if="!gridArticles.length" class="text-center py-20">
          <div
            class="w-16 h-16 rounded-2xl bg-neutral-100 flex items-center justify-center mx-auto mb-4"
          >
            <svg
              class="w-8 h-8 text-neutral-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              stroke-width="1.5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
              />
            </svg>
          </div>
          <p class="text-neutral-400 text-sm">
            {{
              lang === "th"
                ? "ยังไม่มีบทความในหมวดหมู่นี้"
                : "No articles in this category yet."
            }}
          </p>
        </div>

        <div v-else>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <NuxtLink
              v-for="article in gridArticles"
              :key="article.id"
              :to="`/blog/${article.slug || blogSlug(article)}`"
              class="group bg-white rounded-2xl overflow-hidden border border-neutral-100 shadow-sm hover:shadow-elevated transition-all duration-300 flex flex-col"
            >
              <div class="h-48 overflow-hidden relative flex-shrink-0">
                <img
                  :src="articleImageUrl(article)"
                  :alt="lang === 'th' ? article.title : article.title_en"
                  loading="lazy"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span
                  class="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-brand-800 text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm"
                >
                  {{
                    lang === "th"
                      ? article.category_th || article.category
                      : article.category_en || article.category
                  }}
                </span>
              </div>
              <div class="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3
                    class="font-serif text-base font-semibold text-neutral-900 mb-2 line-clamp-2 group-hover:text-brand-700 transition-colors"
                  >
                    {{
                      lang === "th"
                        ? article.title
                        : article.title_en || article.title
                    }}
                  </h3>
                  <p
                    class="text-sm text-neutral-500 line-clamp-2 leading-relaxed mb-4"
                  >
                    {{
                      lang === "th"
                        ? article.excerpt
                        : article.excerpt_en || article.excerpt
                    }}
                  </p>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-xs text-neutral-400">{{
                    article.created_at?.slice(0, 10)
                  }}</span>
                  <span
                    class="text-brand-600 text-xs font-semibold inline-flex items-center gap-1 group-hover:text-brand-700 transition-colors"
                  >
                    {{ lang === "th" ? "อ่านต่อ" : "Read More" }} →
                  </span>
                </div>
              </div>
            </NuxtLink>
          </div>

          <div v-if="canLoadMore" class="text-center mt-10">
            <button
              @click="loadMore"
              :disabled="loadingMore"
              class="inline-flex items-center gap-2 px-7 py-3 bg-white border border-neutral-200 text-neutral-700 font-medium rounded-xl hover:bg-neutral-50 hover:border-neutral-300 transition-all duration-200 shadow-sm disabled:opacity-50 cursor-pointer"
            >
              <span
                v-if="loadingMore"
                class="w-4 h-4 border-2 border-neutral-300 border-t-brand-600 rounded-full animate-spin"
              />
              {{ lang === "th" ? "โหลดเพิ่มเติม" : "Load More" }}
            </button>
          </div>
        </div>
      </div>
    </section>

    <section
      class="py-8 md:py-10 bg-gradient-to-br from-brand-600 to-brand-700"
    >
      <div class="container-narrow text-center">
        <h2 class="font-serif text-2xl md:text-3xl text-white mb-4">
          {{ lang === "th" ? "มีคำถามเพิ่มเติม?" : "Have More Questions?" }}
        </h2>
        <p class="text-brand-100 mb-7 max-w-lg mx-auto">
          {{
            lang === "th"
              ? "ทีมแพทย์พร้อมตอบทุกข้อสงสัยเกี่ยวกับการรักษาภาวะมีบุตรยาก ปรึกษาฟรี"
              : "Our fertility specialists are ready to answer all your questions. Book a free consultation."
          }}
        </p>
        <NuxtLink
          to="/contact"
          class="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-brand-700 font-semibold rounded-xl hover:bg-brand-50 transition-colors shadow-sm"
        >
          {{ lang === "th" ? "ปรึกษาแพทย์ฟรี" : "Free Consultation" }}
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { blogSlug } from "~/utils/slugify";

const lang = useLang();
const config = useRuntimeConfig();
const apiStorageBase = (config.public.apiBase as string).replace("/api", "");

useSeoMeta({
  title: computed(() =>
    lang.value === "th"
      ? "บทความและความรู้ | BCC IVF Wellness"
      : "Articles & Insights | BCC IVF Wellness",
  ),
  description: computed(() =>
    lang.value === "th"
      ? "รวมบทความความรู้เกี่ยวกับการรักษาภาวะมีบุตรยาก IVF IUI ICSI และการดูแลสุขภาพเพื่อการมีบุตร"
      : "A collection of articles on fertility treatments, IVF, IUI, ICSI, and reproductive health tips.",
  ),
});

// ── State
const selectedCategory = ref("");
const PAGE_SIZE = 9;
const offset = ref(0);
const allArticles = ref<any[]>([]);
const total = ref(0);
const loadingMore = ref(false);

// ── Fetch categories
const { data: categoriesData } = await useAsyncData("article-categories", () =>
  $fetch(`${config.public.apiBase}/article-categories`).catch(() => []),
);

const allCategories = computed(() => {
  const cats = (categoriesData.value as any[]) || [];
  return [
    { value: "", labelTh: "ทั้งหมด", labelEn: "All" },
    ...cats.map((c: any) => ({
      value: c.slug || c.name_th,
      labelTh: c.name_th,
      labelEn: c.name_en || c.name_th,
    })),
  ];
});

// ── Fetch articles
const { data: articlesData, pending } = await useAsyncData(
  "articles-list",
  () => {
    const params: Record<string, string> = {
      status: "published",
      limit: String(PAGE_SIZE),
      offset: "0",
    };
    if (selectedCategory.value) params.category = selectedCategory.value;
    return $fetch(`${config.public.apiBase}/articles`, { params }).catch(
      () => ({ articles: [], total: 0 }),
    );
  },
  { watch: [selectedCategory] },
);

// sync fetched data
watch(
  articlesData,
  (val: any) => {
    allArticles.value = val?.articles || [];
    total.value = val?.total || 0;
    offset.value = PAGE_SIZE;
  },
  { immediate: true },
);

const gridArticles = computed(() => allArticles.value);
const canLoadMore = computed(() => allArticles.value.length < total.value);

// ── Load more
async function loadMore() {
  if (loadingMore.value) return;
  loadingMore.value = true;
  try {
    const params: Record<string, string> = {
      status: "published",
      limit: String(PAGE_SIZE),
      offset: String(offset.value),
    };
    if (selectedCategory.value) params.category = selectedCategory.value;
    const res: any = await $fetch(`${config.public.apiBase}/articles`, {
      params,
    });
    allArticles.value.push(...(res?.articles || []));
    offset.value += PAGE_SIZE;
  } finally {
    loadingMore.value = false;
  }
}

// ── Helpers
function articleImageUrl(article: any): string {
  const img = article.cover_image || "";
  if (!img) return "/images/bg-banner.jpg";
  return img.startsWith("http") ? img : apiStorageBase + img;
}
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
