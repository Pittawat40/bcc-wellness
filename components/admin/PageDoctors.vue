<template>
  <div>
    <div class="page-header">
      <div>
        <h2 class="page-title">ทีมแพทย์</h2>
        <p class="page-subtitle">จัดการข้อมูลแพทย์ทั้งหมด ({{ total }} คน)</p>
      </div>
      <button class="btn btn-primary" @click="emit('add')">
        <span>+</span> เพิ่มแพทย์
      </button>
    </div>

    <div class="filter-container">
      <div class="search-box">
        <i class="bi bi-search search-icon"></i>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="ค้นหาชื่อหรือตำแหน่ง..."
          class="search-input"
          @input="onSearchInput"
        />
        <button v-if="searchQuery" @click="clearSearch" class="clear-search">
          <i class="bi bi-x-circle-fill"></i>
        </button>
      </div>
    </div>

    <div class="card">
      <div v-if="loading" class="loading-state">
        <div class="loading-dot" />
        <div class="loading-dot" />
        <div class="loading-dot" />
      </div>

      <div v-else>
        <!-- Desktop Table -->
        <div class="table-wrap desktop-table">
          <table>
            <thead>
              <tr>
                <th></th>
                <th>ชื่อ</th>
                <th>ตำแหน่ง</th>
                <th>ความเชี่ยวชาญ</th>
                <th>สถานะ</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="!items.length">
                <td colspan="6" class="empty-state-cell">
                  <div class="empty-state-inner">
                    <i class="bi bi-person-badge empty-icon"></i>
                    <span>ไม่พบข้อมูลแพทย์</span>
                  </div>
                </td>
              </tr>
              <tr v-for="(d, index) in items" :key="d.id">
                <td>
                  <span class="ps-2">{{ index + 1 }}</span>
                </td>
                <td>
                  <div class="cell-primary whitespace-nowrap">{{ d.name }}</div>
                </td>
                <td>
                  <div class="cell-secondary">{{ d.title }}</div>
                </td>
                <td>
                  <div class="specialty-list">
                    <span
                      class="tag"
                      v-for="s in d.specialties || []"
                      :key="s"
                      >{{ s }}</span
                    >
                  </div>
                </td>
                <td>
                  <span
                    :class="[
                      'badge',
                      'whitespace-nowrap',
                      d.status === 'published' ? 'badge-green' : 'badge-gray',
                    ]"
                  >
                    {{ d.status === "published" ? "เผยแพร่" : "ซ่อน" }}
                  </span>
                </td>
                <td>
                  <div class="action-group">
                    <button class="btn-icon" @click="emit('edit', d)">
                      <i class="bi bi-pencil"></i>
                    </button>
                    <button
                      class="btn-icon btn-icon-danger"
                      @click="emit('delete', d.id)"
                    >
                      <i class="bi bi-trash3"></i>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Mobile Cards -->
        <div class="mobile-cards">
          <div v-if="!items.length" class="empty-state-inner">
            <i class="bi bi-person-badge empty-icon"></i>
            <span>ไม่พบข้อมูลแพทย์</span>
          </div>

          <div v-for="(d, index) in items" :key="d.id" class="doctor-card">
            <!-- Header: number + badge -->
            <div class="doctor-card__header">
              <span class="doctor-card__num">#{{ index + 1 }}</span>
              <span
                :class="[
                  'badge',
                  'whitespace-nowrap',
                  d.status === 'published' ? 'badge-green' : 'badge-gray',
                ]"
              >
                {{ d.status === "published" ? "เผยแพร่" : "ซ่อน" }}
              </span>
            </div>

            <!-- Body -->
            <div class="doctor-card__body">
              <div class="cell-primary doctor-card__name line-clamp-1">
                {{ d.name }}
              </div>
              <div class="cell-secondary doctor-card__title line-clamp-1">
                {{ d.title }}
              </div>
              <div
                v-if="(d.specialties || []).length"
                class="doctor-card__specialties"
              >
                <span class="tag" v-for="s in d.specialties" :key="s">{{
                  s
                }}</span>
              </div>
            </div>

            <!-- Footer actions -->
            <div class="doctor-card__footer">
              <button
                class="doctor-card__btn doctor-card__btn--edit"
                @click="emit('edit', d)"
              >
                <i class="bi bi-pencil"></i> แก้ไข
              </button>
              <button
                class="doctor-card__btn doctor-card__btn--delete"
                @click="emit('delete', d.id)"
              >
                <i class="bi bi-trash3"></i> ลบรายการ
              </button>
            </div>
          </div>
        </div>
      </div>

      <div v-if="totalPages > 1" class="pagination">
        <button
          class="page-btn"
          :disabled="page <= 1"
          @click="goPage(page - 1)"
        >
          <i class="bi bi-chevron-left"></i>
        </button>
        <button
          v-for="p in pageNumbers"
          :key="p"
          class="page-btn"
          :class="{ active: p === page }"
          @click="goPage(p)"
        >
          {{ p }}
        </button>
        <button
          class="page-btn"
          :disabled="page >= totalPages"
          @click="goPage(page + 1)"
        >
          <i class="bi bi-chevron-right"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

