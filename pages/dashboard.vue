<template>
  <Head>
    <Link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
    />
  </Head>

  <div class="admin-app">
    <div class="app-layout">
      <AdminSidebar
        v-model="sidebarOpen"
        :current-page="currentPage"
        @navigate="showPage"
        @logout="doLogout"
      />
      <div
        v-if="sidebarOpen"
        class="sidebar-overlay"
        @click="sidebarOpen = false"
      />
      <div class="main-content">
        <AdminTopbar
          :current-page="currentPage"
          :username="adminUsername"
          @toggle-sidebar="sidebarOpen = !sidebarOpen"
        />
        <div class="page-content">
          <AdminPageDashboard
            v-if="currentPage === 'dashboard'"
            :stats="dashStats"
          />

          <AdminPageArticles
            v-else-if="currentPage === 'articles'"
            :items="articles"
            :total="articleTotal"
            :loading="loading"
            :categories="articleCategories"
            @add="openArticleModal()"
            @edit="openArticleModal"
            @delete="deleteItem('/articles/', $event, loadArticles)"
            @search="searchArticles"
            @manage-categories="openArticleCategoryDialog"
          />

          <AdminPageStories
            v-else-if="currentPage === 'stories'"
            :items="stories"
            :loading="loading"
            @delete="deleteItem('/stories/', $event, loadStories)"
            @saved="loadStories"
          />

          <AdminPageVideos
            v-else-if="currentPage === 'videos'"
            :items="videos"
            :total="videoTotal"
            :loading="loading"
            @add="openVideoModal()"
            @edit="openVideoModal"
            @delete="deleteItem('/videos/', $event, loadVideos)"
            @search="searchVideos"
          />

          <AdminPageReviews
            v-else-if="currentPage === 'reviews'"
            :items="reviews"
            :total="reviewTotal"
            :loading="loading"
            :categories="reviewCategories"
            @add="openReviewModal()"
            @edit="openReviewModal"
            @delete="deleteItem('/reviews/', $event, loadReviews)"
            @search="searchReviews"
            @manage-categories="openReviewCategoryDialog"
          />

          <AdminPageDoctors
            v-else-if="currentPage === 'doctors'"
            :items="doctors"
            :total="doctorTotal"
            :loading="loading"
            @add="openDoctorModal()"
            @edit="openDoctorModal"
            @delete="deleteItem('/doctors/', $event, loadDoctors)"
            @search="searchDoctors"
          />

          <AdminPageAppointments
            v-else-if="currentPage === 'appointments'"
            :items="appointments"
            :total="appointmentTotal"
            :loading="loading"
            @update-status="updateAppointmentStatus"
            @save-note="saveAppointmentNote"
            @delete="deleteItem('/appointments/', $event, loadAppointments)"
            @search="searchAppointments"
          />

          <AdminPageFaq
            v-else-if="currentPage === 'faq'"
            :items="faqs"
            :total="faqTotal"
            :loading="loading"
            @add="openFaqModal()"
            @edit="openFaqModal"
            @delete="deleteItem('/faqs/', $event, loadFaqs)"
            @search="searchFaqs"
            @manage-categories="openCategoryDialog"
          />

          <AdminPageGallery
            v-else-if="currentPage === 'gallery'"
            :items="gallery"
            :loading="loading"
            @delete="deleteItem('/gallery/', $event, loadGallery)"
            @saved="loadGallery"
          />

          <AdminPageContact
            v-else-if="currentPage === 'contact'"
            :loading="loading"
            :contact-info="contactInfoEdit"
            :business-hours="businessHoursEdit"
            :social-items="socialEdit"
            :reorder-saving="socialReorderSaving"
            @save-contact="saveContact"
            @save-hours="saveHours"
            @save-social="saveSocial"
            @social-reorder="socialReorder"
            @social-toggle="socialToggle"
          />
        </div>
      </div>
    </div>

    <!-- Modal -->
    <AdminModal
      :open="modal.open"
      :title="modal.title"
      :edit-id="modal.editId"
      :error="modal.error"
      :saving="modal.saving"
      @close="modal.open = false"
      @save="saveModal"
    >
      <AdminArticleForm
        v-if="modal.type === 'article'"
        v-model="articleForm"
        :current-image="modal.currentImage"
        :categories="articleCategories"
        @clear-error="modal.error = ''"
        ref="articleFormRef"
      />
      <AdminVideoForm
        v-else-if="modal.type === 'video'"
        v-model="videoForm"
        ref="videoFormRef"
      />
      <AdminReviewForm
        v-else-if="modal.type === 'review'"
        v-model="reviewForm"
        :categories="reviewCategories"
        ref="reviewFormRef"
      />
      <AdminDoctorForm
        v-else-if="modal.type === 'doctor'"
        v-model="doctorForm"
        ref="doctorFormRef"
      />
      <AdminFaqForm
        v-else-if="modal.type === 'faq'"
        v-model="faqForm"
        :categories="faqCategories"
        ref="faqFormRef"
      />
    </AdminModal>

    <AdminCategoryDialog
      :open="categoryDialog.open"
      :categories="faqCategories"
      :loading="categoryDialog.loading"
      :saving="categoryDialog.saving"
      :msg="categoryDialog.msg"
      :msg-type="categoryDialog.msgType"
      @close="categoryDialog.open = false"
      @add-category="onAddCategory"
      @update-category="onUpdateCategory"
      @delete-category="onDeleteCategory"
    />

    <AdminArticleCategoryDialog
      :open="articleCategoryDialog.open"
      :categories="articleCategories"
      :loading="articleCategoryDialog.loading"
      :saving="articleCategoryDialog.saving"
      :msg="articleCategoryDialog.msg"
      :msg-type="articleCategoryDialog.msgType"
      @close="articleCategoryDialog.open = false"
      @add-category="onAddArticleCategory"
      @update-category="onUpdateArticleCategory"
      @delete-category="onDeleteArticleCategory"
    />

    <AdminReviewCategoryDialog
      :open="reviewCategoryDialog.open"
      :categories="reviewCategories"
      :loading="reviewCategoryDialog.loading"
      :saving="reviewCategoryDialog.saving"
      :msg="reviewCategoryDialog.msg"
      :msg-type="reviewCategoryDialog.msgType"
      @close="reviewCategoryDialog.open = false"
      @add-category="onAddReviewCategory"
      @update-category="onUpdateReviewCategory"
      @delete-category="onDeleteReviewCategory"
    />

    <AdminPasswordDialog
      :open="passwordDialog.open"
      :username="adminUsername"
      :msg="pwMsg"
      :msg-type="pwMsgType"
      :saving="passwordDialog.saving"
      ref="passwordPageRef"
      @close="passwordDialog.open = false"
      @save="savePassword"
    />

    <AdminConfirmDialog
      :open="confirmDialog.open"
      :title="confirmDialog.title"
      :message="confirmDialog.message"
      :type="confirmDialog.type"
      confirm-label="ยืนยัน"
      @confirm="
        confirmDialog.onConfirm();
        confirmDialog.open = false;
      "
      @cancel="confirmDialog.open = false"
    />

    <AdminConfirmDialog
      :open="alertDialog.open"
      :title="alertDialog.title"
      :message="alertDialog.message"
      type="info"
      confirm-label="รับทราบ"
      :cancel-label="''"
      @confirm="
        alertDialog.open = false;
        alertDialog.onConfirm?.();
      "
      @cancel="alertDialog.open = false"
    />

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
import { reactive, ref, onMounted } from "vue";

