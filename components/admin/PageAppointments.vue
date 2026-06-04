<template>
  <div class="appointment-page">
    <div class="page-header">
      <div>
        <h2 class="page-title">นัดหมาย</h2>
        <p class="page-subtitle">รายการนัดหมายจากลูกค้า ({{ total }} รายการ)</p>
      </div>
    </div>

    <div class="filter-container">
      <div class="search-box">
        <i class="bi bi-search search-icon"></i>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="ค้นหาชื่อ, เบอร์โทร หรืออีเมล..."
          class="search-input"
          @input="onSearchInput"
        />
        <button v-if="searchQuery" @click="clearSearch" class="clear-search">
          <i class="bi bi-x-circle-fill"></i>
        </button>
      </div>

      <div class="status-tabs-wrapper">
        <div class="status-tabs">
          <button
            v-for="opt in statusOpts"
            :key="opt.value"
            class="tab-item"
            :class="{ active: filter === opt.value }"
            @click="setFilter(opt.value)"
          >
            {{ opt.label }}
          </button>
        </div>
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
              <th>ลำดับ</th>
              <th>ชื่อ-เบอร์โทร</th>
              <th>อีเมล</th>
              <th>บริการที่สนใจ</th>
              <th>วันที่ส่ง</th>
              <th>สถานะ</th>
              <th>จัดการ</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="!items.length">
              <td colspan="7" class="empty-state">
                <div class="empty-state-inner">
                  <i class="bi bi-calendar2-x empty-icon"></i>
                  <span>ไม่พบรายการนัดหมายที่ตรงเงื่อนไข</span>
                </div>
              </td>
            </tr>

            <tr v-for="(a, index) in items" :key="a.id">
              <td>
                <span class="ps-2">{{
                  (page - 1) * PAGE_SIZE + index + 1
                }}</span>
              </td>
              <td>
                <div class="cell-primary">
                  {{ a.name }}
                  <span
                    v-if="
                      latestAppointments &&
                      latestAppointments.some((latest) => latest.id === a.id)
                    "
                    class="inline-flex items-center ml-1 px-2 py-0.5 rounded text-xs font-bold bg-red-100 text-red-600 animate-pulse"
                  >
                    ใหม่
                  </span>
                </div>
                <div class="cell-secondary-phone">
                  <i class="bi bi-telephone text-neutral-400 mr-1"></i
                  >{{ formatPhone(a.phone) }}
                </div>
              </td>
              <td class="cell-secondary">{{ a.email || "–" }}</td>
              <td>
                <span v-if="a.service" class="tag-service">{{
                  a.service
                }}</span>
                <span v-else class="cell-secondary">–</span>
              </td>
              <td class="cell-secondary">
                {{ a.created_at?.slice(0, 16).replace("T", " ") }}
              </td>
              <td>
                <select
                  :value="a.status"
                  class="status-select"
                  :class="`status-${a.status}`"
                  @change="
                    emit(
                      'updateStatus',
                      a.id,
                      ($event.target as HTMLSelectElement).value,
                    )
                  "
                >
                  <option value="pending">รอติดต่อ</option>
                  <option value="done">เสร็จสิ้น</option>
                  <option value="cancelled">ยกเลิก</option>
                </select>
              </td>
              <td>
                <div class="action-group">
                  <button
                    class="btn-icon"
                    @click="viewing = a"
                    title="ดูรายละเอียด"
                  >
                    <i class="bi bi-eye"></i>
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

    <Teleport to="body">
      <Transition name="modal">
        <div v-if="viewing" class="modal-overlay" @click.self="viewing = null">
          <div class="modal rounded-2xl">
            <div class="modal-header">
              <h3>รายละเอียดนัดหมาย</h3>
              <button class="close-btn" @click="viewing = null">
                <i class="bi bi-x-lg"></i>
              </button>
            </div>
            <div class="modal-body space-y-4 text-sm">
              <div class="detail-row">
                <span class="label">ชื่อ</span>
                <span class="value-text">{{ viewing.name }}</span>
              </div>
              <div class="detail-row">
                <span class="label">เบอร์โทร</span>
                <a
                  :href="`tel:${viewing.phone}`"
                  class="text-brand-600 font-medium"
                >
                  <i class="bi bi-telephone mr-1"></i
                  >{{ formatPhone(viewing.phone) }}
                </a>
              </div>
              <div class="detail-row">
                <span class="label">อีเมล</span>
                <span class="value-text">{{ viewing.email || "–" }}</span>
              </div>
              <div class="detail-row">
                <span class="label">บริการ</span>
                <span v-if="viewing.service" class="tag-service">{{
                  viewing.service
                }}</span>
                <span v-else class="value-text">–</span>
              </div>
              <div class="detail-row">
                <span class="label">วันที่ส่ง</span>
                <span class="value-text">{{
                  viewing.created_at?.slice(0, 16).replace("T", " ")
                }}</span>
              </div>

              <div v-if="viewing.message" class="flex flex-col gap-1.5 mt-2">
                <span class="label">ข้อความจากลูกค้า</span>
                <p
                  class="bg-neutral-50 rounded-lg p-3 text-neutral-700 leading-relaxed border border-neutral-100 break-words whitespace-pre-wrap"
                >
                  {{ viewing.message }}
                </p>
              </div>

              <div class="flex flex-col gap-1.5 mt-2">
                <span class="label">หมายเหตุ (Admin)</span>
                <textarea
                  v-model="noteEdit"
                  rows="5"
                  class="form-input resize-none"
                  placeholder="บันทึกข้อมูลเพิ่มเติม..."
                />
              </div>
            </div>
            <div class="modal-footer rounded-b-2xl">
              <button class="btn btn-ghost" @click="viewing = null">
                ยกเลิก
              </button>
              <button class="btn btn-primary" @click="saveNote">
                บันทึกหมายเหตุ
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";

