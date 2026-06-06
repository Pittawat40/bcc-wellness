<template>
  <div>
    <div class="page-header-reviews">
      <div class="header-text-group">
        <h2 class="page-title">รีวิว</h2>
        <p class="page-subtitle">จัดการรีวิวทั้งหมด ({{ total }} รายการ)</p>
      </div>
      <div class="header-actions">
        <button class="btn-manage-cat" @click="emit('manage-categories')">
          <i class="bi bi-tags"></i>
          <span class="btn-label">จัดการหมวดหมู่</span>
        </button>
        <button class="btn-add-review" @click="emit('add')">
          <span>+</span> เพิ่มรีวิว
        </button>
      </div>
    </div>

    <div class="filter-container">
      <div class="search-box">
        <i class="bi bi-search search-icon"></i>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="ค้นหาชื่อผู้รีวิว หรือเนื้อหา..."
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
        <!-- Desktop table -->
        <div class="table-wrap show-desktop-only">
          <table>
            <thead>
              <tr>
                <th></th>
                <th>ชื่อผู้รีวิว</th>
                <th>เนื้อหา</th>
                <th>คะแนน</th>
                <th>หมวดหมู่</th>
                <th>สถานะ</th>
                <th>วันที่สร้าง</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="!items.length">
                <td colspan="8" class="empty-state">
                  <div class="empty-state-inner">
                    <i class="bi bi-star empty-icon"></i>
                    <span>ไม่พบรีวิว</span>
                  </div>
                </td>
              </tr>
              <tr v-for="(r, index) in items" :key="r.id">
                <td>
                  <span class="ps-2">{{ index + 1 }}</span>
                </td>
                <td>
                  <div class="cell-primary whitespace-nowrap">
                    {{ r.author_name }}
                  </div>
                </td>
                <td>
                  <div class="cell-secondary excerpt">
                    {{ r.content?.slice(0, 60) }}...
                  </div>
                </td>
                <td>
                  <span class="stars">{{ "★".repeat(r.rating || 5) }}</span>
                </td>
                <td>
                  <span class="tag whitespace-nowrap">{{
                    categoryLabel(r.category)
                  }}</span>
                </td>
                <td>
                  <span
                    class="whitespace-nowrap"
                    :class="[
                      'badge',
                      r.status === 'published' ? 'badge-green' : 'badge-gray',
                    ]"
                  >
                    {{ r.status === "published" ? "เผยแพร่" : "ซ่อน" }}
                  </span>
                </td>
                <td>
                  <div class="cell-secondary whitespace-nowrap">
                    {{ r.created_at?.slice(0, 16).replace("T", " ") }}
                  </div>
                </td>
                <td>
                  <div class="action-group">
                    <button
                      class="btn-icon"
                      @click="emit('edit', r)"
                      title="แก้ไข"
                    >
                      <i class="bi bi-pencil"></i>
                    </button>
                    <button
                      class="btn-icon btn-icon-danger"
                      @click="emit('delete', r.id)"
                      title="ลบ"
                    >
                      <i class="bi bi-trash3"></i>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Mobile cards -->
        <div class="show-mobile-only mobile-cards-list">
          <div v-if="!items.length" class="empty-state-mobile">
            <i class="bi bi-star empty-icon"></i>
            <span>ไม่พบรีวิว</span>
          </div>

          <div
            v-for="(r, index) in items"
            :key="r.id"
            class="mobile-responsive-card"
          >
            <div class="mobile-card-header">
              <span class="mobile-item-number">#{{ index + 1 }}</span>
              <span
                :class="[
                  'badge',
                  r.status === 'published' ? 'badge-green' : 'badge-gray',
                ]"
              >
                {{ r.status === "published" ? "เผยแพร่" : "ซ่อน" }}
              </span>
            </div>

            <div class="mobile-card-body">
              <div class="mobile-info-text">
                <div class="cell-primary">{{ r.author_name }}</div>
                <div class="stars mt-1">{{ "★".repeat(r.rating || 5) }}</div>
                <div class="cell-secondary mt-1 line-clamp-2">
                  {{ r.content }}
                </div>
              </div>

              <div class="mobile-meta-grid mt-2">
                <div>
                  <span class="meta-label">หมวดหมู่:</span>
                  <span class="tag inline-flex">{{
                    categoryLabel(r.category)
                  }}</span>
                </div>
                <div>
                  <span class="meta-label">วันที่สร้าง:</span>
                  <span class="cell-secondary">{{
                    r.created_at?.slice(0, 10)
                  }}</span>
                </div>
              </div>
            </div>

            <div class="mobile-card-footer">
              <button
                class="mobile-btn-action btn-edit"
                @click="emit('edit', r)"
              >
                <i class="bi bi-pencil"></i> แก้ไข
              </button>
              <button
                class="mobile-btn-action btn-delete"
                @click="emit('delete', r.id)"
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
const props = defineProps<{
  items: any[];
  total: number;
  loading: boolean;
  categories?: { id: number | string; name_th: string; name_en: string }[];
}>();

