<template>
  <div>
    <div class="lang-tabs">
      <button
        :class="[
          'lang-tab',
          { active: lang === 'th' },
          { 'has-error': errors.question || errors.answer },
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

    <div v-show="lang === 'th'">
      <div class="form-group">
        <label class="form-label"
          >คำถาม (TH) <span class="required">*</span></label
        >
        <input
          class="form-input"
          :class="{
            'border-red-500 focus:border-red-500 focus:ring-red-200':
              errors.question,
          }"
          v-model="form.question"
          placeholder="คำถามภาษาไทย"
          @input="clearFieldError('question')"
        />
        <p v-if="errors.question" class="text-red-500 text-xs mt-1 font-medium">
          {{ errors.question }}
        </p>
      </div>
      <div class="form-group">
        <label class="form-label"
          >คำตอบ (TH) <span class="required">*</span></label
        >
        <textarea
          class="form-textarea"
          :class="{
            'border-red-500 focus:border-red-500 focus:ring-red-200':
              errors.answer,
          }"
          v-model="form.answer"
          rows="5"
          placeholder="คำตอบภาษาไทย"
          @input="clearFieldError('answer')"
        />
        <p v-if="errors.answer" class="text-red-500 text-xs mt-1 font-medium">
          {{ errors.answer }}
        </p>
      </div>
    </div>

    <div v-show="lang === 'en'">
      <div class="form-group">
        <label class="form-label">Question (EN)</label>
        <input
          class="form-input"
          v-model="form.question_en"
          placeholder="คำถามภาษาอังกฤษ"
        />
      </div>
      <div class="form-group">
        <label class="form-label">Answer (EN)</label>
        <textarea
          class="form-textarea"
          v-model="form.answer_en"
          rows="5"
          placeholder="คำตอบภาษาอังกฤษ"
        />
      </div>
    </div>

    <div class="form-row">
      <div class="form-group">
        <label class="form-label">หมวดหมู่</label>
        <select
          class="form-input"
          v-model="form.category"
          @change="onCategoryChange"
        >
          <option value="" disabled>-- เลือกหมวดหมู่ --</option>
          <option v-for="cat in categories" :key="cat.id" :value="cat.name_th">
            {{ cat.name_th }}{{ cat.name_en ? ` · ${cat.name_en}` : "" }}
          </option>
        </select>
      </div>
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
  categories: { id: number | string; name_th: string; name_en: string }[];
}>();

const form = defineModel<{
  question: string;
  question_en: string;
  answer: string;
  answer_en: string;
  category: string;
  category_en: string;
  sort_order: number;
  status: string;
}>({ required: true });

const errors = reactive({
  question: "",
  answer: "",
});

function onCategoryChange() {
  const selected = props.categories.find(
    (c) => c.name_th === form.value.category,
  );
  form.value.category_en = selected?.name_en || "";
}

const clearFieldError = (field: keyof typeof errors) => {
  errors[field] = "";
};

const clearAllErrors = () => {
  errors.question = "";
  errors.answer = "";
};

const scrollToFirstError = () => {
  const firstErrorElement = document.querySelector(".text-red-500");
  if (firstErrorElement) {
    firstErrorElement.scrollIntoView({ behavior: "smooth", block: "center" });
  }
};

const validateForm = () => {
  let isValid = true;
  errors.question = "";
  errors.answer = "";

  if (!form.value.question || !form.value.question.trim()) {
    errors.question = "กรุณากรอกคำถามภาษาไทย";
    isValid = false;
  }

  if (!form.value.answer || !form.value.answer.trim()) {
    errors.answer = "กรุณากรอกคำตอบภาษาไทย";
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
