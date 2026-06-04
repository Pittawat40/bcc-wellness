<template>
  <div>
    <section
      class="relative pt-16 pb-16 md:pt-32 md:pb-32 border-b border-neutral-200/60 bg-cover bg-center bg-no-repeat overflow-hidden"
      style="background-image: url(&quot;/images/bg-banner.jpg&quot;)"
    >
      <div class="absolute inset-0 bg-black/30 z-0"></div>
      <div class="container-narrow text-center relative z-10">
        <p class="tag bg-white/90 text-brand-800 mb-4 backdrop-blur-sm">
          {{ lang === "th" ? "เรื่องราวความสำเร็จ" : "Success Stories" }}
        </p>
        <h1
          class="font-serif text-3xl md:text-4xl font-bold text-white mb-4 drop-shadow-sm"
        >
          {{
            lang === "th"
              ? "เส้นทางสู่ความฝันที่เป็นจริง"
              : "Journeys of Dreams Come True"
          }}
        </h1>
        <p
          class="text-white/90 md:text-lg leading-relaxed max-w-xl mx-auto drop-shadow-sm"
        >
          {{
            lang === "th"
              ? "ทุกครอบครัวมีเรื่องราวที่แตกต่างกัน แต่ทุกเรื่องราวล้วนเต็มไปด้วยความหวัง"
              : "Every family has a unique story, yet each is beautifully filled with absolute hope."
          }}
        </p>
      </div>
    </section>

    <section
      v-if="dynamicStories.length"
      class="py-6 md:py-10 bg-warm-50/40 select-none"
    >
      <div class="container-wide">
        <div class="text-center max-w-xl mx-auto mb-6 md:mb-10">
          <p class="tag bg-brand-100 text-brand-700 mb-4">
            {{ lang === "th" ? "ความสำเร็จ" : "Success Stories" }}
          </p>
          <h2 class="section-title mb-0">
            {{
              lang === "th"
                ? "ความสำเร็จจากความไว้วางใจ"
                : "Real Success, Real Happiness"
            }}
          </h2>
          <p class="section-subtitle">
            {{
              lang === "th"
                ? "บันทึกความทรงจำอันล้ำค่าจากคุณแม่ที่ร่วมก้าวผ่านอุปสรรคจนพบความสมบูรณ์ของครอบครัว"
                : "Precious memories from mothers who overcame fertility challenges with our dedicated care."
            }}
          </p>
        </div>

        <swiper
          :modules="swiperModules"
          :slides-per-view="1"
          :space-between="40"
          :pagination="{ clickable: true }"
          :loop="true"
          :autoplay="{ delay: 4000, disableOnInteraction: false }"
          class="success-swiper !pb-14"
        >
          <swiper-slide v-for="(story, idx) in dynamicStories" :key="story.id">
            <div
              class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center text-left max-w-[1140px] mx-auto px-4 md:px-0"
            >
              <div
                class="lg:col-span-5 relative"
                :class="idx % 2 === 0 ? 'lg:order-1' : 'lg:order-2'"
              >
                <div
                  class="aspect-[4/3] sm:aspect-[16/11] rounded-3xl overflow-hidden shadow-md bg-neutral-100"
                >
                  <img
                    :src="storyImageUrl(story)"
                    :alt="lang === 'th' ? story.title : story.title_en"
                    loading="lazy"
                    class="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div
                class="lg:col-span-7 space-y-4"
                :class="idx % 2 === 0 ? 'lg:order-2' : 'lg:order-1'"
              >
                <div class="flex flex-wrap gap-2 items-center">
                  <span
                    class="px-3 py-1 success rounded-full bg-brand-50 text-brand-50 text-xs font-semibold border border-brand-100"
                  >
                    {{ lang === "th" ? "ประสบความสำเร็จ" : "Successful" }}
                  </span>
                  <span
                    class="px-3 py-1 rounded-full bg-warm-100 text-warm-800 text-xs font-semibold"
                  >
                    {{ formatCycle(story.cycle) }}
                  </span>
                </div>

                <h3
                  class="font-serif text-1xl md:text-2xl font-bold text-neutral-900 leading-tight"
                >
                  {{ lang === "th" ? story.title : story.title_en }}
                </h3>

                <p
                  class="text-neutral-600 leading-relaxed text-sm md:text-base"
                >
                  {{ lang === "th" ? story.story : story.story_en }}
                </p>

                <div
                  class="pt-2 flex items-center gap-3 border-t border-neutral-200/60 max-w-xs"
                >
                  <div
                    class="w-10 h-10 rounded-full bg-brand-600 flex items-center justify-center text-white font-serif font-bold text-base shadow-inner"
                  >
                    {{
                      ((lang === "th"
                        ? story.author
                        : story.author_en
                      )?.trim() || "?")[0]
                    }}
                  </div>
                  <div>
                    <div class="text-sm font-bold text-neutral-900">
                      {{ lang === "th" ? story.author : story.author_en }}
                    </div>
                    <div class="text-xs text-neutral-400">
                      {{ formatApiDate(story.date, lang) }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </section>

    <section
      class="py-6 md:py-10 bg-white border-t border-neutral-100 select-none"
    >
      <div class="container-wide">
        <div
          class="flex flex-col md:flex-row md:items-end md:justify-between mb-6 md:mb-10 max-w-xl mx-auto md:max-w-none"
        >
          <div class="text-center md:text-left max-w-xl">
            <p class="tag bg-brand-100 text-brand-700 mb-4 inline-block">
              {{ lang === "th" ? "คลังความรู้" : "Knowledge Base" }}
            </p>
            <h2 class="section-title mb-0">
              {{
                lang === "th"
                  ? "บทความน่ารู้และการเตรียมตัว"
                  : "Insights & Preparation Articles"
              }}
            </h2>
            <p class="section-subtitle mb-0 mt-1">
              {{
                lang === "th"
                  ? "แนวทางการดูแลตัวเองเพื่อเตรียมพร้อมสำหรับก้าวสำคัญ"
                  : "Self-care guidelines to prepare for your milestone."
              }}
            </p>
          </div>

          <div class="hidden md:block shrink-0">
            <NuxtLink
              to="/articles"
              class="group inline-flex items-center gap-1 text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors"
            >
              <span
                class="relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 group-hover:after:w-full after:bg-brand-700 after:transition-all after:duration-300"
              >
                {{ lang === "th" ? "ดูบทความทั้งหมด" : "View All Articles" }} →
              </span>
            </NuxtLink>
          </div>
        </div>

        <div
          v-if="articlePending"
          class="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div
            v-for="i in 3"
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
        <div v-else>
          <div class="block md:hidden">
            <swiper
              :modules="swiperModules"
              :slides-per-view="1"
              :space-between="16"
              :pagination="{ clickable: true }"
              class="!pb-12"
            >
              <swiper-slide
                v-for="blog in apiArticles"
                :key="blog.id"
                class="!h-auto flex"
              >
                <NuxtLink
                  :to="`/blog/${blog.slug || blogSlug(blog)}`"
                  class="bg-white rounded-2xl overflow-hidden border border-neutral-100 shadow-sm flex flex-col h-full w-full"
                >
                  <div class="h-52 overflow-hidden relative">
                    <img
                      :src="articleImageUrl(blog)"
                      :alt="lang === 'th' ? blog.titleTh : blog.titleEn"
                      loading="lazy"
                      class="w-full h-full object-cover"
                    />
                    <span
                      class="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-brand-800 text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm"
                    >
                      {{ lang === "th" ? blog.category_th : blog.category_en }}
                    </span>
                  </div>
                  <div class="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h3
                        class="font-serif text-sm font-semibold text-neutral-900 mb-1.5 line-clamp-1"
                      >
                        {{ lang === "th" ? blog.title : blog.title_en }}
                      </h3>
                      <p
                        class="text-xs text-neutral-500 line-clamp-2 leading-relaxed mb-3"
                      >
                        {{ lang === "th" ? blog.excerpt : blog.excerpt_en }}
                      </p>
                    </div>
                    <span
                      class="text-brand-600 text-xs font-semibold inline-flex items-center gap-1"
                    >
                      {{ lang === "th" ? "อ่านต่อ" : "Read More" }} →
                    </span>
                  </div>
                </NuxtLink>
              </swiper-slide>
            </swiper>

            <div class="text-center mt-4">
              <NuxtLink
                to="/articles"
                class="group inline-flex items-center justify-center gap-1.5 w-full sm:w-auto mx-auto px-6 py-2.5 bg-transparent border border-brand-500 hover:border-brand-300 text-sm font-medium text-brand-600 rounded-xl transition-all duration-200 active:bg-neutral-50/80 shadow-xs"
              >
                <span
                  class="relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 group-hover:after:w-full after:bg-brand-700 after:transition-all after:duration-300"
                >
                  {{ lang === "th" ? "ดูบทความทั้งหมด" : "View All Articles" }}
                </span>
              </NuxtLink>
            </div>
          </div>

          <div class="hidden md:grid grid-cols-1 md:grid-cols-3 gap-6">
            <NuxtLink
              v-for="blog in apiArticles"
              :key="blog.id"
              :to="`/blog/${blog.slug || blogSlug(blog)}`"
              class="bg-white rounded-2xl overflow-hidden border border-neutral-100 shadow-sm hover:shadow-elevated transition-all duration-300 flex flex-col group cursor-pointer"
            >
              <div class="h-48 overflow-hidden relative">
                <img
                  :src="articleImageUrl(blog)"
                  :alt="lang === 'th' ? blog.titleTh : blog.titleEn"
                  loading="lazy"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span
                  class="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-brand-800 text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm"
                >
                  {{ lang === "th" ? blog.category_th : blog.category_en }}
                </span>
              </div>
              <div class="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3
                    class="font-serif text-base font-semibold text-neutral-900 mb-2 line-clamp-2"
                  >
                    {{ lang === "th" ? blog.title : blog.title_en }}
                  </h3>
                  <p
                    class="text-sm text-neutral-500 line-clamp-3 leading-relaxed mb-4"
                  >
                    {{ lang === "th" ? blog.excerpt : blog.excerpt_en }}
                  </p>
                </div>
                <span
                  class="text-brand-600 text-sm font-semibold inline-flex items-center gap-1 group-hover:text-brand-700 transition-colors"
                >
                  {{ lang === "th" ? "อ่านต่อ" : "Read More" }} →
                </span>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <section class="py-6 md:py-10 bg-neutral-50 select-none">
      <div class="container-wide">
        <div
          class="flex flex-col md:flex-row md:items-end md:justify-between mb-6 md:mb-10 max-w-xl mx-auto md:max-w-none"
        >
          <div class="text-center md:text-left max-w-xl">
            <p class="tag bg-warm-200 text-warm-800 mb-4 inline-block">
              {{ lang === "th" ? "วิดีโอแชร์ประสบการณ์" : "Video Stories" }}
            </p>
            <h2 class="section-title mb-0">
              {{ lang === "th" ? "วิดีโอแนะนำ" : "Inspirational Videos" }}
            </h2>
            <p class="section-subtitle mt-1 mb-0">
              {{
                lang === "th"
                  ? "เส้นทางที่ไม่ยอมแพ้ จากพวกเราทุกคน"
                  : "Never-give-up roadmaps, shared directly from the heart."
              }}
            </p>
          </div>

          <div class="hidden md:block shrink-0">
            <NuxtLink
              to="/videos"
              class="group inline-flex items-center gap-1 text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors"
            >
              <span
                class="relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 group-hover:after:w-full after:bg-brand-700 after:transition-all after:duration-300"
              >
                {{ lang === "th" ? "ดูวิดีโอทั้งหมด" : "View All Videos" }} →
              </span>
            </NuxtLink>
          </div>
        </div>

        <div v-if="videoPending" class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            v-for="i in 3"
            :key="i"
            class="bg-white rounded-2xl p-3 border border-neutral-100 animate-pulse"
          >
            <div class="w-full h-44 rounded-xl bg-neutral-200 mb-4" />
            <div class="h-4 bg-neutral-200 rounded w-3/4 mb-2" />
            <div class="h-3 bg-neutral-100 rounded w-1/2" />
          </div>
        </div>

        <div v-else-if="videos.length">
          <div class="block md:hidden">
            <swiper
              :modules="swiperModules"
              :slides-per-view="1"
              :space-between="16"
              :pagination="{ clickable: true }"
              class="!pb-12"
            >
              <swiper-slide v-for="video in videos" :key="video.id">
                <div
                  class="bg-white rounded p-4 border border-neutral-100 shadow-sm"
                  @click="openVideo(video)"
                >
                  <div
                    class="w-full h-52 rounded mb-3 flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-brand-200 to-warm-200"
                  >
                    <img
                      v-if="video.thumbnail"
                      :src="
                        video.isFallback
                          ? video.thumbnail
                          : apiStorageBase + video.thumbnail
                      "
                      :alt="lang === 'th' ? video.titleTh : video.titleEn"
                      loading="lazy"
                      class="absolute inset-0 w-full h-full object-cover"
                    />
                    <div
                      class="w-14 h-14 rounded-full bg-white/80 flex items-center justify-center shadow-md relative z-10 backdrop-blur-sm"
                    >
                      <svg
                        class="w-6 h-6 text-brand-600 ml-1"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                  <h3
                    class="font-serif text-base font-semibold text-neutral-900 mb-1 line-clamp-1 px-1"
                  >
                    {{ lang === "th" ? video.titleTh : video.titleEn }}
                  </h3>
                  <p class="text-sm text-neutral-500 line-clamp-2 px-1">
                    {{
                      lang === "th" ? video.descriptionTh : video.descriptionEn
                    }}
                  </p>
                </div>
              </swiper-slide>
            </swiper>

            <div class="text-center mt-2">
              <NuxtLink
                to="/videos"
                class="group inline-flex items-center justify-center gap-1.5 w-full sm:w-auto mx-auto px-6 py-2.5 bg-transparent border border-brand-500 hover:border-brand-300 text-sm font-medium text-brand-600 rounded-xl transition-all duration-200 active:bg-neutral-50/80 shadow-xs"
              >
                <span
                  class="relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 group-hover:after:w-full after:bg-brand-700 after:transition-all after:duration-300"
                >
                  {{ lang === "th" ? "ดูวิดีโอทั้งหมด" : "View All Videos" }}
                </span>
              </NuxtLink>
            </div>
          </div>

          <div class="hidden md:grid grid-cols-1 md:grid-cols-3 gap-6">
            <div
              v-for="video in videos"
              :key="video.id"
              class="bg-white rounded p-4 border border-neutral-100 shadow-sm group hover:shadow-elevated transition-all duration-300 cursor-pointer"
              @click="openVideo(video)"
            >
              <div
                class="w-full h-44 rounded mb-3 flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-brand-200 to-warm-200"
              >
                <img
                  v-if="video.thumbnail"
                  :src="
                    video.isFallback
                      ? video.thumbnail
                      : apiStorageBase + video.thumbnail
                  "
                  :alt="lang === 'th' ? video.titleTh : video.titleEn"
                  loading="lazy"
                  class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div
                  class="w-14 h-14 rounded-full bg-white/80 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-200 relative z-10 backdrop-blur-sm"
                >
                  <svg
                    class="w-6 h-6 text-brand-600 ml-1"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
              <h3
                class="font-serif text-base font-semibold text-neutral-900 mb-1 line-clamp-2 px-1"
              >
                {{ lang === "th" ? video.titleTh : video.titleEn }}
              </h3>
              <p class="text-sm text-neutral-500 line-clamp-2 px-1">
                {{ lang === "th" ? video.descriptionTh : video.descriptionEn }}
              </p>
            </div>
          </div>
        </div>

        <div v-else class="text-center py-10 text-neutral-400 text-sm">
          {{
            lang === "th"
              ? "ยังไม่มีวิดีโอในขณะนี้"
              : "No videos available at the moment."
          }}
        </div>
      </div>
    </section>

    <section
      class="py-6 md:py-10 bg-warm-100 relative overflow-hidden select-none"
    >
      <div class="container-wide">
        <div class="text-center max-w-xl mx-auto mb-6 md:mb-10">
          <p class="tag bg-brand-100 text-brand-700 mb-4">
            {{
              lang === "th"
                ? "รีวิวจากประสบการณ์จริง"
                : "Real Patient Experiences"
            }}
          </p>
          <h2 class="section-title mb-0">
            <template v-if="lang === 'th'">
              เสียงจากครอบครัว<br />ที่เราดูแล
            </template>
            <template v-else>
              Voices from the Families<br />We Have Guided
            </template>
          </h2>
        </div>

        <div v-if="reviewPending" class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            v-for="i in 3"
            :key="i"
            class="card bg-white p-6 rounded-2xl animate-pulse"
          >
            <div class="flex gap-3 mb-4">
              <div class="w-11 h-11 rounded-full bg-neutral-200 shrink-0" />
              <div class="flex-1">
                <div class="h-3 bg-neutral-200 rounded w-1/2 mb-2" />
                <div class="h-3 bg-neutral-100 rounded w-1/3" />
              </div>
            </div>
            <div class="space-y-2">
              <div class="h-3 bg-neutral-100 rounded" />
              <div class="h-3 bg-neutral-100 rounded w-4/5" />
            </div>
          </div>
        </div>

        <div v-else>
          <swiper
            :modules="swiperModules"
            :slides-per-view="1"
            :space-between="24"
            :pagination="{ clickable: true }"
            :loop="true"
            :autoplay="{ delay: 4000, disableOnInteraction: false }"
            :breakpoints="{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }"
            class="reviews-swiper !pb-14"
          >
            <swiper-slide
              v-for="story in reviews"
              :key="story.id"
              class="!h-auto"
            >
              <div
                class="card group hover:shadow-elevated transition-all duration-300 min-w-0 flex flex-col h-full bg-white"
              >
                <div class="flex items-start justify-between mb-4 gap-2">
                  <div class="flex items-center gap-3">
                    <div
                      class="w-11 h-11 rounded-full flex items-center justify-center text-white font-serif font-bold text-lg shadow-sm shrink-0"
                      :class="story.avatarBg"
                    >
                      {{
                        (lang === "th"
                          ? story.nameTh || "?"
                          : story.nameEn || "?")[0]
                      }}
                    </div>
                    <div>
                      <div
                        class="font-semibold text-neutral-900 text-sm line-clamp-1"
                      >
                        {{ lang === "th" ? story.nameTh : story.nameEn }}
                      </div>
                      <div class="text-xs text-neutral-400 line-clamp-1">
                        {{ formatApiDate(story.date, lang) }}
                      </div>
                    </div>
                  </div>

                  <span
                    class="tag text-[11px] shrink-0 bg-brand-50 text-brand-700 font-semibold border border-brand-100 max-w-[120px] truncate"
                  >
                    {{ lang === "th" ? story.treatmentTh : story.treatmentEn }}
                  </span>
                </div>

                <div class="flex gap-0.5 mb-3">
                  <svg
                    v-for="i in story.rating || 5"
                    :key="i"
                    class="w-3.5 h-3.5 text-warm-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    />
                  </svg>
                </div>

                <blockquote
                  class="text-neutral-600 text-sm leading-relaxed flex-1 italic"
                >
                  "{{ lang === "th" ? story.quoteTh : story.quoteEn }}"
                </blockquote>
              </div>
            </swiper-slide>
          </swiper>
        </div>
      </div>
    </section>

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
          <button
            @click="activeVideo = null"
            class="text-neutral-400 hover:text-neutral-700 text-2xl leading-none"
          >
            ×
          </button>
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
          <video
            v-else-if="activeVideo.url"
            :src="activeVideo.url"
            controls
            preload="metadata"
            autoplay
            class="w-full h-full"
          />
        </div>
      </div>
    </div>

    <section
      class="py-8 md:py-10 bg-gradient-to-br from-brand-600 to-brand-700"
    >
      <div class="container-narrow text-center">
        <h2 class="font-serif text-2xl md:text-3xl text-white mb-4">
          {{
            lang === "th"
              ? "แบ่งปันเรื่องราวของคุณ"
              : "Share Your Success Story"
          }}
        </h2>
        <p class="text-brand-100 leading-relaxed mb-8 max-w-lg mx-auto">
          {{
            lang === "th"
              ? "หากคุณเป็นหนึ่งในครอบครัวที่ประสบความสำเร็จผ่าน BCC IVF Wellness เราอยากฟังเรื่องราวของคุณ"
              : "If your family found happiness through BCC IVF Wellness, we invite you to inspire others by sharing your journey."
          }}
        </p>
        <NuxtLink
          to="/contact"
          class="inline-flex items-center justify-center gap-2 w-[100%] sm:w-auto mx-auto px-7 py-2.5 md:py-3.5 bg-white text-brand-700 font-semibold rounded-xl hover:bg-brand-50 transition-colors shadow-sm text-center"
        >
          {{ lang === "th" ? "แบ่งปันเรื่องราว" : "Share Your Story" }}
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { blogSlug } from "~/utils/slugify";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const lang = useLang();
const swiperModules = [Pagination, Autoplay];

useSeoMeta({
  title: computed(() =>
    lang.value === "th"
      ? "บทความและประสบการณ์ – BCC IVF Wellness"
      : "Articles & Experiences – BCC IVF Wellness",
  ),
  description: computed(() =>
    lang.value === "th"
      ? "ประสบการณ์จริงและคลังบทความความรู้จากครอบครัวที่ไว้วางใจ BCC IVF Wellness"
      : "Real patient testimonies and medical articles from families who trusted BCC IVF Wellness.",
  ),
});

const config = useRuntimeConfig();

/* ── Fetch stories from API ──────────────────────────────── */
const { data: storiesData } = await useAsyncData(
  "stories-featured",
  async () => {
    try {
      const base = useRuntimeConfig().public.apiBase as string;
      const r = await fetch(`${base}/stories?limit=10`);
      if (!r.ok) return null;
      return r.json();
    } catch {
      return null;
    }
  },
);

const storiesApiBase = (useRuntimeConfig().public.apiBase as string).replace(
  "/api",
  "",
);

function storyImageUrl(s: any): string {
  const img = s.image || s.imageFallback || "";
  if (!img) return "";
  return img.startsWith("http") ? img : storiesApiBase + img;
}

const formatCycle = (cycleValue: string | number) => {
  if (!cycleValue) return "";

  const num = Number(cycleValue);

  if (lang.value === "th") {
    if (num === 1) return "สำเร็จในรอบแรก";
    return `สำเร็จในรอบที่ ${num}`;
  } else {
    let suffix = "th";
    if (num === 1) suffix = "st";
    else if (num === 2) suffix = "nd";
    else if (num === 3) suffix = "rd";

    return `Success in ${num}${suffix} Cycle`;
  }
};

const formatApiDate = (dateString, lang) => {
  if (!dateString) return "";

  const date = new Date(dateString);
  const locale = lang === "th" ? "th-TH" : "en-US";

  return date.toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
  });
};

