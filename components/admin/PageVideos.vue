<template>
  <div>
    <div class="page-header">
      <div>
        <h2 class="page-title">วิดีโอ</h2>
        <p class="page-subtitle">จัดการวิดีโอทั้งหมด ({{ total }} รายการ)</p>
      </div>
      <button class="btn btn-primary" @click="emit('add')">
        <span>+</span> เพิ่มวิดีโอ
      </button>
    </div>

    <div class="filter-container">
      <div class="search-box">
        <i class="bi bi-search search-icon"></i>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="ค้นหาชื่อวิดีโอ..."
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
              <th>ชื่อวิดีโอ</th>
              <th>URL</th>
              <th>สถานะ</th>
              <th>วันที่สร้าง</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="!items.length">
              <td colspan="5" class="empty-state">
                <div class="empty-state-inner">
                  <i class="bi bi-camera-video empty-icon"></i>
                  <span>ไม่พบวิดีโอ</span>
                </div>
              </td>
            </tr>
            <tr v-for="(v, index) in items" :key="v.id">
              <td>
                <span class="ps-2">{{ index + 1 }}</span>
              </td>
              <td>
                <div class="cell-primary">{{ v.title }}</div>
              </td>
              <td>
                <div class="cell-secondary url-cell">
                  <a
                    :href="v.url"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-brand-600 hover:text-brand-700 hover:underline cursor-pointer"
                  >
                    {{ v.url?.slice(0, 40)
                    }}{{ v.url?.length > 40 ? "..." : "" }}
                  </a>
                </div>
              </td>
              <td>
                <span
                  class="whitespace-nowrap"
                  :class="[
                    'badge',
                    v.status === 'published' ? 'badge-green' : 'badge-gray',
                  ]"
                >
                  {{ v.status === "published" ? "เผยแพร่" : "ซ่อน" }}
                </span>
              </td>
              <td>
                <div class="cell-secondary whitespace-nowrap">
                  {{ v.created_at?.slice(0, 16).replace("T", " ") }}
                </div>
              </td>
              <td>
                <div class="action-group">
                  <button class="btn-icon" @click="emit('edit', v)">
                    <i class="bi bi-pencil"></i>
                  </button>
                  <button
                    class="btn-icon btn-icon-danger"
                    @click="emit('delete', v.id)"
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