useSeoMeta({ title: "BCC IVF Wellness – Admin" });
definePageMeta({ layout: "admin" });

const api = useAdminApi();
const router = useRouter();
const config = useRuntimeConfig();
const apiBase = config.public.apiBase as string;

const adminUsername = ref("");
const sidebarOpen = ref(false);

onMounted(() => {
  if (!api.isLoggedIn()) {
    router.replace("/admin");
    return;
  }
  api
    .me()
    .then((d) => {
      adminUsername.value = d.username;
      showPage("dashboard");
    })
    .catch(() => doLogout());
});

function doLogout() {
  api.clearToken();
  window.location.href = "/admin";
}
function getToken() {
  return process.client ? localStorage.getItem("ivf_token") || "" : "";
}

const currentPage = ref("dashboard");
const loading = ref(false);

// ── Data refs
const articles = ref<any[]>([]);
const articleTotal = ref(0);
const videos = ref<any[]>([]);
const videoTotal = ref(0);
const stories = ref<any[]>([]);
const reviews = ref<any[]>([]);
const reviewTotal = ref(0);
const doctors = ref<any[]>([]);
const doctorTotal = ref(0);
const faqs = ref<any[]>([]);
const faqTotal = ref(0);
const faqCategories = ref<
  { id: number | string; name_th: string; name_en: string }[]
>([]);
const articleCategories = ref([]);
const appointments = ref<any[]>([]);
const appointmentTotal = ref(0);
const gallery = ref<any[]>([]);
const dashStats = ref<any[]>([]);
const contactInfoEdit = ref<any[]>([]);
const businessHoursEdit = ref<any[]>([]);
const socialEdit = ref<any[]>([]);
const socialReorderSaving = ref(false);
const reviewCategories = ref([]);

