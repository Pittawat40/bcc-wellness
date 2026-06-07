<template>
  <div>
    <div class="page-header-stories">
      <div class="header-text-group">
        <h2 class="page-title">ความสำเร็จ</h2>
        <p class="page-subtitle">
          จัดการเรื่องราวทั้งหมด ({{ items.length }} รายการ)
        </p>
      </div>
      <button class="btn-add-story" @click="openModal()">
        <span>+</span> เพิ่มเรื่องราว
      </button>
    </div>

    <div class="card">
      <div v-if="loading" class="loading-state">
        <div class="loading-dot" />
        <div class="loading-dot" />
        <div class="loading-dot" />
      </div>
      <div v-else>
        <div class="table-wrap show-desktop-only">
          <table>
            <thead>
              <tr>
                <th style="width: 50px"></th>
                <th style="width: 90px">รูป</th>
                <th>ชื่อเรื่อง / ผู้เขียน</th>
                <th style="width: 100px">สถานะ</th>
                <th style="width: 150px">วันที่สร้าง</th>
                <th style="width: 90px"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="!items.length">
                <td colspan="6" class="empty-state">
                  <div class="empty-state-inner">
                    <i class="bi bi-award empty-icon"></i>
                    <span>ยังไม่มีเรื่องราว</span>
                  </div>
                </td>
              </tr>
              <tr v-for="(s, index) in items" :key="s.id">
                <td>
                  <span class="ps-2">{{ index + 1 }}</span>
                </td>
                <td>
                  <div class="thumb-wrap">
                    <img
                      v-if="s.image"
                      :src="imageUrl(s.image)"
                      class="thumb"
                    />
                    <div v-else class="thumb-placeholder">
                      <i class="bi bi-image"></i>
                    </div>
                  </div>
                </td>
                <td>
                  <div class="cell-primary line-clamp-1">{{ s.title }}</div>
                  <div class="cell-secondary line-clamp-1">
                    {{ s.author || "ไม่ระบุผู้เขียน" }}
                  </div>
                </td>
                <td>
                  <span
                    class="whitespace-nowrap"
                    :class="[
                      'badge',
                      s.status === 'published' ? 'badge-green' : 'badge-amber',
                    ]"
                  >
                    {{ s.status === "published" ? "เผยแพร่" : "ซ่อน" }}
                  </span>
                </td>
                <td>
                  <div class="cell-secondary whitespace-nowrap">
                    {{ formatThaiDate(s.created_at) }}
                  </div>
                </td>
                <td>
                  <div class="action-group">
                    <button
                      class="btn-icon"
                      @click="openModal(s)"
                      title="แก้ไข"
                    >
                      <i class="bi bi-pencil"></i>
                    </button>
                    <button
                      class="btn-icon btn-icon-danger"
                      @click="emit('delete', s.id)"
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

        <div class="show-mobile-only mobile-cards-list">
          <div v-if="!items.length" class="empty-state-mobile">
            <i class="bi bi-award empty-icon"></i>
            <span>ยังไม่มีเรื่องราว</span>
          </div>

          <div
            v-for="(s, index) in items"
            :key="s.id"
            class="mobile-responsive-card"
          >
            <div class="mobile-card-header">
              <span class="mobile-item-number">#{{ index + 1 }}</span>
              <span
                :class="[
                  'badge',
                  s.status === 'published' ? 'badge-green' : 'badge-amber',
                ]"
              >
                {{ s.status === "published" ? "เผยแพร่" : "ซ่อน" }}
              </span>
            </div>

            <div class="mobile-card-body">
              <div class="mobile-media-row">
                <div class="thumb-wrap-mobile">
                  <img v-if="s.image" :src="imageUrl(s.image)" class="thumb" />
                  <div v-else class="thumb-placeholder">
                    <i class="bi bi-image"></i>
                  </div>
                </div>
                <div class="mobile-info-text">
                  <div class="cell-primary line-clamp-1">{{ s.title }}</div>
                  <div class="cell-secondary line-clamp-1">
                    ผู้เขียน: {{ s.author || "ไม่ระบุ" }}
                  </div>
                </div>
              </div>

              <div class="mobile-meta-grid mt-2">
                <div>
                  <span class="meta-label">รอบที่สำเร็จ:</span>
                  <span class="font-medium text-neutral-800">{{
                    s.cycle ? `รอบที่ ${s.cycle}` : "-"
                  }}</span>
                </div>
                <div>
                  <span class="meta-label">วันที่สร้าง:</span>
                  <span class="cell-secondary">
                    {{ formatThaiDate(s.created_at) }}
                  </span>
                </div>
              </div>
            </div>

            <div class="mobile-card-footer">
              <button class="mobile-btn-action btn-edit" @click="openModal(s)">
                <i class="bi bi-pencil"></i> แก้ไข
              </button>
              <button
                class="mobile-btn-action btn-delete"
                @click="emit('delete', s.id)"
              >
                <i class="bi bi-trash3"></i> ลบ
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Teleport to="body">
      <Transition name="modal">
        <div
          v-if="modal.open"
          class="modal-overlay"
          @click.self="modal.open = false"
        >
          <div class="modal">
            <div class="modal-header">
              <h3>{{ modal.editId ? "แก้ไขเรื่องราว" : "เพิ่มเรื่องราว" }}</h3>
              <button class="close-btn" @click="modal.open = false">
                <i class="bi bi-x-lg"></i>
              </button>
            </div>

            <div class="modal-body">
              <div class="form-group mb-5">
                <label class="form-label"
                  >รูปภาพประกอบ <span class="required">*</span></label
                >
                <div
                  v-if="imagePreview"
                  class="relative aspect-video rounded-xl overflow-hidden border mb-2"
                  :class="
                    errors.image ? 'border-red-500' : 'border-neutral-200'
                  "
                >
                  <img :src="imagePreview" class="w-full h-full object-cover" />
                  <button
                    type="button"
                    @click="removeImage"
                    class="absolute top-2 right-2 w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow"
                  >
                    <i class="bi bi-trash-fill text-xs"></i>
                  </button>
                </div>
                <div
                  v-else
                  class="aspect-video rounded-xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer hover:border-brand-400 hover:bg-neutral-50 transition-all"
                  :class="
                    errors.image
                      ? 'border-red-400 bg-red-50'
                      : 'border-neutral-300'
                  "
                  @click="imageRef?.click()"
                >
                  <i
                    class="bi bi-cloud-upload text-3xl mb-2"
                    :class="errors.image ? 'text-red-400' : 'text-neutral-400'"
                  ></i>
                  <span
                    class="text-sm"
                    :class="
                      errors.image
                        ? 'text-red-500 font-medium'
                        : 'text-neutral-500'
                    "
                    >คลิกเพื่ออัปโหลดรูปภาพ</span
                  >
                  <span class="text-xs text-neutral-400 mt-1"
                    >สัดส่วน 4:3 แนะนำ, ไม่เกิน 5MB</span
                  >
                </div>
                <p
                  v-if="errors.image"
                  class="text-red-500 text-xs mt-1 font-medium"
                >
                  {{ errors.image }}
                </p>
                <input
                  ref="imageRef"
                  type="file"
                  class="hidden"
                  accept="image/*"
                  @change="handleImage"
                />
              </div>

              <div class="lang-tabs mb-3">
                <button
                  :class="[
                    'lang-tab',
                    { active: modalLang === 'th' },
                    { 'has-error': errors.title || errors.story },
                  ]"
                  type="button"
                  @click="modalLang = 'th'"
                >
                  🇹🇭 ภาษาไทย
                </button>
                <button
                  :class="['lang-tab', { active: modalLang === 'en' }]"
                  type="button"
                  @click="modalLang = 'en'"
                >
                  🇬🇧 English
                </button>
              </div>

              <div v-show="modalLang === 'th'" class="form-group mb-4">
                <label class="form-label"
                  >ชื่อเรื่อง (TH) <span class="required">*</span></label
                >
                <input
                  class="form-input"
                  :class="[
                    errors.title
                      ? '!border-red-500 !focus:border-red-500 !focus:ring-red-200'
                      : '',
                  ]"
                  v-model="form.title"
                  placeholder="เช่น ก้าวผ่านความล้มเหลว สู่ของขวัญล้ำค่า"
                  @input="clearFieldError('title')"
                />
                <p
                  v-if="errors.title"
                  class="text-red-500 text-xs mt-1 font-medium"
                >
                  {{ errors.title }}
                </p>
              </div>
              <div v-show="modalLang === 'th'" class="form-group mb-4">
                <label class="form-label"
                  >เนื้อหาเรื่องราว (TH) <span class="required">*</span></label
                >
                <textarea
                  class="form-input resize-none"
                  :class="[
                    errors.story
                      ? '!border-red-500 !focus:border-red-500 !focus:ring-red-200'
                      : '',
                  ]"
                  v-model="form.story"
                  rows="5"
                  placeholder="เล่าเรื่องราวประสบการณ์ของลูกค้า (ภาษาไทย)..."
                  @input="clearFieldError('story')"
                />
                <p
                  v-if="errors.story"
                  class="text-red-500 text-xs mt-1 font-medium"
                >
                  {{ errors.story }}
                </p>
              </div>
              <div v-show="modalLang === 'en'" class="form-group mb-4">
                <label class="form-label">ชื่อเรื่อง (EN)</label>
                <input
                  class="form-input"
                  v-model="form.title_en"
                  placeholder="เช่น ก้าวผ่านความล้มเหลว สู่ของขวัญล้ำค่า"
                />
              </div>
              <div v-show="modalLang === 'en'" class="form-group mb-4">
                <label class="form-label">เนื้อหาเรื่องราว (EN)</label>
                <textarea
                  class="form-input resize-none"
                  v-model="form.story_en"
                  rows="5"
                  placeholder="เล่าเรื่องราวประสบการณ์ของลูกค้า (ภาษาอังกฤษ)..."
                />
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div v-show="modalLang === 'th'" class="form-group">
                  <label class="form-label">ชื่อผู้เขียน (TH)</label>
                  <input
                    class="form-input"
                    v-model="form.author"
                    placeholder="เช่น คุณแม่สุวรรณา"
                  />
                </div>
                <div v-show="modalLang === 'en'" class="form-group">
                  <label class="form-label">ชื่อผู้เขียน (EN)</label>
                  <input
                    class="form-input"
                    v-model="form.author_en"
                    placeholder="เช่น Mrs. Suwanna"
                  />
                </div>
                <div class="form-group">
                  <label class="form-label">รอบที่สำเร็จ</label>
                  <input
                    type="number"
                    class="form-input"
                    v-model.number="form.cycle"
                    min="1"
                    placeholder="เช่น 1"
                  />
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="form-group">
                  <label class="form-label">วันที่</label>
                  <input type="date" class="form-input" v-model="form.date" />
                </div>
                <div class="form-group">
                  <label class="form-label">สถานะ</label>
                  <select class="form-input" v-model="form.status">
                    <option value="published">เผยแพร่</option>
                    <option value="draft">ซ่อน</option>
                  </select>
                </div>
              </div>
            </div>

            <div class="modal-footer">
              <button class="btn btn-ghost" @click="modal.open = false">
                ยกเลิก
              </button>
              <button
                class="btn btn-primary main-submit-btn"
                :disabled="modal.saving"
                @click="save"
              >
                <span v-if="modal.saving" class="spinner" />
                <span v-else>{{
                  modal.editId ? "บันทึก" : "เพิ่มรายการ"
                }}</span>
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
    <AdminConfirmDialog
      :open="successDialog.open"
      :title="successDialog.title"
      :message="successDialog.message"
      type="success"
      confirm-label="ตกลง"
      :cancel-label="''"
      @confirm="
        successDialog.open = false;
        successDialog.onConfirm?.();
      "
      @cancel="successDialog.open = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, nextTick } from "vue";

