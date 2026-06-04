<template>
  <div>
    <div class="page-header">
      <div>
        <h2 class="page-title">เปลี่ยนรหัสผ่าน</h2>
        <p class="page-subtitle">อัปเดตรหัสผ่านสำหรับบัญชี {{ username }}</p>
      </div>
    </div>
    <div class="card" style="max-width: 460px; padding: 24px">
      <div v-if="msg" :class="['alert', msgType, 'mb-4']">{{ msg }}</div>

      <div class="form-group">
        <label class="form-label">รหัสผ่านปัจจุบัน</label>
        <div class="pw-wrap">
          <input
            class="form-input"
            v-model="form.current"
            :type="show.current ? 'text' : 'password'"
          />
          <button
            type="button"
            class="pw-toggle"
            @click="show.current = !show.current"
          >
            <i :class="['bi', show.current ? 'bi-eye-slash' : 'bi-eye']"></i>
          </button>
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">รหัสผ่านใหม่</label>
        <div class="pw-wrap">
          <input
            class="form-input"
            v-model="form.newPw"
            :type="show.newPw ? 'text' : 'password'"
          />
          <button
            type="button"
            class="pw-toggle"
            @click="show.newPw = !show.newPw"
          >
            <i :class="['bi', show.newPw ? 'bi-eye-slash' : 'bi-eye']"></i>
          </button>
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">ยืนยันรหัสผ่านใหม่</label>
        <div class="pw-wrap">
          <input
            class="form-input"
            v-model="form.confirm"
            :type="show.confirm ? 'text' : 'password'"
          />
          <button
            type="button"
            class="pw-toggle"
            @click="show.confirm = !show.confirm"
          >
            <i :class="['bi', show.confirm ? 'bi-eye-slash' : 'bi-eye']"></i>
          </button>
        </div>
      </div>

      <button class="btn btn-primary" @click="submit">
        <i class="bi bi-shield-check"></i> เปลี่ยนรหัสผ่าน
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ username: string; msg?: string; msgType?: string }>();
const emit = defineEmits<{
  (
    e: "save",
    payload: { current: string; newPw: string; confirm: string },
  ): void;
}>();

const form = reactive({ current: "", newPw: "", confirm: "" });
const show = reactive({ current: false, newPw: false, confirm: false });

function submit() {
  emit("save", { ...form });
}

// Allow parent to reset form
defineExpose({
  resetForm: () => {
    form.current = form.newPw = form.confirm = "";
  },
});
</script>

<style>
.form-group {
  padding: 0 !important;
}
</style>
