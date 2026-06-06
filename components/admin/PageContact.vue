<template>
  <div>
    <div class="page-header">
      <div>
        <h2 class="page-title">ข้อมูลติดต่อ</h2>
        <p class="page-subtitle">
          จัดการข้อมูลการติดต่อ เวลาทำการ และช่องทางโซเชียลมีเดียทั้งหมด
        </p>
      </div>
    </div>

    <div v-if="loading" class="card loading-state">
      <div class="loading-dot" />
      <div class="loading-dot" />
      <div class="loading-dot" />
    </div>

    <template v-else>
      <div class="card" style="margin-bottom: 20px">
        <div class="section-header">
          <div class="section-title">ข้อมูลการติดต่อ</div>
        </div>
        <div class="contact-body-pad">
          <div class="contact-grid">
            <div class="form-group">
              <label class="form-label">เบอร์โทรศัพท์</label>
              <input
                class="form-input"
                v-model="phoneItem.value"
                placeholder="02-xxx-xxxx"
              />
            </div>
            <div class="form-group">
              <label class="form-label">อีเมล</label>
              <input
                class="form-input"
                v-model="emailItem.value"
                type="email"
                placeholder="info@example.com"
              />
            </div>
          </div>

          <div class="bilingual-block">
            <div class="lang-tabs">
              <button
                :class="['lang-tab', { active: addrLang === 'th' }]"
                type="button"
                @click="addrLang = 'th'"
              >
                🇹🇭 ภาษาไทย
              </button>
              <button
                :class="['lang-tab', { active: addrLang === 'en' }]"
                type="button"
                @click="addrLang = 'en'"
              >
                🇬🇧 English
              </button>
            </div>
            <div v-show="addrLang === 'th'" class="form-group mb-0">
              <label class="form-label">ที่อยู่ (ภาษาไทย)</label>
              <textarea
                class="form-input resize-none"
                rows="3"
                v-model="addressItem.value"
                placeholder="123 ถ.สุขุมวิท แขวงคลองเตย เขตคลองเตย กรุงเทพฯ 10110"
              />
            </div>
            <div v-show="addrLang === 'en'" class="form-group mb-0">
              <label class="form-label">Address (English)</label>
              <textarea
                class="form-input resize-none"
                rows="3"
                v-model="addressItem.value_en"
                placeholder="123 Sukhumvit Rd, Khlong Toei, Bangkok 10110"
              />
            </div>
          </div>
        </div>
        <div class="footer-action-bar">
          <button
            class="btn btn-primary btn-save-full"
            @click="emit('save-contact', contactInfo)"
          >
            <i class="bi bi-floppy"></i> บันทึกข้อมูล
          </button>
        </div>
      </div>

      <div class="card" style="margin-bottom: 20px">
        <div class="section-header">
          <div class="section-title">เวลาทำการ</div>
          <div class="action">
            <div class="lang-tabs-sm">
              <button
                :class="['lang-tab-sm', { active: hoursLang === 'th' }]"
                type="button"
                @click="hoursLang = 'th'"
              >
                🇹🇭 ภาษาไทย
              </button>
              <button
                :class="['lang-tab-sm', { active: hoursLang === 'en' }]"
                type="button"
                @click="hoursLang = 'en'"
              >
                🇬🇧 English
              </button>
            </div>
            <button
              class="btn btn-ghost btn-sm btn-add-row"
              @click="
                businessHours.push({
                  day_label: '',
                  day_label_en: '',
                  hours: '',
                  hours_en: '',
                })
              "
            >
              + เพิ่มแถว
            </button>
          </div>
        </div>

        <div class="table-responsive-wrapper">
          <table class="desktop-table">
            <thead>
              <tr>
                <th>{{ hoursLang === "th" ? "วัน" : "Day" }}</th>
                <th>{{ hoursLang === "th" ? "เวลา" : "Hours" }}</th>
                <th style="width: 50px"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(h, i) in businessHours" :key="i">
                <td>
                  <input
                    v-if="hoursLang === 'th'"
                    class="form-input"
                    v-model="h.day_label"
                    placeholder="เช่น จันทร์-ศุกร์"
                  />
                  <input
                    v-else
                    class="form-input"
                    v-model="h.day_label_en"
                    placeholder="e.g. Mon-Fri"
                  />
                </td>
                <td>
                  <input
                    v-if="hoursLang === 'th'"
                    class="form-input"
                    v-model="h.hours"
                    placeholder="เช่น 08:00–17:00"
                  />
                  <input
                    v-else
                    class="form-input"
                    v-model="h.hours_en"
                    placeholder="e.g. 08:00–17:00"
                  />
                </td>
                <td style="text-align: right">
                  <button
                    class="btn-icon btn-icon-danger"
                    @click="businessHours.splice(i, 1)"
                  >
                    <i class="bi bi-trash3"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="mobile-cards-list">
          <div
            v-for="(h, i) in businessHours"
            :key="i"
            class="mobile-responsive-card"
          >
            <div class="mobile-card-header">
              <span class="mobile-item-number">แถวที่ {{ i + 1 }}</span>
              <button
                class="btn-icon btn-icon-danger"
                @click="businessHours.splice(i, 1)"
              >
                <i class="bi bi-trash3"></i>
              </button>
            </div>

            <div class="mobile-card-body">
              <div class="form-group">
                <label class="form-label">{{
                  hoursLang === "th" ? "วัน" : "Day"
                }}</label>
                <input
                  v-if="hoursLang === 'th'"
                  class="form-input"
                  v-model="h.day_label"
                  placeholder="เช่น จันทร์-ศุกร์"
                />
                <input
                  v-else
                  class="form-input"
                  v-model="h.day_label_en"
                  placeholder="e.g. Mon-Fri"
                />
              </div>

              <div class="form-group">
                <label class="form-label">{{
                  hoursLang === "th" ? "เวลา" : "Hours"
                }}</label>
                <input
                  v-if="hoursLang === 'th'"
                  class="form-input"
                  v-model="h.hours"
                  placeholder="เช่น 08:00–17:00"
                />
                <input
                  v-else
                  class="form-input"
                  v-model="h.hours_en"
                  placeholder="e.g. 08:00–17:00"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="footer-action-bar">
          <button
            class="btn btn-primary btn-save-full"
            @click="emit('save-hours', businessHours)"
          >
            <i class="bi bi-floppy"></i> บันทึกข้อมูล
          </button>
        </div>
      </div>

      <div class="card">
        <div class="section-header">
          <div class="section-title">Social Media</div>
          <button
            class="btn btn-ghost btn-sm btn-add-row"
            @click="
              socialItems.push({
                platform: '',
                url: '',
                label: '',
                icon: '',
                is_active: 1,
                sort_order: socialItems.length + 1,
              })
            "
          >
            + เพิ่มรายการ
          </button>
        </div>

        <div class="table-responsive-wrapper">
          <table class="desktop-table">
            <thead>
              <tr>
                <th style="width: 80px; text-align: center">ลำดับ</th>
                <th>Platform</th>
                <th>URL</th>
                <th style="width: 120px; text-align: center">สถานะ</th>
                <th style="width: 50px"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(s, i) in socialItems" :key="s.platform || i">
                <td style="text-align: center; vertical-align: middle">
                  <div class="order-wrapper">
                    <button
                      class="btn-order"
                      type="button"
                      :disabled="i === 0"
                      @click="emit('social-reorder', i, -1)"
                    >
                      <i class="bi bi-chevron-up"></i>
                    </button>
                    <button
                      class="btn-order"
                      type="button"
                      :disabled="i === socialItems.length - 1"
                      @click="emit('social-reorder', i, 1)"
                    >
                      <i class="bi bi-chevron-down"></i>
                    </button>
                  </div>
                </td>
                <td>
                  <input
                    class="form-input"
                    v-model="s.platform"
                    placeholder="เช่น facebook"
                  />
                </td>
                <td>
                  <input
                    class="form-input"
                    v-model="s.url"
                    type="url"
                    placeholder="https://..."
                  />
                </td>
                <td style="text-align: center; vertical-align: middle">
                  <label
                    class="switch-container"
                    :title="s.is_active ? 'แสดง' : 'ปิดอยู่'"
                  >
                    <input
                      type="checkbox"
                      v-model="s.is_active"
                      :true-value="1"
                      :false-value="0"
                      @change="emit('social-toggle', s)"
                    />
                    <span class="custom-slider">
                      <span class="text-on">แสดง</span>
                      <span class="text-off">ปิด</span>
                    </span>
                  </label>
                  <span
                    v-if="s._updating"
                    class="updating-dot"
                    title="กำลังบันทึก..."
                  ></span>
                </td>
                <td style="text-align: right; vertical-align: middle">
                  <button
                    class="btn-icon btn-icon-danger"
                    @click="socialItems.splice(i, 1)"
                  >
                    <i class="bi bi-trash3"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="mobile-cards-list">
          <div
            v-for="(s, i) in socialItems"
            :key="s.platform || i"
            class="mobile-responsive-card"
          >
            <div class="mobile-card-header">
              <span class="mobile-item-number">รายการที่ {{ i + 1 }}</span>
              <div class="mobile-order-actions">
                <button
                  class="btn-order"
                  type="button"
                  :disabled="i === 0"
                  @click="emit('social-reorder', i, -1)"
                >
                  <i class="bi bi-chevron-up"></i>
                </button>
                <button
                  class="btn-order"
                  type="button"
                  :disabled="i === socialItems.length - 1"
                  @click="emit('social-reorder', i, 1)"
                >
                  <i class="bi bi-chevron-down"></i>
                </button>
              </div>
            </div>

            <div class="mobile-card-body">
              <div class="form-group">
                <label class="form-label">Platform</label>
                <input
                  class="form-input"
                  v-model="s.platform"
                  placeholder="เช่น facebook"
                />
              </div>

              <div class="form-group">
                <label class="form-label">URL</label>
                <input
                  class="form-input"
                  v-model="s.url"
                  type="url"
                  placeholder="https://..."
                />
              </div>
            </div>

            <div class="mobile-card-footer">
              <div class="status-toggle-box">
                <label class="switch-container">
                  <input
                    type="checkbox"
                    v-model="s.is_active"
                    :true-value="1"
                    :false-value="0"
                    @change="emit('social-toggle', s)"
                  />
                  <span class="custom-slider">
                    <span class="text-on">แสดง</span>
                    <span class="text-off">ปิด</span>
                  </span>
                </label>
                <span v-if="s._updating" class="updating-dot"></span>
              </div>
              <button
                class="btn-icon btn-icon-danger mobile-btn-delete"
                @click="socialItems.splice(i, 1)"
              >
                <i class="bi bi-trash3"></i> ลบรายการ
              </button>
            </div>
          </div>
        </div>

        <div class="footer-action-bar">
          <button
            class="btn btn-primary btn-save-full"
            @click="emit('save-social', socialItems)"
          >
            <i class="bi bi-floppy"></i> บันทึกข้อมูล
          </button>
          <span v-if="reorderSaving" class="saving-hint">
            <i class="bi bi-arrow-repeat spin"></i> กำลังบันทึกลำดับ...
          </span>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

