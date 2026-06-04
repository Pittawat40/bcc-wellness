<template>
  <div>
    <div class="page-header">
      <div>
        <h2 class="page-title">Social Media</h2>
        <p class="page-subtitle">จัดการช่องทางโซเชียลมีเดีย</p>
      </div>
      <button
        class="btn btn-ghost"
        @click="
          items.push({
            platform: '',
            url: '',
            is_active: true,
            sort_order: items.length + 1,
          })
        "
      >
        + เพิ่ม
      </button>
    </div>
    <div class="card">
      <div v-if="loading" class="loading-state">
        <div class="loading-dot" />
        <div class="loading-dot" />
        <div class="loading-dot" />
      </div>
      <template v-else>
        <table>
          <thead>
            <tr>
              <th>Platform</th>
              <th>URL</th>
              <th style="text-align: center">แสดง</th>
              <th>ลำดับ</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(s, i) in items" :key="i">
              <td>
                <input
                  class="form-input"
                  v-model="s.platform"
                  style="min-width: 100px"
                />
              </td>
              <td>
                <input
                  class="form-input"
                  v-model="s.url"
                  type="url"
                  style="min-width: 200px"
                />
              </td>
              <td style="text-align: center">
                <input type="checkbox" v-model="s.is_active" />
              </td>
              <td>
                <input
                  class="form-input"
                  v-model.number="s.sort_order"
                  type="number"
                  style="width: 64px"
                />
              </td>
              <td>
                <button
                  class="btn-icon btn-icon-danger"
                  @click="items.splice(i, 1)"
                >
                  <i class="bi bi-trash3"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <div style="padding: 14px 24px 24px">
          <button class="btn btn-primary" @click="emit('save', items)">
            <i class="bi bi-floppy"></i> บันทึก Social Media
          </button>
          <div v-if="msg" :class="['alert', msgType, 'mt-2']">{{ msg }}</div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  items: any[];
  loading: boolean;
  msg?: string;
  msgType?: string;
}>();
const emit = defineEmits<{ (e: "save", data: any[]): void }>();
</script>
