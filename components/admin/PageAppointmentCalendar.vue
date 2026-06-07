<template>
  <div class="calendar-page">
    <div class="page-header">
      <div class="header-left">
        <h2 class="page-title">ตารางนัดหมาย</h2>
        <p class="page-subtitle">ภาพรวมนัดหมายรายเดือน</p>
      </div>
      <div class="header-controls">
        <div class="header-controls-left">
          <span class="period-label">{{ periodLabel }}</span>
          <div class="nav-controls">
            <button class="nav-btn" @click="prevPeriod">
              <i class="bi bi-chevron-left"></i>
            </button>
            <button class="today-btn" @click="goToday">วันนี้</button>
            <button class="nav-btn" @click="nextPeriod">
              <i class="bi bi-chevron-right"></i>
            </button>
          </div>
        </div>

        <div class="view-toggle">
          <button
            class="view-btn"
            :class="{ active: viewMode === 'month' }"
            @click="viewMode = 'month'"
          >
            <i class="bi bi-calendar3"></i> <span>เดือน</span>
          </button>
          <button
            class="view-btn"
            :class="{ active: viewMode === 'week' }"
            @click="viewMode = 'week'"
          >
            <i class="bi bi-calendar-week"></i> <span>สัปดาห์</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Legend -->
    <div class="legend">
      <span class="legend-item">
        <span class="legend-dot dot-done"></span> นัดหมายแล้ว
      </span>
    </div>

    <!-- Month View -->
    <div v-if="viewMode === 'month'" class="calendar-wrap">
      <div class="cal-grid">
        <div v-for="d in dayHeaders" :key="d" class="cal-header-cell">
          {{ d }}
        </div>
        <div
          v-for="cell in monthCells"
          :key="cell.key"
          class="cal-cell"
          :class="{
            'cal-cell--other': !cell.inMonth,
            'cal-cell--today': cell.isToday,
            'cal-cell--has-appt': cell.appointments.length > 0,
          }"
          @click="cell.appointments.length > 0 && openDayDetail(cell)"
        >
          <span class="cal-date">{{ cell.day }}</span>
          <div class="cal-events">
            <div
              v-for="a in cell.appointments.slice(0, 2)"
              :key="a.id"
              class="cal-event"
              :class="`cal-event--${a.status}`"
              @click.stop="openDetail(a)"
              :title="a.name"
            >
              <span class="cal-event-name">{{ a.name }}</span>
            </div>
            <div
              v-if="cell.appointments.length > 2"
              class="cal-more"
              @click.stop="openDayDetail(cell)"
            >
              +{{ cell.appointments.length - 2 }} รายการ
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Week View -->
    <div v-else class="week-wrap">
      <div class="week-grid">
        <div
          v-for="day in weekDays"
          :key="day.key"
          class="week-col"
          :class="{ 'week-col--today': day.isToday }"
        >
          <div class="week-col-header">
            <span class="week-day-name">{{ day.dayName }}</span>
            <span
              class="week-day-num"
              :class="{ 'week-day-num--today': day.isToday }"
              >{{ day.day }}</span
            >
          </div>
          <div class="week-col-body">
            <div v-if="!day.appointments.length" class="week-empty">
              <span>–</span>
            </div>
            <div
              v-for="a in day.appointments"
              :key="a.id"
              class="week-event"
              :class="`week-event--${a.status}`"
              @click="openDetail(a)"
            >
              <div class="week-event-name">{{ a.name }}</div>
              <div class="week-event-meta">
                <i class="bi bi-telephone"></i> {{ formatPhone(a.phone) }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Day Detail Modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div
          v-if="dayDetail"
          class="modal-overlay"
          @click.self="dayDetail = null"
        >
          <div class="modal">
            <div class="modal-header">
              <h3>นัดหมาย {{ dayDetail.dateLabel }}</h3>
              <button class="close-btn" @click="dayDetail = null">
                <i class="bi bi-x-lg"></i>
              </button>
            </div>
            <div class="modal-body">
              <div
                v-for="a in dayDetail.appointments"
                :key="a.id"
                class="day-appt-item"
                :class="`day-appt-item--${a.status}`"
                @click="
                  openDetail(a);
                  dayDetail = null;
                "
              >
                <div class="day-appt-left">
                  <span
                    class="day-appt-status-dot"
                    :class="`dot-${a.status}`"
                  ></span>
                  <div>
                    <div class="day-appt-name">{{ a.name }}</div>
                    <div class="day-appt-meta">
                      <i class="bi bi-telephone"></i> {{ formatPhone(a.phone) }}
                      <span v-if="a.service"> · {{ a.service }}</span>
                    </div>
                  </div>
                </div>
                <span class="day-appt-badge" :class="`badge-${a.status}`">
                  {{ statusLabel(a.status) }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- Appointment Detail Modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="viewing" class="modal-overlay" @click.self="viewing = null">
          <div class="modal">
            <div class="modal-header">
              <h3>รายละเอียดนัดหมาย</h3>
              <button class="close-btn" @click="viewing = null">
                <i class="bi bi-x-lg"></i>
              </button>
            </div>
            <div class="modal-body modal-body--detail">
              <div class="detail-row">
                <span class="label">ชื่อ</span>
                <span class="value-text">{{ viewing.name }}</span>
              </div>
              <div class="detail-row">
                <span class="label">เบอร์โทร</span>
                <a :href="`tel:${viewing.phone}`" class="link-tel">
                  <i class="bi bi-telephone"></i>
                  {{ formatPhone(viewing.phone) }}
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
                <span class="label">วันที่นัดหมาย</span>
                <span class="value-text">{{
                  formatThaiDate(viewing.appointment_date)
                }}</span>
              </div>
              <div class="detail-row">
                <span class="label">สถานะ</span>
                <select
                  v-model="pendingStatus"
                  class="status-select"
                  :class="`status-${pendingStatus}`"
                >
                  <option value="done">นัดหมายแล้ว</option>
                  <option value="cancelled">ยกเลิก</option>
                </select>
              </div>
              <div v-if="viewing.message" class="detail-message">
                <span class="label">ข้อความ</span>
                <p class="message-box">{{ viewing.message }}</p>
              </div>
              <div class="detail-note">
                <span class="label">หมายเหตุ</span>
                <textarea
                  v-model="noteEdit"
                  rows="4"
                  class="form-input resize-none"
                  placeholder="บันทึกข้อมูลเพิ่มเติม..."
                />
              </div>
            </div>
            <div class="modal-footer">
              <button class="btn btn-ghost" @click="viewing = null">
                ยกเลิก
              </button>
              <button class="btn btn-primary" @click="saveAll">บันทึก</button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";

const props = defineProps<{
  items: any[];
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
  ): void;
}>();

const viewMode = ref<"month" | "week">("month");
const today = new Date();
const currentDate = ref(new Date(today.getFullYear(), today.getMonth(), 1));
const viewing = ref<any>(null);
const noteEdit = ref("");
const pendingStatus = ref("");
const dayDetail = ref<{ dateLabel: string; appointments: any[] } | null>(null);

const filteredItems = computed(() => {
  return props.items.filter((item) => item.status === "done");
});

watch(viewing, (v) => {
  noteEdit.value = v?.note || "";
  pendingStatus.value = v?.status || "";
});

const formatPhone = (phone: any) => {
  if (!phone) return "";
  const c = phone.toString().replace(/\D/g, "");
  if (c.length === 10) return `${c.slice(0, 3)}-${c.slice(3, 6)}-${c.slice(6)}`;
  if (c.length === 9) return `${c.slice(0, 2)}-${c.slice(2, 5)}-${c.slice(5)}`;
  return phone;
};

const statusLabel = (s: string) => (s === "done" ? "นัดหมายแล้ว" : "ยกเลิก");

const thMonths = [
  "มกราคม",
  "กุมภาพันธ์",
  "มีนาคม",
  "เมษายน",
  "พฤษภาคม",
  "มิถุนายน",
  "กรกฎาคม",
  "สิงหาคม",
  "กันยายน",
  "ตุลาคม",
  "พฤศจิกายน",
  "ธันวาคม",
];
const dayHeaders = ["อา", "จ", "อ", "พ", "พฤ", "ศ", "ส"];
const dayHeadersFull = [
  "อาทิตย์",
  "จันทร์",
  "อังคาร",
  "พุธ",
  "พฤหัส",
  "ศุกร์",
  "เสาร์",
];

const isSameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

const getApptDate = (a: any) =>
  a.appointment_date ? new Date(a.appointment_date) : null;

const periodLabel = computed(() => {
  if (viewMode.value === "month") {
    return `${thMonths[currentDate.value.getMonth()]} ${currentDate.value.getFullYear() + 543}`;
  }
  const start = weekStart.value;
  const end = new Date(start);
  end.setDate(end.getDate() + 6);
  if (start.getMonth() === end.getMonth()) {
    return `${start.getDate()}–${end.getDate()} ${thMonths[start.getMonth()]} ${start.getFullYear() + 543}`;
  }
  return `${start.getDate()} ${thMonths[start.getMonth()]} – ${end.getDate()} ${thMonths[end.getMonth()]} ${end.getFullYear() + 543}`;
});

const weekStart = computed(() => {
  const d = new Date(currentDate.value);
  d.setDate(d.getDate() - d.getDay());
  return d;
});

function prevPeriod() {
  const d = new Date(currentDate.value);
  viewMode.value === "month"
    ? d.setMonth(d.getMonth() - 1)
    : d.setDate(d.getDate() - 7);
  currentDate.value = d;
}
function nextPeriod() {
  const d = new Date(currentDate.value);
  viewMode.value === "month"
    ? d.setMonth(d.getMonth() + 1)
    : d.setDate(d.getDate() + 7);
  currentDate.value = d;
}
function goToday() {
  currentDate.value = new Date(today.getFullYear(), today.getMonth(), 1);
}

const monthCells = computed(() => {
  const year = currentDate.value.getFullYear();
  const month = currentDate.value.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrev = new Date(year, month, 0).getDate();
  const cells: any[] = [];

  for (let i = firstDay - 1; i >= 0; i--) {
    const day = daysInPrev - i;
    const date = new Date(year, month - 1, day);
    cells.push({
      key: `prev-${day}`,
      day,
      date,
      inMonth: false,
      isToday: isSameDay(date, today),
      appointments: apptForDate(date),
    });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(year, month, d);
    cells.push({
      key: `cur-${d}`,
      day: d,
      date,
      inMonth: true,
      isToday: isSameDay(date, today),
      appointments: apptForDate(date),
    });
  }
  const remaining = 42 - cells.length;
  for (let d = 1; d <= remaining; d++) {
    const date = new Date(year, month + 1, d);
    cells.push({
      key: `next-${d}`,
      day: d,
      date,
      inMonth: false,
      isToday: isSameDay(date, today),
      appointments: apptForDate(date),
    });
  }
  return cells;
});

const weekDays = computed(() => {
  const start = weekStart.value;
  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date(start);
    date.setDate(start.getDate() + i);
    return {
      key: date.toISOString().slice(0, 10),
      day: date.getDate(),
      dayName: dayHeadersFull[i],
      date,
      isToday: isSameDay(date, today),
      appointments: apptForDate(date),
    };
  });
});