const props = defineProps<{
  loading: boolean;
  contactInfo: any[];
  businessHours: any[];
  socialItems: any[];
  reorderSaving?: boolean;
}>();

const emit = defineEmits<{
  (e: "save-contact", data: any[]): void;
  (e: "save-hours", data: any[]): void;
  (e: "save-social", data: any[]): void;
  (e: "social-reorder", index: number, direction: number): void;
  (e: "social-toggle", item: any): void;
}>();

const addrLang = ref<"th" | "en">("th");
const hoursLang = ref<"th" | "en">("th");

const addressItem = computed(
  () =>
    props.contactInfo.find((c) => c.key === "address") ?? {
      value: "",
      value_en: "",
    },
);
const phoneItem = computed(
  () => props.contactInfo.find((c) => c.key === "phone") ?? { value: "" },
);
const emailItem = computed(
  () => props.contactInfo.find((c) => c.key === "email") ?? { value: "" },
);
</script>

<style scoped>
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 16px 10px;
  border-bottom: 1px solid #f3f4f6;
}

.section-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
}

.contact-body-pad {
  padding: 20px 24px 24px;
}

.contact-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.bilingual-block {
  margin-top: 16px;
}

.lang-tabs {
  display: flex;
  gap: 4px;
  border-bottom: 1px solid #e5e7eb;
  margin-bottom: 16px;
}
.lang-tab {
  padding: 7px 18px;
  border-radius: 8px 8px 0 0;
  border: 1px solid transparent;
  background: transparent;
  font-size: 0.82rem;
  font-weight: 500;
  color: #6b7280;
  cursor: pointer;
  margin-bottom: -1px;
  transition: all 0.15s;
}
.lang-tab.active {
  background: #fff;
  border-color: #e5e7eb;
  border-bottom-color: #fff;
  color: #111827;
  font-weight: 600;
}

