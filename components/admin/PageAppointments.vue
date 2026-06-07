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

      <div v-else>
        <div class="table-wrap desktop-table">
          <table>
            <thead>
              <tr>
                <th>ลำดับ</th>
                <th>ชื่อ-เบอร์โทร</th>
                <th>บริการที่สนใจ</th>
                <th>วันที่ส่ง</th>
                <th>สถานะ</th>
                <th>วันที่นัดหมาย</th>
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
              <tr
                v-for="(a, index) in items"
                :key="a.id"
                :class="{ 'row-new': isNewAppointment(a) }"
              >
                <td>
                  <span class="ps-2">{{
                    (page - 1) * PAGE_SIZE + index + 1
                  }}</span>
                </td>
                <td>
                  <div class="cell-primary">
                    {{ a.name }}
                    <span v-if="isNewAppointment(a)" class="badge-new"
                      >รายการใหม่</span
                    >
                  </div>
                  <div class="cell-secondary-phone">
                    <i class="bi bi-telephone text-neutral-400 mr-1"></i
                    >{{ formatPhone(a.phone) }}
                  </div>
                </td>
                <td>
                  <span v-if="a.service" class="tag-service">{{
                    a.service
                  }}</span>
                  <span v-else class="cell-secondary">–</span>
                </td>
                <td class="cell-secondary">
                  {{ formatThaiDate(a.created_at) || "–" }}
                </td>
                <td>
                  <span class="status-badge" :class="`badge-${a.status}`">
                    {{ statusLabel(a.status) }}
                  </span>
                </td>
                <td class="cell-secondary">
                  <span style="color: #4f46e5; font-weight: 600">
                    {{ formatThaiDate(a.appointment_date) || "–" }}
                  </span>
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
                    <!-- <button
                      class="btn-icon btn-icon-danger"
                      @click="emit('delete', a.id)"
                      title="ลบ"
                    >
                      <i class="bi bi-trash3"></i>
                    </button> -->
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="mobile-cards">
          <div v-if="!items.length" class="empty-state">
            <div class="empty-state-inner">
              <i class="bi bi-calendar2-x empty-icon"></i>
              <span>ไม่พบรายการนัดหมายที่ตรงเงื่อนไข</span>
            </div>
          </div>

          <div
            v-for="(a, index) in items"
            :key="a.id"
            class="appt-card"
            :class="{ 'appt-card--new': isNewAppointment(a) }"
          >
            <div class="appt-card__header">
              <span class="appt-card__num"
                >#{{ (page - 1) * PAGE_SIZE + index + 1 }}</span
              >
              <div class="appt-card__name-wrap">
                <span class="appt-card__name">ชื่อ : {{ a.name }}</span>
                <span v-if="isNewAppointment(a)" class="badge-new"
                  >รายการใหม่</span
                >
              </div>
              <div class="status-select-wrap">
                <span class="status-badge" :class="`badge-${a.status}`">
                  {{ statusLabel(a.status) }}
                </span>
              </div>
            </div>

            <div class="appt-card__body">
              <div class="appt-card__row">
                <i class="bi bi-telephone appt-card__icon"></i>เบอร์โทร :
                <a :href="`tel:${a.phone}`" class="appt-card__link">{{
                  formatPhone(a.phone)
                }}</a>
              </div>
              <div v-if="a.service" class="appt-card__row">
                <i class="bi bi-clipboard-pulse appt-card__icon"></i
                >บริการที่สนใจ :
                <span class="tag-service">{{ a.service }}</span>
              </div>
              <div class="appt-card__row">
                <i class="bi bi-calendar-check appt-card__icon"></i>วันที่ส่ง :
                <span class="appt-card__text appt-card__text--muted">
                  {{ formatThaiDate(a.created_at) }}
                </span>
              </div>
              <div v-if="a.appointment_date" class="appt-card__row">
                <i class="bi bi-clock appt-card__icon"></i>วันที่นัดหมาย :
                <span
                  class="appt-card__text"
                  style="color: #4f46e5; font-weight: 600"
                >
                  {{ formatThaiDate(a.appointment_date) }}
                </span>
              </div>
            </div>

            <div class="appt-card__footer">
              <button
                class="appt-card__btn appt-card__btn--view"
                @click="viewing = a"
              >
                <i class="bi bi-eye"></i> ดูรายละเอียด
              </button>
              <!-- <button
                class="appt-card__btn appt-card__btn--delete"
                @click="emit('delete', a.id)"
              >
                <i class="bi bi-trash3"></i> ลบ
              </button> -->
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
                <span class="label">ชื่อ</span
                ><span class="value-text">{{ viewing.name }}</span>
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
                <span class="label">อีเมล</span
                ><span class="value-text">{{ viewing.email || "–" }}</span>
              </div>
              <div class="detail-row">
                <span class="label">บริการ</span>
                <span v-if="viewing.service" class="tag-service">{{
                  viewing.service
                }}</span>
                <span v-else class="value-text">–</span>
              </div>
              <div class="detail-row">
                <span class="label">วันที่ส่ง</span
                ><span class="value-text">
                  {{ formatThaiDate(viewing.created_at) }}
                </span>
              </div>
              <div v-if="viewing.status === 'cancelled'" class="detail-row">
                <span class="label">วันที่นัดหมาย</span
                ><span class="value-text">
                  {{ formatThaiDate(viewing.appointment_date) }}
                </span>
              </div>
              <div class="detail-row">
                <span class="label">สถานะ</span>
                <div
                  v-if="viewing.status === 'cancelled'"
                  :class="`status-${pendingStatus}`"
                  style="font-size: 0.75rem; font-weight: 600"
                >
                  ยกเลิก
                </div>
                <select
                  v-else
                  v-model="pendingStatus"
                  class="status-select"
                  :class="`status-${pendingStatus}`"
                >
                  <option :value="viewing.status" disabled>
                    {{ statusLabel(viewing.status) }}
                  </option>
                  <option value="cancelled">ยกเลิก</option>
                </select>
              </div>
              <div v-if="viewing.message" class="flex flex-col gap-1.5 mt-2">
                <span class="label">ข้อความจากลูกค้า</span>
                <p
                  class="bg-neutral-50 rounded-lg p-3 text-neutral-700 leading-relaxed border border-neutral-100 break-words whitespace-pre-wrap"
                >
                  {{ viewing.message }}
                </p>
              </div>
              <div
                v-if="viewing.status !== 'cancelled'"
                class="flex flex-col gap-1.5 mt-2"
              >
                <span class="label">วันที่นัดหมาย</span>
                <input
                  v-model="appointmentDateEdit"
                  type="datetime-local"
                  class="form-input"
                />
              </div>
              <div class="flex flex-col gap-1.5 mt-2">
                <span class="label">หมายเหตุ</span>
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
              <button class="btn btn-primary" @click="saveNote">บันทึก</button>
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
  (
    e: "save",
    id: number,
    status: string,
    note: string,
    appointmentDate: string,
    defaultStatus: string,
  ): void;
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
const appointmentDateEdit = ref("");
const page = ref(1);
const pendingStatus = ref("");
let searchTimer: any;