// ── Dialogs
const pwMsg = ref("");
const pwMsgType = ref("alert-success");
const confirmDialog = reactive({
  open: false,
  title: "",
  message: "",
  type: "danger" as "danger" | "warning" | "info",
  onConfirm: () => {},
});
const alertDialog = reactive({
  open: false,
  title: "",
  message: "",
  onConfirm: undefined as (() => void) | undefined,
});
const successDialog = reactive({
  open: false,
  title: "",
  message: "",
  onConfirm: undefined as (() => void) | undefined,
});
const passwordDialog = reactive({ open: false, saving: false });
const categoryDialog = reactive({
  open: false,
  loading: false,
  saving: false,
  msg: "",
  msgType: "alert-success",
});

const reviewCategoryDialog = reactive({
  open: false,
  loading: false,
  saving: false,
  msg: "",
  msgType: "alert-success",
});

function showConfirm(
  title: string,
  message: string,
  onConfirm: () => void,
  type: "danger" | "warning" | "info" = "danger",
) {
  Object.assign(confirmDialog, { title, message, type, onConfirm, open: true });
}
function showAlert(title: string, message: string, onConfirm?: () => void) {
  Object.assign(alertDialog, { title, message, onConfirm, open: true });
}
function showSuccess(title: string, message: string, onConfirm?: () => void) {
  Object.assign(successDialog, { title, message, onConfirm, open: true });
}

// ── Modal
const modal = reactive({
  open: false,
  type: "",
  title: "",
  editId: null as string | null,
  error: "",
  saving: false,
  currentImage: "",
});

// ── Forms
const articleForm = reactive({
  title: "",
  title_en: "",
  excerpt: "",
  excerpt_en: "",
  content: "",
  content_en: "",
  category: "general",
  status: "draft",
});
const videoForm = reactive({
  title: "",
  title_en: "",
  description: "",
  description_en: "",
  url: "",
  status: "published",
});
const reviewForm = reactive({
  author_name: "",
  author_name_en: "",
  date: "",
  content: "",
  content_en: "",
  rating: 5,
  category: "",
  category_en: "",
  status: "published",
});
const doctorForm = reactive({
  name: "",
  name_en: "",
  title: "",
  title_en: "",
  bio: "",
  bio_en: "",
  educationText: "",
  educationTextEn: "",
  specialtiesText: "",
  photo: "",
  sort_order: 0,
  status: "published",
});
const faqForm = reactive({
  question: "",
  question_en: "",
  answer: "",
  answer_en: "",
  category: "",
  category_en: "",
  sort_order: 0,
  status: "published",
});
const articleCategoryDialog = reactive({
  open: false,
  loading: false,
  saving: false,
  msg: "",
  msgType: "alert-success",
});

const articleFormRef = ref<any>();
const videoFormRef = ref<any>();
const reviewFormRef = ref<any>();
const doctorFormRef = ref<any>();
const faqFormRef = ref<any>();
const passwordPageRef = ref<any>();

watch(
  [
    () => ({ ...articleForm }),
    () => ({ ...videoForm }),
    () => ({ ...reviewForm }),
    () => ({ ...doctorForm }),
    () => ({ ...faqForm }),
  ],
  () => {
    if (modal.error) {
      modal.error = ""; // เคลียร์ข้อความแจ้งเตือนทันทีเมื่อแอดมินเริ่มขยับพิมพ์หรือแก้ไขข้อมูล
    }
  },
  { deep: true },
);

// ── Navigation
async function showPage(page: string) {
  if (page === "password") {
    pwMsg.value = "";
    passwordDialog.open = true;
    sidebarOpen.value = false;
    return;
  }
  const targetPage = page === "social" ? "contact" : page;
  currentPage.value = targetPage;
  sidebarOpen.value = false;
  loading.value = true;
  try {
    if (targetPage === "dashboard") await loadDashboard();
    else if (targetPage === "articles")
      await Promise.all([loadArticles(), loadArticleCategories()]);
    else if (targetPage === "videos") await loadVideos();
    else if (targetPage === "stories") await loadStories();
    else if (targetPage === "reviews")
      await Promise.all([loadReviews(), loadReviewCategories()]);
    else if (targetPage === "doctors") await loadDoctors();
    else if (targetPage === "faq")
      await Promise.all([loadFaqs(), loadFaqCategories()]);
    else if (targetPage === "appointments") await loadAppointments();
    else if (targetPage === "gallery") await loadGallery();
    else if (targetPage === "contact")
      await Promise.all([loadContact(), loadSocial()]);
  } finally {
    loading.value = false;
  }
}

