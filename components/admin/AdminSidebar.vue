<template>
  <nav class="sidebar" :class="{ open: modelValue }">
    <div class="sidebar-logo">
      <div>
        <h1>BCC IVF</h1>
        <p>Wellness Admin</p>
      </div>
      <button
        class="close-sidebar-btn"
        @click="emit('update:modelValue', false)"
      >
        <i class="bi bi-x-lg"></i>
      </button>
    </div>

    <div class="nav-section-label">ภาพรวม</div>
    <div
      class="nav-item"
      :class="{ active: currentPage === 'dashboard' }"
      @click="handleNavigate('dashboard')"
    >
      <div class="icon-wrapper">
        <i class="bi bi-house nav-icon"></i>
      </div>
      <span class="nav-label">Dashboard</span>
    </div>

    <div class="nav-section-label">จัดการข้อมูล</div>
    <div
      class="nav-item"
      :class="{ active: currentPage === 'appointments' }"
      @click="handleNavigate('appointments')"
    >
      <div class="icon-wrapper">
        <i class="bi bi-list-ul nav-icon"></i>
        <span v-if="props.hasNewAppointment" class="noti-badge-on-icon"></span>
      </div>
      <span class="nav-label">รายการนัดหมาย</span>
    </div>
    <div
      class="nav-item"
      :class="{ active: currentPage === 'appointment-calendar' }"
      @click="handleNavigate('appointment-calendar')"
    >
      <div class="icon-wrapper">
        <i class="bi bi-calendar3 nav-icon"></i>
      </div>
      <span class="nav-label">ตารางนัดหมาย</span>
    </div>

    <div class="nav-group" :class="{ expanded: contentExpanded }">
      <div
        class="nav-item group-header"
        :class="{ 'group-active': isSubItemActive && !contentExpanded }"
        @click="contentExpanded = !contentExpanded"
      >
        <div class="icon-wrapper">
          <i class="bi bi-collection nav-icon"></i>
        </div>
        <span class="nav-label">เนื้อหา</span>
        <div class="arrow-wrapper">
          <i class="bi bi-chevron-down arrow-icon"></i>
        </div>
      </div>
      <div class="group-content">
        <div class="group-content-inner">
          <div
            v-for="item in contentItems"
            :key="item.page"
            class="nav-item sub-item"
            :class="{ active: currentPage === item.page }"
            @click="handleNavigate(item.page)"
          >
            <div class="icon-wrapper">
              <i class="bi" :class="[item.icon, 'nav-icon']"></i>
            </div>
            <span class="nav-label">{{ item.label }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="nav-section-label">ข้อมูลทั่วไป</div>
    <div
      v-for="item in otherItems"
      :key="item.page"
      class="nav-item"
      :class="{ active: currentPage === item.page }"
      @click="handleNavigate(item.page)"
    >
      <div class="icon-wrapper">
        <i class="bi" :class="[item.icon, 'nav-icon']"></i>
      </div>
      <span class="nav-label">{{ item.label }}</span>
    </div>

    <div class="sidebar-footer">
      <div class="nav-item logout-item" @click="emit('logout')">
        <div class="icon-wrapper">
          <i class="bi bi-box-arrow-left nav-icon"></i>
        </div>
        <span class="nav-label">ออกจากระบบ</span>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";

const props = withDefaults(
  defineProps<{
    modelValue: boolean;
    currentPage: string;
    hasNewAppointment?: boolean;
  }>(),
  {
    hasNewAppointment: true,
  },
);

const emit = defineEmits<{
  (e: "update:modelValue", v: boolean): void;
  (e: "logout"): void;
  (e: "navigate", page: string): void;
}>();

const router = useRouter();

const appointmentPages = ["appointments", "appointment-calendar"];
const contentItems = [
  { page: "gallery", icon: "bi-images", label: "แกลเลอรี่" },
  { page: "stories", icon: "bi-award", label: "ความสำเร็จ" },
  { page: "articles", icon: "bi-file-earmark-text", label: "บทความ" },
  { page: "videos", icon: "bi-camera-video", label: "วิดีโอ" },
  { page: "reviews", icon: "bi-star", label: "รีวิว" },
  { page: "faq", icon: "bi-patch-question", label: "คำถามที่พบบ่อย" },
];
const otherItems = [
  { page: "doctors", icon: "bi-person", label: "ทีมแพทย์" },
  { page: "contact", icon: "bi-telephone", label: "ข้อมูลติดต่อ" },
  { page: "password", icon: "bi-shield-lock", label: "เปลี่ยนรหัสผ่าน" },
];

const isSubItemActive = computed(() =>
  contentItems.some((item) => item.page === props.currentPage),
);

const contentExpanded = ref(isSubItemActive.value);

const handleNavigate = (page: string) => {
  if (page === "password") {
    emit("update:modelValue", false);
    emit("navigate", page);
    return;
  }

  const isContentPage = contentItems.some((item) => item.page === page);
  if (!isContentPage && !appointmentPages.includes(page)) {
    contentExpanded.value = false;
  }

  emit("update:modelValue", false);
  emit("navigate", page);

  router.push({ path: "/dashboard", query: { page } });
  window.scrollTo(0, 0);
};

onMounted(() => {
  if (isSubItemActive.value) contentExpanded.value = true;
});
</script>

<style scoped>
.icon-wrapper {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

.noti-badge-on-icon {
  width: 8px;
  height: 8px;
  background-color: #ef4444;
  border-radius: 50%;
  position: absolute;
  top: -2px;
  right: -4px;
  border: 1.5px solid var(--sidebar-bg, #1e1e2d);
  box-shadow: 0 2px 4px rgba(239, 68, 68, 0.4);
  z-index: 10;
  animation: fast-bounce-pause 3s infinite ease-in-out;
}

@keyframes fast-bounce-pause {
  0%,
  20%,
  40%,
  60%,
  100% {
    transform: translateY(0);
  }
  10% {
    transform: translateY(-5px);
  }
  30% {
    transform: translateY(-5px);
  }
}

.nav-item.active .noti-badge-on-icon {
  border-color: rgba(216, 109, 40, 0.15);
}

.sidebar {
  width: 280px;
  background: var(--sidebar-bg);
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  overflow-y: auto;
  z-index: 100;
  transition: transform 0.28s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
}

.sidebar::-webkit-scrollbar {
  width: 4px;
}

.sidebar::-webkit-scrollbar-track {
  background: transparent;
}

.sidebar::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
}

.sidebar-logo {
  position: relative;
  display: flex;
  align-items: center;
  padding: 28px 20px 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.sidebar-logo h1 {
  font-size: 1rem;
  font-weight: 700;
  color: #fff;
  margin: 0;
}

.sidebar-logo p {
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.35);
  margin: 2px 0 0;
}

.close-sidebar-btn {
  display: none;
  position: absolute;
  top: 20px;
  right: 16px;
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.5);
  font-size: 1.15rem;
  cursor: pointer;
  padding: 4px;
  transition: color 0.15s ease;
}

.close-sidebar-btn:hover {
  color: #ffffff;
}

.nav-section-label {
  padding: 20px 20px 8px;
  font-size: 0.62rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: rgba(255, 255, 255, 0.25);
  font-weight: 600;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 16px;
  margin: 2px 10px;
  border-radius: var(--radius-sm);
  cursor: pointer;
  color: var(--sidebar-text);
  font-size: 0.875rem;
  font-weight: 400;
  transition: all 0.18s ease;
  position: relative;
  user-select: none;
}

.nav-item:hover {
  background: rgba(255, 255, 255, 0.06);
  color: #ffffff;
}

.nav-item.active {
  background: rgba(216, 109, 40, 0.15);
  color: #d86d28;
  font-weight: 500;
}

.nav-icon {
  font-size: 1rem;
  width: 20px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.nav-label {
  flex: 1;
}

.nav-group {
  display: flex;
  flex-direction: column;
}

.group-header {
  display: flex;
  align-items: center;
}

.arrow-wrapper {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  margin-left: auto;
  flex-shrink: 0;
  overflow: hidden;
}

.arrow-icon {
  font-size: 0.75rem;
  opacity: 0.6;
  display: block;
  line-height: 1;
  transform-origin: 50% 50%;
  will-change: transform;
  transition:
    transform 0.28s cubic-bezier(0.4, 0, 0.2, 1),
    opacity 0.28s cubic-bezier(0.4, 0, 0.2, 1);
}

.nav-group.expanded .arrow-icon {
  transform: rotate(180deg);
  opacity: 1;
}

.group-content {
  display: grid;
  grid-template-rows: 0fr;
  overflow: hidden;
  transition:
    grid-template-rows 0.28s cubic-bezier(0.4, 0, 0.2, 1),
    margin 0.28s cubic-bezier(0.4, 0, 0.2, 1);
  background: rgba(0, 0, 0, 0.12);
  border-radius: var(--radius-sm);
  margin: 0 10px;
}

.group-content-inner {
  min-height: 0;
  padding: 4px 0;
}

.nav-group.expanded .group-content {
  grid-template-rows: 1fr;
  margin-top: 4px;
  margin-bottom: 4px;
}

.sub-item {
  margin: 2px 6px !important;
  padding: 8px 14px !important;
  font-size: 0.825rem !important;
  opacity: 0.75;
}

.sub-item:hover {
  opacity: 1;
}

.sub-item.active {
  opacity: 1;
  background: rgba(216, 109, 40, 0.15) !important;
}

.group-active {
  color: #d86d28 !important;
  background: rgba(216, 109, 40, 0.05);
}

.sidebar-footer {
  margin-top: auto;
  padding: 12px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}

.logout-item {
  color: #f87171 !important;
}

.logout-item:hover {
  background: rgba(248, 113, 113, 0.1) !important;
}

@media (max-width: 768px) {
  .sidebar {
    transform: translateX(-100%);
  }
  .sidebar.open {
    transform: translateX(0);
  }
  .close-sidebar-btn {
    display: inline-block;
  }
}
</style>
