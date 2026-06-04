<template>
  <div class="max-w-4xl mx-auto bg-white rounded-xl shadow-sm">
    <div class="lang-tabs">
      <button
        :class="[
          'lang-tab',
          { active: lang === 'th' },
          {
            'has-error':
              errors.title || errors.excerpt || errors.content || errors.image,
          },
        ]"
        @click="lang = 'th'"
      >
        🇹🇭 ภาษาไทย
      </button>
      <button
        :class="['lang-tab', { active: lang === 'en' }]"
        @click="lang = 'en'"
      >
        🇬🇧 English
      </button>
    </div>

    <div v-show="lang === 'th'" class="lang-panel">
      <div class="form-group mb-4">
        <label class="form-label font-medium"
          >ชื่อบทความ (TH) <span class="required">*</span></label
        >
        <input
          class="form-input w-full"
          :class="[
            errors.title
              ? '!border-red-500 !focus:border-red-500 !focus:ring-red-200'
              : '',
          ]"
          v-model="form.title"
          placeholder="กรุณาใส่ชื่อบทความภาษาไทย"
          @input="clearFieldError('title')"
        />
        <p v-if="errors.title" class="text-red-500 text-xs mt-1 font-medium">
          {{ errors.title }}
        </p>
      </div>
      <div class="form-group mb-4">
        <label class="form-label font-medium"
          >สรุปย่อ (TH) <span class="required">*</span></label
        >
        <textarea
          class="form-input w-full resize-none"
          :class="[
            errors.excerpt
              ? '!border-red-500 !focus:border-red-500 !focus:ring-red-200'
              : '',
          ]"
          v-model="form.excerpt"
          rows="2"
          placeholder="สรุปบทความสั้นๆ ภาษาไทย"
          @input="clearFieldError('excerpt')"
        />
        <p v-if="errors.excerpt" class="text-red-500 text-xs mt-1 font-medium">
          {{ errors.excerpt }}
        </p>
      </div>
      <div class="form-group mb-4">
        <label class="form-label font-medium"
          >เนื้อหา (TH) <span class="required">*</span></label
        >
        <div
          class="editor-wrapper"
          :class="[errors.content ? '!border-red-500' : '']"
        >
          <div ref="editorThRef" class="quill-editor" />
        </div>
        <p v-if="errors.content" class="text-red-500 text-xs mt-1 font-medium">
          {{ errors.content }}
        </p>
      </div>
    </div>

    <div v-show="lang === 'en'" class="lang-panel">
      <div class="form-group mb-4">
        <label class="form-label font-medium">ชื่อบทความ (EN)</label>
        <input
          class="form-input w-full"
          v-model="form.title_en"
          placeholder="กรุณาใส่ชื่อบทความภาษาอังกฤษ"
        />
      </div>
      <div class="form-group mb-4">
        <label class="form-label font-medium">สรุปย่อ (EN)</label>
        <textarea
          class="form-input w-full resize-none"
          v-model="form.excerpt_en"
          rows="2"
          placeholder="สรุปบทความสั้นๆ ภาษาอังกฤษ"
        />
      </div>
      <div class="form-group mb-4">
        <label class="form-label font-medium">เนื้อหา (EN)</label>
        <div class="editor-wrapper">
          <div ref="editorEnRef" class="quill-editor" />
        </div>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-4 mb-4 px-1">
      <div class="form-group">
        <label class="form-label font-medium">หมวดหมู่</label>
        <select class="form-input w-full" v-model="form.category">
          <option value="" disabled>-- เลือกหมวดหมู่ --</option>
          <option
            v-for="cat in categories"
            :key="cat.id"
            :value="cat.slug || cat.name_th"
          >
            {{ cat.name_th }}{{ cat.name_en ? ` · ${cat.name_en}` : "" }}
          </option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label font-medium">สถานะ</label>
        <select class="form-input w-full" v-model="form.status">
          <option value="draft">แบบร่าง</option>
          <option value="published">เผยแพร่</option>
        </select>
      </div>
    </div>

    <div class="form-group mb-4 px-1">
      <label class="form-label font-medium"
        >รูปปกบทความ <span class="required">*</span></label
      >
      <div
        v-if="imageUrl"
        class="relative aspect-video w-full border rounded-lg overflow-hidden bg-gray-50"
        :class="errors.image ? 'border-red-500' : 'border-gray-200'"
      >
        <img :src="imageUrl" alt="Cover" class="w-full h-full object-cover" />
        <button
          type="button"
          @click="removeImage"
          class="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white w-9 h-9 rounded-full flex items-center justify-center shadow transition-colors"
        >
          <i class="bi bi-trash-fill text-sm"></i>
        </button>
      </div>
      <div
        v-else
        class="aspect-video w-full flex flex-col items-center justify-center border-2 border-dashed rounded-lg cursor-pointer hover:border-emerald-500 hover:bg-slate-50 transition-all"
        :class="errors.image ? 'border-red-400 bg-red-50' : 'border-gray-300'"
        @click="triggerUpload"
      >
        <i
          class="bi bi-cloud-upload text-3xl mb-2"
          :class="errors.image ? 'text-red-400' : 'text-gray-400'"
        ></i>
        <span
          class="text-sm font-medium"
          :class="errors.image ? 'text-red-500' : 'text-gray-500'"
          >คลิกเพื่ออัพโหลดรูปภาพ</span
        >
        <span class="text-gray-400 text-xs mt-1"
          >16:9 แนะนำ 1200x630px ไม่เกิน 5MB</span
        >
      </div>
      <p v-if="errors.image" class="text-red-500 text-xs mt-1 font-medium px-1">
        {{ errors.image }}
      </p>
      <input
        type="file"
        class="hidden"
        ref="imageRef"
        accept="image/*"
        @change="handleFileChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ref,
  reactive,
  onMounted,
  onBeforeUnmount,
  watch,
  nextTick,
} from "vue";

