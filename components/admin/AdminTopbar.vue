<template>
  <div class="topbar">
    <div class="topbar-left">
      <button class="menu-btn" @click="emit('toggle-sidebar')">
        <i class="bi bi-list"></i>
      </button>
      <div class="breadcrumb">
        <span class="breadcrumb-root">Admin</span>
        <span class="breadcrumb-sep">›</span>
        <span class="breadcrumb-current">{{ pageNames[currentPage] }}</span>
      </div>
    </div>
    <div class="topbar-right">
      <div class="admin-badge">
        <div class="admin-avatar">{{ username?.charAt(0)?.toUpperCase() }}</div>
        <span>{{ username }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ currentPage: string; username: string }>();
const emit = defineEmits<{ (e: "toggle-sidebar"): void }>();

const pageNames: Record<string, string> = {
  dashboard: "Dashboard",
  appointments: "นัดหมาย",
  articles: "บทความ",
  stories: "ความสำเร็จ",
  gallery: "แกลเลอรี่",
  videos: "วิดีโอ",
  reviews: "รีวิว",
  doctors: "ทีมแพทย์",
  faq: "คำถามที่พบบ่อย",
  contact: "ข้อมูลติดต่อ",
};
</script>

<style scoped>
.topbar {
  background: var(--surface);
  border-bottom: 1px solid var(--border);
  padding: 0 28px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 50;
}
.topbar-left {
  display: flex;
  align-items: center;
  gap: 16px;
}
.menu-btn {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 6px;
  border-radius: 6px;
  font-size: 1.4rem;
  color: var(--text-secondary);
  line-height: 1;
}
.menu-btn:hover {
  background: var(--surface-2);
}
.breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.875rem;
}
.breadcrumb-root {
  color: var(--text-tertiary);
}
.breadcrumb-sep {
  color: var(--border-strong);
}
.breadcrumb-current {
  color: var(--text-primary);
  font-weight: 600;
}
.admin-badge {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.825rem;
  color: var(--text-secondary);
}
.admin-avatar {
  width: 32px;
  height: 32px;
  background: var(--brand);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 700;
  color: #fff;
}

@media (max-width: 768px) {
  .menu-btn {
    display: flex;
  }
  .topbar {
    padding: 0 16px;
  }
}
</style>
