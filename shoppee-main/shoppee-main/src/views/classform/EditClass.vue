<template>
  <form @submit.prevent="editClass()">
    <a-card title="Chỉnh sửa lớp học">
      <div class="row">
        <div class="row mb-2">
          <div class="col-12 col-sm-3 text-start text-sm-end">
            <label>
              <span>Mã lớp<span class="text-danger me-1">*</span>:</span>
            </label>
          </div>
          <div class="col-12 col-sm-5">
            <a-input v-model:value="malop" placeholder="Mã lớp" />
          </div>
        </div>


        <div class="row mb-2">
          <div class="col-12 col-sm-3 text-start text-sm-end">
            <label>
              <span>Mã ngành:</span>
            </label>
          </div>
          <div class="col-12 col-sm-5">
            <a-select
              placeholder="Chọn mã ngành"
              style="width: 100%"
              :options="selectOptions"
              v-model:value="manganh"
            />
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-12 d-grid d-sm-flex justify-content-sm-end mx-auto">
          <a-button class="me-0 me-sm-2 mb-3 mb-sm-0">
            <router-link :to="{ name: 'ClassIndex' }">Hủy</router-link>
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
import { onMounted, ref, reactive, toRefs, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { message } from "ant-design-vue";
import axios from "@/config/axios";

export default {
  setup() {
    const router = useRouter();
    const route = useRoute();
    const nganh = ref([]);
    const errors = ref({});

    const classForm = reactive({
      malop: "",
      kyhoc: "",
      manganh: ""
    });

    const selectOptions = computed(() => {
      return nganh.value.map(item => ({
        value: item.manganh,
        label: item.manganh // Bạn có thể thay đổi label nếu cần
      }));
    });

    const getSpecialized = () => {
      axios.get("chuyennganh")
        .then(response => {
          nganh.value = response.data; // Cập nhật dữ liệu ngành
        })
        .catch(error => {
          console.error("Error fetching specialized data", error);
        });
    };

    const getClass = () => {
      axios.get(`lophoc/${route.params.malop}`)
        .then(response => {
          const classData = response.data;
      classForm.malop = classData.malop;
      classForm.kyhoc = classData.kyhoc;
      classForm.manganh = classData.chuyenNganh.manganh;
      console.log(classData.chuyenNganh.manganh)
        })
        .catch(error => {
          console.error("Error fetching class data", error);
        });
    };

    const editClass = () => {
      axios.put(`lophoc/update/${route.params.malop}`, classForm)
        .then(response => {
          message.success("Chỉnh sửa thành công lớp học");
          router.push({ name: "ClassIndex" });
        })
        .catch(error => {
          errors.value = error.response.data.errors;
          message.error("Có lỗi xảy ra, vui lòng kiểm tra lại.");
        });
    };

    onMounted(() => {
      getSpecialized(); // Lấy dữ liệu ngành ngay khi component được mount
      getClass(); // Lấy dữ liệu lớp học
    });

    return {
      ...toRefs(classForm),
      editClass,
      errors,
      selectOptions
    };
  },
};
</script>

<style>
.select_danger {
  border: 1px solid red;
}
</style>