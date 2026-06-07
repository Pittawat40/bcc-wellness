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

const config = useRuntimeConfig();

onMounted(async () => {
  try {
    await $fetch("/dashboard/track", {
      method: "POST",
      baseURL: config.public.apiBase,
      body: { path: "/" },
    });
  } catch {}
});
</script>
