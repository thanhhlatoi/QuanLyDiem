<template>
  <form @submit.prevent="createMonHoc">
    <a-card title="Tạo môn học mới">
      <div class="row">
        <div class="row mb-2">
          <div class="col-12 col-sm-3 text-start text-sm-end">
            <label>
              <span>Mã môn:<span class="text-danger me-1">*</span>: </span>
            </label>
          </div>
          <div class="col-12 col-sm-5">
            <a-input v-model:value="mamon" placeholder="Mã môn" />
          </div>
        </div>

        <div class="row mb-2">
          <div class="col-12 col-sm-3 text-start text-sm-end">
            <label>
              <span>Số tín chỉ:<span class="text-danger me-1">*</span>: </span>
            </label>
          </div>
          <div class="col-12 col-sm-5">
            <a-input v-model:value="sotinchi" placeholder="Số tín chỉ" />
          </div>
        </div>

        <div class="row mb-2">
          <div class="col-12 col-sm-3 text-start text-sm-end">
            <label>
              <span>Tên môn<span class="text-danger me-1">*</span>:</span>
            </label>
          </div>
          <div class="col-12 col-sm-5">
            <a-input v-model:value="tenmon" placeholder="Tên môn" />
          </div>
        </div>

        <div class="row mb-2">
          <div class="col-12 col-sm-3 text-start text-sm-end">
            <label>
              <span>Mã ngành: </span>
            </label>
          </div>
          <div class="col-12 col-sm-5">
            <a-select
              placeholder="Chọn mã ngành"
              style="width: 100%"
              :options="selectNganh"
              v-model:value="manganh"
            />
          </div>
        </div>

        <div class="row mb-2">
          <div class="col-12 col-sm-3 text-start text-sm-end">
            <label>
              <span>Mã khoa: </span>
            </label>
          </div>
          <div class="col-12 col-sm-5">
            <a-select
              placeholder="Chọn mã khoa"
              style="width: 100%"
              :options="selectKhoa"
              v-model:value="makhoa"
            />
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-12 d-grid d-sm-flex justify-content-sm-end mx-auto">
          <a-button class="me-0 me-sm-2 mb-3 mb-sm-0">
            <router-link :to="{ name: 'monhoc' }"> Hủy </router-link>
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
import { useRouter } from "vue-router";
import { message } from "ant-design-vue";
import axios from "@/config/axios";

export default {
  setup() {
    const router = useRouter();
    const khoa = ref([]); 
    const nganh = ref([]); 
    const errors = ref({});

    const selectKhoa = computed(() => {
      return khoa.value.map(item => ({
        value: item.makhoa, // Mã khoa
        label: item.tenkhoa // Tên khoa
      }));
    });

    const selectNganh = computed(() => {
      return nganh.value.map(item => ({
        value: item.manganh, // Mã ngành
        label: item.tennganh // Tên ngành
      }));
    });

    const monHoc = reactive({
      mamon: "",
      sotinchi: "",
      tenmon: "",
      manganh: "",
      makhoa: ""
    });

    const getChuyenNganh = () => {
      axios.get("chuyennganh")
        .then(response => {
          nganh.value = response.data; // Lưu danh sách ngành
          console.log("chuyennganh", response)
        })
        .catch(error => {
          console.error(error);
          message.error("Lỗi khi lấy dữ liệu ngành");
        });
    };

    const getKhoa = () => {
      axios.get("khoa")
        .then(response => {
          khoa.value = response.data.content; // Lưu danh sách khoa
        })
        .catch(error => {
          console.error(error);
          message.error("Lỗi khi lấy dữ liệu khoa");
        });
    };

    const createMonHoc = () => {
      axios.post("monhoc/create", monHoc)
        .then(response => {
          if (response) {
            message.success("Tạo thành công môn học mới");
            router.push({ name: "monhoc" });
          }
        })
        .catch(error => {
          errors.value = error.response.data.errors;
          message.error("Có lỗi xảy ra. Vui lòng kiểm tra lại.");
        });
    };

    onMounted(() => {
      getKhoa();
      getChuyenNganh();
    });

    return {
      ...toRefs(monHoc),
      createMonHoc,
      selectKhoa,
      selectNganh,
      errors
    };
  },
};
</script>

<style scoped>
.select_danger {
  border: 1px solid red;
}
</style>