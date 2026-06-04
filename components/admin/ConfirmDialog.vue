<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="open" class="modal-overlay" @click.self="handleCancel">
        <div class="dialog" role="alertdialog" aria-modal="true">
          <div class="dialog-icon" :class="iconClass">
            <i :class="['bi', icon]"></i>
          </div>

          <div class="dialog-body">
            <h3 class="dialog-title">{{ title }}</h3>
            <p v-if="message" class="dialog-message">{{ message }}</p>
          </div>

          <div v-if="type !== 'success'" class="dialog-footer">
            <button class="btn" :class="confirmClass" @click="emit('confirm')">
              {{ confirmLabel || "ตกลง" }}
            </button>
            <button
              v-if="cancelLabel !== ''"
              class="btn btn-ghost"
              @click="handleCancel"
            >
              {{ cancelLabel || "ยกเลิก" }}
            </button>
          </div>

          <div v-else class="dialog-timeout-text">ปิดอัตโนมัติ</div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";

const props = defineProps<{
  open: boolean;
  title: string;
  message?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  type?: "danger" | "warning" | "info" | "success";
}>();

const emit = defineEmits<{
  (e: "confirm"): void;
  (e: "cancel"): void;
}>();

const countdown = ref(2);
let timer: any = null;

watch(
  () => props.open,
  (isOpen) => {
    if (isOpen && props.type === "success") {
      countdown.value = 1; // Reset ตัวเลข

      timer = setInterval(() => {
        countdown.value--;
        if (countdown.value <= 0) {
          clearInterval(timer);
          emit("confirm");
        }
      }, 1000);
    } else {
      clearInterval(timer);
    }
  },
);

const handleCancel = () => {
  clearInterval(timer);
  emit("cancel");
};

const iconClass = computed(() => ({
  "icon-danger": props.type === "danger" || !props.type,
  "icon-warning": props.type === "warning",
  "icon-info": props.type === "info",
  "icon-success": props.type === "success",
}));

const icon = computed(() => {
  if (props.type === "warning") return "bi-exclamation-triangle";
  if (props.type === "info") return "bi-info-circle";
  if (props.type === "success") return "bi-check-circle-fill";
  return "bi-trash3";
});

const confirmClass = computed(() => {
  if (props.type === "warning") return "btn-warning";
  if (props.type === "info") return "btn-primary";
  if (props.type === "success") return "btn-success";
  return "btn-danger";
});
</script>

<style scoped>
.modal-overlay {
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

.btn {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-width: 100px;
}

.dialog {
  background: #ffffff;
  border-radius: 16px;
  width: 100%;
  max-width: 400px;
  padding: 24px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.dialog-icon {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  margin-bottom: 16px;
}

.icon-danger {
  background: #fee2e2;
  color: #dc2626;
}
.icon-warning {
  background: #fef3c7;
  color: #d97706;
}
.icon-info {
  background: #dbeafe;
  color: #2563eb;
}
.icon-success {
  background: #dcfce7;
  color: #16a34a;
}

.dialog-title {
  font-size: 1.125rem;
  font-weight: 700;
  color: #111827;
  margin: 0 0 8px;
}

.dialog-message {
  font-size: 0.875rem;
  color: #6b7280;
  line-height: 1.5;
  margin: 0;
}

.dialog-footer {
  display: flex;
  gap: 12px;
  width: 100%;
  margin-top: 24px;
  justify-content: center;
  align-items: center;
}

.dialog-footer .btn {
  flex: 1;
  padding: 10px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  border: none;
}

.btn-danger {
  background: #dc2626;
  color: #fff;
}
.btn-primary {
  background: #2563eb;
  color: #fff;
}
.btn-warning {
  background: #d97706;
  color: #fff;
}
.btn-ghost {
  background: #f3f4f6;
  color: #4b5563;
}

.dialog-timeout-text {
  margin-top: 20px;
  font-size: 0.8rem;
  color: #9ca3af;
  font-weight: 500;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