const PAGE_SIZE = 20;
const props = defineProps<{ items: any[]; total: number; loading: boolean }>();
const emit = defineEmits<{
  (e: "add"): void;
  (e: "edit", item: any): void;
  (e: "delete", id: string): void;
  (
    e: "search",
    params: { search: string; limit: number; offset: number },
  ): void;
}>();

const searchQuery = ref("");
const page = ref(1);
let searchTimer: ReturnType<typeof setTimeout>;

const totalPages = computed(() => Math.ceil(props.total / PAGE_SIZE));
const pageNumbers = computed(() => {
  const pages: number[] = [];
  const start = Math.max(1, page.value - 2);
  const end = Math.min(totalPages.value, page.value + 2);
  for (let i = start; i <= end; i++) pages.push(i);
  return pages;
});

function emitSearch() {
  emit("search", {
    search: searchQuery.value,
    limit: PAGE_SIZE,
    offset: (page.value - 1) * PAGE_SIZE,
  });
}
function onSearchInput() {
  clearTimeout(searchTimer);
  searchTimer = setTimeout(() => {
    page.value = 1;
    emitSearch();
  }, 400);
}
function clearSearch() {
  searchQuery.value = "";
  page.value = 1;
  emitSearch();
}
function goPage(p: number) {
  page.value = p;
  emitSearch();
}
</script>

<style scoped>
/* ── Page Header ── */
.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 24px;
  flex-wrap: wrap;
}
.page-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #111827;
  margin: 0 0 4px 0;
}
.page-subtitle {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0;
}

/* ── Buttons ── */
.btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 9px 18px;
  border-radius: 10px;
  font-size: 0.875rem;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.15s;
  white-space: nowrap;
}

/* ── Filter ── */
.filter-container {
  margin-bottom: 16px;
}
.search-box {
  position: relative;
  max-width: 400px;
}
.search-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #9ca3af;
}
.search-input {
  width: 100%;
  padding: 8px 36px 8px 36px;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  font-size: 0.875rem;
  outline: none;
  background: #fff;
  box-sizing: border-box;
}
.search-input:focus {
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}
.clear-search {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  background: none;
  cursor: pointer;
  color: #9ca3af;
  font-size: 1rem;
  padding: 0;
}

/* ── Card shell ── */
.card {
  background: #fff;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  overflow: hidden;
}

/* ── Desktop Table ── */
.desktop-table {
  display: block;
}
.mobile-cards {
  display: none;
}

.table-wrap {
  overflow-x: auto;
}
table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
}
th {
  background: #f9fafb;
  padding: 12px 16px;
  font-weight: 600;
  color: #374151;
  border-bottom: 1px solid #e5e7eb;
  font-size: 0.8rem;
  text-transform: uppercase;
}
td {
  padding: 14px 16px;
  border-bottom: 1px solid #f3f4f6;
  vertical-align: middle;
}
tr:last-child td {
  border-bottom: none;
}