/* ── Merge API + fallback ────────────────────────────────── */
const dynamicStories = computed(() => {
  const list = storiesData.value?.stories || [];
  if (list.length > 0) return list;
  return featuredStories.map((s: any) => ({ ...s, imageFallback: s.image }));
});

/* ── Featured Success Stories Fallback Data ──────────────── */
const featuredStories = [
  {
    id: 1,
    titleTh: "ก้าวผ่านความล้มเหลว สู่ของขวัญล้ำค่าในชีวิต",
    titleEn:
      "Overcoming Years of Unexplained Infertility to Embrace Our Miracle",
    storyTh:
      "หลังจากพยายามมานานกว่า 4 ปี และผ่านการรักษาจากที่อื่นมาหลายครั้งจนเกือบจะถอดใจ แต่เมื่อได้เข้ามาปรึกษากับทีมแพทย์ที่ BCC IVF Wellness ที่นี่วิเคราะห์ปัญหาอย่างละเอียด ปรับแผนการรักษาและดูแลสภาพจิตใจอย่างใกล้ชิด จนในที่สุดเราก็ประสบความสำเร็จในรอบแรกที่ทำ IVF กับที่นี่ค่ะ",
    storyEn:
      "After 4 years of trying and facing multiple failed attempts elsewhere, we were ready to give up. The team at BCC IVF Wellness diagnosed us thoroughly and customized an optimized protocol that worked beautifully on our very first cycle here.",
    authorTh: "คุณแม่ปาริชาต",
    authorEn: "Mrs. Parichat",
    dateTh: "มิถุนายน 2567",
    dateEn: "June 2024",
    treatmentTh: "การรักษาแบบ IVF",
    treatmentEn: "IVF Treatment",
    cycleTh: "สำเร็จในรอบที่ 2",
    cycleEn: "Success in 2nd Cycle",
    image:
      "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 2,
    titleTh: "เติมเต็มคำว่าครอบครัวให้สมบูรณ์ด้วยความใส่ใจ",
    titleEn:
      "Completing Our Family Blueprint with Dedicated Multi-disciplinary Care",
    storyTh:
      "เนื่องจากสามีมีปัญหาเรื่องคุณภาพอสุจิและดิฉันมีภาวะไข่โตช้า การรักษาด้วยวิธีทั่วไปจึงไม่ได้ผล คุณหมอแนะนำเทคนิค ICSI ร่วมกับการคัดกรองโครโมโซมตัวอ่อน (PGT-A) ทีมพยาบาลคอยโทรติดตามอาการและให้กำลังใจตลอดทาง ตอนนี้เจ้าตัวเล็กคลอดออกมาแข็งแรงสมบูรณ์ดีมากค่ะ",
    storyEn:
      "With severe male factor issues combined with my low ovarian reserve, conception felt impossible. Through targeted ICSI and pre-implantation screening (PGT-A), our specialized embryologist secured a highly viable blastocyst. We are now blissful parents!",
    authorTh: "คุณแม่สุวรรณา",
    authorEn: "Mrs. Suwanna",
    dateTh: "มีนาคม 2567",
    dateEn: "March 2024",
    treatmentTh: "เทคนิค ICSI + PGT-A",
    treatmentEn: "ICSI + PGT-A Technology",
    cycleTh: "สำเร็จในรอบแรก",
    cycleEn: "Success in 1st Cycle",
    image:
      "https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=600&auto=format&fit=crop",
  },
];

