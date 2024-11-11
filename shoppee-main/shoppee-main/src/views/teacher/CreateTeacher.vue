<template>
    <form @submit.prevent="CreateTeacher()">
      <a-card title="Thêm giáo viên">
        <div class="row">
          <div class="row mb-2">
            <div class="col-12 col-sm-3 text-start text-sm-end">
              <label for="">
                <span> mã giáo viên<span class="text-danger me-1">*</span>: </span>
              </label>
            </div>
  
            <div class="col-12 col-sm-5">
              <a-input v-model:value="magiaovien" placeholder="mã giáo viên" />
              <div class="w-100"></div>
            </div>
          </div>
  
          <div class="row mb-2">
            <div class="col-12 col-sm-3 text-start text-sm-end">
              <label for="">
                <span >
                  Tên giáo viên<span class="text-danger me-1">*</span>:
                </span>
              </label>
            </div>
            <div class="col-12 col-sm-5">
              <a-input v-model:value="tengiaovien" placeholder="Tên giáo viên" />
              <div class="w-100"></div>
            </div>
          </div>
    
        </div>
        <div class="row">
          <div class="col-12 d-grid d-sm-flex justify-content-sm-end mx-auto">
            <a-button class="me-0 me-sm-2 mb-3 mb-sm-0">
              <router-link :to="{ name: 'teacher' }"> Hủy </router-link>
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
  
      
      const Teacher = reactive({
        magiaovien: "",
        tengiaovien: "",
      });
  
      const CreateTeacher = () => {
        console.log(Teacher)
        axios
          .post("giaovien/create", Teacher)
          .then((response) => {
            console.log(response);
            if (response) {
              message.success("Tạo thành công chuyên ngành mới");
              router.push({ name: "teacher" });
            }
          })
          .catch((error) => {
            errors.value = error.response.data.errors;
          });
      };
  
      return {
        ...toRefs(Teacher),
        CreateTeacher,
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