defineExpose({ filter, page });

watch(viewing, (v) => {
  noteEdit.value = v?.note || "";
  appointmentDateEdit.value = v?.appointment_date || "";
  pendingStatus.value = v?.status || "";
});

const isNewAppointment = (appointment: any) => {
  if (appointment.status !== "pending") return false;
  if (appointment.note && appointment.note.trim() !== "") return false;
  if (!appointment.created_at) return false;
  const diff =
    (new Date().getTime() - new Date(appointment.created_at).getTime()) /
    (1000 * 60);
  return diff <= 10;
};

const formatPhone = (phone: any) => {
  if (!phone) return "";
  const c = phone.toString().replace(/\D/g, "");
  if (c.length === 10) return `${c.slice(0, 3)}-${c.slice(3, 6)}-${c.slice(6)}`;
  if (c.length === 9) return `${c.slice(0, 2)}-${c.slice(2, 5)}-${c.slice(5)}`;
  return phone;
};

const statusOpts = [
  { value: "", label: "ทั้งหมด" },
  { value: "pending", label: "รอติดต่อ" },
  { value: "done", label: "นัดหมายแล้ว" },
  { value: "cancelled", label: "ยกเลิก" },
];

const totalPages = computed(() => Math.ceil(props.total / PAGE_SIZE));
const pageNumbers = computed(() => {
  const current = page.value;
  const total = totalPages.value;
  if (total <= 3) return Array.from({ length: total }, (_, i) => i + 1);
  let start = current - 1,
    end = current + 1;
  if (current === 1) {
    start = 1;
    end = 3;
  } else if (current === total) {
    start = total - 2;
    end = total;
  }
  const pages = [];
  for (let i = start; i <= end; i++) pages.push(i);
  return pages;
});

const statusLabel = (s: string) =>
  s === "pending" ? "รอติดต่อ" : s === "done" ? "นัดหมายแล้ว" : "ยกเลิก";

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
  const id = viewing.value.id;
  const note = noteEdit.value;
  const appointmentDate = appointmentDateEdit.value;

  const status =
    appointmentDate && pendingStatus.value === "pending"
      ? "done"
      : pendingStatus.value;

  viewing.value = null;
  emit("save", id, status, note, appointmentDate, filter.value);
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

