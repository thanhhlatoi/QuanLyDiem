<template>
    <form @submit.prevent="CreateStuden()">
      <a-card title="Tạo chuyên ngành mới">
        <div class="row">
          <div class="row mb-2">
            <div class="col-12 col-sm-3 text-start text-sm-end">
              <label for="">
                <span>Mã sinh viên:<span class="text-danger me-1">*</span>: </span>
              </label>
            </div>
  
            <div class="col-12 col-sm-5">
              <a-input v-model:value="masinhvien" placeholder="Mã sinh vien" />
              <div class="w-100"></div>
            </div>
          </div>
          <div class="row mb-2">
            <div class="col-12 col-sm-3 text-start text-sm-end">
              <label for="">
                <span>Họ tên:<span class="text-danger me-1">*</span>: </span>
              </label>
            </div>
  
            <div class="col-12 col-sm-5">
              <a-input v-model:value="hoten" placeholder="Họ tên" />
              <div class="w-100"></div>
            </div>
          </div>
          <div class="row mb-2">
              <div class="col-12 col-sm-3 text-start text-sm-end">
                <label for="">
                  <span>Lớp: </span>
                </label>
              </div>
              <div class="col-12 col-sm-5">
                <a-select
                  
                  placeholder="Mã ngành"
                  style="width: 100%"
                  :options="selectClass"
                  v-model:value="malop"
                ></a-select>
              </div>
            </div>
       
        </div>
        <div class="row">
          <div class="col-12 d-grid d-sm-flex justify-content-sm-end mx-auto">
            <a-button class="me-0 me-sm-2 mb-3 mb-sm-0">
              <router-link :to="{ name: 'studen' }"> Hủy </router-link>
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
  import { computed } from "vue";
  
  export default {
  
  
    setup() {
      const router = useRouter();
      const errors = ref({});
      const Class = ref([])

      const studen = reactive({
        masinhvien: "",
        hoten: "",
        malop: ""
      });
      const selectClass = computed(() => {
      return Class.value.map(item => ({
        value: item.malop, // Mã khoa
        label: item.malop // Tên khoa
      }));
    });
      const getClass = () => {
        axios
          .get("lophoc/")
          .then((response) => {
            console.log(response);
            Class.value = response.data
            console.log("hihi", response.data)
          })
          .catch((error) => {
            console.log(error);
          });
      };
  
      const CreateStuden = () => {
        console.log(studen)
        axios
          .post("sinhvien/create", studen)
          .then((response) => {
            if (response) {
              message.success("Tạo thành công chuyên ngành mới");
              router.push({ name: "studen" });
            }
          })
          .catch((error) => {
            errors.value = error.response.data.errors;
          });
      };
      onMounted(() => {
        getClass();
      })
      
      return {
        ...toRefs(studen),
        CreateStuden,
        errors,
        selectClass,
        Class
      };
    },
  };
  </script>
    
    <style>
  .select_danger {
    border: 1px solid red;
  }
  </style>