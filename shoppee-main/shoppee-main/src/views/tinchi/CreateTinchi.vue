<template>
    <form @submit.prevent="createTinchi()">
      <a-card title="Tạo chuyên ngành mới">
        <div class="row">
          <div class="row mb-2">
            <div class="col-12 col-sm-3 text-start text-sm-end">
              <label for="">
                <span> Mã tin chỉ<span class="text-danger me-1">*</span>: </span>
              </label>
            </div>
  
            <div class="col-12 col-sm-5">
              <a-input v-model:value="matinchi" placeholder="mã tín chỉ" />
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
                <span >
                  Mã lớp<span class="text-danger me-1">*</span>:
                </span>
              </label>
            </div>
            <div class="col-12 col-sm-5">
              <a-select
                
                placeholder="Mã lớp"
                style="width: 100%"
                :options="selectTinchi"
                v-model:value="malop"
              ></a-select>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12 d-grid d-sm-flex justify-content-sm-end mx-auto">
            <a-button class="me-0 me-sm-2 mb-3 mb-sm-0">
              <router-link :to="{ name: 'Tinchi' }"> Hủy </router-link>
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
  import { computed, ref, reactive, toRefs } from "vue";
  import { useRouter } from "vue-router";
  import { message } from "ant-design-vue";
  import axios from "@/config/axios";
  
  export default {
  
  
    setup() {
      const router = useRouter();
      const Tinchi = ref([]); 
      const errors = ref({});
  
      
      const tinchi = reactive({
        matinchi: "",
        kyhoc: "",
        lophoc: ""
      });
      const selectTinchi = computed(() => {
      return Tinchi.value.map(item => ({
        value: item.malop, // Mã khoa
        label: item.malop // Tên khoa
      }));
    });
    const getTinchi = () =>{
        axios.get("lophoc/")
        .then((response)=>{
            console.log(response)
            Tinchi.value = response.data
        })
    }
      const createTinchi = () => {
        console.log(tinchi)
        axios
          .post("tinchi/create", tinchi)
          .then((response) => {
            console.log(response);
            if (response) {
              message.success("Tạo thành công chuyên ngành mới");
              router.push({ name: "Tinchi" });
            }
          })
          .catch((error) => {
            errors.value = error.response.data.errors;
          });
      };
      getTinchi();
      return {
        ...toRefs(tinchi),
        createTinchi,
        errors,
        selectTinchi
      };
    },
  };
  </script>
    
    <style>
  .select_danger {
    border: 1px solid red;
  }
  </style>