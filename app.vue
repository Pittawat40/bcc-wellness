<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
useHead({
  templateParams: {
    siteName: "Bangkok Central Clinic",
    separator: "|",
  },
});
</script>