const props = defineProps<{ items: any[]; loading: boolean }>();
const emit = defineEmits<{
  (e: "delete", id: string): void;
  (e: "saved"): void;
}>();

const api = useAdminApi();
const config = useRuntimeConfig();
const apiBase = (config.public.apiBase as string).replace("/api", "");

const successDialog = reactive({
  open: false,
  title: "",
  message: "",
  onConfirm: undefined as (() => void) | undefined,
});

const errors = reactive({
  image: "",
  title: "",
  story: "",
});

function showSuccess(title: string, message: string, onConfirm?: () => void) {
  Object.assign(successDialog, { title, message, onConfirm, open: true });
}

function imageUrl(path: string) {
  if (!path) return "";
  return path.startsWith("http") ? path : apiBase + path;
}

const modal = reactive({
  open: false,
  editId: null as string | null,
  saving: false,
});
const modalLang = ref<"th" | "en">("th");
const form = reactive({
  title: "",
  title_en: "",
  story: "",
  story_en: "",
  author: "",
  author_en: "",
  date: "",
  cycle: "",
  status: "published",
  sort_order: 0,
});

const imageRef = ref<HTMLInputElement>();
const imagePreview = ref<string | null>(null);
const imageFile = ref<File | null>(null);

function openModal(s?: any) {
  modal.editId = s?.id || null;
  errors.image = "";
  errors.title = "";
  errors.story = "";
  modal.open = true;
  imageFile.value = null;
  imagePreview.value = s?.image ? imageUrl(s.image) : null;
  modalLang.value = "th";
  Object.assign(form, {
    title: s?.title || "",
    title_en: s?.title_en || "",
    story: s?.story || "",
    story_en: s?.story_en || "",
    author: s?.author || "",
    author_en: s?.author_en || "",
    date: s?.date ? s.date.slice(0, 10) : "",
    cycle: s?.cycle || "",
    status: s?.status || "published",
    sort_order: s?.sort_order || 0,
  });
}