/* ── Blog data ─────────────────────────────────────────────── */
const fallbackBlogs = [
  {
    id: 1,
    titleTh: "เตรียมตัวอย่างไรก่อนทำ IVF เพื่อเพิ่มอัตราความสำเร็จสูงสูด",
    titleEn: "How to Prepare for IVF to Maximize Your Clinical Success Rates",
    descTh:
      "เจาะลึกแนวทางการเตรียมพร้อมทางร่างกาย อาหารที่ควรรับประทาน และการดูแลสภาพจิตใจของคู่สมรสก่อนเข้าสู่กระบวนการเก็บไข่",
    descEn:
      "A comprehensive guide on physical conditioning, recommended nutritional diets, and emotional management before starting your egg retrieval cycle.",
    image:
      "https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=600&auto=format&fit=crop",
    tagTh: "การเตรียมตัว",
    tagEn: "Preparation",
  },
  {
    id: 2,
    titleTh: "ไขข้อข้องใจ: ความแตกต่างระว่างการรักษาแบบ IUI และ IVF/ICSI",
    titleEn:
      "IUI vs. IVF/ICSI: Understanding Key Differences & Choosing the Right Path",
    descTh:
      "ไขความแตกต่างในด้านขั้นตอน ค่าใช้จ่าย และความเหมาะสมกับปัญหาสุขภาพ เพื่อช่วยให้คู่รักเลือกวิธีที่ตอบโจทย์ตนเองได้แม่นยำที่สุด",
    descEn:
      "Demystifying procedure timelines, cost factors, and success probabilities to help couples make an informed choice suited for their diagnosis.",
    image:
      "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=600&auto=format&fit=crop",
    tagTh: "ความรู้ทั่วไป",
    tagEn: "Medical Info",
  },
  {
    id: 3,
    titleTh: "การแช่แข็งไข่ (Egg Freezing) ในวัย 30+ ปลอดภัยและคุ้มค่าจริงไหม?",
    titleEn: "Is Social Egg Freezing at Age 30+ Safe and Truly Worth It?",
    descTh:
      "ทำความเข้าใจข้อดีของการแช่แข็งไข่ด้วยเทคนิคหยุดอายุเซลล์เพื่อเพิ่มความมั่นใจในการวางแผนอนาคตครอบครัวในเวลาที่คุณพร้อม",
    descEn:
      "Explore the clinical benefits of ultra-rapid Vitrification technology to freeze your cellular clock and safely plan your career or family timeline.",
    image:
      "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=600&auto=format&fit=crop",
    tagTh: "วางแผนอนาคต",
    tagEn: "Family Planning",
  },
];