function apptForDate(date: Date): any[] {
  return filteredItems.value.filter((a) => {
    const d = getApptDate(a);
    return d && isSameDay(d, date);
  });
}

function openDetail(a: any) {
  viewing.value = a;
}
function openDayDetail(cell: any) {
  const d = cell.date as Date;
  dayDetail.value = {
    dateLabel: `${d.getDate()} ${thMonths[d.getMonth()]} ${d.getFullYear() + 543}`,
    appointments: cell.appointments,
  };
}

function saveAll() {
  if (!viewing.value) return;
  const id = viewing.value.id;
  const status = pendingStatus.value;
  const note = noteEdit.value;
  const appointmentDate = viewing.value.appointment_date || "";
  viewing.value = null; // null หลังเก็บค่าแล้ว
  emit("save", id, status, note, appointmentDate);
}
</script>

<style scoped>
.header-controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
  width: 100%;
}

.header-controls-left {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

.nav-controls {
  display: flex;
  align-items: center;
  gap: 4px;
  background: #f3f4f6;
  border: 1px solid #e5e7eb;
  padding: 4px;
  border-radius: 12px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.nav-btn {
  width: 34px;
  height: 34px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  background: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #374151;
  font-size: 0.875rem;
  transition: background 0.15s;
}

.nav-btn:hover {
  background: #f3f4f6;
  color: #111827;
}

.today-btn {
  padding: 0 14px;
  height: 32px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  background: #fff;
  font-size: 0.85rem;
  font-weight: 600;
  color: #374151;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s;
}

.today-btn:hover {
  background: #f3f4f6;
  color: #111827;
}

.period-label {
  font-size: 1.1rem;
  font-weight: 700;
  color: #1f2937;
  letter-spacing: -0.01em;
}

.view-toggle {
  display: flex;
  background: #f3f4f6;
  border: 1px solid #e5e7eb;
  padding: 4px;
  border-radius: 12px;
  gap: 4px;
}

.view-btn {
  padding: 6px 16px;
  border-radius: 8px;
  border: none;
  background: transparent;
  font-size: 0.85rem;
  font-weight: 500;
  color: #4b5563;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s ease;
}

.view-btn i {
  font-size: 0.95rem;
}

.view-btn.active {
  background: #ffffff;
  color: #111827;
  font-weight: 600;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.05),
    0 2px 4px -1px rgba(0, 0, 0, 0.03);
}

.calendar-page {
  padding: 4px 0;
}

.page-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 16px;
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

.legend {
  display: flex;
  gap: 16px;
  margin-bottom: 14px;
  flex-wrap: wrap;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.8rem;
  color: #6b7280;
}

.legend-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
}