// ── Loaders
async function loadDashboard() {
  const [a, v, r, d, f, st, appt, g] = await Promise.all([
    api.getArticles({ limit: 1 }),
    api.getVideos({ limit: 1 }),
    api.getReviews({ limit: 1 }),
    api.getDoctors({ limit: 1 }),
    api.getFaqs({ limit: 1 }),
    api.get("/stories/admin/all"),
    api.getAppointments({ limit: 1 }),
    api.get("/gallery/admin/all"),
  ]);
  dashStats.value = [
    {
      label: "บทความ",
      value: a.total,
      icon: "bi-file-earmark-text",
      color: "#c084b0",
      bg: "rgba(192,132,176,0.12)",
    },
    {
      label: "เรื่องราว",
      value: st.length,
      icon: "bi-heart",
      color: "#f43f5e",
      bg: "rgba(244,63,94,0.12)",
    },
    {
      label: "วิดีโอ",
      value: v.total,
      icon: "bi-camera-video",
      color: "#60a5fa",
      bg: "rgba(96,165,250,0.12)",
    },
    {
      label: "รีวิว",
      value: r.total,
      icon: "bi-star",
      color: "#fbbf24",
      bg: "rgba(251,191,36,0.12)",
    },
    {
      label: "ทีมแพทย์",
      value: d.total,
      icon: "bi-person-badge",
      color: "#34d399",
      bg: "rgba(52,211,153,0.12)",
    },
    {
      label: "FAQ",
      value: f.total,
      icon: "bi-patch-question",
      color: "#a78bfa",
      bg: "rgba(167,139,250,0.12)",
    },
    {
      label: "นัดหมาย",
      value: appt.total,
      icon: "bi-calendar2-check",
      color: "#f472b6",
      bg: "rgba(244,114,182,0.12)",
    },
    {
      label: "แกลเลอรี่",
      value: (g || []).length,
      icon: "bi-images",
      color: "#38bdf8",
      bg: "rgba(56,189,248,0.12)",
    },
  ];
}
async function loadArticles(params = {}) {
  const d = await api.getArticles({ limit: 20, offset: 0, ...params });
  articles.value = d.articles || [];
  articleTotal.value = d.total || 0;
}
async function loadStories() {
  stories.value = (await api.get("/stories/admin/all")) || [];
}
async function loadVideos(params = {}) {
  const d = await api.getVideos({ limit: 20, offset: 0, ...params });
  videos.value = d.videos || [];
  videoTotal.value = d.total || 0;
}
async function loadReviews(params = {}) {
  const d = await api.getReviews({ limit: 20, offset: 0, ...params });
  reviews.value = d.reviews || [];
  reviewTotal.value = d.total || 0;
}
async function loadDoctors(params = {}) {
  const d = await api.getDoctors({ limit: 20, offset: 0, ...params });
  doctors.value = d.doctors || [];
  doctorTotal.value = d.total || 0;
}
async function loadFaqs(params = {}) {
  const d = await api.getFaqs({ limit: 20, offset: 0, ...params });
  faqs.value = d.faqs || [];
  faqTotal.value = d.total || 0;
}
async function loadArticleCategories() {
  articleCategories.value = (await api.get("/article-categories")) || [];
}
async function loadFaqCategories() {
  try {
    faqCategories.value = (await api.get("/faq-categories")) || [];
  } catch {
    faqCategories.value = [];
  }
}
async function loadAppointments(params = {}) {
  const d = await api.getAppointments({ limit: 10, offset: 0, ...params });
  appointments.value = d.appointments || [];
  appointmentTotal.value = d.total || 0;
}
async function loadReviewCategories() {
  try {
    reviewCategories.value = (await api.get("/review-categories")) || [];
  } catch {
    reviewCategories.value = [];
  }
}
async function loadGallery() {
  gallery.value = (await api.get("/gallery/admin/all")) || [];
}
async function loadContact() {
  const d = await api.get("/settings/contact");
  contactInfoEdit.value = (d.contactInfo || [])
    .filter((c: any) => c.key !== "line")
    .map((c: any) => ({ ...c }));
  businessHoursEdit.value = (d.businessHours || []).map((h: any) => ({ ...h }));
}
async function loadSocial() {
  socialEdit.value = ((await api.get("/settings/social/admin")) || []).map(
    (s: any) => ({ ...s }),
  );
}

