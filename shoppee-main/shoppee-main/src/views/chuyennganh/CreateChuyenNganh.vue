<template>
  <form @submit.prevent="createChuyenNganh">
    <a-card title="Tạo chuyên ngành mới">
      <div class="row">
        <div class="row mb-2">
          <div class="col-12 col-sm-3 text-start text-sm-end">
            <label>
              <span>Mã ngành<span class="text-danger me-1">*</span>: </span>
            </label>
          </div>

          <div class="col-12 col-sm-5">
            <a-input v-model:value="manganh" placeholder="Mã ngành" />
          </div>
        </div>

        <div class="row mb-2">
          <div class="col-12 col-sm-3 text-start text-sm-end">
            <label>
              <span>Tên Ngành<span class="text-danger me-1">*</span>: </span>
            </label>
          </div>
          <div class="col-12 col-sm-5">
            <a-input v-model:value="tennganh" placeholder="Tên ngành" />
          </div>
        </div>

        <div class="row mb-2">
          <div class="col-12 col-sm-3 text-start text-sm-end">
            <label>
              <span>Khoa: </span>
            </label>
          </div>
          <div class="col-12 col-sm-5">
            <a-select
              placeholder="Chọn khoa"
              style="width: 100%"
              v-model:value="makhoa"
            >
              <a-select-option
                v-for="khoaItem in khoa"
                :key="khoaItem.makhoa"
                :value="khoaItem.makhoa"
              >
                {{ khoaItem.tenkhoa }}
              </a-select-option>
            </a-select>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-12 d-grid d-sm-flex justify-content-sm-end mx-auto">
          <a-button class="me-0 me-sm-2 mb-3 mb-sm-0">
            <router-link :to="{ name: 'chuyennganh' }"> Hủy </router-link>
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
import { useRouter } from "vue-router";
import { message } from "ant-design-vue";
import axios from "@/config/axios";

export default {
  setup() {
    const router = useRouter();
    const khoa = ref([]);
    const errors = ref({});
    
    const chuyennganh = reactive({
      tennganh: "",
      manganh: "",
      makhoa: "",
    });

    const getChuyenNganh = () => {
      axios.get("khoa")
        .then((response) => {
          khoa.value = response.data.content; // Lưu dữ liệu khoa
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const createChuyenNganh = () => {
      console.log("haha",chuyennganh)
      axios.post("chuyennganh/create", chuyennganh)
        .then((response) => {
          if (response) {
            message.success("Tạo thành công chuyên ngành mới");
            router.push({ name: "chuyennganh" });
          }
        })
        .catch((error) => {
          errors.value = error.response.data.errors;
          message.error("Có lỗi xảy ra. Vui lòng kiểm tra lại.");
        });
    };

    // Gọi hàm để lấy danh sách khoa khi component được mount
    onMounted(getChuyenNganh);

    return {
      ...toRefs(chuyennganh),
      createChuyenNganh,
      khoa,
      errors,
    };
  },
};
</script>

<style scoped>
.select_danger {
  border: 1px solid red;
}
</style>