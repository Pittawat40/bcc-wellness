<template>
  <div
    class="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
  >
    <div
      class="pt-6 pb-0 flex flex-col items-center bg-gradient-to-b from-gray-50/50 to-white"
    >
      <div class="form-group flex flex-col items-center shrink-0 w-full">
        <label
          class="text-gray-500 text-xs uppercase tracking-widest mb-4 font-bold"
        >
          รูปภาพโปรไฟล์ <span class="required">*</span>
        </label>

        <div class="relative group/container">
          <div
            class="avatar-preview-wrapper relative w-48 h-48 rounded-full overflow-hidden border-4 bg-white flex items-center justify-center cursor-pointer shadow-xl group transition-all duration-300 ring-1 hover:ring-brand-200"
            :class="
              errors.photo
                ? 'border-red-500 ring-red-200 shadow-red-100'
                : 'border-white ring-gray-100'
            "
            @click="triggerUpload"
          >
            <img
              :src="displayImage"
              alt="Doctor"
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div
              class="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <i class="bi bi-camera-fill text-2xl mb-1"></i>
              <span class="text-[11px] font-semibold tracking-wide"
                >เลือกรูปภาพ</span
              >
            </div>
          </div>

          <button
            v-if="hasImage"
            type="button"
            @click="handleRemoveImage"
            class="absolute top-2 right-2 w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-md transition-all duration-200 hover:scale-105 active:scale-95 z-10"
            title="ลบรูปภาพ"
          >
            <i class="bi bi-trash-fill text-sm"></i>
          </button>
        </div>

        <p
          class="text-[11px] mt-4 italic font-light"
          :class="
            errors.photo
              ? 'text-red-500 font-medium scale-105 transition-all'
              : 'text-gray-400'
          "
        >
          {{ errors.photo || "* ขนาดไม่เกิน 2MB" }}
        </p>

        <input
          type="file"
          class="hidden"
          ref="photoRef"
          accept="image/*"
          @change="handleFileChange"
        />
      </div>
    </div>

    <div class="px-8">
      <div class="lang-tabs justify-center">
        <button
          :class="[
            'lang-tab',
            { active: lang === 'th' },
            { 'has-error': errors.name },
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
    </div>

    <div class="px-8 pb-10">
      <Transition name="fade" mode="out-in">
        <div v-if="lang === 'th'" key="th" class="lang-panel space-y-5">
          <div class="form-group">
            <label class="form-label font-semibold text-gray-700"
              >ชื่อแพทย์ (TH) <span class="required">*</span></label
            >
            <input
              class="form-input w-full"
              :class="{
                'border-red-500 focus:border-red-500 focus:ring-red-200':
                  errors.name,
              }"
              v-model="form.name"
              placeholder="รศ.ดร.นพ. ชื่อ นามสกุล"
              @input="clearFieldError('name')"
            />
            <p v-if="errors.name" class="text-red-500 text-xs mt-1 font-medium">
              {{ errors.name }}
            </p>
          </div>
          <div class="form-group">
            <label class="form-label font-semibold text-gray-700"
              >ตำแหน่ง (TH)</label
            >
            <input
              class="form-input w-full"
              v-model="form.title"
              placeholder="แพทย์ผู้เชี่ยวชาญด้าน..."
            />
          </div>
          <div class="form-group">
            <label class="form-label font-semibold text-gray-700"
              >ประวัติย่อ (TH)</label
            >
            <textarea
              class="form-input w-full resize-none"
              v-model="form.bio"
              rows="3"
              placeholder="รายละเอียดประวัติย่อ..."
            />
          </div>
          <div class="form-group">
            <label class="form-label font-semibold text-gray-700"
              >การศึกษา (1 บรรทัดต่อ 1 รายการ)</label
            >
            <textarea
              class="form-input w-full resize-none font-light text-sm"
              v-model="form.educationText"
              rows="4"
              placeholder="ระบุวุฒิการศึกษา..."
            />
          </div>
        </div>

        <div v-else key="en" class="lang-panel space-y-5">
          <div class="form-group">
            <label class="form-label font-semibold text-gray-700"
              >Doctor Name (EN)</label
            >
            <input
              class="form-input w-full"
              v-model="form.name_en"
              placeholder="Assoc.Prof.Dr. Firstname Lastname"
            />
          </div>
          <div class="form-group">
            <label class="form-label font-semibold text-gray-700"
              >Title / Position (EN)</label
            >
            <input
              class="form-input w-full"
              v-model="form.title_en"
              placeholder="Medical Specialist in..."
            />
          </div>
          <div class="form-group">
            <label class="form-label font-semibold text-gray-700"
              >Biography (EN)</label
            >
            <textarea
              class="form-input w-full resize-none"
              v-model="form.bio_en"
              rows="3"
              placeholder="Brief biography..."
            />
          </div>
          <div class="form-group">
            <label class="form-label font-semibold text-gray-700"
              >Education (One per line)</label
            >
            <textarea
              class="form-input w-full resize-none font-light text-sm"
              v-model="form.educationTextEn"
              rows="4"
              placeholder="Doctor of Medicine..."
            />
          </div>
        </div>
      </Transition>

      <div class="mt-8 pt-8 border-t border-gray-100">
        <div class="form-group">
          <label
            class="form-label font-bold text-brand-600 flex items-center gap-2"
          >
            ความเชี่ยวชาญพิเศษ (คั่นด้วยจุลภาค `,`)
          </label>
          <input
            class="form-input w-full bg-gray-50/50 border-dashed focus:bg-white"
            v-model="form.specialtiesText"
            placeholder="เช่น IVF, ICSI, PGT"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, nextTick } from "vue";
