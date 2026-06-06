<template>
  <div>
    <section
      class="relative pt-16 pb-16 md:pt-32 md:pb-32 border-b border-neutral-200/60 bg-cover bg-center bg-no-repeat overflow-hidden"
      style="background-image: url(&quot;/images/bg-banner.jpg&quot;)"
    >
      <div class="absolute inset-0 bg-black/30 z-0"></div>

      <div class="container-narrow text-center relative z-10">
        <p class="tag bg-white/90 text-brand-800 mb-4 backdrop-blur-sm">
          {{ lang === "th" ? "ติดต่อเรา" : "Contact Us" }}
        </p>
        <h1
          class="font-serif text-3xl md:text-4xl font-bold text-white mb-4 drop-shadow-sm"
        >
          {{ lang === "th" ? "นัดหมายปรึกษาแพทย์" : "Book an Appointment" }}
        </h1>
        <p
          class="text-white/90 md:text-lg leading-relaxed max-w-xl mx-auto drop-shadow-sm"
        >
          {{
            lang === "th"
              ? "ปรึกษาฟรีไม่มีค่าใช้จ่าย ทีมแพทย์พร้อมตอบทุกคำถาม"
              : "Complimentary initial sessions. Our specialist team is ready to answer your questions."
          }}
        </p>
      </div>
    </section>

    <section class="pt-12 pb-10 md:pt-16 bg-white">
      <div class="container-wide">
        <div class="grid grid-cols-1 lg:grid-cols-5 gap-10">
          <div class="lg:col-span-2 space-y-6">
            <div class="card">
              <h2 class="font-serif text-xl text-neutral-900 mb-5">
                {{ lang === "th" ? "ข้อมูลติดต่อ" : "Contact Information" }}
              </h2>

              <div v-if="contactPending" class="space-y-4">
                <div v-for="i in 3" :key="i" class="flex gap-3 animate-pulse">
                  <div class="w-10 h-10 rounded-xl bg-neutral-200 shrink-0" />
                  <div class="flex-1">
                    <div class="h-3 bg-neutral-200 rounded w-1/3 mb-2" />
                    <div class="h-4 bg-neutral-100 rounded w-2/3" />
                  </div>
                </div>
              </div>

              <div v-else class="space-y-4">
                <div
                  class="flex gap-4 items-start"
                  v-for="info in contactInfoList"
                  :key="info.key"
                >
                  <a
                    class="w-10 h-10 rounded-xl bg-brand-100 text-brand-600 hover:bg-brand-200 flex items-center justify-center shrink-0 transition-all duration-300 shadow-xs"
                    title="คลิกเพื่อเปิดลิงก์"
                  >
                    <svg
                      class="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      v-html="getIcon(info.icon || info.key)"
                    />
                  </a>

                  <div class="pt-0.5">
                    <div
                      class="text-xs text-neutral-400 font-medium uppercase tracking-wide mb-0.5"
                    >
                      {{ lang === "th" ? info.labelTh : info.labelEn }}
                    </div>
                    <div class="text-neutral-800 text-sm leading-relaxed">
                      <span>{{
                        lang === "th" ? info.valueTh : info.valueEn
                      }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="card bg-sage-50 border border-sage-200">
              <h3 class="font-semibold text-neutral-900 mb-3">
                {{ lang === "th" ? "เวลาทำการ" : "Business Hours" }}
              </h3>
              <div class="space-y-2 text-sm">
                <div
                  v-for="h in businessHoursList"
                  :key="h.dayLabelTh"
                  class="flex justify-between"
                >
                  <span class="text-neutral-600">
                    {{ lang === "th" ? h.dayLabelTh : h.dayLabelEn }}
                  </span>
                  <span
                    :class="
                      h.is_closed
                        ? 'text-neutral-400'
                        : 'font-medium text-neutral-800'
                    "
                  >
                    {{ lang === "th" ? h.hoursTh : h.hoursEn }}
                  </span>
                </div>
              </div>
            </div>

            <div class="card bg-brand-600 text-white">
              <div class="flex items-start gap-3">
                <svg
                  class="w-6 h-6 shrink-0 mt-0.5 text-brand-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div>
                  <p class="font-semibold mb-1">
                    {{
                      lang === "th"
                        ? "สอบถามเพิ่มเติมผ่าน LINE"
                        : "Inquire via LINE Official"
                    }}
                  </p>
                  <p class="text-brand-100 text-sm">
                    {{
                      lang === "th"
                        ? "@bccivf สะดวกรวดเร็ว ตอบกลับภายใน 1 ชั่วโมง"
                        : "@bccivf Quick support, replies within 1 hour."
                    }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class="lg:col-span-3">
            <div class="card h-full flex flex-col justify-between">
              <div>
                <h2 class="font-serif text-xl text-neutral-900 mb-6">
                  {{
                    lang === "th"
                      ? "กรอกข้อมูลเพื่อนัดหมาย"
                      : "Appointment Booking Form"
                  }}
                </h2>

                <form
                  @submit.prevent="handleSubmit"
                  class="space-y-5"
                  novalidate
                >
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <!-- Name -->
                    <div>
                      <label
                        class="block text-sm font-medium text-neutral-700 mb-1.5"
                      >
                        {{ lang === "th" ? "ชื่อ-นามสกุล" : "Full Name" }}
                        <span class="text-red-500">*</span>
                      </label>
                      <input
                        v-model="form.name"
                        type="text"
                        :placeholder="
                          lang === 'th'
                            ? 'กรุณาระบุชื่อ-นามสกุล'
                            : 'Enter your full name'
                        "
                        :class="[
                          'w-full px-4 py-2.5 rounded-xl border bg-white text-neutral-800 placeholder-neutral-400 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition',
                          errors.name
                            ? 'border-red-400 bg-red-50'
                            : 'border-neutral-200',
                        ]"
                      />
                      <p
                        v-if="errors.name"
                        class="mt-1.5 text-xs text-red-500 flex items-center gap-1"
                      >
                        <svg
                          class="w-3 h-3 shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                            clip-rule="evenodd"
                          />
                        </svg>
                        {{
                          lang === "th"
                            ? "กรุณากรอกชื่อ-นามสกุล"
                            : "Full name is required"
                        }}
                      </p>
                    </div>

                    <!-- Phone -->
                    <div>
                      <label
                        class="block text-sm font-medium text-neutral-700 mb-1.5"
                      >
                        {{ lang === "th" ? "เบอร์โทรศัพท์" : "Phone Number" }}
                        <span class="text-red-500">*</span>
                      </label>
                      <input
                        v-model="form.phone"
                        type="tel"
                        :placeholder="
                          lang === 'th'
                            ? 'เช่น 089-xxx-xxxx'
                            : 'e.g., 089-xxx-xxxx'
                        "
                        :class="[
                          'w-full px-4 py-2.5 rounded-xl border bg-white text-neutral-800 placeholder-neutral-400 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition',
                          errors.phone
                            ? 'border-red-400 bg-red-50'
                            : 'border-neutral-200',
                        ]"
                      />
                      <p
                        v-if="errors.phone"
                        class="mt-1.5 text-xs text-red-500 flex items-center gap-1"
                      >
                        <svg
                          class="w-3 h-3 shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                            clip-rule="evenodd"
                          />
                        </svg>
                        {{
                          lang === "th"
                            ? "กรุณากรอกเบอร์โทรศัพท์ที่ถูกต้อง"
                            : "Please enter a valid phone number"
                        }}
                      </p>
                    </div>
                  </div>

                  <!-- Email -->
                  <div>
                    <label
                      class="block text-sm font-medium text-neutral-700 mb-1.5"
                    >
                      {{ lang === "th" ? "อีเมล" : "Email Address" }}
                    </label>
                    <input
                      v-model="form.email"
                      type="email"
                      placeholder="your@email.com"
                      :class="[
                        'w-full px-4 py-2.5 rounded-xl border bg-white text-neutral-800 placeholder-neutral-400 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition',
                        errors.email
                          ? 'border-red-400 bg-red-50'
                          : 'border-neutral-200',
                      ]"
                    />
                    <p
                      v-if="errors.email"
                      class="mt-1.5 text-xs text-red-500 flex items-center gap-1"
                    >
                      <svg
                        class="w-3 h-3 shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clip-rule="evenodd"
                        />
                      </svg>
                      {{
                        lang === "th"
                          ? "รูปแบบอีเมลไม่ถูกต้อง"
                          : "Please enter a valid email address"
                      }}
                    </p>
                  </div>

                  <!-- Service -->
                  <div>
                    <label
                      class="block text-sm font-medium text-neutral-700 mb-1.5"
                    >
                      {{
                        lang === "th" ? "บริการที่สนใจ" : "Interested Service"
                      }}
                    </label>
                    <select
                      v-model="form.service"
                      class="w-full px-4 py-2.5 rounded-xl border border-neutral-200 bg-white text-neutral-800 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition"
                    >
                      <option value="">
                        {{
                          lang === "th"
                            ? "-- เลือกบริการ --"
                            : "-- Select Service --"
                        }}
                      </option>
                      <option
                        v-for="opt in serviceOptions"
                        :key="opt.value"
                        :value="opt.value"
                      >
                        {{ lang === "th" ? opt.th : opt.en }}
                      </option>
                    </select>
                  </div>

                  <!-- Message -->
                  <div>
                    <label
                      class="block text-sm font-medium text-neutral-700 mb-1.5"
                    >
                      {{
                        lang === "th"
                          ? "รายละเอียดเพิ่มเติม"
                          : "Additional Details"
                      }}
                    </label>
                    <textarea
                      v-model="form.message"
                      rows="4"
                      :placeholder="
                        lang === 'th'
                          ? 'บอกเล่าปัญหาหรือความต้องการของคุณ...'
                          : 'Describe your concerns or medical history...'
                      "
                      class="w-full px-4 py-2.5 rounded-xl border border-neutral-200 bg-white text-neutral-800 placeholder-neutral-400 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition resize-none"
                    />
                  </div>

                  <!-- Consent -->
                  <div>
                    <label class="flex items-start gap-3 cursor-pointer">
                      <input
                        v-model="form.consent"
                        type="checkbox"
                        :class="[
                          'mt-0.5 rounded border-neutral-300 text-brand-600 focus:ring-brand-500',
                          errors.consent ? 'ring-2 ring-red-400' : '',
                        ]"
                      />
                      <span class="text-sm text-neutral-600">
                        <template v-if="lang === 'th'">
                          ฉันยอมรับ
                          <NuxtLink
                            to="/#"
                            class="text-brand-600 hover:underline"
                            >นโยบายความเป็นส่วนตัว</NuxtLink
                          >
                          และยินยอมให้ติดต่อกลับ
                          <span class="text-red-500">*</span>
                        </template>
                        <template v-else>
                          I accept the
                          <NuxtLink
                            to="/#"
                            class="text-brand-600 hover:underline"
                            >Privacy Policy</NuxtLink
                          >
                          and consent to be contacted.
                          <span class="text-red-500">*</span>
                        </template>
                      </span>
                    </label>
                    <p
                      v-if="errors.consent"
                      class="mt-1.5 ml-6 text-xs text-red-500 flex items-center gap-1"
                    >
                      <svg
                        class="w-3 h-3 shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clip-rule="evenodd"
                        />
                      </svg>
                      {{
                        lang === "th"
                          ? "กรุณายินยอมให้ติดต่อกลับ"
                          : "Please consent to be contacted"
                      }}
                    </p>
                  </div>

                  <div
                    v-if="submitError"
                    class="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600"
                  >
                    {{ submitError }}
                  </div>

                  <button
                    type="submit"
                    :disabled="submitting"
                    class="btn-primary w-full justify-center py-3.5 text-base disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <span
                      v-if="submitting"
                      class="inline-flex items-center gap-2"
                    >
                      <span
                        class="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin"
                      />
                      {{ lang === "th" ? "กำลังส่ง..." : "Sending..." }}
                    </span>
                    <span v-else>
                      {{
                        lang === "th"
                          ? "ส่งข้อมูลนัดหมาย"
                          : "Submit Appointment Request"
                      }}
                    </span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="pb-12 bg-white">
      <div class="container-wide">
        <div
          class="relative rounded-2xl overflow-hidden shadow-md border border-neutral-100 group"
        >
          <div
            class="absolute top-4 right-4 z-10 transition-all duration-300 group-hover:scale-105"
          >
            <a
              href="https://maps.google.com/?q=All+Seasons+Place+Wireless+Road+Bangkok"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-2 bg-white/90 backdrop-blur-sm hover:bg-white text-neutral-800 text-xs font-medium px-4 py-2.5 rounded-xl shadow-lg transition-colors border border-neutral-200"
            >
              <svg
                class="w-4 h-4 text-brand-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                stroke-width="2.5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              {{ lang === "th" ? "เปิดใน Google Maps" : "Open in Google Maps" }}
            </a>
          </div>

          <iframe
            src="https://maps.google.com/maps?q=13.739665,100.547285&hl=th&z=15&amp;output=embed&amp;iwloc=near"
            class="w-full h-[350px] md:h-[400px] border-0 block"
            allowfullscreen="true"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>

          <div
            class="absolute bottom-0 left-0 right-0 h-16 bg-brand-600 z-10 border-t border-neutral-100 flex items-center px-6"
          >
            <a
              class="text-white text-xs font-medium tracking-wide hover:text-brand-100 transition-colors pointer-events-auto"
            >
              BANGKOK CENTRAL CLINIC, CHOT RATTANA MEDICAL SERVICE CO., LTD.
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── Success Dialog ─────────────────────────────────────── -->
    <Teleport to="body">
      <Transition name="dialog">
        <div
          v-if="showDialog"
          class="fixed inset-0 z-50 flex items-center justify-center p-4"
          @click.self="closeDialog"
        >
          <!-- Backdrop -->
          <div
            class="absolute inset-0 bg-black/50 backdrop-blur-sm"
            @click="closeDialog"
          />

          <!-- Dialog panel -->
          <div
            class="relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden"
            role="dialog"
            aria-modal="true"
          >
            <!-- Top decorative strip -->
            <div class="h-1.5 w-full bg-brand-400" />

            <div class="px-8 pt-8 pb-9 text-center">
              <!-- Animated checkmark -->
              <div class="relative w-20 h-20 mx-auto mb-6">
                <div
                  class="absolute inset-0 rounded-full bg-brand-100 animate-ping opacity-30"
                />
                <div
                  class="relative w-20 h-20 rounded-full bg-gradient-to-br from-brand-400 to-brand-500 flex items-center justify-center"
                >
                  <svg
                    class="w-9 h-9 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    stroke-width="2.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>

              <!-- Title -->
              <h3 class="font-serif text-2xl font-bold text-neutral-900 mb-2">
                {{ lang === "th" ? "ส่งข้อมูลสำเร็จ!" : "Request Received!" }}
              </h3>

              <!-- Subtitle -->
              <p
                class="text-neutral-500 text-sm leading-relaxed mb-6 max-w-xs mx-auto"
              >
                {{
                  lang === "th"
                    ? "ขอบคุณที่ไว้วางใจ BCC IVF Wellness ทีมงานจะติดต่อกลับภายใน 24 ชั่วโมง"
                    : "Thank you for trusting BCC IVF Wellness. Our coordinators will reach out within 24 hours."
                }}
              </p>

              <!-- Info pills -->
              <div class="flex justify-center gap-3 flex-wrap mb-7">
                <div
                  class="flex items-center gap-1.5 bg-brand-50 text-brand-700 text-xs font-medium px-3 py-1.5 rounded-full"
                >
                  <svg
                    class="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {{
                    lang === "th"
                      ? "ตอบกลับภายใน 24 ชม."
                      : "Reply within 24 hrs"
                  }}
                </div>
                <div
                  class="flex items-center gap-1.5 bg-sage-50 text-sage-700 text-xs font-medium px-3 py-1.5 rounded-full"
                >
                  <svg
                    class="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                  {{ lang === "th" ? "ข้อมูลปลอดภัย" : "Data protected" }}
                </div>
              </div>

              <!-- CTA button -->
              <button
                @click="closeDialog"
                class="w-full py-3.5 rounded-2xl bg-gradient-to-r bg-brand-600 text-white font-semibold text-sm transition-all duration-200 active:scale-[0.98]"
              >
                {{ lang === "th" ? "รับทราบ" : "Got it, thanks!" }}
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch } from "vue";