.cell-primary {
  font-weight: 600;
  color: #111827;
}
.cell-secondary {
  color: #6b7280;
  font-size: 0.82rem;
}

.specialty-list {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}
.tag {
  background: #f3f4f6;
  color: #374151;
  padding: 2px 10px;
  border-radius: 9999px;
  font-size: 0.72rem;
  border: 1px solid #e5e7eb;
  white-space: nowrap;
}

.badge {
  display: inline-flex;
  align-items: center;
  padding: 3px 10px;
  border-radius: 9999px;
  font-size: 0.72rem;
  font-weight: 600;
}

.action-group {
  display: flex;
  gap: 6px;
}
.btn-icon {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  background: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #374151;
  transition: background 0.15s;
}
.btn-icon:hover {
  background: #f3f4f6;
}
.btn-icon-danger {
  color: #ef4444;
}
.btn-icon-danger:hover {
  background: #fef2f2;
  border-color: #fecaca;
}

/* ── Mobile Cards ── */
.mobile-cards {
  display: none;
  flex-direction: column;
  gap: 12px;
}

.doctor-card {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  overflow: hidden;
}

.doctor-card__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 14px 8px;
  border-bottom: 1px solid #f3f4f6;
}
.doctor-card__num {
  font-size: 0.82rem;
  font-weight: 700;
  color: #9ca3af;
}

.doctor-card__body {
  padding: 12px 14px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.doctor-card__name {
  font-size: 0.9rem;
}
.doctor-card__title {
  margin-bottom: 4px;
}
.doctor-card__specialties {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  background: #f9fafb;
  padding: 8px 10px;
  border-radius: 8px;
  margin-top: 4px;
}

.doctor-card__footer {
  display: flex;
  gap: 8px;
  padding: 10px 14px;
  border-top: 1px solid #f3f4f6;
}
.doctor-card__btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 8px;
  font-size: 0.82rem;
  font-weight: 500;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  background: #fff;
  cursor: pointer;
  transition: background 0.15s;
}
.doctor-card__btn--edit {
  color: #374151;
}
.doctor-card__btn--edit:hover {
  background: #f9fafb;
}
.doctor-card__btn--delete {
  color: #ef4444;
  border-color: #fee2e2;
  background: #fef2f2;
}
.doctor-card__btn--delete:hover {
  background: #fee2e2;
}

/* ── Empty State ── */
.empty-state-cell {
  text-align: center;
}
.empty-state-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 40px 20px;
  color: #9ca3af;
  font-size: 0.9rem;
}
.empty-icon {
  font-size: 2.5rem;
  color: #d1d5db;
}

/* ── Loading ── */
.loading-state {
  display: flex;
  gap: 6px;
  justify-content: center;
  padding: 40px;
}
.loading-dot {
  width: 8px;
  height: 8px;
  background: #9ca3af;
  border-radius: 50%;
  animation: bounce 1.4s infinite;
}
.loading-dot:nth-child(2) {
  animation-delay: 0.2s;
}
.loading-dot:nth-child(3) {
  animation-delay: 0.4s;
}
@keyframes bounce {
  0%,
  80%,
  100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
}

/* ── Pagination ── */
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 16px;
  border-top: 1px solid #f3f4f6;
  flex-wrap: wrap;
}
.page-btn {
  min-width: 36px;
  height: 36px;
  padding: 0 10px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  background: #fff;
  font-size: 0.85rem;
  font-weight: 500;
  color: #374151;
  cursor: pointer;
  transition: all 0.15s;
}
.page-btn:hover:not(:disabled) {
  background: #f3f4f6;
}
.page-btn.active {
  background: #4f46e5;
  color: #fff;
  border-color: #4f46e5;
}
.page-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

/* ── Responsive ── */
@media (max-width: 640px) {
  .desktop-table {
    display: none;
  }
  .mobile-cards {
    display: flex;
  }

  .page-title {
    font-size: 1.25rem;
  }
  .search-box {
    max-width: 100%;
  }
  .card {
    border: none;
    background: transparent;
    box-shadow: none;
  }
}
</style>
