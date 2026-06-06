<template>
  <div class="page-container">
    <div class="page-header-gallery">
      <div class="header-text-group">
        <h2 class="page-title">แกลเลอรี่</h2>
        <p class="page-subtitle">
          จัดการแกลเลอรี่ทั้งหมด ({{ items.length }} รายการ)
        </p>
      </div>
      <button class="btn btn-add-gallery" @click="openModal()">
        <span>+</span> เพิ่มแกลเลอรี่
      </button>
    </div>

    <div class="main-content-card">
      <div v-if="loading" class="loading-state">
        <div class="loading-dot" />
        <div class="loading-dot" />
        <div class="loading-dot" />
      </div>
      <div v-else>
        <div class="table-wrap desktop-only">
          <table>
            <thead>
              <tr>
                <th style="width: 50px"></th>
                <th style="width: 100px">Preview</th>
                <th>คำบรรยาย TH / EN</th>
                <th style="width: 120px">ประเภท</th>
                <th style="width: 100px">สถานะ</th>
                <th style="width: 150px">วันที่สร้าง</th>
                <th style="width: 90px"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="!items.length">
                <td colspan="7" class="empty-state">
                  <div class="empty-state-inner">
                    <i class="bi bi-images empty-icon"></i
                    ><span>ยังไม่มีแกลเลอรี่</span>
                  </div>
                </td>
              </tr>
              <tr v-for="(g, index) in items" :key="g.id">
                <td>
                  <span class="ps-2">{{ index + 1 }}</span>
                </td>
                <td>
                  <div class="thumb-wrap">
                    <video
                      v-if="g.media_type === 'video'"
                      :src="mediaUrl(g.media_url)"
                      class="thumb"
                      muted
                      playsinline
                    />
                    <img v-else :src="mediaUrl(g.media_url)" class="thumb" />
                  </div>
                </td>
                <td>
                  <div class="cell-primary line-clamp-1">
                    {{ g.caption_th || "–" }}
                  </div>
                  <div class="cell-secondary line-clamp-1">
                    {{ g.caption_en || "–" }}
                  </div>
                </td>
                <td>
                  <span class="tag flex items-center gap-4 whitespace-nowrap">
                    <i
                      v-if="g.media_type === 'video'"
                      class="bi bi-film text-brand mr-1"
                    ></i>
                    <i v-else class="bi bi-image text-brand mr-1"></i>
                    {{ g.media_type === "video" ? "Video" : "Image" }}
                  </span>
                </td>
                <td>
                  <span
                    class="whitespace-nowrap"
                    :class="[
                      'badge',
                      g.status === 'published' ? 'badge-green' : 'badge-gray',
                    ]"
                  >
                    {{ g.status === "published" ? "เผยแพร่" : "ซ่อน" }}
                  </span>
                </td>
                <td>
                  <div class="cell-secondary whitespace-nowrap">
                    {{ g.created_at?.slice(0, 16).replace("T", " ") }}
                  </div>
                </td>
                <td>
                  <div class="action-group">
                    <button
                      class="btn-icon"
                      @click="openModal(g)"
                      title="แก้ไข"
                    >
                      <i class="bi bi-pencil"></i>
                    </button>
                    <button
                      class="btn-icon btn-icon-danger"
                      @click="emit('delete', g.id)"
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

        <div class="mobile-only mobile-cards-list">
          <div v-if="!items.length" class="empty-state-mobile">
            <i class="bi bi-images empty-icon"></i>
            <span>ยังไม่มีแกลเลอรี่</span>
          </div>

          <div
            v-for="(g, index) in items"
            :key="g.id"
            class="mobile-responsive-card"
          >
            <div class="mobile-card-header">
              <span class="mobile-item-number">#{{ index + 1 }}</span>
              <span
                :class="[
                  'badge',
                  g.status === 'published' ? 'badge-green' : 'badge-gray',
                ]"
              >
                {{ g.status === "published" ? "เผยแพร่" : "ซ่อน" }}
              </span>
            </div>

            <div class="mobile-card-body">
              <div class="mobile-media-row">
                <div class="thumb-wrap-mobile">
                  <video
                    v-if="g.media_type === 'video'"
                    :src="mediaUrl(g.media_url)"
                    class="thumb"
                    muted
                    playsinline
                  />
                  <img v-else :src="mediaUrl(g.media_url)" class="thumb" />
                </div>
                <div class="mobile-captions">
                  <div class="cell-primary mobile-caption-text line-clamp-1">
                    {{ g.caption_th || "–" }}
                  </div>
                  <div class="cell-secondary mobile-caption-text line-clamp-1">
                    {{ g.caption_en || "–" }}
                  </div>
                </div>
              </div>

              <div class="mobile-meta-grid mt-2">
                <div class="meta-item">
                  <span class="meta-label">ประเภท:</span>
                  <span class="tag inline-flex items-center gap-1">
                    <i
                      v-if="g.media_type === 'video'"
                      class="bi bi-film text-brand"
                    ></i>
                    <i v-else class="bi bi-image text-brand"></i>
                    {{ g.media_type === "video" ? "Video" : "Image" }}
                  </span>
                </div>
                <div class="meta-item">
                  <span class="meta-label">วันที่สร้าง:</span>
                  <span class="cell-secondary">{{
                    g.created_at?.slice(0, 10)
                  }}</span>
                </div>
              </div>
            </div>

            <div class="mobile-card-footer">
              <button class="mobile-btn-action btn-edit" @click="openModal(g)">
                <i class="bi bi-pencil"></i> แก้ไข
              </button>
              <button
                class="mobile-btn-action btn-delete"
                @click="emit('delete', g.id)"
              >
                <i class="bi bi-trash3"></i> ลบรายการ
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
              <h3>{{ modal.editId ? "แก้ไขแกลเลอรี่" : "เพิ่มแกลเลอรี่" }}</h3>
              <button class="close-btn" @click="modal.open = false">
                <i class="bi bi-x-lg"></i>
              </button>
            </div>
            <div class="modal-body">
              <div class="form-group mb-4">
                <label class="form-label"
                  >ไฟล์สื่อ (รูปภาพ หรือ วิดีโอ)
                  <span class="required">*</span></label
                >
                <div
                  v-if="mediaPreview"
                  class="relative aspect-video rounded-xl overflow-hidden border mb-2 bg-black"
                  :class="
                    errors.media ? 'border-red-500' : 'border-neutral-200'
                  "
                  style="isolation: isolate"
                >
                  <video
                    v-if="form.media_type === 'video'"
                    :src="mediaPreview"
                    class="w-full h-full object-contain"
                    muted
                    controls
                    playsinline
                  />
                  <img
                    v-else
                    :src="mediaPreview"
                    class="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    @click="removeMedia"
                    class="absolute top-2 right-2 w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow z-10"
                  >
                    <i class="bi bi-trash-fill text-xs"></i>
                  </button>
                </div>
                <div
                  v-else
                  class="aspect-video rounded-xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer hover:border-brand-400 hover:bg-neutral-50 transition-all"
                  :class="
                    errors.media
                      ? 'border-red-400 bg-red-50'
                      : 'border-neutral-300'
                  "
                  @click="mediaInputRef?.click()"
                >
                  <i
                    class="bi bi-cloud-upload text-3xl mb-2"
                    :class="errors.media ? 'text-red-400' : 'text-neutral-400'"
                  ></i>
                  <span
                    class="text-sm text-center px-4"
                    :class="
                      errors.media
                        ? 'text-red-500 font-medium'
                        : 'text-neutral-500'
                    "
                    >คลิกเพื่ออัปโหลดรูปหรือวิดีโอ</span
                  >
                  <span class="text-xs text-neutral-400 mt-1"
                    >jpg, png, mp4, webm ไม่เกิน 50MB</span
                  >
                </div>
                <p
                  v-if="errors.media"
                  class="text-red-500 text-xs mt-1 font-medium"
                >
                  {{ errors.media }}
                </p>
                <input
                  ref="mediaInputRef"
                  type="file"
                  class="hidden"
                  accept="image/*,video/*"
                  @change="handleMedia"
                />
              </div>

              <div class="lang-tabs mb-3">
                <button
                  :class="[
                    'lang-tab',
                    { active: modalLang === 'th' },
                    { 'has-error': errors.caption_th },
                  ]"
                  @click="modalLang = 'th'"
                >
                  🇹🇭 TH
                </button>
                <button
                  :class="['lang-tab', { active: modalLang === 'en' }]"
                  @click="modalLang = 'en'"
                >
                  🇬🇧 EN
                </button>
              </div>
              <div v-show="modalLang === 'th'" class="form-group mb-3">
                <label class="form-label"
                  >คำบรรยาย (ภาษาไทย) <span class="required">*</span></label
                >
                <input
                  class="form-input"
                  :class="[
                    errors.caption_th
                      ? '!border-red-500 !focus:border-red-500 !focus:ring-red-200'
                      : '',
                  ]"
                  v-model="form.caption_th"
                  placeholder="คำบรรยายภาษาไทย"
                  @input="clearFieldError('caption_th')"
                />
                <p
                  v-if="errors.caption_th"
                  class="text-red-500 text-xs mt-1 font-medium"
                >
                  {{ errors.caption_th }}
                </p>
              </div>
              <div v-show="modalLang === 'en'" class="form-group mb-3">
                <label class="form-label">Caption (English)</label>
                <input
                  class="form-input"
                  v-model="form.caption_en"
                  placeholder="คำบรรยายภาษาอังกฤษ"
                />
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-3">
                <div class="form-group">
                  <label class="form-label">Col Span</label>
                  <select class="form-input" v-model="form.col_span">
                    <option value="md:col-span-4">4 คอลัมน์ (แคบ)</option>
                    <option value="md:col-span-6">6 คอลัมน์ (ครึ่ง)</option>
                    <option value="md:col-span-8">8 คอลัมน์ (กว้าง)</option>
                    <option value="md:col-span-12">12 คอลัมน์ (เต็ม)</option>
                  </select>
                </div>
                <div class="form-group">
                  <label class="form-label">Row Span</label>
                  <select class="form-input" v-model="form.row_span">
                    <option value="md:row-span-1">1 แถว</option>
                    <option value="md:row-span-2">2 แถว</option>
                  </select>
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="form-group">
                  <label class="form-label">สถานะ</label>
                  <select class="form-input" v-model="form.status">
                    <option value="published">แสดง</option>
                    <option value="hidden">ซ่อน</option>
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
  media: "",
  caption_th: "",
});