const lang = useLang();

useSeoMeta({
  title: computed(() =>
    lang.value === "th"
      ? "ติดต่อเรา | BCC IVF Wellness"
      : "Contact Us | BCC IVF Wellness",
  ),
  description: computed(() =>
    lang.value === "th"
      ? "ติดต่อนัดหมายปรึกษาแพทย์ IVF ฟรี ไม่มีค่าใช้จ่าย"
      : "Contact us to secure your complimentary IVF or fertility specialist consultation.",
  ),
});

/* ── Fallback data ──────────────────────────────────────────── */
const fallbackContact = [
  {
    key: "address",
    labelTh: "ที่อยู่",
    labelEn: "Address",
    valueTh:
      "87/3 อาคารออลซีซั่นส์เพลส ชั้น 1 ถนนวิทยุ ลุมพินี ปทุมวัน กทม 10330",
    valueEn:
      "87/3 All Seasons Place, 1st Floor, Wireless Road, Lumpini, Pathumwan, Bangkok 10330",
    href: "",
    icon: "map",
  },
  {
    key: "phone",
    labelTh: "โทรศัพท์",
    labelEn: "Phone",
    valueTh: "02-252-3420",
    valueEn: "02-252-3420",
    href: "tel:+6622523420",
    icon: "phone",
  },
  {
    key: "email",
    labelTh: "อีเมล",
    labelEn: "Email",
    valueTh: "info@bccivfwellness.com",
    valueEn: "info@bccivfwellness.com",
    href: "mailto:info@bccivfwellness.com",
    icon: "email",
  },
];