.filter-container {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 16px;
  align-items: center;
}
.search-box {
  position: relative;
  flex: 1;
  min-width: 200px;
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

.status-tabs-wrapper {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
}
.status-tabs-wrapper::-webkit-scrollbar {
  display: none;
}
.status-tabs {
  display: flex;
  background: #f3f4f6;
  padding: 4px;
  border-radius: 12px;
  gap: 2px;
  border: 1px solid #e5e7eb;
  white-space: nowrap;
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
tr.row-new td {
  background: #fef9f0;
}

.status-badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
}
.badge-pending {
  background: #fff7ed;
  color: #c2410c;
}
.badge-done {
  background: #d1fae5;
  color: #065f46;
}
.badge-cancelled {
  background: #fee2e2;
  color: #991b1b;
}
.cell-primary {
  font-weight: 600;
  color: #111827;
  display: flex;
  align-items: center;
  gap: 6px;
}
.cell-secondary {
  color: #6b7280;
}
.cell-secondary-phone {
  font-size: 0.8rem;
  color: #4b5563;
  display: flex;
  align-items: center;
  margin-top: 2px;
}
.badge-new {
  display: inline-flex;
  align-items: center;
  padding: 1px 8px;
  border-radius: 9999px;
  font-size: 10px;
  font-weight: 700;
  background: #ef4444;
  color: #fff;
  white-space: nowrap;
}
.tag-service {
  background: #f3f4f6;
  color: #374151;
  padding: 2px 10px;
  border-radius: 9999px;
  font-size: 0.75rem;
  border: 1px solid #e5e7eb;
}

.status-select-wrap {
  position: relative;
  flex-shrink: 0;
}

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
  background-position: right 10px center;
  background-size: 10px;
  transition: all 0.2s;
  background-color: #f4f4f4;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23000000'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
  position: relative;
  z-index: 1;
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

.mobile-cards {
  display: none;
  flex-direction: column;
  gap: 12px;
}

.appt-card {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  overflow: visible;
  transition: background 0.15s;
}
.appt-card--new {
  background: #fef9f0;
  border-color: #fde68a;
}

.appt-card__header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px 8px;
  border-bottom: 1px solid #f3f4f6;
  overflow: visible;
  border-radius: 12px 12px 0 0;
}
.appt-card__num {
  font-size: 0.82rem;
  font-weight: 700;
  color: #9ca3af;
  flex-shrink: 0;
}
.appt-card__name-wrap {
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
}
.appt-card__name {
  font-weight: 700;
  color: #111827;
  font-size: 0.9rem;
}

.appt-card__body {
  padding: 12px 14px;
  display: flex;
  flex-direction: column;
  gap: 7px;
}
.appt-card__row {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.82rem;
}
.appt-card__icon {
  color: #9ca3af;
  font-size: 0.85rem;
  flex-shrink: 0;
  width: 14px;
  text-align: center;
}
.appt-card__link {
  color: #4f46e5;
  font-weight: 500;
  text-decoration: none;
}
.appt-card__text {
  color: #374151;
}
.appt-card__text--muted {
  color: #9ca3af;
  font-size: 0.78rem;
}

.appt-card__footer {
  display: flex;
  gap: 8px;
  padding: 10px 14px;
  border-top: 1px solid #f3f4f6;
  border-radius: 0 0 12px 12px;
}
.appt-card__btn {
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
.appt-card__btn--view {
  color: #374151;
}
.appt-card__btn--view:hover {
  background: #f9fafb;
}
.appt-card__btn--delete {
  color: #ef4444;
  border-color: #fee2e2;
  background: #fef2f2;
}
.appt-card__btn--delete:hover {
  background: #fee2e2;
}

.empty-state {
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

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(17, 24, 39, 0.4);
  backdrop-filter: blur(4px);
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
}
.modal {
  background: #fff;
  border-radius: 14px;
  width: 100%;
  max-width: 480px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  max-height: 90dvh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #f3f4f6;
  flex-shrink: 0;
}
.modal-header h3 {
  font-size: 1rem;
  font-weight: 700;
  color: #111827;
  margin: 0;
}
.close-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: #6b7280;
  font-size: 1rem;
  padding: 4px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.close-btn:hover {
  background: #f3f4f6;
}
.modal-body {
  padding: 20px;
  overflow-y: auto;
  flex: 1;
}
.modal-footer {
  padding: 14px 20px;
  border-top: 1px solid #f3f4f6;
  display: flex;
  gap: 8px;
  justify-content: flex-end;
  background: #f9fafb;
  flex-shrink: 0;
}
.label {
  font-weight: 600;
  color: #6b7280;
  min-width: 90px;
  font-size: 0.9rem;
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
  font-size: 0.875rem;
  outline: none;
  box-sizing: border-box;
}
.form-input:focus {
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}
.btn {
  padding: 8px 18px;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  border: 1px solid transparent;
  transition: all 0.15s;
}
.btn-ghost {
  background: #fff;
  color: #374151;
  border-color: #e5e7eb;
}
.btn-ghost:hover {
  background: #f3f4f6;
}
.btn-primary {
  background: #4f46e5;
  color: #fff;
}
.btn-primary:hover {
  background: #4338ca;
}
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .filter-container {
    flex-direction: column;
    align-items: stretch;
  }
  .status-tabs-wrapper {
    width: 100%;
  }
  .search-box {
    min-width: 0;
  }
  .modal-footer .btn {
    width: 100%;
    justify-content: center;
  }
}

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
  .tab-item {
    padding: 7px 12px;
    font-size: 0.8rem;
    width: 100%;
  }

  .card {
    border: none;
    background: transparent;
    box-shadow: none;
    overflow: visible;
  }

  .modal-overlay {
    align-items: flex-end;
    padding: 0;
  }
  .modal {
    border-radius: 20px 20px 0 0;
    max-height: 92dvh;
  }
}
</style>
