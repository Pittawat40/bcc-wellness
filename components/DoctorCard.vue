<!-- components/DoctorCard.vue -->
<template>
  <div
    class="card hover:shadow-elevated transition-all duration-300 py-6 px-6 grid grid-rows-[auto_120px_1fr_auto] gap-y-1 md:gap-y-4 h-full bg-white rounded-2xl overflow-hidden"
  >
    <!-- รูปแพทย์ -->
    <div class="relative flex justify-center shrink-0">
      <img
        v-if="doctor.photo"
        :src="apiStorageBase + doctor.photo"
        :alt="lang === 'th' ? doctor.nameTh : doctor.nameEn"
        class="w-52 h-52 rounded-full object-cover shadow-sm border-4 border-white"
      />
      <div
        v-else
        class="w-52 h-52 rounded-full bg-gradient-to-br flex items-center justify-center shadow-sm border-4 border-white"
        :class="doctor.avatarGrad || 'from-brand-400 to-brand-600'"
      >
        <svg
          class="w-20 h-20 text-white/50"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          stroke-width="1.5"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      </div>
    </div>

    <!-- ชื่อและตำแหน่ง -->
    <div class="text-center w-full flex flex-col justify-center px-2">
      <h3
        class="font-serif text-xl font-semibold text-neutral-900 leading-tight"
      >
        {{ lang === "th" ? doctor.nameTh : doctor.nameEn }}
      </h3>
      <p class="text-sm text-brand-600 font-medium mt-2 leading-relaxed">
        {{ lang === "th" ? doctor.titleTh : doctor.titleEn }}
      </p>
    </div>

    <!-- ประวัติการศึกษา -->
    <div class="border-t border-neutral-100 pt-5 w-full">
      <div class="space-y-3 text-left">
        <div
          v-for="edu in lang === 'th' ? doctor.eduTh : doctor.eduEn"
          :key="edu"
          class="flex gap-2 text-sm text-neutral-500 leading-relaxed items-start"
        >
          <svg
            class="w-4 h-4 text-sage-400 shrink-0 mt-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 14l9-5-9-5-9 5 9 5z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
            />
          </svg>
          <span>{{ edu }}</span>
        </div>
      </div>
    </div>

    <!-- Tags -->
    <div class="w-full pt-4 self-end">
      <div class="flex flex-wrap justify-center gap-1.5">
        <span
          v-for="tag in lang === 'th' ? doctor.tagsTh : doctor.tagsEn"
          :key="tag"
          class="tag bg-neutral-50 text-neutral-500 text-[11px] font-normal px-2.5 py-1 border border-neutral-200/60 rounded-full"
        >
          {{ tag }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  doctor: any;
  lang: string;
  apiStorageBase: string;
}>();
</script>
