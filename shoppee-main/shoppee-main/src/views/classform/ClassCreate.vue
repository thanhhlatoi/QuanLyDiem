<template>
    <form @submit.prevent="createClass()">
      <a-card title="Tạo lớp học mới">
        <div class="row">
          <div class="row mb-2">
            <div class="col-12 col-sm-3 text-start text-sm-end">
              <label for="">
                <span> Mã lớp<span class="text-danger me-1">*</span>: </span>
              </label>
            </div>
  
            <div class="col-12 col-sm-5">
              <a-input v-model:value="malop" placeholder="Mã lớp" />
              <div class="w-100"></div>
            </div>
          </div>
  
          <div class="row mb-2">
            <div class="col-12 col-sm-3 text-start text-sm-end">
              <label for="">
                <span >
                  Kỳ học<span class="text-danger me-1">*</span>:
                </span>
              </label>
            </div>
            <div class="col-12 col-sm-5">
              <a-input v-model:value="kyhoc" placeholder="Kỳ học" />
              <div class="w-100"></div>
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
                
                placeholder="lv"
                style="width: 100%"
                :options="selectOptions"
                v-model:value="manganh"
              ></a-select>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12 d-grid d-sm-flex justify-content-sm-end mx-auto">
            <a-button class="me-0 me-sm-2 mb-3 mb-sm-0">
              <router-link :to="{ name: 'ClassIndex' }"> Hủy </router-link>
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
  import { onMounted, ref, reactive, toRefs,computed } from "vue";
  import { useRouter } from "vue-router";
  import { message } from "ant-design-vue";
  import axios from "@/config/axios";
  
  export default {
  
  
    setup() {
      const router = useRouter();
      const errors = ref({});
      const nganh = ref([]);
      
      const classForm = reactive({
        malop: "",
        kyhoc: "",
        manganh: ""
      });
      const selectOptions = computed(() => {
      return nganh.value.map(item => ({
        value: item.manganh, // Mã khoa
        label: item.manganh // Tên khoa
      }));
    });
      const getSpecialized = () =>{
        axios.get("chuyennganh")
        .then((response) =>{
            console.log(response.data)
            nganh.value = response.data
        })
      }
      const createClass = () => {
        console.log(classForm)
        axios
          .post("lophoc/create", classForm)
          .then((response) => {
            console.log(response);
            if (response) {
              message.success("Tạo thành công chuyên ngành mới");
              router.push({ name: "ClassIndex" });
            }
          })
          .catch((error) => {
            errors.value = error.response.data.errors;
          });
      };
      getSpecialized();
      return {
        ...toRefs(classForm),
        createClass,
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