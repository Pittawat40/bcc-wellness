<template>
  <div>
    <!-- Language Tabs -->
    <div class="lang-tabs">
      <button :class="['lang-tab', { active: lang === 'th' }]" @click="lang = 'th'">
        🇹🇭 ภาษาไทย
      </button>
      <button :class="['lang-tab', { active: lang === 'en' }]" @click="lang = 'en'">
        🇬🇧 English
      </button>
    </div>

    <div v-show="lang === 'th'">
      <div class="form-group">
        <label class="form-label">คำถาม (TH) <span class="required">*</span></label>
        <input class="form-input" v-model="form.question" placeholder="คำถามภาษาไทย" />
      </div>
      <div class="form-group">
        <label class="form-label">คำตอบ (TH) <span class="required">*</span></label>
        <textarea class="form-textarea" v-model="form.answer" rows="5" placeholder="คำตอบภาษาไทย" />
      </div>
    </div>

    <div v-show="lang === 'en'">
      <div class="form-group">
        <label class="form-label">Question (EN)</label>
        <input class="form-input" v-model="form.question_en" placeholder="Question in English" />
      </div>
      <div class="form-group">
        <label class="form-label">Answer (EN)</label>
        <textarea class="form-textarea" v-model="form.answer_en" rows="5" placeholder="Answer in English" />
      </div>
    </div>

    <div class="form-row">
      <div class="form-group">
        <label class="form-label">หมวดหมู่</label>
        <select class="form-input" v-model="form.category">
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
import { ref } from "vue";

const lang = ref<"th" | "en">("th");

defineProps<{
  categories: { id: number | string; name_th: string; name_en: string }[];
}>();

const form = defineModel<{
  question: string;
  question_en: string;
  answer: string;
  answer_en: string;
  category: string;
  sort_order: number;
  status: string;
}>({ required: true });
</script>

<style scoped>
.required { color: #ef4444; }
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
</style>
