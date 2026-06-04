<template>
  <div>
    <div class="page-header">
      <div>
        <h2 class="page-title">บทความ</h2>
        <p class="page-subtitle">จัดการบทความทั้งหมด ({{ total }} รายการ)</p>
      </div>
      <div style="display: flex; gap: 8px">
        <button class="btn btn-ghost" @click="emit('manage-categories')">
          <i class="bi bi-tags"></i> จัดการหมวดหมู่
        </button>
        <button class="btn btn-primary" @click="emit('add')">
          <span>+</span> เพิ่มบทความ
        </button>
      </div>
    </div>

    <div class="filter-container">
      <div class="search-box">
        <i class="bi bi-search search-icon"></i>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="ค้นหาชื่อบทความ..."
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
      <div v-else class="table-wrap">
        <table>
          <thead>
            <tr>
              <th></th>
              <th>ชื่อบทความ</th>
              <th>หมวดหมู่</th>
              <th>สถานะ</th>
              <th>วันที่</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="!items.length">
              <td colspan="6" class="empty-state">
                <div class="empty-state-inner">
                  <i class="bi bi-file-earmark-text empty-icon"></i>
                  <span>ไม่พบบทความ</span>
                </div>
              </td>
            </tr>
            <tr v-for="(a, index) in items" :key="a.id">
              <td>
                <span class="ps-2">{{ index + 1 }}</span>
              </td>
              <td>
                <div class="cell-primary">{{ a.title }}</div>
                <div class="cell-secondary">{{ a.slug }}</div>
              </td>
              <td>
                <span class="tag whitespace-nowrap">{{
                  categoryLabel(a.category)
                }}</span>
              </td>
              <td>
                <span
                  class="whitespace-nowrap"
                  :class="[
                    'badge',
                    a.status === 'published' ? 'badge-green' : 'badge-amber',
                  ]"
                >
                  {{ a.status === "published" ? "เผยแพร่" : "แบบร่าง" }}
                </span>
              </td>
              <td class="cell-secondary">{{ a.created_at?.slice(0, 10) }}</td>
              <td>
                <div class="action-group">
                  <button
                    class="btn-icon"
                    @click="emit('edit', a)"
                    title="แก้ไข"
                  >
                    <i class="bi bi-pencil"></i>
                  </button>
                  <button
                    class="btn-icon btn-icon-danger"
                    @click="emit('delete', a.id)"
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
  categories?: {
    id: number | string;
    name_th: string;
    name_en: string;
    slug: string;
  }[];
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

function categoryLabel(slug: string) {
  if (!props.categories?.length) return slug;
  const found = props.categories.find(
    (c) => c.slug === slug || c.name_th === slug,
  );
  return found ? found.name_th : slug;
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
