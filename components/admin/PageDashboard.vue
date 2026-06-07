<template>
  <div
    class="dashboard-container font-sans antialiased text-slate-800 p-1 sm:p-2"
  >
    <div
      class="page-header mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
    >
      <div>
        <h2 class="page-title text-2xl font-bold text-[var(--text-primary)]">
          ภาพรวมระบบและการตลาด
        </h2>
        <p class="page-subtitle text-sm text-[var(--text-secondary)]">
          สรุปสถิติผู้เข้าชมและ Conversion การตลาดระบบ BCC IVF Wellness
        </p>
      </div>

      <button
        @click="handleRefresh"
        :disabled="pending"
        class="refresh-btn relative flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl shadow-sm hover:bg-slate-50 hover:text-slate-900 active:scale-[0.98] disabled:opacity-70 disabled:pointer-events-none transition-all duration-200 ease-out min-w-[140px] self-start sm:self-center"
      >
        <i
          :class="[
            'bi bi-arrow-clockwise text-base flex items-center',
            { 'spin-one-shot': isAnimating },
          ]"
        ></i>
        <span>รีเฟรชข้อมูล</span>
      </button>
    </div>

    <div class="relative min-h-[400px]">
      <div
        v-if="pending && !data"
        class="absolute inset-0 flex items-center justify-center bg-slate-50/50 backdrop-blur-[1px] z-10 transition-opacity duration-300"
      >
        <div
          class="flex flex-col items-center gap-2 bg-white/90 px-6 py-4 rounded-2xl shadow-sm border border-slate-100"
        >
          <i
            class="bi bi-arrow-clockwise text-2xl text-[#cc9450] animate-spin"
          ></i>
          <span class="text-sm font-medium text-slate-500"
            >กำลังโหลดข้อมูล...</span
          >
        </div>
      </div>

      <div v-else-if="fetchError" class="error-banner">
        ⚠️ โหลดข้อมูลไม่สำเร็จ: {{ fetchError.message }}
      </div>

      <div
        :class="[
          'transition-all duration-300',
          { 'opacity-40 pointer-events-none blur-[0.5px]': pending && data },
        ]"
      >
        <div class="stats-grid">
          <div class="stat-card" v-for="s in ivfMarketingStats" :key="s.label">
            <div class="stat-icon-wrap" :style="{ background: s.bg }">
              <i
                :class="['bi', s.icon, 'stat-icon']"
                :style="{ color: s.color }"
              ></i>
            </div>
            <div class="stat-info">
              <div class="stat-value">{{ s.value }}</div>
              <div class="stat-label">{{ s.label }}</div>
            </div>
            <div
              class="stat-border-line"
              :style="{ backgroundColor: s.color }"
            ></div>
          </div>
        </div>

        <div class="section-divider"></div>

        <div class="dashboard-charts-layout">
          <div class="chart-card">
            <div class="chart-header">
              <h3 class="chart-title">สถิติยอดผู้เข้าชมเว็บไซต์รายเดือน</h3>
              <span class="chart-subtitle"
                >ข้อมูลอัปเดตล่าสุดสอดคล้องกับแคมเปญการตลาด</span
              >
            </div>
            <div class="chart-wrapper">
              <Bar :data="chartData" :options="chartOptions" />
            </div>
          </div>

          <div class="visitor-column-layout">
            <div
              class="stat-card"
              v-for="v in visitorStatsMapped"
              :key="v.label"
            >
              <div class="stat-icon-wrap" :style="{ background: v.bg }">
                <i
                  :class="['bi', v.icon, 'stat-icon']"
                  :style="{ color: v.color }"
                ></i>
              </div>
              <div class="stat-info">
                <div class="stat-value">{{ v.value }}</div>
                <div class="stat-label">{{ v.label }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { Bar } from "vue-chartjs";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const API_BASE = import.meta.env.API_BASE || "http://localhost:4002";

const {
  data,
  pending,
  error: fetchError,
  refresh,
} = await useFetch<{
  success: boolean;
  data: {
    visitorSummary: { today: string; month: string; total: string };
    marketingData: {
      consultations: number;
      packagesSold: number;
      successRate: number;
      leadsCount: number;
    };
    visitorMonthlyData: number[];
  };
}>(`${API_BASE}/api/dashboard`, {
  server: true,
  lazy: false,
});

// เพิ่ม State สำหรับควบคุมแอนิเมชันปุ่มสปินเนอร์แยกต่างหาก
const isAnimating = ref(false);

const handleRefresh = () => {
  if (isAnimating.value) return;

  isAnimating.value = true;
  refresh();

  // ปลดล็อกอนิเมชันหลังจากหมุนครบรอบ 1 รอบ (ใช้เวลา 600ms เท่ากับใน CSS)
  setTimeout(() => {
    isAnimating.value = false;
  }, 600);
};

const visitorSummary = computed(
  () =>
    data.value?.data?.visitorSummary ?? { today: "0", month: "0", total: "0" },
);

const marketingData = computed(
  () =>
    data.value?.data?.marketingData ?? {
      consultations: 0,
      packagesSold: 0,
      successRate: 0,
      leadsCount: 0,
    },
);

const visitorMonthlyData = computed(
  () =>
    data.value?.data?.visitorMonthlyData ?? [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
);

const ivfMarketingStats = computed(() => [
  {
    label: "นัดหมายปรึกษา",
    value: marketingData.value.consultations,
    icon: "bi-chat-heart-fill",
    color: "#cc9450",
    bg: "rgba(204, 148, 80, 0.1)",
  },
  {
    label: "นัดหมายเสร็จสิ้น",
    value: marketingData.value.packagesSold,
    icon: "bi-bag-check-fill",
    color: "#527f51",
    bg: "rgba(82, 127, 81, 0.1)",
  },
  {
    label: "ยกเลิกนัดหมาย",
    value: marketingData.value.successRate,
    icon: "bi-bag-x-fill",
    color: "#f62b2b",
    bg: "rgba(179, 111, 64, 0.1)",
  },
]);

const visitorStatsMapped = computed(() => [
  {
    label: "ยอดเข้าชมทั้งหมด",
    value: visitorSummary.value.total,
    icon: "bi-globe2",
    color: "#cc9450",
    bg: "rgba(204, 148, 80, 0.1)",
  },
  {
    label: "ยอดเข้าชมเดือนนี้",
    value: visitorSummary.value.month,
    icon: "bi-calendar3",
    color: "#527f51",
    bg: "rgba(82, 127, 81, 0.1)",
  },
  {
    label: "ยอดเข้าชมวันนี้",
    value: visitorSummary.value.today,
    icon: "bi-eye-fill",
    color: "#d86d28",
    bg: "rgba(216, 109, 40, 0.1)",
  },
]);

const chartData = computed(() => ({
  labels: [
    "ม.ค.",
    "ก.พ.",
    "มี.ค.",
    "เม.ย.",
    "พ.ค.",
    "มิ.ย.",
    "ก.ค.",
    "ส.ค.",
    "ก.ย.",
    "ต.ค.",
    "พ.ย.",
    "ธ.ค.",
  ],
  datasets: [
    {
      label: "ยอดผู้เข้าชม (ครั้ง)",
      backgroundColor: "#eab07d",
      borderRadius: 6,
      data: visitorMonthlyData.value,
      barPercentage: 0.6,
      categoryPercentage: 0.8,
    },
  ],
}));

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: { padding: 12, cornerRadius: 8, backgroundColor: "#3a3a34" },
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: { font: { family: "Noto Sans Thai, sans-serif", size: 12 } },
    },
    y: {
      border: { dash: [4, 4] },
      grid: { color: "#e8e8e4" },
      ticks: { font: { family: "Noto Sans Thai, sans-serif", size: 12 } },
    },
  },
};
</script>

