<template>
  <div
    v-if="open"
    class="modal-backdrop"
    @click.self="!saving && closeAndReset()"
  >
    <div class="card modal-dialog-custom">
      <div class="modal-header-custom">
        <div>
          <h2 class="page-title" style="font-size: 1.25rem; margin: 0">
            เปลี่ยนรหัสผ่าน
          </h2>
          <p class="page-subtitle" style="margin: 4px 0 0">
            อัปเดตรหัสผ่านสำหรับบัญชี {{ username }}
          </p>
        </div>
      </div>

      <div class="card-body" style="padding: 24px">
        <!-- ── รหัสผ่านปัจจุบัน ── -->
        <div class="form-group">
          <label class="form-label">รหัสผ่านปัจจุบัน</label>
          <div class="pw-wrap">
            <input
              class="form-input"
              :class="{ 'input-error': errors.current }"
              v-model="form.current"
              :type="show.current ? 'text' : 'password'"
              :disabled="saving"
              @input="errors.current = ''"
              autocomplete="password"
            />
            <button
              type="button"
              class="pw-toggle"
              :disabled="saving"
              @click="show.current = !show.current"
            >
              <i :class="['bi', show.current ? 'bi-eye-slash' : 'bi-eye']"></i>
            </button>
          </div>
          <span v-if="errors.current" class="error-text">{{
            errors.current
          }}</span>
        </div>

        <!-- ── รหัสผ่านใหม่ ── -->
        <div class="form-group">
          <label class="form-label">รหัสผ่านใหม่</label>
          <div class="pw-wrap">
            <input
              class="form-input"
              :class="{ 'input-error': errors.newPw }"
              v-model="form.newPw"
              :type="show.newPw ? 'text' : 'password'"
              :disabled="saving"
              @input="errors.newPw = ''"
              autocomplete="new-password"
            />
            <button
              type="button"
              class="pw-toggle"
              :disabled="saving"
              @click="show.newPw = !show.newPw"
            >
              <i :class="['bi', show.newPw ? 'bi-eye-slash' : 'bi-eye']"></i>
            </button>
          </div>
          <span v-if="errors.newPw" class="error-text">{{ errors.newPw }}</span>
        </div>

        <!-- ── ยืนยันรหัสผ่านใหม่ ── -->
        <div class="form-group">
          <label class="form-label">ยืนยันรหัสผ่านใหม่</label>
          <div class="pw-wrap">
            <input
              class="form-input"
              :class="{ 'input-error': errors.confirm }"
              v-model="form.confirm"
              :type="show.confirm ? 'text' : 'password'"
              :disabled="saving"
              @input="errors.confirm = ''"
              autocomplete="confirm-new-password"
            />
            <button
              type="button"
              class="pw-toggle"
              :disabled="saving"
              @click="show.confirm = !show.confirm"
            >
              <i :class="['bi', show.confirm ? 'bi-eye-slash' : 'bi-eye']"></i>
            </button>
          </div>
          <span v-if="errors.confirm" class="error-text">{{
            errors.confirm
          }}</span>
        </div>

        <!-- ── ปุ่มดำเนินการ ── -->
        <div style="display: flex; gap: 8px; margin-top: 24px">
          <button
            class="btn btn-primary btn-submit-loading"
            @click="submit"
            :disabled="saving"
          >
            <i v-if="saving" class="bi bi-arrow-repeat spinner"></i>
            <i v-else class="bi bi-shield-check"></i>
            {{ saving ? "กำลังบันทึก..." : "เปลี่ยนรหัสผ่าน" }}
          </button>
          <button
            class="btn btn-ghost"
            @click="closeAndReset"
            :disabled="saving"
          >
            ยกเลิก
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";

defineProps<{
  open: boolean;
  username: string;
  saving?: boolean;
}>();

const emit = defineEmits<{
  (e: "close"): void;
  (
    e: "save",
    payload: { current: string; newPw: string; confirm: string },
  ): void;
}>();

const form = reactive({ current: "", newPw: "", confirm: "" });
const show = reactive({ current: false, newPw: false, confirm: false });
const errors = reactive({ current: "", newPw: "", confirm: "" });

function submit() {
  errors.current = "";
  errors.newPw = "";
  errors.confirm = "";

  let isValid = true;

  if (!form.current) {
    errors.current = "กรุณากรอกรหัสผ่านปัจจุบัน";
    isValid = false;
  }
  if (!form.newPw) {
    errors.newPw = "กรุณากรอกรหัสผ่านใหม่";
    isValid = false;
  } else if (form.newPw.length < 6) {
    errors.newPw = "รหัสผ่านใหม่ต้องมีความยาวอย่างน้อย 6 ตัวอักษร";
    isValid = false;
  }
  if (!form.confirm) {
    errors.confirm = "กรุณายืนยันรหัสผ่านใหม่";
    isValid = false;
  } else if (form.newPw !== form.confirm) {
    errors.confirm = "รหัสผ่านใหม่ไม่ตรงกัน";
    isValid = false;
  }

  if (isValid) {
    emit("save", { ...form });
  }
}

function closeAndReset() {
  resetForm();
  emit("close");
}

function resetForm() {
  form.current = form.newPw = form.confirm = "";
  show.current = show.newPw = show.confirm = false;
  errors.current = errors.newPw = errors.confirm = "";
}

defineExpose({
  resetForm,
  setApiError: (field: "current" | "newPw" | "confirm", message: string) => {
    errors[field] = message;
  },
});
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 20px;
}

.modal-dialog-custom {
  width: 100%;
  max-width: 460px;
  margin-bottom: 0;
}

.modal-header-custom {
  padding: 20px 24px 0 24px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}

.form-group {
  padding: 0 !important;
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
}

.form-input:disabled {
  background-color: #f3f4f6 !important;
  color: #9ca3af;
  cursor: not-allowed;
}

.input-error {
  border-color: #ef4444 !important;
  background-color: #fef2f2 !important;
}

.error-text {
  color: #ef4444;
  font-size: 0.75rem;
  margin-top: 4px;
  text-align: left;
}

.pw-wrap {
  position: relative;
}

.btn-submit-loading {
  gap: 8px;
}

.btn {
  width: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.spinner {
  display: inline-block;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