function showSuccess(title: string, message: string, onConfirm?: () => void) {
  Object.assign(successDialog, { title, message, onConfirm, open: true });
}

function mediaUrl(url: string) {
  if (!url) return "";
  if (
    url.startsWith("http") ||
    url.startsWith("blob:") ||
    url.startsWith("data:") ||
    url.startsWith("/images")
  ) {
    return url;
  }
  return apiBase + url;
}

const modal = reactive({
  open: false,
  editId: null as string | null,
  saving: false,
});
const form = reactive({
  caption_th: "",
  caption_en: "",
  media_type: "image",
  col_span: "md:col-span-4",
  row_span: "md:row-span-1",
  sort_order: 0,
  status: "published",
});

const modalLang = ref<"th" | "en">("th");
const mediaInputRef = ref<HTMLInputElement>();
const mediaPreview = ref<string | null>(null);
const mediaFile = ref<File | null>(null);

function openModal(g?: any) {
  modal.editId = g?.id || null;
  errors.media = "";
  errors.caption_th = "";
  modal.open = true;
  mediaFile.value = null;
  mediaPreview.value = g?.media_url ? mediaUrl(g.media_url) : null;
  modalLang.value = "th";
  Object.assign(form, {
    caption_th: g?.caption_th || "",
    caption_en: g?.caption_en || "",
    media_type: g?.media_type || "image",
    col_span: g?.col_span || "md:col-span-4",
    row_span: g?.row_span || "md:row-span-1",
    sort_order: g?.sort_order || 0,
    status: g?.status || "published",
  });
}

