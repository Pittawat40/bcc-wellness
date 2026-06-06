<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="open" class="modal-overlay" @click.self="emit('close')">
        <div class="modal">
          <div class="modal-header">
            <h3>{{ title }}</h3>
            <button class="close-btn" @click="emit('close')">
              <i class="bi bi-x-lg"></i>
            </button>
          </div>

          <div class="modal-body">
            <slot />
            <div v-if="error" class="alert alert-error mt-2">{{ error }}</div>
          </div>

          <div class="modal-footer">
            <button class="btn btn-ghost" @click="emit('close')">ยกเลิก</button>
            <button
              class="btn btn-primary"
              :disabled="saving"
              @click="emit('save')"
            >
              <span v-if="saving" class="spinner" />
              <span v-else>{{ editId ? "บันทึก" : "เพิ่มรายการ" }}</span>
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
defineProps<{
  open: boolean;
  title: string;
  editId?: string | null;
  error?: string;
  saving?: boolean;
}>();
const emit = defineEmits<{ (e: "close"): void; (e: "save"): void }>();
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.65);
  backdrop-filter: blur(4px);
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}
.modal {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  width: 100%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow:
    0 25px 80px rgba(0, 0, 0, 0.3),
    0 8px 24px rgba(0, 0, 0, 0.15);
}
.modal::-webkit-scrollbar {
  width: 4px;
}
.modal::-webkit-scrollbar-thumb {
  background: var(--border-strong);
  border-radius: 2px;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 22px 28px 18px;
  border-bottom: 1px solid #e5e7eb;
  position: sticky;
  top: 0;
  background: #ffffff;
  z-index: 2;
}
.modal-header h3 {
  font-size: 1.05rem;
  font-weight: 700;
  margin: 0;
  color: #1c1728;
}
.close-btn {
  background: #f3f4f6;
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #6b7280;
  font-size: 0.9rem;
  transition: all 0.15s;
}
.close-btn:hover {
  background: #e5e7eb;
  color: #1c1728;
}

.modal-body {
  padding: 24px 28px;
  background: #ffffff;
}
.modal-footer {
  padding: 16px 28px;
  border-top: 1px solid #e5e7eb;
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  background: #f9fafb;
  border-radius: 0 0 var(--radius-xl) var(--radius-xl);
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
.modal-enter-active .modal,
.modal-leave-active .modal {
  transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.modal-enter-from .modal {
  transform: scale(0.95) translateY(8px);
}

@media (max-width: 768px) {
  .modal-header {
    padding: 16px;
  }
  
  .modal-body {
    padding: 16px;
  }

  .modal-footer .btn {
    width: 100%;
    justify-content: center;
  }
}
</style>
