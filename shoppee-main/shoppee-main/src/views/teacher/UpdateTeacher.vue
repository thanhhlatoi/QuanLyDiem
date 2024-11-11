<template>
  <form @submit.prevent="editStudent">
    <a-card title="Tạo chuyên ngành mới">
      <div class="row mb-2">
        <div class="col-12 col-sm-3 text-start text-sm-end">
          <label>
            <span>Mã giáo viên:<span class="text-danger me-1">*</span></span>
          </label>
        </div>
        <div class="col-12 col-sm-5">
          <a-input :disabled="true" v-model:value="magiaovien" placeholder="Họ tên giáo viên" />
          <div class="w-100"></div>
        </div>
      </div>
      <div class="row mb-2">
        <div class="col-12 col-sm-3 text-start text-sm-end">
          <label>
            <span>Họ tên:<span class="text-danger me-1">*</span></span>
          </label>
        </div>
        <div class="col-12 col-sm-5">
          <a-input v-model:value="tengiaovien" placeholder="Họ tên giáo viên" />
          <div class="w-100"></div>
        </div>
      </div>
      <div class="row">
        <div class="col-12 d-grid d-sm-flex justify-content-sm-end mx-auto">
          <a-button class="me-0 me-sm-2 mb-3 mb-sm-0">
            <router-link :to="{ name: 'teacher' }"> Hủy </router-link>
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
    const route = useRoute();
    const errors = ref({});
    const teacher = reactive({
      magiaovien:"",
      tengiaovien: "",
    });

    const getStudent = async () => {
      try {
        const response = await axios.get(`giaovien/${route.params.magiaovien}`);
        teacher.magiaovien = response.data.magiaovien
        teacher.tengiaovien = response.data.tengiaovien;
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu giáo viên:", error);
      }
    };

    const editStudent = () => {
      axios
        .put(`giaovien/update/${route.params.magiaovien}`, teacher)
        .then((response) => {
          if (response) {
            message.success("Tạo thành công chuyên ngành mới");
            router.push({ name: "teacher" });
          }
        })
        .catch((error) => {
          errors.value = error.response.data.errors;
        });
    };

    onMounted(() => {
      getStudent();
    });

    return {
      ...toRefs(teacher),
      editStudent,
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