const fallbackHours = [
  {
    dayLabelTh: "จันทร์ – ศุกร์",
    dayLabelEn: "Monday – Friday",
    hoursTh: "08:00 – 18:00 น.",
    hoursEn: "08:00 AM – 06:00 PM",
    is_closed: 0,
  },
  {
    dayLabelTh: "เสาร์",
    dayLabelEn: "Saturday",
    hoursTh: "09:00 – 16:00 น.",
    hoursEn: "09:00 AM – 04:00 PM",
    is_closed: 0,
  },
  {
    dayLabelTh: "อาทิตย์ / วันหยุด",
    dayLabelEn: "Sunday / Holidays",
    hoursTh: "ปิดทำการ",
    hoursEn: "Closed",
    is_closed: 1,
  },
];

const serviceOptions = [
  {
    value: "IVF",
    th: "IVF (การปฏิสนธินอกร่างกาย)",
    en: "IVF (In Vitro Fertilization)",
  },
  {
    value: "IUI",
    th: "IUI (การผสมเทียม)",
    en: "IUI (Intrauterine Insemination)",
  },
  {
    value: "ICSI",
    th: "ICSI (การฉีดอสุจิเข้าไข่)",
    en: "ICSI (Intracytoplasmic Sperm Injection)",
  },
  {
    value: "Egg Freezing",
    th: "การแช่แข็งไข่",
    en: "Egg Freezing (Oocyte Preservation)",
  },
  {
    value: "PGT",
    th: "การตรวจพันธุกรรมตัวอ่อน (PGT)",
    en: "PGT (Preimplantation Genetic Testing)",
  },
  {
    value: "Consultation",
    th: "ปรึกษาเบื้องต้น",
    en: "General Infertility Consultation",
  },
];