// ── Search handlers
async function searchArticles(p: any) {
  loading.value = true;
  try {
    await loadArticles(p);
  } finally {
    loading.value = false;
  }
}
async function searchVideos(p: any) {
  loading.value = true;
  try {
    await loadVideos(p);
  } finally {
    loading.value = false;
  }
}
async function searchReviews(p: any) {
  loading.value = true;
  try {
    await loadReviews(p);
  } finally {
    loading.value = false;
  }
}
async function searchDoctors(p: any) {
  loading.value = true;
  try {
    await loadDoctors(p);
  } finally {
    loading.value = false;
  }
}
async function searchFaqs(p: any) {
  loading.value = true;
  try {
    await loadFaqs(p);
  } finally {
    loading.value = false;
  }
}
async function searchAppointments(p: any) {
  loading.value = true;
  try {
    await loadAppointments(p);
  } finally {
    loading.value = false;
  }
}

// ── Delete
async function deleteItem(
  prefix: string,
  id: string | number,
  reload: () => Promise<void>,
) {
  showConfirm(
    "ยืนยันการลบ",
    "รายการที่ลบแล้วจะไม่สามารถกู้คืนได้",
    async () => {
      try {
        await api.del(prefix + id);
        await reload();
        showSuccess(
          "ลบข้อมูลสำเร็จ",
          "รายการดังกล่าวถูกลบออกจากระบบเรียบร้อยแล้ว",
        );
      } catch (e: any) {
        showAlert("เกิดข้อผิดพลาด", e.message);
      }
    },
  );
}

async function openReviewCategoryDialog() {
  reviewCategoryDialog.open = true;
  reviewCategoryDialog.msg = "";
  if (!reviewCategories.value.length) {
    reviewCategoryDialog.loading = true;
    await loadReviewCategories();
    reviewCategoryDialog.loading = false;
  }
}
async function onAddReviewCategory(payload: {
  name_th: string;
  name_en: string;
}) {
  reviewCategoryDialog.saving = true;
  reviewCategoryDialog.msg = "";
  try {
    await api.post("/review-categories", payload);
    await loadReviewCategories();
    reviewCategoryDialog.msg = "เพิ่มหมวดหมู่สำเร็จ";
    reviewCategoryDialog.msgType = "alert-success";
  } catch (e: any) {
    reviewCategoryDialog.msg = e.message || "เกิดข้อผิดพลาด";
    reviewCategoryDialog.msgType = "alert-error";
  } finally {
    reviewCategoryDialog.saving = false;
  }
}
async function onUpdateReviewCategory(payload: {
  id: number | string;
  name_th: string;
  name_en: string;
}) {
  try {
    await api.put(`/review-categories/${payload.id}`, payload);
    await loadReviewCategories();
  } catch (e: any) {
    showAlert("เกิดข้อผิดพลาด", e.message);
  }
}
async function onDeleteReviewCategory(id: number | string) {
  showConfirm(
    "ลบหมวดหมู่",
    "รีวิวที่อยู่ในหมวดหมู่นี้จะไม่ถูกลบ แต่หมวดหมู่จะหายไปจาก Dropdown",
    async () => {
      try {
        await api.del(`/review-categories/${id}`);
        await loadReviewCategories();
      } catch (e: any) {
        showAlert("เกิดข้อผิดพลาด", e.message);
      }
    },
  );
}

async function openArticleCategoryDialog() {
  articleCategoryDialog.open = true;
  articleCategoryDialog.msg = "";
  if (!articleCategories.value.length) {
    articleCategoryDialog.loading = true;
    await loadArticleCategories();
    articleCategoryDialog.loading = false;
  }
}

async function onAddArticleCategory(payload: {
  name_th: string;
  name_en: string;
}) {
  articleCategoryDialog.saving = true;
  articleCategoryDialog.msg = "";
  try {
    await api.post("/article-categories", payload);
    await loadArticleCategories();
    articleCategoryDialog.msg = "เพิ่มหมวดหมู่สำเร็จ";
    articleCategoryDialog.msgType = "alert-success";
  } catch (e: any) {
    articleCategoryDialog.msg = e.message || "เกิดข้อผิดพลาด";
    articleCategoryDialog.msgType = "alert-error";
  } finally {
    articleCategoryDialog.saving = false;
  }
}

async function onUpdateArticleCategory(payload: {
  id: number | string;
  name_th: string;
  name_en: string;
}) {
  try {
    await api.put(`/article-categories/${payload.id}`, payload);
    await loadArticleCategories();
  } catch (e: any) {
    showAlert("เกิดข้อผิดพลาด", e.message);
  }
}