function handleMedia(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0];
  if (!file) return;

  if (file.size > 50 * 1024 * 1024) {
    errors.media = "ขนาดไฟล์ห้ามเกิน 50MB";
    mediaFile.value = null;
    mediaPreview.value = null;
    if (mediaInputRef.value) mediaInputRef.value.value = "";
    return;
  }

  errors.media = "";
  mediaFile.value = file;
  form.media_type = file.type.startsWith("video") ? "video" : "image";
  mediaPreview.value = URL.createObjectURL(file);
}

function removeMedia() {
  mediaPreview.value = null;
  mediaFile.value = null;
  errors.media = "";
  if (mediaInputRef.value) mediaInputRef.value.value = "";
}

function clearFieldError(field: keyof typeof errors) {
  errors[field] = "";
}

async function save() {
  let isValid = true;
  errors.media = "";
  errors.caption_th = "";

  if (!mediaPreview.value && !mediaFile.value) {
    errors.media = "กรุณาอัปโหลดรูปภาพหรือวิดีโอ";
    isValid = false;
  }

  if (!form.caption_th.trim()) {
    errors.caption_th = "กรุณากรอกคำบรรยายภาษาไทย";
    isValid = false;
  }

  if (!isValid) {
    if (errors.caption_th) {
      modalLang.value = "th";
    }

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
    if (mediaFile.value) fd.append("media", mediaFile.value);

    const path = modal.editId ? `/gallery/${modal.editId}` : "/gallery";
    if (modal.editId) {
      await api.put(path, fd);
    } else {
      await api.post(path, fd);
    }

    modal.open = false;
    showSuccess("บันทึกสำเร็จ", "ข้อมูลได้รับการอัปเดตเรียบร้อยแล้ว");
    emit("saved");
  } catch (e: any) {
    errors.media = e.message;
  } finally {
    modal.saving = false;
  }
}
</script>