.lang-tabs-sm {
  display: flex;
  background: #f3f4f6;
  border-radius: 8px;
  padding: 2px;
  gap: 2px;
}
.lang-tab-sm {
  padding: 4px 12px;
  border-radius: 6px;
  border: none;
  background: transparent;
  font-size: 0.78rem;
  font-weight: 600;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.15s;
}
.lang-tab-sm.active {
  background: #fff;
  color: #111827;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
}

.order-wrapper {
  display: inline-flex;
  flex-direction: column;
  gap: 4px;
  align-items: center;
}
.btn-order {
  background-color: #e5e7eb;
  color: #4b5563;
  border-radius: 6px;
  border: none;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.15s ease;
}
.btn-order:hover:not(:disabled) {
  background-color: #d1d5db;
  color: #111827;
}
.btn-order:disabled {
  opacity: 0.2;
  cursor: not-allowed;
}

.switch-container {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 28px;
  cursor: pointer;
}
.switch-container input {
  opacity: 0;
  width: 0;
  height: 0;
}
.custom-slider {
  position: absolute;
  cursor: pointer;
  inset: 0;
  background-color: #c0c0c1;
  border: 1px solid #c0c0c1;
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 8px;
  transition: 0.25s ease-in-out;
}
.text-on,
.text-off {
  font-size: 10px;
  font-weight: 900;
  user-select: none;
  font-family: sans-serif;
}
.text-on {
  color: #065f46;
  opacity: 0;
}
.text-off {
  color: #fff;
  opacity: 1;
}
.custom-slider:before {
  position: absolute;
  content: "";
  height: 20px;
  width: 20px;
  left: 3px;
  bottom: 3px;
  background-color: #fff;
  border-radius: 50%;
  transition: 0.25s ease-in-out;
  z-index: 2;
}
input:checked + .custom-slider {
  background-color: #d1fae5;
  border-color: #d1fae5;
}
input:checked + .custom-slider:before {
  transform: translateX(32px);
}
input:checked + .custom-slider .text-on {
  opacity: 1;
}
input:checked + .custom-slider .text-off {
  opacity: 0;
}

