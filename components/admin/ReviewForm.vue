<template>
  <div>
    <div class="lang-tabs">
      <button
        :class="[
          'lang-tab',
          { active: lang === 'th' },
          { 'has-error': errors.author_name || errors.content },
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

    <div class="form-row">
      <div v-show="lang === 'th'" class="form-group">
        <label class="form-label"
          >ชื่อผู้รีวิว (TH) <span class="required">*</span></label
        >
        <input
          class="form-input"
          :class="{
            'border-red-500 focus:border-red-500 focus:ring-red-200':
              errors.author_name,
          }"
          v-model="form.author_name"
          @input="clearFieldError('author_name')"
        />
        <p
          v-if="errors.author_name"
          class="text-red-500 text-xs mt-1 font-medium"
        >
          {{ errors.author_name }}
        </p>
      </div>
      <div v-show="lang === 'en'" class="form-group">
        <label class="form-label">ชื่อผู้รีวิว (EN)</label>
        <input class="form-input" v-model="form.author_name_en" />
      </div>
      <div class="form-group">
        <label class="form-label">วันที่รีวิว</label>
        <input class="form-input" type="date" v-model="form.date" />
      </div>
    </div>

    <div v-show="lang === 'th'" class="form-group mb-4">
      <label class="form-label"
        >เนื้อหารีวิว (TH) <span class="required">*</span></label
      >
      <textarea
        class="form-textarea"
        :class="{
          'border-red-500 focus:border-red-500 focus:ring-red-200':
            errors.content,
        }"
        v-model="form.content"
        rows="5"
        placeholder="เนื้อหารีวิวภาษาไทย..."
        @input="clearFieldError('content')"
      />
      <p v-if="errors.content" class="text-red-500 text-xs mt-1 font-medium">
        {{ errors.content }}
      </p>
    </div>
    <div v-show="lang === 'en'" class="form-group mb-4">
      <label class="form-label">Review Content (EN)</label>
      <textarea
        class="form-textarea"
        v-model="form.content_en"
        rows="5"
        placeholder="Review content in English..."
      />
    </div>

    <div class="form-row">
      <div class="form-group">
        <label class="form-label">คะแนน</label>
        <select class="form-input" v-model="form.rating">
          <option v-for="n in [5, 4, 3, 2, 1]" :key="n" :value="n">
            {{ "★".repeat(n) }}
          </option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">หมวดหมู่</label>
        <select
          class="form-input"
          v-model="form.category"
          @change="onCategoryChange"
        >
          <option value="" disabled>-- เลือกหมวดหมู่ --</option>
          <option v-for="cat in categories" :key="cat.id" :value="cat.name_th">
            {{ cat.name_th
            }}{{
              cat.name_en && cat.name_en !== cat.name_th
                ? ` · ${cat.name_en}`
                : ""
            }}
          </option>
        </select>
      </div>
    </div>

    <div class="form-row">
      <div class="form-group">
        <label class="form-label">สถานะ</label>
        <select class="form-input" v-model="form.status">
          <option value="published">เผยแพร่</option>
          <option value="hidden">ซ่อน</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, nextTick } from "vue";

const lang = ref<"th" | "en">("th");

const props = defineProps<{
  categories?: { id: number | string; name_th: string; name_en: string }[];
}>();

const form = defineModel<{
  author_name: string;
  author_name_en: string;
  date: string;
  content: string;
  content_en: string;
  rating: number;
  category: string;
  category_en: string;
  status: string;
}>({ required: true });

const errors = reactive({
  author_name: "",
  content: "",
});

function onCategoryChange() {
  if (!props.categories) return;
  const selected = props.categories.find(
    (c) => c.name_th === form.value.category,
  );
  form.value.category_en = selected?.name_en || "";
  console.log(form.value);
}

const clearFieldError = (field: keyof typeof errors) => {
  errors[field] = "";
};

const clearAllErrors = () => {
  errors.author_name = "";
  errors.content = "";
};

const scrollToFirstError = () => {
  const firstErrorElement = document.querySelector(".text-red-500");
  if (firstErrorElement) {
    firstErrorElement.scrollIntoView({ behavior: "smooth", block: "center" });
  }
};

const validateForm = () => {
  let isValid = true;
  errors.author_name = "";
  errors.content = "";

  if (!form.value.author_name || !form.value.author_name.trim()) {
    errors.author_name = "กรุณากรอกชื่อผู้รีวิวภาษาไทย";
    isValid = false;
  }

  if (!form.value.content || !form.value.content.trim()) {
    errors.content = "กรุณากรอกเนื้อหารีวิวภาษาไทย";
    isValid = false;
  }

  if (!isValid) {
    lang.value = "th";

    nextTick(() => {
      scrollToFirstError();
    });
  }

  return isValid;
};

defineExpose({
  validateForm,
  clearAllErrors,
});
</script>

<style scoped>
.required {
  color: #ef4444;
}
.lang-tabs {
  display: flex;
  gap: 4px;
  border-bottom: 1px solid #e5e7eb;
  margin-bottom: 12px;
}
.lang-tab {
  padding: 7px 16px;
  border-radius: 8px 8px 0 0;
  border: 1px solid transparent;
  background: transparent;
  font-size: 0.82rem;
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
.form-input.border-red-500,
.form-textarea.border-red-500 {
  border-color: #ef4444 !important;
}
</style>
