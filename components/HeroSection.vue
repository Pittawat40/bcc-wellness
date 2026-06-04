<template>
  <section
    class="relative overflow-hidden pt-24 pb-28 md:pt-36 md:pb-40 xl:pt-44 xl:pb-48"
  >
    <video
      autoplay
      loop
      muted
      playsinline
      class="absolute inset-0 w-full h-full object-cover z-0"
    >
      <source src="/images/banner.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>

    <div
      class="absolute inset-0 bg-gradient-to-br from-warm-100/80 via-warm-50/70 to-sage-50/80 mix-blend-multiply z-0"
    ></div>

    <div
      class="absolute top-0 right-0 w-96 h-96 bg-brand-100 rounded-full blur-3xl opacity-40 translate-x-1/3 -translate-y-1/3 pointer-events-none z-0"
    ></div>
    <div
      class="absolute bottom-0 left-0 w-80 h-80 bg-sage-100 rounded-full blur-3xl opacity-40 -translate-x-1/3 translate-y-1/3 pointer-events-none z-0"
    ></div>

    <div class="container-wide relative z-10">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div class="opacity-0 animate-fade-in-up">
          <h1
            class="font-serif font-medium text-3xl sm:text-4xl md:text-6xl lg:text-[4rem] xl:text-[4.5rem] text-neutral-50 leading-tight mb-6"
          >
            <span class="block md:whitespace-nowrap">{{ t.hero.title }}</span>

            <span
              class="text-brand-600 block my-1 md:my-2 lg:my-0 lg:leading-[85px]"
            >
              {{ t.hero.title2 }}
            </span>

            <span class="block md:whitespace-nowrap">{{ t.hero.title3 }}</span>
          </h1>
          <p
            class="text-lg font-normal text-neutral-50 leading-relaxed max-w-lg mb-8"
          >
            {{ t.hero.subtitle }}
          </p>
          <div class="flex flex-wrap gap-3">
            <NuxtLink to="/contact" class="btn-primary">
              {{ t.hero.ctaPrimary }}
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
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const lang = useLang();
const t = useT();
</script>

<style scoped>
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 1.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
</style>