const emit = defineEmits<{
  (e: "add"): void;
  (e: "edit", item: any): void;
  (e: "delete", id: string): void;
  (e: "manage-categories"): void;
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

function categoryLabel(val: string) {
  if (!props.categories?.length) return val;
  const found = props.categories.find((c) => c.name_th === val);
  return found ? found.name_th : val;
}

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
.show-desktop-only {
  display: block !important;
}
.show-mobile-only {
  display: none !important;
}

.page-header-reviews {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 24px;
  padding: 0 4px;
}
.header-text-group {
  flex: 1;
  min-width: 0;
}
.page-title {
  font-size: 1.45rem;
  font-weight: 700;
  color: #111827;
  margin: 0 0 4px 0;
}
.page-subtitle {
  font-size: 0.85rem;
  color: #6b7280;
  margin: 0;
}
.header-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.btn-add-review {
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
  background: #de6e35;
  color: #fff;
}
.btn-add-review:hover {
  background: #cb5d26;
  transform: translateY(-1px);
}

.btn-manage-cat {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 9px 16px;
  border-radius: 10px;
  font-size: 0.875rem;
  font-weight: 600;
  background: #fff;
  color: #4b5563;
  border: 1px solid #e5e7eb;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}
.btn-manage-cat:hover {
  background: #f9fafb;
  border-color: #d1d5db;
}

.stars {
  color: #f59e0b;
  letter-spacing: 1px;
  font-size: 0.9rem;
}

.mobile-cards-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.mobile-responsive-card {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-width: 0;
  overflow: hidden;
  margin-bottom: 12px;
}
.mobile-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #f3f4f6;
  padding-bottom: 8px;
}
.mobile-item-number {
  font-size: 0.85rem;
  font-weight: 700;
  color: #9ca3af;
}
.mobile-info-text {
  display: flex;
  flex-direction: column;
  min-width: 0;
}
.mobile-meta-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
  background: #f9fafb;
  padding: 10px;
  border-radius: 8px;
  font-size: 0.8rem;
}
.meta-label {
  color: #6b7280;
  margin-right: 4px;
}
.mobile-card-footer {
  display: flex;
  gap: 8px;
  border-top: 1px solid #f3f4f6;
  padding-top: 10px;
}
.mobile-btn-action {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 8px;
  font-size: 0.8rem;
  font-weight: 500;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  background: #fff;
  cursor: pointer;
}
.mobile-btn-action.btn-edit {
  color: #4b5563;
}
.mobile-btn-action.btn-edit:hover {
  background: #f9fafb;
}
.mobile-btn-action.btn-delete {
  color: #ef4444;
  border-color: #fee2e2;
  background: #fef2f2;
}
.mobile-btn-action.btn-delete:hover {
  background: #fee2e2;
}
.empty-state-mobile {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 16px;
  color: #9ca3af;
  gap: 8px;
}

@media (max-width: 768px) {
  .show-desktop-only {
    display: none !important;
  }
  .show-mobile-only {
    display: block !important;
  }
  .page-title {
    font-size: 1.25rem;
  }
  .page-header-reviews {
    flex-direction: row !important;
    align-items: center !important;
    justify-content: space-between !important;
  }
  .btn-label {
    display: none;
  }
  .card {
    border: none !important;
    background: transparent !important;
    box-shadow: none !important;
    padding: 0 !important;
  }
}
</style>