async function onDeleteArticleCategory(id: number | string) {
  showConfirm(
    "ลบหมวดหมู่",
    "บทความที่อยู่ในหมวดหมู่นี้จะไม่ถูกลบ แต่หมวดหมู่จะหายไปจาก Dropdown",
    async () => {
      try {
        await api.del(`/article-categories/${id}`);
        await loadArticleCategories();
      } catch (e: any) {
        showAlert("เกิดข้อผิดพลาด", e.message);
      }
    },
  );
}

async function openCategoryDialog() {
  categoryDialog.open = true;
  categoryDialog.msg = "";
  if (!faqCategories.value.length) {
    categoryDialog.loading = true;
    await loadFaqCategories();
    categoryDialog.loading = false;
  }
}

async function onAddCategory(payload: { name_th: string; name_en: string }) {
  categoryDialog.saving = true;
  categoryDialog.msg = "";
  try {
    await api.post("/faq-categories", payload);
    await loadFaqCategories();
    categoryDialog.msg = "เพิ่มหมวดหมู่สำเร็จ";
    categoryDialog.msgType = "alert-success";
  } catch (e: any) {
    categoryDialog.msg = e.message || "เกิดข้อผิดพลาด";
    categoryDialog.msgType = "alert-error";
  } finally {
    categoryDialog.saving = false;
  }
}

async function onUpdateCategory(payload: {
  id: number | string;
  name_th: string;
  name_en: string;
}) {
  try {
    await api.put(`/faq-categories/${payload.id}`, payload);
    await loadFaqCategories();
  } catch (e: any) {
    showAlert("เกิดข้อผิดพลาด", e.message);
  }
}

async function onDeleteCategory(id: number | string) {
  showConfirm(
    "ลบหมวดหมู่",
    "FAQ ที่อยู่ในหมวดหมู่นี้จะไม่ถูกลบ แต่หมวดหมู่จะหายไปจาก Dropdown",
    async () => {
      try {
        await api.del(`/faq-categories/${id}`);
        await loadFaqCategories();
      } catch (e: any) {
        showAlert("เกิดข้อผิดพลาด", e.message);
      }
    },
  );
}

// ── Appointment handlers
async function updateAppointmentStatus(id: number, status: string) {
  try {
    await api.updateAppointment(id, { status });
    await loadAppointments();
    showSuccess("อัปเดตสถานะสำเร็จ", "สถานะการนัดหมายได้รับการปรับปรุงแล้ว");
  } catch (e: any) {
    showAlert("เกิดข้อผิดพลาด", e.message);
  }
}
async function saveAppointmentNote(id: number, note: string) {
  try {
    await api.updateAppointment(id, { note });
    await loadAppointments();
    showSuccess("บันทึกสำเร็จ", "โน้ตถูกบันทึกเรียบร้อย");
  } catch (e: any) {
    showAlert("เกิดข้อผิดพลาด", e.message);
  }
}

// ── Contact handlers
async function saveContact(data: any[]) {
  try {
    await api.put("/settings/contact", { contactInfo: data });
    showSuccess("บันทึกสำเร็จ", "ข้อมูลการติดต่อได้รับการอัปเดตเรียบร้อยแล้ว");
  } catch (e: any) {
    showAlert("เกิดข้อผิดพลาด", e.message);
  }
}
async function saveHours(data: any[]) {
  try {
    await api.put("/settings/contact", { businessHours: data });
    showSuccess("บันทึกสำเร็จ", "เวลาทำการได้รับการอัปเดตเรียบร้อยแล้ว");
  } catch (e: any) {
    showAlert("เกิดข้อผิดพลาด", e.message);
  }
}
async function saveSocial(data: any[]) {
  try {
    await api.put("/settings/social", { socials: data });
    showSuccess(
      "บันทึกสำเร็จ",
      "ข้อมูลโซเชียลมีเดียได้รับการอัปเดตเรียบร้อยแล้ว",
    );
  } catch (e: any) {
    showAlert("เกิดข้อผิดพลาด", e.message);
  }
}

let reorderTimer: ReturnType<typeof setTimeout>;
async function socialReorder(index: number, direction: number) {
  const list = socialEdit.value;
  const targetIndex = index + direction;
  if (targetIndex < 0 || targetIndex >= list.length) return;
  const temp = list[index];
  list[index] = list[targetIndex];
  list[targetIndex] = temp;
  list.forEach((item, idx) => {
    item.sort_order = idx + 1;
  });
  clearTimeout(reorderTimer);
  socialReorderSaving.value = true;
  reorderTimer = setTimeout(async () => {
    try {
      await fetch(`${apiBase}/settings/social/reorder`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({
          order: list.map((s) => ({
            platform: s.platform,
            sort_order: s.sort_order,
          })),
        }),
      });
    } catch {
      showAlert("เกิดข้อผิดพลาด", "ไม่สามารถบันทึกลำดับได้ กรุณาลองใหม่");
    } finally {
      socialReorderSaving.value = false;
    }
  }, 600);
}