const form = defineModel<{
  title: string;
  title_en: string;
  excerpt: string;
  excerpt_en: string;
  content: string;
  content_en: string;
  category: string;
  status: string;
}>({ required: true });

const props = defineProps<{
  currentImage?: string;
  categories?: {
    id: number | string;
    name_th: string;
    name_en: string;
    slug: string;
  }[];
}>();

const lang = ref<"th" | "en">("th");
const imageRef = ref<HTMLInputElement>();
const imageUrl = ref<string | null>(null);
const editorThRef = ref<HTMLElement>();
const editorEnRef = ref<HTMLElement>();
let quillTh: any = null;
let quillEn: any = null;

const errors = reactive({
  title: "",
  excerpt: "",
  content: "",
  image: "",
});

onMounted(async () => {
  if (props.currentImage) imageUrl.value = props.currentImage;
  await loadQuill();
});

async function loadQuill() {
  if (typeof window === "undefined") return;
  if (!document.querySelector("#quill-css")) {
    const link = document.createElement("link");
    link.id = "quill-css";
    link.rel = "stylesheet";
    link.href =
      "https://cdnjs.cloudflare.com/ajax/libs/quill/1.3.7/quill.snow.min.css";
    document.head.appendChild(link);
  }
  if (!(window as any).Quill) {
    await new Promise<void>((resolve) => {
      const script = document.createElement("script");
      script.src =
        "https://cdnjs.cloudflare.com/ajax/libs/quill/1.3.7/quill.min.js";
      script.onload = () => resolve();
      document.head.appendChild(script);
    });
  }
  const Quill = (window as any).Quill;
  const toolbarOptions = [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["blockquote", "code-block"],
    ["link"],
    ["clean"],
  ];
  quillTh = new Quill(editorThRef.value, {
    theme: "snow",
    modules: { toolbar: toolbarOptions },
  });
  quillEn = new Quill(editorEnRef.value, {
    theme: "snow",
    modules: { toolbar: toolbarOptions },
  });
  if (form.value.content) quillTh.root.innerHTML = form.value.content;
  if (form.value.content_en) quillEn.root.innerHTML = form.value.content_en;

  quillTh.on("text-change", () => {
    form.value.content = quillTh.root.innerHTML;
    const text = quillTh.getText().trim();
    if (text.length > 0) errors.content = "";
  });
  quillEn.on("text-change", () => {
    form.value.content_en = quillEn.root.innerHTML;
  });
}

