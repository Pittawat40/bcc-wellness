<template>
  <div
    class="dashboard-container font-sans antialiased text-slate-800 p-1 sm:p-2"
  >
    <div class="page-header mb-6">
      <h2 class="page-title text-2xl font-bold text-[var(--text-primary)]">
        ภาพรวมระบบและการตลาด
      </h2>
      <p class="page-subtitle text-sm text-[var(--text-secondary)]">
        สรุปสถิติผู้เข้าชมและ Conversion การตลาดระบบ BCC IVF Wellness
      </p>
    </div>

    <div class="stats-grid mb-4 md:mb-6">
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
      </div>
    </div>

    <div class="stats-grid mb-6">
      <div class="stat-card" v-for="v in visitorStatsMapped" :key="v.label">
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

      <div class="chart-card">
        <div class="chart-header">
          <h3 class="chart-title">ช่องทางแพลตฟอร์มของลูกค้า (Leads)</h3>
          <span class="chart-subtitle"
            >สัดส่วนที่มาของคนไข้ที่ลงทะเบียนเข้ามา</span
          >
        </div>
        <div class="chart-wrapper pie-layout">
          <div class="pie-chart-container">
            <Pie :data="platformChartData" :options="platformChartOptions" />
          </div>
          <div class="platform-legends">
            <div
              v-for="(val, idx) in props.platformData"
              :key="idx"
              class="legend-item"
            >
              <span
                class="legend-dot"
                :style="{ backgroundColor: platformColors[idx] }"
              ></span>
              <span class="legend-name">{{ platformLabels[idx] }}</span>
              <span class="legend-val">{{ val }} เคส</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
} from "chart.js";
import { Bar, Pie } from "vue-chartjs";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
);

interface VisitorSummary {
  today: string | number;
  month: string | number;
  total: string | number;
}

const props = withDefaults(
  defineProps<{
    stats?: any[];
    visitorMonthlyData?: number[];
    visitorSummary?: VisitorSummary;
    marketingData?: {
      consultations: number | string;
      packagesSold: number | string;
      successRate: string;
      leadsCount: number | string;
    };
    platformData?: number[];
  }>(),
  {
    visitorMonthlyData: () => [
      4200, 5100, 3800, 6200, 7500, 8200, 9100, 10500, 12000, 11400, 13500,
      15000,
    ],
    visitorSummary: () => ({
      today: "1,245",
      month: "48,530",
      total: "624,180",
    }),
    marketingData: () => ({
      consultations: 142,
      packagesSold: 38,
      successRate: 10,
      leadsCount: 285,
    }),
    platformData: () => [125, 78, 54, 28],
  },
);

const ivfMarketingStats = computed(() => [
  {
    label: "นัดหมายปรึกษา",
    value: props.marketingData.consultations,
    icon: "bi-chat-heart-fill",
    color: "#cc9450",
    bg: "rgba(204, 148, 80, 0.1)",
  },
  {
    label: "นัดหมายเสร็จสิ้น",
    value: props.marketingData.packagesSold,
    icon: "bi-bag-check-fill",
    color: "#527f51",
    bg: "rgba(82, 127, 81, 0.1)",
  },
  {
    label: "ยกเลิกนัดหมาย",
    value: props.marketingData.successRate,
    icon: "bi-bag-x-fill",
    color: "#f62b2b",
    bg: "rgba(179, 111, 64, 0.1)",
  },
]);

const visitorStatsMapped = computed(() => [
  {
    label: "ยอดเข้าชมวันนี้",
    value: props.visitorSummary.today,
    icon: "bi-eye-fill",
    color: "#d86d28",
    bg: "rgba(216, 109, 40, 0.1)",
  },
  {
    label: "ยอดเข้าชมเดือนนี้",
    value: props.visitorSummary.month,
    icon: "bi-calendar3",
    color: "#527f51",
    bg: "rgba(82, 127, 81, 0.1)",
  },
  {
    label: "ยอดเข้าชมทั้งหมด",
    value: props.visitorSummary.total,
    icon: "bi-globe2",
    color: "#cc9450",
    bg: "rgba(204, 148, 80, 0.1)",
  },
]);

const platformLabels = ["Facebook Ads", "Line OA", "Google Search", "TikTok"];

const platformColors = ["#1877F2", "#06C755", "#EA4335", "#000000"];

const platformChartData = computed(() => ({
  labels: platformLabels,
  datasets: [
    {
      data: props.platformData,
      backgroundColor: platformColors,
      borderWidth: 2,
      borderColor: "#ffffff",
    },
  ],
}));

const platformFormatedFont = { family: "Noto Sans Thai, sans-serif", size: 12 };

const platformChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      padding: 12,
      cornerRadius: 8,
      backgroundColor: "#3a3a34",
      bodyFont: platformFormatedFont,
    },
  },
};

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
      data: props.visitorMonthlyData,
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
.stat-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  opacity: 0.6;
  border-radius: 0 0 var(--radius-lg) var(--radius-lg);
  background-color: #cc9450;
}

.visitor-stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}
.visitor-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  box-shadow: var(--shadow-sm);
}
.visitor-icon-wrap {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
}

.daily .visitor-icon-wrap {
  background: rgba(216, 109, 40, 0.1);
  color: #d86d28;
}
.monthly .visitor-icon-wrap {
  background: rgba(82, 127, 81, 0.1);
  color: #527f51;
}
.total .visitor-icon-wrap {
  background: rgba(204, 148, 80, 0.1);
  color: #cc9450;
}

.visitor-info {
  display: flex;
  flex-direction: column;
}
.visitor-label {
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--text-secondary);
  margin-bottom: 4px;
}
.visitor-value {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
  color: var(--text-primary);
}

.dashboard-charts-layout {
  display: grid;
  grid-template-columns: 2fr 1.3fr;
  gap: 16px;
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
  height: 300px;
  width: 100%;
}

.pie-layout {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}
.pie-chart-container {
  width: 50%;
  height: 100%;
}
.platform-legends {
  width: 50%;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.legend-item {
  display: flex;
  align-items: center;
  font-size: 0.85rem;
}
.legend-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-right: 8px;
  display: inline-block;
}
.legend-name {
  color: var(--text-secondary);
  font-weight: 500;
  flex: 1;
}
.legend-val {
  font-weight: 700;
  color: var(--text-primary);
}

@media (max-width: 1024px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .dashboard-charts-layout {
    grid-template-columns: 1fr;
  }
  .pie-layout {
    flex-direction: column;
  }
  .pie-chart-container,
  .platform-legends {
    width: 100%;
    height: 50%;
  }
}
@media (max-width: 768px) {
  .visitor-stats-grid {
    grid-template-columns: 1fr;
  }
}
@media (max-width: 520px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
}
</style>