async function socialToggle(social: any) {
  social._updating = true;
  try {
    await fetch(
      `${apiBase}/settings/social/${encodeURIComponent(social.platform)}/status`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({ is_active: social.is_active }),
      },
    );
  } catch {
    social.is_active = social.is_active ? 0 : 1;
    showAlert("เกิดข้อผิดพลาด", "ไม่สามารถเปลี่ยนสถานะได้ กรุณาลองใหม่");
  } finally {
    social._updating = false;
  }
}

// ── Modal openers
function openArticleModal(a?: any) {
  if (!articleCategories.value.length) loadArticleCategories();
  modal.error = "";
  modal.type = "article";
  modal.title = a ? "แก้ไขบทความ" : "เพิ่มบทความ";
  modal.editId = a?.id || null;
  modal.open = true;
  modal.currentImage = a?.cover_image
    ? a.cover_image.startsWith("http")
      ? a.cover_image
      : (useRuntimeConfig().public.apiBase as string).replace("/api", "") +
        a.cover_image
    : "";
  Object.assign(articleForm, {
    title: a?.title || "",
    title_en: a?.title_en || "",
    excerpt: a?.excerpt || "",
    excerpt_en: a?.excerpt_en || "",
    content: a?.content || "",
    content_en: a?.content_en || "",
    category: a?.category || "general",
    status: a?.status || "published",
  });
}
function openVideoModal(v?: any) {
  modal.error = "";
  modal.type = "video";
  modal.title = v ? "แก้ไขวิดีโอ" : "เพิ่มวิดีโอ";
  modal.editId = v?.id || null;
  modal.open = true;
  Object.assign(videoForm, {
    title: v?.title || "",
    title_en: v?.title_en || "",
    description: v?.description || "",
    description_en: v?.description_en || "",
    url: v?.url || "",
    status: v?.status || "published",
  });
}
function openReviewModal(r?: any) {
  if (!reviewCategories.value.length) loadReviewCategories();
  modal.error = "";
  modal.type = "review";
  modal.title = r ? "แก้ไขรีวิว" : "เพิ่มรีวิว";
  modal.editId = r?.id || null;
  modal.open = true;
  Object.assign(reviewForm, {
    author_name: r?.author_name || "",
    author_name_en: r?.author_name_en || "",
    date: r?.date || "",
    content: r?.content || "",
    content_en: r?.content_en || "",
    rating: r?.rating || 5,
    category: r?.category || "",
    category_en: r?.category_en || "",
    status: r?.status || "published",
  });
}
function openDoctorModal(d?: any) {
  modal.error = "";
  modal.type = "doctor";
  modal.title = d ? "แก้ไขแพทย์" : "เพิ่มแพทย์";
  modal.editId = d?.id || null;
  modal.open = true;
  Object.assign(doctorForm, {
    name: d?.name || "",
    name_en: d?.name_en || "",
    title: d?.title || "",
    title_en: d?.title_en || "",
    bio: d?.bio || "",
    bio_en: d?.bio_en || "",
    photo: d?.photo || "",
    educationText: (d?.education || []).join("\n"),
    educationTextEn: (d?.education_en || []).join("\n"),
    specialtiesText: (d?.specialties || []).join(", "),
    sort_order: d?.sort_order || 0,
    status: d?.status || "published",
  });
}
function openFaqModal(f?: any) {
  modal.error = "";
  modal.type = "faq";
  modal.title = f ? "แก้ไข FAQ" : "เพิ่มคำถาม";
  modal.editId = f?.id?.toString() || null;
  modal.open = true;
  if (!faqCategories.value.length) loadFaqCategories();
  Object.assign(faqForm, {
    question: f?.question || "",
    question_en: f?.question_en || "",
    answer: f?.answer || "",
    answer_en: f?.answer_en || "",
    category: f?.category || faqCategories.value[0]?.name_th || "",
    category_en: f?.category_en || faqCategories.value[0]?.name_en || "",
    sort_order: f?.sort_order || 0,
    status: f?.status || "published",
  });
}

