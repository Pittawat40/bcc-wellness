<template>
  <div class="flex min-h-screen w-full font-light bg-[#0e0c16] overflow-hidden">
    <div
      class="relative hidden h-screen flex-[1.5] min-[860px]:block bg-cover bg-center bg-no-repeat z-10"
      style="background-image: url(&quot;/images/bg-login.jpg&quot;)"
    >
      <div
        class="absolute inset-0 bg-gradient-to-t from-[#0e0c16]/90 via-[#0e0c16]/50 to-[#0e0c16]/10"
      />

      <div class="absolute bottom-16 left-16 z-20 text-white max-w-xl">
        <span
          class="mb-4 block text-[12px] uppercase tracking-[4px] text-neutral-300 font-semibold drop-shadow-sm"
        >
          BCC IVF & Wellness Center
        </span>
        <h2
          class="text-4xl font-normal leading-[1.15] tracking-tight text-white drop-shadow-md"
        >
          Where advanced science<br />meets compassionate care.
        </h2>
      </div>
    </div>

    <div
      class="flex h-screen w-full items-center justify-center p-8 min-[860px]:w-[480px] min-[860px]:flex-none bg-white relative z-20 border-l border-gray-100"
    >
      <div class="w-full max-w-[360px]">
        <div class="mb-14 flex items-center gap-4">
          <div>
            <h2
              class="text-2xl font-bold tracking-tight text-gray-900 m-0 uppercase"
            >
              BCC IVF
            </h2>
            <p
              class="mt-0.5 text-[10px] tracking-[2px] uppercase text-gray-400 font-semibold"
            >
              Wellness Admin
            </p>
          </div>
        </div>

        <div class="mb-10">
          <h1 class="mb-2 text-3xl font-medium tracking-normal text-gray-900">
            Welcome back
          </h1>
          <p class="text-[14px] text-gray-500">
            Sign in to dashboard to continue
          </p>
        </div>

        <div
          v-if="error"
          class="mb-8 rounded-lg border border-red-200 bg-red-50 p-4 text-[13px] text-red-600 animate-pulse"
        >
          <i class="bi bi-exclamation-circle mr-2"></i> {{ error }}
        </div>

        <form class="flex flex-col gap-8" @submit.prevent>
          <div class="relative group mt-4">
            <input
              v-model="form.username"
              type="text"
              placeholder="Enter username"
              class="peer mt-2 w-full border-b border-gray-200 bg-transparent py-3 px-1 text-[15px] text-gray-900 outline-none transition-all duration-300 focus:border-b-warm-500 placeholder-gray-300 custom-autofill"
              @keyup.enter="submit"
            />
            <label
              class="pointer-events-none absolute left-1 top-0 -translate-y-[calc(100%-4px)] text-[11px] uppercase tracking-[2px] font-semibold text-gray-400 transition-colors duration-300 peer-focus:text-warm-500"
            >
              Username
            </label>
          </div>

          <div class="relative group mt-4">
            <input
              v-model="form.password"
              type="password"
              placeholder="••••••••"
              class="peer mt-2 w-full border-b border-gray-200 bg-transparent py-3 px-1 text-[15px] text-gray-900 outline-none transition-all duration-300 focus:border-b-warm-500 placeholder-gray-300 custom-autofill"
              @keyup.enter="submit"
            />
            <label
              class="pointer-events-none absolute left-1 top-0 -translate-y-[calc(100%-4px)] text-[11px] uppercase tracking-[2px] font-semibold text-gray-400 transition-colors duration-300 peer-focus:text-warm-500"
            >
              Password
            </label>
          </div>

          <button
            :disabled="loading"
            type="button"
            class="mt-6 flex min-h-[56px] w-full items-center justify-center bg-warm-500 p-4 text-[12px] font-bold uppercase tracking-[4px] text-white transition-all duration-300 hover:brightness-105 hover:shadow-[0_10px_25px_rgba(204,148,80,0.25)] active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400 disabled:opacity-60 rounded-lg"
            @click="submit"
          >
            <span
              v-if="loading"
              class="h-5 w-5 animate-spin rounded-full border-2 border-white/20 border-t-white"
            ></span>
            <span v-else>Sign In</span>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
// หมายเหตุ: ย้ายฟังก์ชัน useAdminApi() มาเรียกใช้งานภายในออบเจกต์หรือเก็บค่าตามปกติของคุณได้เลยครับ

const emit = defineEmits<{
  (e: "success", payload: { token: string; username: string }): void;
}>();

const api = useAdminApi();
const form = reactive({ username: "", password: "" });
const loading = ref(false);
const error = ref("");

async function submit() {
  if (!form.username || !form.password) return;
  error.value = "";
  loading.value = true;
  try {
    const d = await api.login(form.username, form.password);
    emit("success", d);
  } catch (e: any) {
    error.value = e.message;
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
.custom-autofill:-webkit-autofill,
.custom-autofill:-webkit-autofill:hover,
.custom-autofill:-webkit-autofill:focus {
  -webkit-box-shadow: 0 0 0 1000px #ffffff inset !important; /* ล็อกพื้นหลังเป็นสีขาวเข้ากับตัวการ์ด */
  -webkit-text-fill-color: #111827 !important; /* ล็อกสีตัวอักษรเป็นสีเทาเข้มหม่น */
  transition: background-color 5000s ease-in-out 0s;
}

.form-input {
  letter-spacing: 0.5px;
}
</style>