.dot-done {
  background: #10b981;
}
.dot-cancelled {
  background: #ef4444;
}

.calendar-wrap {
  background: #fff;
  border-radius: 14px;
  border: 1px solid #e5e7eb;
  overflow: hidden;
}

.cal-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
}

.cal-header-cell {
  background: #f9fafb;
  text-align: center;
  padding: 10px 4px;
  font-size: 0.78rem;
  font-weight: 700;
  color: #6b7280;
  border-bottom: 1px solid #e5e7eb;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.cal-cell {
  min-height: 110px;
  padding: 6px;
  border-right: 1px solid #f3f4f6;
  border-bottom: 1px solid #f3f4f6;
  vertical-align: top;
  position: relative;
  transition: background 0.12s;
}

.cal-cell:nth-child(7n) {
  border-right: none;
}
.cal-cell--has-appt {
  cursor: pointer;
}
.cal-cell--has-appt:hover {
  background: #fafafa;
}
.cal-cell--other {
  background: #fafafa;
}
.cal-cell--today {
  background: #dce4fb;
}

.cal-date {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  font-size: 0.8rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 4px;
}

.cal-cell--other .cal-date {
  color: #c1c8d4;
  font-weight: 400;
}
.cal-cell--today .cal-date {
  background: #4f46e5;
  color: #fff;
  font-weight: 700;
}

