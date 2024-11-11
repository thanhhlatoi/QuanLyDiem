<template>
  <form @submit.prevent="editKhoa">
    <a-card title="Sửa chuyên ngành">
      <div class="row">
        <div class="row mb-2">
          <div class="col-12 col-sm-3 text-start text-sm-end">
            <label>
              <span>Mã khoa<span class="text-danger me-1">*</span>:</span>
            </label>
          </div>
          <div class="col-12 col-sm-5">
            <a-input v-model:value="makhoa" placeholder="Mã khoa" />
          </div>
        </div>

        <div class="row mb-2">
          <div class="col-12 col-sm-3 text-start text-sm-end">
            <label>
              <span>Tên khoa<span class="text-danger me-1">*</span>:</span>
            </label>
          </div>
          <div class="col-12 col-sm-5">
            <a-input v-model:value="tenkhoa" placeholder="Tên khoa" />
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-12 d-grid d-sm-flex justify-content-sm-end mx-auto">
          <a-button class="me-0 me-sm-2 mb-3 mb-sm-0">
            <router-link :to="{ name: 'khoa' }">Hủy</router-link>
          </a-button>
          <a-button type="primary" html-type="submit">
            <span>Xác Nhận</span>
          </a-button>
        </div>
      </div>
    </a-card>
  </form>
</template>

<script>
import { onMounted, ref, reactive, toRefs } from "vue";
import { useRouter, useRoute } from "vue-router";
import { message } from "ant-design-vue";
import axios from "@/config/axios";

export default {
  setup() {
    const router = useRouter();
    const route = useRoute(); // Thêm để lấy thông tin từ route
    const errors = ref({});

    const khoa = reactive({
      tenkhoa: "",
      makhoa: "",
    });

    const getKhoa = async () => {
      try {
        const response = await axios.get(`khoa/${route.params.makhoa}`); // Sử dụng makhoa từ route params
        khoa.tenkhoa = response.data.tenkhoa;
        khoa.makhoa = response.data.makhoa;
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu khoa:", error);
      }
    };

    const editKhoa = async () => {
      try {
        const response = await axios.put(`khoa/update/${route.params.makhoa}`, khoa); // Thay đổi đường dẫn để cập nhật
        if (response) {
          message.success("Cập nhật thành công khoa");
          router.push({ name: "khoa" });
        }
      } catch (error) {
        errors.value = error.response.data.errors || {}; // Cập nhật lỗi nếu có
      }
    };

    onMounted(() => {
      getKhoa(); // Gọi hàm để lấy dữ liệu khi component được mount
    });

    return {
      ...toRefs(khoa),
      editKhoa,
      errors,
    };
  },
};
</script>

<style>
.select_danger {
  border: 1px solid red;
}
</style>