<template>
  <AdminLogin @success="onLoginSuccess" />
</template>

<script setup lang="ts">
useSeoMeta({
  title: "BCC IVF Wellness – Admin Login",
  description: "Admin login page",
});
definePageMeta({ layout: false });

const api = useAdminApi();
const router = useRouter();

onMounted(() => {
  if (api.isLoggedIn()) {
    api.me().catch(() => api.clearToken());
  }
});

function onLoginSuccess(d: { token: string; username: string }) {
  api.saveToken(d.token);
  router.push("/dashboard");
}
</script>