.cal-events {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.cal-event {
  border-radius: 5px;
  padding: 2px 6px;
  font-size: 0.72rem;
  font-weight: 600;
  cursor: pointer;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  transition: opacity 0.12s;
  max-width: 100%;
}

.cal-event:hover {
  opacity: 0.8;
}
.cal-event--done {
  background: #d1fae5;
  color: #065f46;
}
.cal-event--cancelled {
  background: #fee2e2;
  color: #991b1b;
}

.cal-event-name {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.cal-more {
  font-size: 0.7rem;
  color: #6b7280;
  font-weight: 600;
  padding: 1px 4px;
  cursor: pointer;
}

.cal-more:hover {
  color: #4f46e5;
}

.week-wrap {
  background: #fff;
  border-radius: 14px;
  border: 1px solid #e5e7eb;
  overflow: hidden;
}

.week-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  min-height: 400px;
}

.week-col {
  border-right: 1px solid #f3f4f6;
  display: flex;
  flex-direction: column;
}

.week-col:last-child {
  border-right: none;
}
.week-col--today {
  background: #f0f4ff;
}

.week-col-header {
  padding: 10px 8px 8px;
  text-align: center;
  border-bottom: 1px solid #e5e7eb;
  background: #f9fafb;
}

.week-col--today .week-col-header {
  background: #eef1ff;
}

.week-day-name {
  display: block;
  font-size: 0.72rem;
  font-weight: 700;
  color: #9ca3af;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 4px;
}

.week-day-num {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  font-size: 0.9rem;
  font-weight: 700;
  color: #374151;
}

.week-day-num--today {
  background: #4f46e5;
  color: #fff;
}

.week-col-body {
  flex: 1;
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.week-empty {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #d1d5db;
  font-size: 1.2rem;
}

.week-event {
  border-radius: 8px;
  padding: 7px 9px;
  cursor: pointer;
  transition:
    opacity 0.12s,
    transform 0.12s;
}

.week-event:hover {
  opacity: 0.85;
  transform: translateY(-1px);
}
.week-event--done {
  background: #d1fae5;
  border-left: 3px solid #10b981;
}
.week-event--cancelled {
  background: #fee2e2;
  border-left: 3px solid #ef4444;
}

.week-event-name {
  font-size: 0.78rem;
  font-weight: 700;
  color: #111827;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.week-event-meta {
  font-size: 0.7rem;
  color: #6b7280;
  margin-top: 2px;
  display: flex;
  align-items: center;
  gap: 4px;
}

.day-appt-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 14px;
  border-radius: 10px;
  margin-bottom: 8px;
  cursor: pointer;
  transition: opacity 0.12s;
  border: 1px solid #f3f4f6;
}

.day-appt-item:hover {
  opacity: 0.8;
}
.day-appt-item--done {
  background: #f0fdf4;
}
.day-appt-item--cancelled {
  background: #fff1f1;
}

.day-appt-left {
  display: flex;
  align-items: center;
  gap: 10px;
}

.day-appt-status-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
}