<style scoped>
.page-container {
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  padding: 0 4px;
}

/* ควบคุมบ็อกซ์สีขาวของ Desktop */
.main-content-card {
  background: #fff;
  border-radius: 16px;
  border: 1px solid #e5e7eb;
  width: 100%;
  box-sizing: border-box;
}

.page-header-gallery {
  display: flex;
  align-items: center;
  justify-content: space-between;
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

.btn {
  justify-content: center;
}

.btn-add-gallery {
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

.btn-add-gallery:hover {
  background: #cb5d26;
  transform: translateY(-1px);
}

/* ── แยกการโชว์ผล Desktop/Mobile ให้ถูกต้องตามมาตรฐาน ── */
.desktop-only {
  display: block !important;
}
.mobile-only {
  display: none !important;
}

.thumb-wrap {
  width: 80px;
  height: 56px;
  border-radius: 6px;
  overflow: hidden;
  background: #f3f4f6;
  display: flex;
  align-items: center;
  justify-content: center;
}
.thumb {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
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

/* ── Modal Design ── */
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
  max-width: 640px;
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
  padding: 18px 20px;
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
}
.close-btn:hover {
  background: #e5e7eb;
  color: #1c1728;
}
.modal-body {
  padding: 20px;
  overflow-y: auto;
  flex: 1;
}
.modal-footer {
  padding: 14px 20px;
  border-top: 1px solid #e5e7eb;
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  background: #f9fafb;
}

/* ── Mobile Responsive Cards Style ── */
.mobile-cards-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 12px;
  width: 100%;
  box-sizing: border-box;
}
.mobile-responsive-card {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;
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
  width: 90px;
  height: 64px;
  border-radius: 6px;
  overflow: hidden;
  background: #f3f4f6;
  flex-shrink: 0;
}
.mobile-captions {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
  min-width: 0;
}
.mobile-caption-text {
  word-break: break-word;
  overflow-wrap: break-word;
  line-height: 1.4;
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
.meta-item {
  display: flex;
  align-items: center;
}
.meta-label {
  color: #6b7280;
  margin-right: 6px;
  flex-shrink: 0;
}
.mobile-card-footer {
  display: flex;
  gap: 8px;
  border-top: 1px solid #f3f4f6;
  padding-top: 12px;
  width: 100%;
}
.mobile-btn-action {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 9px;
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

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
.required {
  color: #ef4444;
}

@media (max-width: 768px) {
  .desktop-only {
    display: none !important;
  }
  .mobile-only {
    display: block !important;
  }

  /* ล้างกรอบขาวซ้อนที่ทำจอล้นขวาบนมือถือ */
  .main-content-card {
    border: none !important;
    background: transparent !important;
    box-shadow: none !important;
  }
  .mobile-cards-list {
    padding: 12px 0px !important;
  }

  .page-header-gallery {
    flex-direction: row !important;
    align-items: center !important;
    justify-content: space-between !important;
    margin-bottom: 16px;
  }
  .page-title {
    font-size: 1.25rem !important;
  }
  .modal {
    max-height: 90vh;
  }
  .modal-footer .btn {
    width: 100%;
  }
  .main-submit-btn {
    justify-content: center;
  }
}
</style>
