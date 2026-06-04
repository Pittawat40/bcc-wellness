<template>
  <div>
    <div class="page-header">
      <div>
        <h2 class="page-title">ทีมแพทย์</h2>
        <p class="page-subtitle">จัดการข้อมูลแพทย์ ({{ total }} คน)</p>
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
      <div v-else class="table-wrap">
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
              <td colspan="5" class="empty-state">
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
                  <span class="tag" v-for="s in d.specialties || []" :key="s">{{
                    s
                  }}</span>
                </div>
              </td>
              <td>
                <span
                  :class="[
                    'badge whitespace-nowrap',
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