/* ── API ────────────────────────────────────────────────────── */
const { data: contactData, pending: contactPending } = await useContactInfo();

const contactInfoList = computed(() => {
  const labelMapEn: Record<string, string> = {
    phone: "Phone",
    email: "Email",
    address: "Address",
  };

  const list = (contactData.value?.contactInfo || []).filter(
    (item: any) => item.key !== "line",
  );

  if (list.length > 0) {
    return list.map((item: any) => ({
      key: item.key,
      labelTh: item.label || item.label_th,
      labelEn: labelMapEn[item.key] || item.label_en || item.label,
      valueTh: item.value || item.value_th,
      valueEn: item.value_en || item.value,
      href: item.key === "address" ? "" : item.href,
      icon: item.icon,
    }));
  }

  return fallbackContact;
});

const businessHoursList = computed(() => {
  const list = contactData.value?.businessHours || [];
  if (list.length > 0) {
    return list.map((item: any) => ({
      dayLabelTh: item.day_label || item.day_label_th,
      dayLabelEn: item.day_label_en || item.day_label,
      hoursTh: item.hours || item.hours_th,
      hoursEn: item.hours_en || item.hours,
      is_closed: item.is_closed,
    }));
  }
  return fallbackHours;
});

/* ── Icons ──────────────────────────────────────────────────── */
const iconPaths: Record<string, string> = {
  map: '<path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>',
  address:
    '<path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>',
  phone:
    '<path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>',
  email:
    '<path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>',
  line: '<path stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>',
};