function handleImage(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0];
  if (!file) return;

  if (file.size > 5 * 1024 * 1024) {
    errors.image = "ขนาดไฟล์รูปภาพห้ามเกิน 5MB";
    imageFile.value = null;
    imagePreview.value = null;
    if (imageRef.value) imageRef.value.value = "";
    return;
  }

  errors.image = "";
  imageFile.value = file;
  const reader = new FileReader();
  reader.onload = (ev) => {
    imagePreview.value = ev.target?.result as string;
  };
  reader.readAsDataURL(file);
}

function removeImage() {
  imagePreview.value = null;
  imageFile.value = null;
  errors.image = "";
  if (imageRef.value) imageRef.value.value = "";
}

function clearFieldError(field: keyof typeof errors) {
  errors[field] = "";
}

async function save() {
  let isValid = true;
  errors.image = "";
  errors.title = "";
  errors.story = "";

  if (!imagePreview.value && !imageFile.value) {
    errors.image = "กรุณาอัปโหลดรูปภาพประกอบ";
    isValid = false;
  }

  if (!form.title.trim()) {
    errors.title = "กรุณากรอกชื่อเรื่องภาษาไทย";
    isValid = false;
  }

  if (!form.story.trim()) {
    errors.story = "กรุณากรอกเนื้อหาเรื่องราวภาษาไทย";
    isValid = false;
  }

  if (!isValid) {
    if (errors.title || errors.story) modalLang.value = "th";
    await nextTick();
    const firstErrorEl = document.querySelector(".modal .text-red-500");
    if (firstErrorEl) {
      firstErrorEl.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
    return;
  }

  modal.saving = true;
  try {
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, String(v)));
    if (imageFile.value) fd.append("image", imageFile.value);

    const path = modal.editId ? `/stories/${modal.editId}` : "/stories";
    if (modal.editId) {
      await api.put(path, fd);
    } else {
      await api.post(path, fd);
    }
    modal.open = false;
    showSuccess("บันทึกสำเร็จ", "ข้อมูลได้รับการอัปเดตเรียบร้อยแล้ว");
    emit("saved");
  } catch (e: any) {
    errors.image = e.message;
  } finally {
    modal.saving = false;
  }
}
</script>