// ── Save Modal
async function saveModal() {
  modal.saving = true;
  modal.error = "";
  try {
    if (modal.type === "article") {
      const isChildValid = articleFormRef.value?.validateForm();
      if (!isChildValid) {
        return;
      }
      const fd = new FormData();
      Object.entries(articleForm).forEach(([k, v]) =>
        fd.append(k, v as string),
      );
      const img = articleFormRef.value?.imageRef?.files?.[0];
      if (img) fd.append("cover_image", img);
      await api.post(
        modal.editId ? `/articles/${modal.editId}` : "/articles",
        fd,
      );
      await loadArticles();
    } else if (modal.type === "video") {
      const isChildValid = videoFormRef.value?.validateForm();
      if (!isChildValid) {
        return;
      }
      const fd = new FormData();
      Object.entries(videoForm).forEach(([k, v]) => fd.append(k, v as string));
      const thumb = videoFormRef.value?.thumbRef?.files?.[0];
      if (thumb) fd.append("thumbnail", thumb);
      await api.post(modal.editId ? `/videos/${modal.editId}` : "/videos", fd);
      await loadVideos();
    } else if (modal.type === "review") {
      const isChildValid = reviewFormRef.value?.validateForm();
      if (!isChildValid) {
        return;
      }
      await api.post(modal.editId ? `/reviews/${modal.editId}` : "/reviews", {
        ...reviewForm,
      });
      await loadReviews();
    } else if (modal.type === "doctor") {
      const isChildValid = doctorFormRef.value?.validateForm();
      if (!isChildValid) {
        return;
      }
      const fd = new FormData();
      fd.append("name", doctorForm.name);
      fd.append("name_en", doctorForm.name_en);
      fd.append("title", doctorForm.title);
      fd.append("title_en", doctorForm.title_en);
      fd.append("bio", doctorForm.bio);
      fd.append("bio_en", doctorForm.bio_en);
      fd.append("sort_order", String(doctorForm.sort_order));
      fd.append("status", doctorForm.status);
      fd.append(
        "education",
        JSON.stringify(doctorForm.educationText.split("\n").filter(Boolean)),
      );
      fd.append(
        "education_en",
        JSON.stringify(doctorForm.educationTextEn.split("\n").filter(Boolean)),
      );
      fd.append(
        "specialties",
        JSON.stringify(
          doctorForm.specialtiesText
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean),
        ),
      );
      const photo = doctorFormRef.value?.photoRef?.files?.[0];
      if (photo) {
        fd.append("photo", photo);
      } else if (!doctorForm.photo) {
        fd.append("photo", "");
      }
      await api.post(
        modal.editId ? `/doctors/${modal.editId}` : "/doctors",
        fd,
      );
      await loadDoctors();
    } else if (modal.type === "faq") {
      const isChildValid = faqFormRef.value?.validateForm();
      if (!isChildValid) {
        return;
      }
      await api.post(modal.editId ? `/faqs/${modal.editId}` : "/faqs", {
        ...faqForm,
      });
      await loadFaqs();
    }
    modal.open = false;
    showSuccess("บันทึกสำเร็จ", "ข้อมูลได้รับการอัปเดตเรียบร้อยแล้ว");
  } catch (e: any) {
    modal.error = e.message;
  } finally {
    modal.saving = false;
  }
}

// ── Change Password
async function savePassword(payload: any) {
  pwMsg.value = "";
  if (payload.newPw !== payload.confirm) {
    pwMsg.value = "รหัสผ่านใหม่ไม่ตรงกัน";
    pwMsgType.value = "alert-error";
    return;
  }
  passwordDialog.saving = true;
  try {
    await api.changePassword(payload.current, payload.newPw);
    passwordDialog.open = false;
    pwMsg.value = "";
    passwordPageRef.value?.resetForm();
    showSuccess(
      "เปลี่ยนรหัสผ่านสำเร็จ",
      "ระบบได้ปรับปรุงรหัสผ่านใหม่เรียบร้อยแล้ว",
    );
  } catch (e: any) {
    pwMsg.value = e.message;
    pwMsgType.value = "alert-error";
  } finally {
    passwordDialog.saving = false;
  }
}
</script>

<style>
@import "~/assets/css/admin.css";
.app-layout {
  display: flex;
  min-height: 100vh;
}
.main-content {
  margin-left: 280px;
  flex: 1;
  min-height: 100vh;
}
.sidebar-overlay {
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 99;
  backdrop-filter: blur(2px);
}
@media (max-width: 768px) {
  .main-content {
    margin-left: 0;
  }
  .sidebar-overlay {
    display: block;
  }
}
</style>
