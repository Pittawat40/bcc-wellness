<template>
  <div>
    <div class="lang-tabs">
      <button :class="['lang-tab', { active: lang === 'th' }]" @click="lang = 'th'">🇹🇭 ภาษาไทย</button>
      <button :class="['lang-tab', { active: lang === 'en' }]" @click="lang = 'en'">🇬🇧 English</button>
    </div>

    <div class="form-row">
      <div v-show="lang === 'th'" class="form-group">
        <label class="form-label">ชื่อผู้รีวิว (TH) <span class="required">*</span></label>
        <input class="form-input" v-model="form.author_name" />
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
      <label class="form-label">เนื้อหารีวิว (TH) <span class="required">*</span></label>
      <textarea class="form-textarea" v-model="form.content" rows="5" placeholder="เนื้อหารีวิวภาษาไทย..." />
    </div>
    <div v-show="lang === 'en'" class="form-group mb-4">
      <label class="form-label">Review Content (EN)</label>
      <textarea class="form-textarea" v-model="form.content_en" rows="5" placeholder="Review content in English..." />
    </div>

    <div class="form-row">
      <div class="form-group">
        <label class="form-label">คะแนน</label>
        <select class="form-input" v-model="form.rating">
          <option v-for="n in [5, 4, 3, 2, 1]" :key="n" :value="n">{{ "★".repeat(n) }}</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">หมวดหมู่</label>
        <select class="form-input" v-model="form.category">
          <option value="" disabled>-- เลือกหมวดหมู่ --</option>
          <option v-for="cat in categories" :key="cat.id" :value="cat.name_th">
            {{ cat.name_th }}{{ cat.name_en ? ` · ${cat.name_en}` : "" }}
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
import { ref } from "vue";

const lang = ref<"th" | "en">("th");

defineProps<{
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
  status: string;
  is_featured: boolean;
}>({ required: true });
</script>

<style scoped>
.required { color: #ef4444; }
.lang-tabs { display: flex; gap: 4px; border-bottom: 1px solid #e5e7eb; margin-bottom: 12px; }
.lang-tab { padding: 7px 16px; border-radius: 8px 8px 0 0; border: 1px solid transparent; background: transparent; font-size: 0.82rem; font-weight: 500; color: #6b7280; cursor: pointer; margin-bottom: -1px; }
.lang-tab.active { background: #fff; border-color: #e5e7eb; border-bottom-color: #fff; color: #111827; font-weight: 600; }
</style>
