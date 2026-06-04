<template>
  <div class="max-w-3xl mx-auto bg-white rounded-xl shadow-sm">
    <div class="lang-tabs">
      <button
        :class="[
          'lang-tab',
          { active: lang === 'th' },
          { 'has-error': errors.title },
        ]"
        @click="lang = 'th'"
      >
        🇹🇭 ภาษาไทย
      </button>
      <button
        :class="['lang-tab', { active: lang === 'en' }]"
        @click="lang = 'en'"
      >
        🇬🇧 English
      </button>
    </div>

    <div v-show="lang === 'th'" class="lang-panel">
      <div class="form-group mb-4">
        <label class="form-label font-medium"
          >ชื่อวิดีโอ (TH) <span class="required">*</span></label
        >
        <input
          class="form-input w-full"
          :class="{
            'border-red-500 focus:border-red-500 focus:ring-red-200':
              errors.title,
          }"
          v-model="form.title"
          placeholder="กรุณาใส่ชื่อวิดีโอภาษาไทย"
          @input="clearFieldError('title')"
        />
        <p v-if="errors.title" class="text-red-500 text-xs mt-1 font-medium">
          {{ errors.title }}
        </p>
      </div>
      <div class="form-group mb-4">
        <label class="form-label font-medium">คำอธิบาย (TH)</label>
        <textarea
          class="form-input w-full resize-none"
          v-model="form.description"
          rows="3"
          placeholder="คำอธิบายวิดีโอภาษาไทย"
        />
      </div>
    </div>
    <div v-show="lang === 'en'" class="lang-panel">
      <div class="form-group mb-4">
        <label class="form-label font-medium">Video Title (EN)</label>
        <input
          class="form-input w-full"
          v-model="form.title_en"
          placeholder="กรุณาใส่ชื่อวิดีโอภาษาอังกฤษ"
        />
      </div>
      <div class="form-group mb-4">
        <label class="form-label font-medium">Description (EN)</label>
        <textarea
          class="form-input w-full resize-none"
          v-model="form.description_en"
          rows="3"
          placeholder="คำอธิบายวิดีโอภาษาอังกฤษ"
        />
      </div>
    </div>

    <div class="form-group mb-4">
      <label class="form-label font-medium"
        >URL วิดีโอ <span class="required">*</span></label
      >
      <input
        class="form-input w-full"
        :class="{
          'border-red-500 focus:border-red-500 focus:ring-red-200': errors.url,
        }"
        v-model="form.url"
        type="url"
        placeholder="https://youtube.com/watch?v=..."
        @input="clearFieldError('url')"
      />
      <p v-if="errors.url" class="text-red-500 text-xs mt-1 font-medium">
        {{ errors.url }}
      </p>
    </div>

    <div class="form-group mb-4">
      <label class="form-label font-medium">สถานะ</label>
      <select class="form-input w-full" v-model="form.status">
        <option value="published">เผยแพร่</option>
        <option value="hidden">ซ่อน</option>
      </select>
    </div>

    <div class="form-group mb-4">
      <label class="form-label font-medium"
        >รูปปกวิดีโอ <span class="required">*</span></label
      >
      <div
        v-if="thumbUrl"
        class="relative aspect-video w-full border rounded-lg overflow-hidden bg-gray-50"
        :class="errors.thumb ? 'border-red-500' : 'border-gray-200'"
      >
        <img
          :src="thumbUrl"
          alt="Thumbnail"
          class="w-full h-full object-cover"
        />
        <button
          type="button"
          @click="removeThumb"
          class="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white w-9 h-9 rounded-full flex items-center justify-center shadow transition-colors"
        >
          <i class="bi bi-trash-fill text-sm"></i>
        </button>
      </div>
      <div
        v-else
        class="aspect-video w-full flex flex-col items-center justify-center border-2 border-dashed rounded-lg cursor-pointer hover:border-emerald-500 hover:bg-slate-50 transition-all"
        :class="errors.thumb ? 'border-red-400 bg-red-50' : 'border-gray-300'"
        @click="triggerUpload"
      >
        <i
          class="bi bi-cloud-upload text-3xl mb-2"
          :class="errors.thumb ? 'text-red-400' : 'text-gray-400'"
        ></i>
        <span
          class="text-sm font-medium"
          :class="errors.thumb ? 'text-red-500' : 'text-gray-500'"
          >คลิกเพื่ออัพโหลดรูปภาพ</span
        >
        <span class="text-gray-400 text-xs mt-1"
          >16:9 แนะนำ 1280x720px ไม่เกิน 5MB</span
        >
      </div>
      <p v-if="errors.thumb" class="text-red-500 text-xs mt-1 font-medium">
        {{ errors.thumb }}
      </p>
      <input
        type="file"
        class="hidden"
        ref="thumbRef"
        accept="image/*"
        @change="handleFileChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, nextTick } from "vue";