<style scoped>
.show-desktop-only {
  display: block !important;
}
.show-mobile-only {
  display: none !important;
}

.page-header-stories {
  display: flex !important;
  align-items: center !important;
  justify-content: space-between !important;
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

.btn-add-story {
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
.btn-add-story:hover {
  background: #cb5d26;
  transform: translateY(-1px);
}

.thumb-wrap {
  width: 72px;
  height: 54px;
  border-radius: 8px;
  overflow: hidden;
  background: #f3f4f6;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.thumb {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.thumb-placeholder {
  color: #d1d5db;
  font-size: 1.2rem;
}

/* ── Modal Layout ── */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.65);
  backdrop-filter: blur(4px);
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
}
.modal {
  background: #fff;
  border-radius: 12px;
  width: 100%;
  max-width: 680px;
  max-height: 85vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 25px 80px rgba(0, 0, 0, 0.3);
  overflow: hidden;
}
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 24px;
  border-bottom: 1px solid #e5e7eb;
  background: #fff;
}
.modal-header h3 {
  font-size: 1rem;
  font-weight: 700;
  margin: 0;
  color: #1c1728;
}
.close-btn {
  background: #f3f4f6;
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #6b7280;
  transition: all 0.15s;
}
.close-btn:hover {
  background: #e5e7eb;
  color: #1c1728;
}
.modal-body {
  padding: 20px 24px;
  overflow-y: auto;
  flex: 1;
}
.modal-footer {
  padding: 14px 24px;
  border-top: 1px solid #e5e7eb;
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  background: #f9fafb;
}