.updating-dot {
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #f59e0b;
  margin-left: 6px;
  vertical-align: middle;
  animation: pulse 0.8s ease-in-out infinite;
}
@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.3;
  }
}

.saving-hint {
  font-size: 0.75rem;
  color: #9ca3af;
  display: flex;
  align-items: center;
  gap: 4px;
}
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.spin {
  display: inline-block;
  animation: spin 1s linear infinite;
}

table td {
  vertical-align: middle;
}

.action {
  display: flex;
  gap: 12px;
  align-items: center;
}

.table-responsive-wrapper {
  display: block;
}

.desktop-table {
  width: 100%;
  border-collapse: collapse;
}

.mobile-cards-list {
  display: none;
}

.footer-action-bar {
  padding: 20px 24px 24px;
  display: flex;
  align-items: center;
  gap: 12px;
  border-top: 1px solid #f3f4f6;
  background: #f9fafb;
}

.btn-save-full {
  width: auto;
}

@media (max-width: 768px) {
  .section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
    padding: 16px;
  }

  .action {
    width: 100%;
    flex-direction: row-reverse;
    justify-content: space-between;
  }

  .btn-add-row {
    width: auto;
  }

  .contact-body-pad {
    padding: 16px;
  }

  .contact-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .table-responsive-wrapper {
    display: none;
  }

  .mobile-cards-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 16px;
  }

  .mobile-responsive-card {
    background: #ffffff;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    padding: 14px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.02);
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
    font-weight: 600;
    color: #4b5563;
  }

  .mobile-order-actions {
    display: flex;
    gap: 6px;
  }

  .mobile-card-body {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .mobile-card-body .form-group {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .mobile-card-body .form-label {
    font-size: 0.75rem;
    font-weight: 600;
    color: #6b7280;
  }

  .mobile-card-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid #f3f4f6;
    padding-top: 10px;
    margin-top: 4px;
  }

  .status-toggle-box {
    display: flex;
    align-items: center;
  }

  .mobile-btn-delete {
    width: auto;
    height: auto;
    padding: 6px 12px;
    font-size: 0.8rem;
    gap: 4px;
    border-radius: 8px;
  }

  .footer-action-bar {
    padding: 16px;
    flex-direction: column;
    align-items: stretch;
  }

  .btn-save-full {
    width: 100%;
    justify-content: center;
  }

  .saving-hint {
    justify-content: center;
  }
}
</style>