/* ── Reviews Fallback Data (เพิ่มสีจำลองดั้งเดิมล็อกไว้ให้) ─── */
const fallbackReviews = [
  {
    id: 1,
    nameTh: "คุณแม่ปาริชาต",
    nameEn: "Mrs. Parichat",
    detailTh: "IVF รอบที่ 2 | มิ.ย. 2024",
    detailEn: "2nd IVF Cycle | June 2024",
    treatmentTh: "IVF",
    treatmentEn: "IVF",
    avatarBg: "bg-brand-500",
    rating: 5,
    quoteTh:
      "ทีมแพทย์ดูแลเราดีมาก อธิบายทุกขั้นตอนอย่างละเอียด ทำให้ไม่ตึงเครียด ตอนนี้ลูกอายุ 8 เดือนแล้วค่ะ ขอบคุณมากๆ",
    quoteEn:
      "The medical team took great care of us, explaining every step in detail, which really reduced our stress. My baby is now 8 months old. Thank you so much!",
  },
  {
    id: 2,
    nameTh: "คุณแม่สุวรรณา",
    nameEn: "Mrs. Suwanna",
    detailTh: "IUI รอบที่ 3 | มี.ค. 2024",
    detailEn: "3rd IUI Cycle | March 2024",
    treatmentTh: "IUI",
    treatmentEn: "IUI",
    avatarBg: "bg-sage-500",
    rating: 5,
    quoteTh:
      "หลังจากลองมาหลายที่ BCC IVF เป็นที่ที่ทำให้เราสำเร็จ บรรยากาศอบอุ่น คุณหมอใจดีและเป็นกันเอง",
    quoteEn:
      "After trying many clinics, BCC IVF is where we finally succeeded. The atmosphere is warm, and the doctor is incredibly kind and friendly.",
  },
  {
    id: 3,
    nameTh: "คุณแม่นภาพร",
    nameEn: "Ms. Napaporn",
    detailTh: "Egg Freezing | ธ.ค. 2023",
    detailEn: "Egg Freezing | Dec 2023",
    treatmentTh: "แช่แข็งไข่",
    treatmentEn: "Egg Freezing",
    avatarBg: "bg-blue-500",
    rating: 5,
    quoteTh:
      "มาแช่แข็งไข่เผื่ออนาคต ขั้นตอนไม่ยากอย่างที่คิด ทีมงานอธิบายดีมาก มีคำถามตอบตลอด แนะนำเลยค่ะ",
    quoteEn:
      "I came to freeze my eggs for the future. The process was much easier than expected. The team explained everything well and was always available to answer questions. Highly recommended!",
  },
  {
    id: 1,
    nameTh: "คุณแม่ปาริชาต",
    nameEn: "Mrs. Parichat",
    detailTh: "IVF รอบที่ 2 | มิ.ย. 2024",
    detailEn: "2nd IVF Cycle | June 2024",
    treatmentTh: "IVF",
    treatmentEn: "IVF",
    avatarBg: "bg-brand-500",
    rating: 5,
    quoteTh:
      "ทีมแพทย์ดูแลเราดีมาก อธิบายทุกขั้นตอนอย่างละเอียด ทำให้ไม่ตึงเครียด ตอนนี้ลูกอายุ 8 เดือนแล้วค่ะ ขอบคุณมากๆ",
    quoteEn:
      "The medical team took great care of us, explaining every step in detail, which really reduced our stress. My baby is now 8 months old. Thank you so much!",
  },
  {
    id: 2,
    nameTh: "คุณแม่สุวรรณา",
    nameEn: "Mrs. Suwanna",
    detailTh: "IUI รอบที่ 3 | มี.ค. 2024",
    detailEn: "3rd IUI Cycle | March 2024",
    treatmentTh: "IUI",
    treatmentEn: "IUI",
    avatarBg: "bg-sage-500",
    rating: 5,
    quoteTh:
      "หลังจากลองมาหลายที่ BCC IVF เป็นที่ที่ทำให้เราสำเร็จ บรรยากาศอบอุ่น คุณหมอใจดีและเป็นกันเอง",
    quoteEn:
      "After trying many clinics, BCC IVF is where we finally succeeded. The atmosphere is warm, and the doctor is incredibly kind and friendly.",
  },
  {
    id: 3,
    nameTh: "คุณแม่นภาพร",
    nameEn: "Ms. Napaporn",
    detailTh: "Egg Freezing | ธ.ค. 2023",
    detailEn: "Egg Freezing | Dec 2023",
    treatmentTh: "แช่แข็งไข่",
    treatmentEn: "Egg Freezing",
    avatarBg: "bg-blue-500",
    rating: 5,
    quoteTh:
      "มาแช่แข็งไข่เผื่ออนาคต ขั้นตอนไม่ยากอย่างที่คิด ทีมงานอธิบายดีมาก มีคำถามตอบตลอด แนะนำเลยค่ะ",
    quoteEn:
      "I came to freeze my eggs for the future. The process was much easier than expected. The team explained everything well and was always available to answer questions. Highly recommended!",
  },
];

