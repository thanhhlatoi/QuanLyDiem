<template>
  <form @submit.prevent="editChuyenNganh">
    <a-card title="Sửa chuyên ngành">
      <div class="row">
        <div class="row mb-2">
          <div class="col-12 col-sm-3 text-start text-sm-end">
            <label>
              <span>Tên Ngành<span class="text-danger me-1">*</span>:</span>
            </label>
          </div>
          <div class="col-12 col-sm-5">
            <a-input v-model:value="tennganh" placeholder="Tên ngành" />
          </div>
        </div>

        <div class="row mb-2">
          <div class="col-12 col-sm-3 text-start text-sm-end">
            <label><span>Khoa:</span></label>
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
            <router-link :to="{ name: 'chuyennganh' }">Hủy</router-link>
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
    const khoa = ref([]);
    const errors = ref({});

    const chuyennganh = reactive({
      tennganh: "",
      makhoa: "", 
    });

    const getChuyenNganh = async () => {
      try {
        const response = await axios.get(`chuyennganh/${route.params.manganh}`);
        chuyennganh.tennganh = response.data.tennganh;
        chuyennganh.makhoa = response.data.khoa?.makhoa;
      } catch (error) {
        console.error(error);
      }
    };

    const getKhoa = async () => {
      try {
        const response = await axios.get("khoa");
        khoa.value = response.data.content;
      } catch (error) {
        console.error(error);
      }
    };

    const editChuyenNganh = async () => {
      try {
        const response = await axios.put(
          `chuyennganh/update/${route.params.manganh}`,
          chuyennganh
        );
        if (response) {
          message.success("Cập nhật thành công chuyên ngành");
          router.push({ name: "chuyennganh" });
        }
      } catch (error) {
        errors.value = error.response.data.errors || {};
      }
    };

    onMounted(() => {
      getChuyenNganh();
      getKhoa();
    });

    return {
      ...toRefs(chuyennganh),
      editChuyenNganh,
      khoa,
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