function getIcon(key: string) {
  return iconPaths[key] || iconPaths.phone;
}

/* ── Form ────────────────────────────────────────────────────── */
const showDialog = ref(false);
const submittedName = ref("");
const submittedPhone = ref("");

const form = reactive({
  name: "",
  phone: "",
  email: "",
  service: "",
  message: "",
  consent: false,
});

const errors = reactive({
  name: false,
  phone: false,
  email: false,
  consent: false,
});

function validate(): boolean {
  errors.name = !form.name.trim();
  const digitsOnly = form.phone.replace(/[\s\-()+]/g, "");
  errors.phone = !digitsOnly || !/^\d{9,15}$/.test(digitsOnly);
  errors.email =
    !!form.email.trim() &&
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim());

  errors.consent = !form.consent;
  return !errors.name && !errors.phone && !errors.email && !errors.consent;
}

// Clear errors as user fixes them
watch(
  () => form.phone,
  (newValue) => {
    if (!newValue) return;

    const hasPlus = newValue.startsWith("+") ? "+" : "";
    let digits = newValue.replace(/\D/g, "").slice(0, 12);

    if (digits.length <= 3) {
      form.phone = `${hasPlus}${digits}`;
    } else if (digits.length <= 6) {
      form.phone = `${hasPlus}${digits.slice(0, 3)}-${digits.slice(3)}`;
    } else if (digits.length <= 10) {
      form.phone = `${hasPlus}${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
    } else {
      // สำหรับเบอร์ต่างประเทศที่ยาว 11-12 หลัก จะหั่นเพิ่มอีกหนึ่งกรุ๊ปท้าย
      form.phone = `${hasPlus}${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6, 10)}-${digits.slice(10)}`;
    }
  },
);
watch(
  () => form.name,
  (v) => {
    if (v.trim()) errors.name = false;
  },
);
watch(
  () => form.phone,
  (v) => {
    const d = v.replace(/[\s\-()]/g, "");
    if (/^\d{9,10}$/.test(d)) errors.phone = false;
  },
);
watch(
  () => form.email,
  (v) => {
    if (!v.trim() || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()))
      errors.email = false;
  },
);
watch(
  () => form.consent,
  (v) => {
    if (v) errors.consent = false;
  },
);

const submitting = ref(false);
const submitError = ref("");

async function handleSubmit() {
  if (!validate()) return;
  submitting.value = true;
  submitError.value = "";
  try {
    await submitAppointment({
      name: form.name,
      phone: form.phone,
      email: form.email || undefined,
      service: form.service || undefined,
      message: form.message || undefined,
    });

    // Store values before reset
    submittedName.value = form.name;
    submittedPhone.value = form.phone;
    showDialog.value = true;

    // Reset form
    form.name = "";
    form.phone = "";
    form.email = "";
    form.service = "";
    form.message = "";
    form.consent = false;
    errors.name = false;
    errors.phone = false;
    errors.email = false;
    errors.consent = false;
  } catch (e: any) {
    submitError.value = e.message || "เกิดข้อผิดพลาด กรุณาลองใหม่";
  } finally {
    submitting.value = false;
  }
}

function closeDialog() {
  showDialog.value = false;
}
</script>

<style scoped>
/* Dialog entrance transition */
.dialog-enter-active {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.dialog-leave-active {
  transition: all 0.2s ease-in;
}
.dialog-enter-from {
  opacity: 0;
}
.dialog-leave-to {
  opacity: 0;
}
.dialog-enter-from .relative.bg-white {
  transform: scale(0.92) translateY(16px);
}
.dialog-enter-active .relative.bg-white {
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.dialog-leave-to .relative.bg-white {
  transform: scale(0.95) translateY(8px);
}
</style>
