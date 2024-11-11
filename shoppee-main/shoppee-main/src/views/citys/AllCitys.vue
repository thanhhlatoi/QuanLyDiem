<template>
    <a-row>
      <a-col span="8">
        <a-select
          v-model:value="selectedTinh"
          @change="(value) => { console.log('Tỉnh đã chọn:', value); fetchQuan(); }"
          placeholder="Chọn Tỉnh/Thành"
        >
          <a-select-option
            v-for="tinh in tinhList"
            :key="tinh.id"
            :value="tinh.id"
          >
            {{ tinh.full_name }}
          </a-select-option>
        </a-select>
      </a-col>
      <a-col span="8">
        <a-select
          v-model:value="selectedQuan"
          @change="fetchPhuong"
          placeholder="Chọn Quận/Huyện"
          :disabled="!selectedTinh"
        >
          <a-select-option
            v-for="quan in quanList"
            :key="quan.id"
            :value="quan.id"
          >
            {{ quan.full_name }}
          </a-select-option>
        </a-select>
      </a-col>
      <a-col span="8">
        <a-select
          v-model="selectedPhuong"
          placeholder="Chọn Phường/Xã"
          :disabled="!selectedQuan"
        >
          <a-select-option
            v-for="phuong in phuongList"
            :key="phuong.id"
            :value="phuong.id"
          >
            {{ phuong.full_name }}
          </a-select-option>
        </a-select>
      </a-col>
    </a-row>
  </template>
  
  <script>
  import axios from '@/config/axios';
  import { ref, onMounted, watch } from "vue";
  
  export default {
    setup() {
      const tinhList = ref([]);
      const quanList = ref([]);
      const phuongList = ref([]);
      const selectedTinh = ref(null);
      const selectedQuan = ref(null);
      const selectedPhuong = ref(null);
  
      const getApiCity = () => {
        axios.get("https://esgoo.net/api-tinhthanh/1/0.htm")
          .then((response) => {
            if (response.data.error === 0) {
              tinhList.value = response.data.data;
            } else {
              console.error(response.data.error_text);
            }
          })
          .catch((error) => {
            console.error(error);
          });
      };
  
      const fetchQuan = () => {
        console.log('ID Tỉnh đã chọn:', selectedTinh.value); // In ra ID tỉnh
        if (selectedTinh.value) {
          axios.get(`https://esgoo.net/api-tinhthanh/2/${selectedTinh.value}.htm`)
            .then((response) => {
              if (response.data.error === 0) {
                quanList.value = response.data.data;
                selectedQuan.value = null; // Reset selected district
                phuongList.value = []; // Clear wards
              } else {
                console.error(response.data.error_text);
              }
            })
            .catch((error) => {
              console.error(error);
            });
        }
      };
  
      const fetchPhuong = () => {
        if (selectedQuan.value) {
          axios.get(`https://esgoo.net/api-tinhthanh/3/${selectedQuan.value}.htm`)
            .then((response) => {
              if (response.data.error === 0) {
                phuongList.value = response.data.data;
                selectedPhuong.value = null; // Reset selected ward
              } else {
                console.error(response.data.error_text);
              }
            })
            .catch((error) => {
              console.error(error);
            });
        }
      };
  
      // Theo dõi sự thay đổi của selectedTinh
      watch(selectedTinh, (newValue) => {
        console.log('ID Tỉnh đã chọn:', newValue); // In ra ID tỉnh mới
        fetchQuan();
      });
  
      onMounted(() => {
        getApiCity();
      });
  
      return {
        tinhList,
        quanList,
        phuongList,
        selectedTinh,
        selectedQuan,
        selectedPhuong,
        fetchQuan,
        fetchPhuong,
      };
    }
  };
  </script>
  
  <style scoped>
  /* Thêm các kiểu tùy chỉnh tại đây nếu cần */
  </style>