watch(
  () => form.value.content,
  (val) => {
    if (quillTh && quillTh.root.innerHTML !== val)
      quillTh.root.innerHTML = val || "";
  },
  { once: true },
);
watch(
  () => form.value.content_en,
  (val) => {
    if (quillEn && quillEn.root.innerHTML !== val)
      quillEn.root.innerHTML = val || "";
  },
  { once: true },
);
onBeforeUnmount(() => {
  quillTh = null;
  quillEn = null;
});

const triggerUpload = () => imageRef.value?.click();

const handleFileChange = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    if (file.size > 5 * 1024 * 1024) {
      errors.image = "ขนาดไฟล์รูปภาพห้ามเกิน 5MB";
      imageUrl.value = null;
      if (imageRef.value) imageRef.value.value = "";

      nextTick(() => {
        scrollToFirstError();
      });
      return;
    }

    errors.image = "";
    const reader = new FileReader();
    reader.onload = (e) => {
      imageUrl.value = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }
};

const removeImage = () => {
  imageUrl.value = null;
  if (imageRef.value) imageRef.value.value = "";
  errors.image = "";
};

const clearFieldError = (field: keyof typeof errors) => {
  errors[field] = "";
};

const clearAllErrors = () => {
  errors.title = "";
  errors.excerpt = "";
  errors.content = "";
  errors.image = "";
};

const scrollToFirstError = () => {
  const firstErrorElement = document.querySelector(".text-red-500");
  if (firstErrorElement) {
    firstErrorElement.scrollIntoView({ behavior: "smooth", block: "center" });
  }
};

const validateForm = () => {
  let isValid = true;
  errors.title = "";
  errors.excerpt = "";
  errors.content = "";
  errors.image = "";

  if (!form.value.title || !form.value.title.trim()) {
    errors.title = "กรุณากรอกชื่อบทความภาษาไทย";
    isValid = false;
  }

  if (!form.value.excerpt || !form.value.excerpt.trim()) {
    errors.excerpt = "กรุณากรอกสรุปย่อภาษาไทย";
    isValid = false;
  }

  const rawTextTh = quillTh ? quillTh.getText().trim() : "";
  if (!rawTextTh) {
    errors.content = "กรุณากรอกเนื้อหาบทความภาษาไทย";
    isValid = false;
  }

  if (!imageUrl.value) {
    errors.image = "กรุณาอัพโหลดรูปปกบทความ";
    isValid = false;
  }

  if (!isValid) {
    lang.value = "th";

    nextTick(() => {
      scrollToFirstError();
    });
  }

  return isValid;
};

defineExpose({
  imageRef,
  validateForm,
  clearAllErrors,
  imageUrl,
});
</script>

<style scoped>
.lang-tabs {
  display: flex;
  gap: 4px;
  padding: 16px 16px 0;
  border-bottom: 1px solid #e5e7eb;
  margin-bottom: 16px;
}
.lang-tab {
  padding: 8px 20px;
  border-radius: 8px 8px 0 0;
  border: 1px solid transparent;
  background: transparent;
  font-size: 0.85rem;
  font-weight: 500;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.15s;
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
.lang-panel {
  padding: 0 4px;
}
.editor-wrapper {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
  transition: border-color 0.15s;
}
.required {
  color: #ef4444;
}
:deep(.ql-toolbar) {
  border: none !important;
  border-bottom: 1px solid #e5e7eb !important;
  background: #f9fafb;
}
:deep(.ql-container) {
  border: none !important;
  font-size: 0.9rem;
  min-height: 240px;
}
:deep(.ql-editor) {
  min-height: 240px;
}
</style>