/* ── Animation Modal ── */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

/* ── Tabs ── */
.lang-tabs {
  display: flex;
  gap: 4px;
  border-bottom: 1px solid #e5e7eb;
}
.lang-tab {
  padding: 6px 14px;
  border-radius: 8px 8px 0 0;
  border: 1px solid transparent;
  background: transparent;
  font-size: 0.8rem;
  font-weight: 500;
  color: #6b7280;
  cursor: pointer;
  margin-bottom: -1px;
}
.lang-tab.active {
  background: #fff;
  border-color: #e5e7eb;
  border-bottom-color: #fff;
  color: #111827;
  font-weight: 600;
}
.lang-tab.has-error {
  border-top: 2px solid #ef4444;
  color: #ef4444;
}
.required {
  color: #ef4444;
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
.mobile-media-row {
  display: flex;
  gap: 12px;
  align-items: flex-start;
}
.thumb-wrap-mobile {
  width: 80px;
  height: 60px;
  border-radius: 8px;
  overflow: hidden;
  background: #f3f4f6;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.mobile-info-text {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
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
  transition: background 0.15s;
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
  .page-header-stories {
    display: flex !important;
    flex-direction: row !important;
    align-items: center !important;
    justify-content: space-between !important;
  }
  .modal {
    max-height: 90vh;
  }
  .modal-footer .btn {
    width: 100%;
    justify-content: center;
  }
  .main-submit-btn {
    justify-content: center;
  }
  .card {
    border: none !important;
    background: transparent !important;
    box-shadow: none !important;
    padding: 0 !important;
  }
}
</style>