.day-appt-name {
  font-weight: 700;
  color: #111827;
  font-size: 0.875rem;
}

.day-appt-meta {
  font-size: 0.78rem;
  color: #6b7280;
  margin-top: 2px;
}

.day-appt-badge {
  padding: 3px 10px;
  border-radius: 9999px;
  font-size: 0.72rem;
  font-weight: 700;
  flex-shrink: 0;
}

.badge-done {
  background: #d1fae5;
  color: #065f46;
}
.badge-cancelled {
  background: #fee2e2;
  color: #991b1b;
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
  max-height: 90dvh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
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
}

.close-btn:hover {
  background: #f3f4f6;
}

.modal-body {
  padding: 16px 20px;
  overflow-y: auto;
  flex: 1;
}

.modal-body--detail {
  display: flex;
  flex-direction: column;
  gap: 14px;
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

.detail-row {
  display: flex;
  align-items: center;
  gap: 12px;
}

.label {
  font-weight: 600;
  color: #6b7280;
  min-width: 80px;
  font-size: 0.8rem;
  text-transform: uppercase;
  flex-shrink: 0;
}

.value-text {
  color: #111827;
  font-size: 0.875rem;
}

.link-tel {
  color: #4f46e5;
  font-weight: 600;
  font-size: 0.875rem;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 5px;
}

.tag-service {
  background: #f3f4f6;
  color: #374151;
  padding: 2px 10px;
  border-radius: 9999px;
  font-size: 0.75rem;
  border: 1px solid #e5e7eb;
}

.detail-message,
.detail-note {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.message-box {
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 10px 12px;
  font-size: 0.875rem;
  color: #374151;
  white-space: pre-wrap;
  word-break: break-word;
  margin: 0;
}

.form-input {
  width: 100%;
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  font-size: 0.875rem;
  outline: none;
  box-sizing: border-box;
  font-family: inherit;
}

.form-input:focus {
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

.status-select {
  -webkit-appearance: none;
  appearance: none;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 6px 32px 6px 10px;
  border-radius: 8px;
  border: 1px solid transparent;
  cursor: pointer;
  outline: none;
  background-repeat: no-repeat;
  background-position: right 8px center;
  background-size: 10px;
  background-color: #f4f4f4;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23000000'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
}

.status-done {
  color: #059669;
}
.status-cancelled {
  color: #f62b2b;
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
  .header-controls {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
  .header-controls-left {
    width: 100%;
    justify-content: space-between;
  }
  .view-toggle {
    width: 100%;
  }
  .view-btn {
    flex: 1;
    justify-content: center;
  }
  .page-header {
    flex-direction: column;
  }
  .period-label {
    min-width: unset;
  }
}

@media (max-width: 640px) {
  .page-title {
    font-size: 1.25rem;
  }
  .cal-cell {
    min-height: 72px;
    padding: 4px;
  }
  .cal-date {
    width: 22px;
    height: 22px;
    font-size: 0.72rem;
  }
  .cal-event {
    font-size: 0.65rem;
    padding: 1px 4px;
  }
  .cal-header-cell {
    font-size: 0.68rem;
    padding: 8px 2px;
  }
  .week-grid {
    grid-template-columns: 1fr;
    min-height: unset;
  }
  .week-col {
    border-right: none;
    border-bottom: 1px solid #f3f4f6;
  }
  .week-col:last-child {
    border-bottom: none;
  }
  .week-col-header {
    display: flex;
    align-items: center;
    gap: 10px;
    text-align: left;
    padding: 10px 14px;
  }
  .week-day-name {
    margin-bottom: 0;
    min-width: 52px;
  }
  .week-col-body {
    padding: 8px 14px;
  }
  .week-empty {
    min-height: 32px;
    flex: unset;
  }
  .modal-overlay {
    align-items: flex-end;
    padding: 0;
  }
  .modal {
    border-radius: 20px 20px 0 0;
    max-height: 92dvh;
  }
  .modal-footer .btn {
    flex: 1;
  }
}
</style>