<style scoped>
.refresh-btn {
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}
.refresh-btn:hover {
  border-color: #cbd5e1;
}

/* แอนิเมชันสำหรับหมุน 1 รอบเป๊ะๆ (One-shot animation) */
.spin-one-shot {
  animation: spinOnce 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes spinOnce {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
}
.stat-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  box-shadow: var(--shadow-sm);
  position: relative;
  overflow: hidden;
}
.stat-icon-wrap {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.stat-icon {
  font-size: 1.4rem;
}
.stat-info {
  flex: 1;
}
.stat-value {
  font-size: 1.6rem;
  font-weight: 700;
  line-height: 1;
  margin-bottom: 4px;
}
.stat-label {
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--text-secondary);
}
.stat-border-line {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 4px;
  opacity: 0.7;
}
.section-divider {
  height: 1px;
  background-color: var(--border);
  margin: 24px 0;
  opacity: 0.8;
}
.dashboard-charts-layout {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 16px;
  align-items: start;
}
.chart-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 24px;
  box-shadow: var(--shadow-sm);
}
.chart-header {
  margin-bottom: 20px;
}
.chart-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0 0 4px 0;
  color: var(--text-primary);
}
.chart-subtitle {
  font-size: 0.85rem;
  color: var(--text-secondary);
}
.chart-wrapper {
  position: relative;
  height: 320px;
  width: 100%;
}
.visitor-column-layout {
  display: flex;
  flex-direction: column;
  gap: 16px;
  height: 100%;
}
.visitor-column-layout .stat-card {
  flex: 1;
  min-height: 100px;
}
.error-banner {
  background: #fff0f0;
  border: 1px solid #fca5a5;
  color: #b91c1c;
  border-radius: 8px;
  padding: 16px 20px;
  font-size: 0.9rem;
}
@media (max-width: 1024px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .dashboard-charts-layout {
    grid-template-columns: 1fr;
  }
  .visitor-column-layout {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }
}
@media (max-width: 768px) {
  .visitor-column-layout {
    grid-template-columns: 1fr;
  }
}
@media (max-width: 520px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
}
</style>