const lang = ref<"th" | "en">("th");
const form = defineModel<{
  title: string;
  title_en: string;
  description: string;
  description_en: string;
  url: string;
  status: string;
}>({ required: true });

const errors = reactive({
  title: "",
  url: "",
  thumb: "",
});

const thumbRef = ref<HTMLInputElement>();
const thumbUrl = ref<string | null>(null);

const triggerUpload = () => thumbRef.value?.click();

const handleFileChange = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (!file) return;

  if (file.size > 5 * 1024 * 1024) {
    errors.thumb = "ขนาดไฟล์รูปปกห้ามเกิน 5MB";
    thumbUrl.value = null;
    if (thumbRef.value) thumbRef.value.value = "";

    nextTick(() => {
      scrollToFirstError();
    });
    return;
  }

  errors.thumb = "";
  const r = new FileReader();
  r.onload = (e) => {
    thumbUrl.value = e.target?.result as string;
  };
  r.readAsDataURL(file);
};

const removeThumb = () => {
  thumbUrl.value = null;
  errors.thumb = "";
  if (thumbRef.value) thumbRef.value.value = "";
};

const clearFieldError = (field: keyof typeof errors) => {
  errors[field] = "";
};

const clearAllErrors = () => {
  errors.title = "";
  errors.url = "";
  errors.thumb = "";
};

const scrollToFirstError = () => {
  const firstErrorElement = document.querySelector(".text-red-500");
  if (firstErrorElement) {
    firstErrorElement.scrollIntoView({ behavior: "smooth", block: "center" });
  }
};

const validateForm = () => {
  let isValid = true;
  errors.title = "";
  errors.url = "";
  errors.thumb = "";

  if (!form.value.title || !form.value.title.trim()) {
    errors.title = "กรุณากรอกชื่อวิดีโอภาษาไทย";
    isValid = false;
  }

  if (!form.value.url || !form.value.url.trim()) {
    errors.url = "กรุณากรอก URL วิดีโอ";
    isValid = false;
  }

  if (!thumbUrl.value) {
    errors.thumb = "กรุณาอัปโหลดรูปปกวิดีโอ";
    isValid = false;
  }

  if (!isValid) {
    if (errors.title) {
      lang.value = "th";
    }

    nextTick(() => {
      scrollToFirstError();
    });
  }

  return isValid;
};

defineExpose({
  thumbRef,
  validateForm,
  clearAllErrors,
  thumbUrl,
});
</script>

<style scoped>
.lang-tabs {
  display: flex;
  gap: 4px;
  border-bottom: 1px solid #e5e7eb;
  margin-bottom: 16px;
}
.lang-tab {
  padding: 8px 20px;
  border-radius: 8px 8px 0 0;
  border: 1px solid transparent;
  background: transparent;
  font-size: 0.85rem;
  font-weight: 500;
  color: #6b7280;
  cursor: pointer;
  margin-bottom: -1px;
}
.lang-tab.active {
  background: #fff;
  border-color: #e5e7eb;
  border-bottom-color: #fff;
  color: #111827;
  font-weight: 600;
}
.lang-tab.has-error {
  border-top: 2px solid #ef4444;
  color: #ef4444;
}
.lang-panel {
  padding: 0 2px;
}
.required {
  color: #ef4444;
}
</style>