import { useAssets } from "@/composables/useAssets";

const { getFullUrl } = useAssets();
const lang = ref<"th" | "en">("th");

const form = defineModel<{
  name: string;
  name_en: string;
  title: string;
  title_en: string;
  bio: string;
  bio_en: string;
  educationText: string;
  educationTextEn: string;
  specialtiesText: string;
  photo?: string | null;
}>({ required: true });

const errors = reactive({
  name: "",
  photo: "",
});

const photoRef = ref<HTMLInputElement>();
const imagePreview = ref<string | null>(null);
const DEFAULT_AVATAR =
  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

const hasImage = computed(() => {
  return !!imagePreview.value || !!form.value.photo;
});

const displayImage = computed(() => {
  if (imagePreview.value) return imagePreview.value;
  if (form.value.photo) return getFullUrl(form.value.photo);
  return DEFAULT_AVATAR;
});

const triggerUpload = () => photoRef.value?.click();

const handleFileChange = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    if (file.size > 2 * 1024 * 1024) {
      errors.photo = "ขนาดไฟล์รูปภาพโปรไฟล์ต้องไม่เกิน 2MB";
      handleRemoveImage();
      nextTick(() => scrollToFirstError());
      return;
    }

    errors.photo = "";
    if (imagePreview.value) URL.revokeObjectURL(imagePreview.value);
    imagePreview.value = URL.createObjectURL(file);
  }
};

const handleRemoveImage = () => {
  if (imagePreview.value) {
    URL.revokeObjectURL(imagePreview.value);
    imagePreview.value = null;
  }
  form.value.photo = null;

  if (photoRef.value) {
    photoRef.value.value = "";
  }
};

const clearFieldError = (field: keyof typeof errors) => {
  errors[field] = "";
};

const clearAllErrors = () => {
  errors.name = "";
  errors.photo = "";
};

const scrollToFirstError = () => {
  const firstErrorElement = document.querySelector(
    ".text-red-500, .border-red-500",
  );
  if (firstErrorElement) {
    firstErrorElement.scrollIntoView({ behavior: "smooth", block: "center" });
  }
};

const validateForm = () => {
  let isValid = true;
  errors.name = "";
  errors.photo = "";

  if (!hasImage.value) {
    errors.photo = "กรุณาเลือกรูปภาพโปรไฟล์ของแพทย์";
    isValid = false;
  }

  if (!form.value.name || !form.value.name.trim()) {
    errors.name = "กรุณากรอกชื่อแพทย์ภาษาไทย";
    isValid = false;
  }

  if (!isValid) {
    if (errors.name) {
      lang.value = "th";
    }

    nextTick(() => {
      setTimeout(() => {
        scrollToFirstError();
      }, 150);
    });
  }

  return isValid;
};

defineExpose({
  photoRef,
  validateForm,
  clearAllErrors,
  hasImage,
});
</script>

<style scoped>
.lang-tabs {
  display: flex;
  gap: 12px;
  border-bottom: 2px solid #f9fafb;
  margin-bottom: 30px;
}
.lang-tab {
  padding: 12px 24px;
  font-size: 0.9rem;
  font-weight: 500;
  color: #9ca3af;
  cursor: pointer;
  transition: all 0.2s ease;
  border-bottom: 2px solid transparent;
  margin-bottom: -2px;
}
.lang-tab.active {
  color: #d86d28; /* สีส้ม Brand */
  border-bottom-color: #d86d28;
  font-weight: 700;
}
.lang-tab.has-error {
  border-bottom-color: #ef4444;
  color: #ef4444;
}
.lang-tab:hover:not(.active) {
  color: #6b7280;
  border-bottom-color: #e5e7eb;
}

.form-input {
  border: 1px solid #e5e7eb;
  padding: 12px 16px;
  border-radius: 10px;
  transition: all 0.2s;
}
.form-input:focus {
  outline: none;
  border-color: #d86d28;
  box-shadow: 0 0 0 4px rgba(216, 109, 40, 0.1);
}
.form-input.border-red-500 {
  border-color: #ef4444 !important;
}
.form-input.border-red-500:focus {
  box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.1) !important;
}

.required {
  color: #ef4444;
}

/* Transition effects */
.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}
.fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