const PAGE_SIZE = 10;

const props = defineProps<{
  items: any[];
  latestAppointments: any[];
  total: number;
  loading: boolean;
}>();

const emit = defineEmits<{
  (e: "updateStatus", id: number, status: string): void;
  (e: "saveNote", id: number, note: string): void;
  (e: "delete", id: number): void;
  (
    e: "search",
    params: { search: string; status: string; limit: number; offset: number },
  ): void;
}>();

const filter = ref("");
const searchQuery = ref("");
const viewing = ref<any>(null);
const noteEdit = ref("");
const page = ref(1);
let searchTimer: any;

defineExpose({
  filter,
});

watch(viewing, (v) => {
  noteEdit.value = v?.note || "";
});

const formatPhone = (phone: any) => {
  if (!phone) return "";
  const cleaned = phone.toString().replace(/\D/g, "");
  if (cleaned.length === 10) {
    return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }
  if (cleaned.length === 9) {
    return `${cleaned.slice(0, 2)}-${cleaned.slice(2, 5)}-${cleaned.slice(5)}`;
  }
  return phone;
};

const statusOpts = [
  { value: "", label: "ทั้งหมด" },
  { value: "pending", label: "รอติดต่อ" },
  { value: "done", label: "เสร็จสิ้น" },
  { value: "cancelled", label: "ยกเลิก" },
];

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
    status: filter.value,
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

function setFilter(val: string) {
  filter.value = val;
  page.value = 1;
  emitSearch();
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
function saveNote() {
  if (!viewing.value) return;
  emit("saveNote", viewing.value.id, noteEdit.value);
  viewing.value = null;
}
</script>

<style scoped>
.appointment-page {
  padding: 4px 0;
}
.page-header {
  margin-bottom: 24px;
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
}

.status-tabs {
  display: flex;
  background: #f3f4f6;
  padding: 4px;
  border-radius: 12px;
  gap: 2px;
  border: 1px solid #e5e7eb;
}
.tab-item {
  padding: 8px 16px;
  border-radius: 8px;
  border: none;
  background: transparent;
  font-size: 0.85rem;
  font-weight: 500;
  color: #4b5563;
  cursor: pointer;
  white-space: nowrap;
}
.tab-item.active {
  background: #fff;
  color: #111827;
  font-weight: 600;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.card {
  background: #fff;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  overflow: hidden;
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

.cell-primary {
  font-weight: 600;
  color: #111827;
}
.cell-secondary {
  color: #6b7280;
}
.cell-secondary-phone {
  font-size: 0.8rem;
  color: #4b5563;
  display: flex;
  align-items: center;
}
.tag-service {
  background: #f3f4f6;
  color: #374151;
  padding: 2px 10px;
  border-radius: 9999px;
  font-size: 0.75rem;
  border: 1px solid #e5e7eb;
}

/* Select Status Styles */
.status-select {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 6px 36px 6px 12px;
  border-radius: 8px;
  border: 1px solid transparent;
  cursor: pointer;
  outline: none;
  background-repeat: no-repeat;
  background-position: right 14px center;
  background-size: 10px;
  transition: all 0.2s;
  background-color: #f4f4f4;
  /* ลูกศรสีดำสม่ำเสมอ %23000000 */
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23000000'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
}

.status-select:disabled {
  cursor: not-allowed;
  opacity: 0.8;
}
.status-pending {
  color: #f49931;
}
.status-done {
  color: #059669;
}
.status-cancelled {
  color: #f62b2b;
}

.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 16px;
  border-top: 1px solid #f3f4f6;
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

/* Modal Styles */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(17, 24, 39, 0.4);
  backdrop-filter: blur(4px);
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}
.modal {
  background: #fff;
  border-radius: 14px;
  width: 100%;
  max-width: 480px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}
.modal-header {
  display: flex;
  justify-content: space-between;
  padding: 18px 24px;
  border-bottom: 1px solid #f3f4f6;
}
.modal-body {
  padding: 24px;
}
.modal-footer {
  padding: 14px 24px;
  border-top: 1px solid #f3f4f6;
  display: flex;
  gap: 8px;
  justify-content: flex-end;
  background: #f9fafb;
}
.label {
  font-weight: 600;
  color: #6b7280;
  min-width: 100px;
  font-size: 0.75rem;
  text-transform: uppercase;
}
.detail-row {
  display: flex;
  align-items: center;
  gap: 12px;
}
.value-text {
  color: #111827;
}
.form-input {
  width: 100%;
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
}
.btn-icon {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  background: #fff;
  cursor: pointer;
}
</style>
