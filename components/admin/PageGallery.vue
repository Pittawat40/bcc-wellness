<template>
  <div>
    <div class="page-header">
      <div>
        <h2 class="page-title">แกลเลอรี่</h2>
        <p class="page-subtitle">
          จัดการรูปภาพ/วิดีโอแสดงในหน้าแรก ({{ items.length }} รายการ)
        </p>
      </div>
      <button class="btn btn-primary" @click="openModal()">
        <span>+</span> เพิ่มแกลเลอรี่
      </button>
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
              <th style="width: 100px">Preview</th>
              <th>คำบรรยาย TH / EN</th>
              <th>ประเภท</th>
              <th>สถานะ</th>
              <th>วันที่สร้าง</th>
              <th></th>
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
                  <button class="btn-icon" @click="openModal(g)" title="แก้ไข">
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
                    class="text-sm"
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
                  :class="{
                    'border-red-500 focus:border-red-500 focus:ring-red-200':
                      errors.caption_th,
                  }"
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

              <div class="grid grid-cols-2 gap-4 mb-3">
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

              <div class="grid grid-cols-2 gap-4">
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
                class="btn btn-primary"
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
import { ref, reactive } from "vue";
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
    if (errors.caption_th) modalLang.value = "th";
    return;
  }

  modal.saving = true;
  try {
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, String(v)));
    if (mediaFile.value) fd.append("media", mediaFile.value);
    const path = modal.editId ? `/gallery/${modal.editId}` : "/gallery";
    await api.post(path, fd);
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
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.65);
  backdrop-filter: blur(4px);
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}
.modal {
  background: #fff;
  border-radius: 8px;
  width: 100%;
  max-width: 640px;
  max-height: 92vh;
  overflow-y: auto;
  box-shadow: 0 25px 80px rgba(0, 0, 0, 0.3);
}
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px 16px;
  border-bottom: 1px solid #e5e7eb;
  position: sticky;
  top: 0;
  background: #fff;
  z-index: 2;
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
  padding: 20px 24px;
}
.modal-footer {
  padding: 14px 24px;
  border-top: 1px solid #e5e7eb;
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  background: #f9fafb;
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
</style>