/* ── Videos Fallback Data ──────────────────────────────────── */
const fallbackVideos = [
  {
    id: 1,
    titleTh: "ความประทับใจจากคุณแม่ปาริชาต (IVF ความสำเร็จในรอบที่ 2)",
    titleEn:
      "Heartwarming Testimonial from Mrs. Parichat (Successful 2nd IVF Cycle)",
    descriptionTh:
      "แชร์ประสบการณ์ทำ IVF สำเร็จกับความรู้สึกที่เปลี่ยนไปของครอบครัวเรา",
    descriptionEn:
      "Sharing our intimate IVF success milestone and how it brought profound joy to our home.",
    thumbnail:
      "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?q=80&w=600&auto=format&fit=crop",
    url: "https://www.youtube.com/watch?v=YWrgyHn0VSY",
    isFallback: true,
  },
  {
    id: 2,
    titleTh: "เตรียมตัวอย่างไรก่อนเข้าสู่กระบวนการเด็กหลอดแก้ว",
    titleEn:
      "Clinical Protocols: Essential Preparations for Advanced IVF Success",
    descriptionTh:
      "ขั้นตอนการดูแลตัวเองและเตรียมความพร้อมของร่างกายจากแพทย์ผู้เชี่ยวชาญ",
    descriptionEn:
      "Crucial biological optimization and mental health guidance shared by our primary physicians.",
    thumbnail:
      "https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=600&auto=format&fit=crop",
    url: "https://www.youtube.com/watch?v=YWrgyHn0VSY",
    isFallback: true,
  },
  {
    id: 3,
    titleTh:
      "เทคโนโลยีคัดกรองโครโมโซมตัวอ่อนช่วยเพิ่มอัตราความสำเร็จได้อย่างไร",
    titleEn:
      "How PGT-A Embryo Chromosome Screening Drives Higher Success Rates",
    descriptionTh:
      "เจาะลึกเทคโนโลยีห้องแล็บมาตรฐานระดับสากลที่ BCC IVF Wellness",
    descriptionEn:
      "An inside look into our world-class, ISO-accredited embryology labs.",
    thumbnail:
      "https://images.unsplash.com/photo-1531983412531-1f49a365ffed?q=80&w=600&auto=format&fit=crop",
    url: "https://www.youtube.com/watch?v=YWrgyHn0VSY",
    isFallback: true,
  },
];

