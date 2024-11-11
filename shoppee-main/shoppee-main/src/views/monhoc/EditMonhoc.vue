<template>
  <form @submit.prevent="editMon">
    <a-card title="Sửa môn học">
      <div class="row">
        <div class="row mb-2">
          <div class="col-12 col-sm-3 text-start text-sm-end">
            <label>
              <span>Mã môn<span class="text-danger me-1">*</span>:</span>
            </label>
          </div>
          <div class="col-12 col-sm-5">
            <a-input v-model:value="mamon" placeholder="Mã môn" />
          </div>
        </div>
        <div class="row mb-2">
          <div class="col-12 col-sm-3 text-start text-sm-end">
            <label>
              <span>Tên môn<span class="text-danger me-1">*</span>:</span>
            </label>
          </div>
          <div class="col-12 col-sm-5">
            <a-input v-model:value="tenmon" placeholder="Tên môn học" />
          </div>
        </div>
        <div class="row mb-2">
          <div class="col-12 col-sm-3 text-start text-sm-end">
            <label>
              <span>Số tín chỉ<span class="text-danger me-1">*</span>:</span>
            </label>
          </div>
          <div class="col-12 col-sm-5">
            <a-input v-model:value="sotinchi" placeholder="Số tín chỉ" />
          </div>
        </div>
        <div class="row mb-2">
            <div class="col-12 col-sm-3 text-start text-sm-end">
              <label for="">
                <span>Mã ngành: </span>
              </label>
            </div>
            <div class="col-12 col-sm-5">
              <a-select
                
                placeholder="Mã ngành"
                style="width: 100%"
                :options="selectNganh"
                v-model:value="manganh"
              ></a-select>
            </div>
          </div>
          <div class="row mb-2">
            <div class="col-12 col-sm-3 text-start text-sm-end">
              <label for="">
                <span>Mã khoa: </span>
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
            <router-link :to="{ name: 'monhoc' }">Hủy</router-link>
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
    const route = useRoute(); // Thêm để lấy thông tin từ route
    const errors = ref({});
    const khoa = ref([]); 
    const nganh = ref([]); 

    const monHoc = reactive({
      mamon: "",
      sotinchi: "",
      tenmon: "",
      manganh: "",
      makhoa: ""
    });

    const selectNganh = computed(() => {
      return nganh.value.map(item => ({
        value: item.manganh, // Mã khoa
        label: item.manganh // Tên khoa
      }));
    });
    const getChuyenNganh = () => {
      axios
        .get("chuyennganh")
        .then((response) => {
          console.log(response);
          nganh.value = response.data
          console.log("hihi", response.data)
        })
        .catch((error) => {
          console.log(error);
        });
    };
    const getKhoa = async() => {
      try {
        const response = await axios.get("khoa");
        khoa.value = response.data.content;
      } catch (error) {
        console.error(error);
      }
    };
    const getMonHoc = async () => {
      try {
        const response = await axios.get(`monhoc/${route.params.mamon}`); // Sử dụng makhoa từ route params
          
          monHoc.mamon = response.data.mamon,
          monHoc.sotinchi = response.data.sotinchi,
          monHoc.tenmon = response.data.temon,
          monHoc.manganh = response.data.khoa?.chuyenNganhs?.[0]?.manganh,
          monHoc.makhoa = response.data.khoa.makhoa
  

      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu khoa:", error);
      }
    };

    const editMon = async () => {
      try {
        const response = await axios.put(`monhoc/update/${route.params.mamon}`, monHoc); // Thay đổi đường dẫn để cập nhật
        if (response) {
          message.success("Cập nhật thành công khoa");
          router.push({ name: "monhoc" });
        }
      } catch (error) {
        errors.value = error.response.data.errors || {}; // Cập nhật lỗi nếu có
      }
    };

    onMounted(() => {
      getMonHoc();
      getChuyenNganh();
      getKhoa() // Gọi hàm để lấy dữ liệu khi component được mount
    });

    return {
      ...toRefs(monHoc),
      editMon,
      errors,
      khoa,
      nganh,
      selectNganh
    };
  },
};
</script>

<style>
.select_danger {
  border: 1px solid red;
}
</style>