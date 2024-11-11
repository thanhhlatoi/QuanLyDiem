<template>
  <form @submit.prevent="createKhoa()">
    <a-card title="Tạo chuyên ngành mới">
      <div class="row">
        <div class="row mb-2">
          <div class="col-12 col-sm-3 text-start text-sm-end">
            <label for="">
              <span> Mã khoa<span class="text-danger me-1">*</span>: </span>
            </label>
          </div>

          <div class="col-12 col-sm-5">
            <a-input v-model:value="makhoa" placeholder="mã khoa" />
            <div class="w-100"></div>
          </div>
        </div>

        <div class="row mb-2">
          <div class="col-12 col-sm-3 text-start text-sm-end">
            <label for="">
              <span >
                Tên khoa<span class="text-danger me-1">*</span>:
              </span>
            </label>
          </div>
          <div class="col-12 col-sm-5">
            <a-input v-model:value="tenkhoa" placeholder="Tên khoa" />
            <div class="w-100"></div>
          </div>
        </div>
  
      </div>
      <div class="row">
        <div class="col-12 d-grid d-sm-flex justify-content-sm-end mx-auto">
          <a-button class="me-0 me-sm-2 mb-3 mb-sm-0">
            <router-link :to="{ name: 'khoa' }"> Hủy </router-link>
          </a-button>
          <a-button type="primary " html-type="submit">
            <span> Xác Nhận </span>
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

    const errors = ref({});

    
    const khoa = reactive({
      makhoa: "",
      tenkhoa: "",
    });

    const createKhoa = () => {
      console.log(khoa)
      axios
        .post("khoa/create", khoa)
        .then((response) => {
          console.log(response);
          if (response) {
            message.success("Tạo thành công chuyên ngành mới");
            router.push({ name: "khoa" });
          }
        })
        .catch((error) => {
          errors.value = error.response.data.errors;
        });
    };

    return {
      ...toRefs(khoa),
      createKhoa,
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