/* ── API Fetching & Mapping ───────────────────────────────── */
// ── ดึงบทความจาก API
const { data: articleData, pending: articlePending } = await useArticles({
  status: "published",
  limit: "9",
});

const apiStorageBase = (useRuntimeConfig().public.apiBase as string).replace(
  "/api",
  "",
);

const apiArticles = computed(() => {
  const list = articleData.value?.articles || [];
  if (list.length > 0) {
    return list.slice(0, 3);
  }
  return fallbackBlogs.slice(0, 3).map((b) => ({
    ...b,
    title: b.titleTh,
    excerpt: b.descTh,
    category: b.tagTh,
    cover_image: b.image,
    slug: blogSlug(b),
  }));
});

function articleImageUrl(blog: any): string {
  if (!blog.cover_image) return blog.image || "";
  if (blog.cover_image.startsWith("http")) return blog.cover_image;
  return apiStorageBase + blog.cover_image;
}

const { data: reviewData, pending: reviewPending } = await useReviews({
  limit: "9",
  status: "published",
});
const { data: videoData, pending: videoPending } = await useVideos({
  limit: "6",
});

const reviews = computed(() => {
  const list = reviewData.value?.reviews || [];
  if (list.length > 0) {
    return list.map((item: any) => ({
      id: item.id,
      nameTh: item.author_name || item.name,
      nameEn: item.author_name_en || item.author_name || item.name,
      date: item.date,
      treatmentTh: item.category || item.treatment,
      treatmentEn: item.category_en || item.category || item.treatment,
      rating: item.rating,
      quoteTh: item.content || item.quote,
      quoteEn: item.content_en || item.content || item.quote,
      avatarBg: item.avatar_bg || item.avatarBg || "bg-brand-500",
    }));
  }
  return fallbackReviews;
});

const videos = computed(() => {
  const list = videoData.value?.videos || [];
  if (list.length > 0) {
    return list.slice(0, 3).map((item: any) => ({
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
  return fallbackVideos.slice(0, 3);
});

/* ── Video Modal ────────────────────────────────────────────── */
const activeVideo = ref<any>(null);
const openVideo = (video: any) => {
  activeVideo.value = video;
};

function youtubeId(url: string): string | null {
  if (!url) return null;
  const m = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
  return m ? m[1] : null;
}
</script>

<style scoped>
:deep(.swiper-pagination) {
  bottom: 0px !important;
  left: 0 !important;
  width: 100% !important;
  text-align: center !important;
}

:deep(.swiper-pagination-bullet) {
  transition: all 0.3s ease;
}

:deep(.swiper-pagination-bullet-active) {
  background: #b45309 !important;
  width: 16px !important;
  border-radius: 4px !important;
}

.success {
  background: #12b981;
  border: 1px solid #12b981;
}
</style>
