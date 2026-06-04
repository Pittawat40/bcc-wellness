<template>
  <div class="modal-overlay" @click.self="emit('close')">
    <div class="modal" style="max-width: 540px">
      <div class="modal-header">
        <h3 class="modal-title"><i class="bi bi-tags me-2"></i>จัดการหมวดหมู่ FAQ</h3>
        <button class="btn-icon" @click="emit('close')">
          <i class="bi bi-x-lg"></i>
        </button>
      </div>

      <div class="modal-body">
        <!-- Add row -->
        <div class="add-row">
          <input
            class="form-input"
            v-model="newTh"
            placeholder="ชื่อหมวดหมู่ (TH) *"
            @keyup.enter="addCategory"
          />
          <input
            class="form-input"
            v-model="newEn"
            placeholder="Category name (EN)"
            @keyup.enter="addCategory"
          />
          <button class="btn btn-primary btn-sm" @click="addCategory" :disabled="!newTh.trim() || saving">
            <i class="bi bi-plus-lg"></i> เพิ่ม
          </button>
        </div>

        <div v-if="msg" :class="['alert', msgType, 'mb-3']">{{ msg }}</div>

        <!-- List -->
        <div class="cat-list">
          <div v-if="loading" class="loading-state" style="padding: 24px 0">
            <div class="loading-dot" /><div class="loading-dot" /><div class="loading-dot" />
          </div>
          <template v-else>
            <div v-if="!categories.length" style="text-align:center; padding: 32px 0; color: #9ca3af; font-size: 0.875rem">
              ยังไม่มีหมวดหมู่ กรอกด้านบนเพื่อเพิ่ม
            </div>
            <div v-for="cat in categories" :key="cat.id" class="cat-row">
              <template v-if="editingId === cat.id">
                <input class="form-input" v-model="editTh" placeholder="TH *" @keyup.enter="saveEdit(cat)" />
                <input class="form-input" v-model="editEn" placeholder="EN" @keyup.enter="saveEdit(cat)" />
                <button class="btn btn-primary btn-sm" @click="saveEdit(cat)" :disabled="!editTh.trim()">
                  <i class="bi bi-floppy"></i>
                </button>
                <button class="btn btn-ghost btn-sm" @click="editingId = null">
                  <i class="bi bi-x"></i>
                </button>
              </template>
              <template v-else>
                <div class="cat-name">
                  <span class="cat-th">{{ cat.name_th }}</span>
                  <span v-if="cat.name_en" class="cat-en">{{ cat.name_en }}</span>
                </div>
                <div style="display:flex; gap:6px; margin-left:auto; flex-shrink:0">
                  <button class="btn-icon" @click="startEdit(cat)" title="แก้ไข">
                    <i class="bi bi-pencil"></i>
                  </button>
                  <button class="btn-icon btn-icon-danger" @click="emit('delete-category', cat.id)" title="ลบ">
                    <i class="bi bi-trash3"></i>
                  </button>
                </div>
              </template>
            </div>
          </template>
        </div>
      </div>

      <div class="modal-footer">
        <button class="btn btn-ghost" @click="emit('close')">ปิด</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

defineProps<{
  categories: { id: number | string; name_th: string; name_en: string }[];
  loading: boolean;
  saving?: boolean;
  msg?: string;
  msgType?: string;
}>();

const emit = defineEmits<{
  (e: "close"): void;
  (e: "add-category", payload: { name_th: string; name_en: string }): void;
  (e: "update-category", payload: { id: number | string; name_th: string; name_en: string }): void;
  (e: "delete-category", id: number | string): void;
}>();

const newTh = ref("");
const newEn = ref("");
const editingId = ref<number | string | null>(null);
const editTh = ref("");
const editEn = ref("");

function addCategory() {
  if (!newTh.value.trim()) return;
  emit("add-category", { name_th: newTh.value.trim(), name_en: newEn.value.trim() });
  newTh.value = "";
  newEn.value = "";
}

function startEdit(cat: any) {
  editingId.value = cat.id;
  editTh.value = cat.name_th;
  editEn.value = cat.name_en || "";
}

function saveEdit(cat: any) {
  if (!editTh.value.trim()) return;
  emit("update-category", { id: cat.id, name_th: editTh.value.trim(), name_en: editEn.value.trim() });
  editingId.value = null;
}
</script>

<style scoped>
.add-row {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
  align-items: center;
}
.add-row .form-input { flex: 1; min-width: 0; }

.cat-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 340px;
  overflow-y: auto;
}

.cat-row {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: #fafafa;
}
.cat-row .form-input { flex: 1; min-width: 0; }

.cat-name { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
.cat-th { font-size: 0.875rem; font-weight: 600; color: #111827; }
.cat-en { font-size: 0.75rem; color: #6b7280; }

.me-2 { margin-right: 0.5rem; }
.mb-3 { margin-bottom: 0.75rem; }
</style>
