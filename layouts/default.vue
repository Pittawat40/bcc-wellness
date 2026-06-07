<template>
  <div class="min-h-screen flex flex-col">
    <TheNavbar />
    <main class="flex-1">
      <slot />
    </main>
    <TheFooter />

    <ClientOnly>
      <Cookie />
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
// ── Track page view ──────────────────────────────────────────
onMounted(async () => {
  try {
    await $fetch("/api/dashboard/track", {
      method: "POST",
      baseURL: import.meta.env.API_BASE || "http://localhost:4002",
      body: { path: "/" },
    });
  } catch {}
});
</script>
