<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="open" class="cat-overlay" @click.self="emit('close')">
        <div class="cat-dialog">
          <!-- Header -->
          <div class="cat-header">
            <h3 class="cat-title">
              <i class="bi bi-tags"></i> จัดการหมวดหมู่บทความ
            </h3>
            <button class="cat-close" @click="emit('close')">
              <i class="bi bi-x-lg"></i>
            </button>
          </div>

          <!-- Body -->
          <div class="cat-body">
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
                placeholder="ชื่อหมวดหมู่ (EN) *"
                @keyup.enter="addCategory"
              />
              <button
                class="btn btn-primary"
                @click="addCategory"
                :disabled="!newTh.trim() || !newEn.trim() || saving"
              >
                <i class="bi bi-plus-lg"></i> เพิ่ม
              </button>
            </div>

            <div
              v-if="msg"
              :class="['alert', msgType]"
              style="margin-bottom: 12px"
            >
              {{ msg }}
            </div>

            <div class="cat-list">
              <div v-if="loading" class="loading-state" style="padding: 24px 0">
                <div class="loading-dot" />
                <div class="loading-dot" />
                <div class="loading-dot" />
              </div>
              <template v-else>
                <div v-if="!categories.length" class="cat-empty">
                  ยังไม่มีหมวดหมู่ กรอกด้านบนเพื่อเพิ่ม
                </div>
                <div v-for="cat in categories" :key="cat.id" class="cat-row">
                  <template v-if="editingId === cat.id">
                    <input
                      class="form-input"
                      v-model="editTh"
                      placeholder="TH *"
                      @keyup.enter="saveEdit(cat)"
                    />
                    <input
                      class="form-input"
                      v-model="editEn"
                      placeholder="EN"
                      @keyup.enter="saveEdit(cat)"
                    />
                    <button
                      class="btn btn-primary btn-sm"
                      @click="saveEdit(cat)"
                      :disabled="!editTh.trim()"
                    >
                      <i class="bi bi-floppy"></i>
                    </button>
                    <button
                      class="btn btn-ghost btn-sm"
                      @click="editingId = null"
                    >
                      <i class="bi bi-x"></i>
                    </button>
                  </template>
                  <template v-else>
                    <div class="cat-name">
                      <span class="cat-th">{{ cat.name_th }}</span>
                      <span v-if="cat.name_en" class="cat-en">{{
                        cat.name_en
                      }}</span>
                      <span v-if="cat.slug" class="cat-slug">{{
                        cat.slug
                      }}</span>
                    </div>
                    <div class="cat-actions">
                      <button class="btn-icon" @click="startEdit(cat)">
                        <i class="bi bi-pencil"></i>
                      </button>
                      <button
                        class="btn-icon btn-icon-danger"
                        @click="emit('delete-category', cat.id)"
                      >
                        <i class="bi bi-trash3"></i>
                      </button>
                    </div>
                  </template>
                </div>
              </template>
            </div>
          </div>

          <!-- Footer -->
          <div class="cat-footer">
            <button class="btn btn-ghost" @click="emit('close')">ปิด</button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref } from "vue";

defineProps<{
  open: boolean;
  categories: {
    id: number | string;
    name_th: string;
    name_en: string;
    slug: string;
  }[];
  loading: boolean;
  saving?: boolean;
  msg?: string;
  msgType?: string;
}>();

const emit = defineEmits<{
  (e: "close"): void;
  (e: "add-category", payload: { name_th: string; name_en: string }): void;
  (
    e: "update-category",
    payload: { id: number | string; name_th: string; name_en: string },
  ): void;
  (e: "delete-category", id: number | string): void;
}>();

const newTh = ref("");
const newEn = ref("");
const editingId = ref<number | string | null>(null);
const editTh = ref("");
const editEn = ref("");

function addCategory() {
  if (!newTh.value.trim()) return;
  emit("add-category", {
    name_th: newTh.value.trim(),
    name_en: newEn.value.trim(),
  });
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
  emit("update-category", {
    id: cat.id,
    name_th: editTh.value.trim(),
    name_en: editEn.value.trim(),
  });
  editingId.value = null;
}
</script>

<style scoped>
.cat-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}
.cat-dialog {
  background: #fff;
  border-radius: 16px;
  width: 100%;
  max-width: 560px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
  overflow: hidden;
}
.cat-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  border-bottom: 1px solid #e5e7eb;
  flex-shrink: 0;
}
.cat-title {
  font-size: 1rem;
  font-weight: 700;
  color: #111827;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
}
.cat-close {
  background: none;
  border: none;
  cursor: pointer;
  color: #6b7280;
  font-size: 1rem;
  padding: 4px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s;
}
.cat-close:hover {
  background: #f3f4f6;
  color: #111827;
}
.cat-body {
  padding: 20px 24px;
  overflow-y: auto;
  flex: 1;
}
.add-row {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
  align-items: center;
}
.add-row .form-input {
  flex: 1;
  min-width: 0;
}
.cat-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 320px;
  overflow-y: auto;
}
.cat-empty {
  text-align: center;
  padding: 32px 0;
  color: #9ca3af;
  font-size: 0.875rem;
}
.cat-row {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  background: #fafafa;
}
.cat-row .form-input {
  flex: 1;
  min-width: 0;
}
.cat-name {
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
  min-width: 0;
}
.cat-th {
  font-size: 0.875rem;
  font-weight: 600;
  color: #111827;
}
.cat-en {
  font-size: 0.75rem;
  color: #6b7280;
}
.cat-slug {
  font-size: 0.7rem;
  color: #9ca3af;
  font-family: monospace;
}
.cat-actions {
  display: flex;
  gap: 6px;
  flex-shrink: 0;
}
.cat-footer {
  padding: 16px 24px;
  border-top: 1px solid #e5e7eb;
  display: flex;
  justify-content: flex-end;
  flex-shrink: 0;
}
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .add-row {
    flex-direction: column;
    align-items: center;
  }

  .add-row .btn {
    width: 100%;
    justify-content: center;
  }
}
</style>
