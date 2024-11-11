<template>
    <a-card title="Đánh giá năng lực">
      <template #extra>
        <a-input
          v-model="searchTerm"
          placeholder="Tìm kiếm môn học..."
          style="width: 200px; margin-left: 10px;"
        />
        <a-button @click="searchMonHoc">Tìm kiếm</a-button>
        <a-button type="primary" style="margin-left: 10px;">
          <router-link :to="{ name: 'CreateMon' }">Tạo mới</router-link>
        </a-button>
      </template>
      <a-table
        :columns="columns"
        :dataSource="dataSourceDanhgia"
        :pagination="false"
        style="height: 600px; width: auto; overflow: auto"
        :scroll="{ x: 576 }"
      >
        <template #bodyCell="{ column, index, record }">
            <template v-if="column.key === 'danhgia'">
            <a v-if="record.danhgia == true" class="text-primary">
              {{ record.status }}
            </a>
            <a v-else-if="record.danhgia == false" class="text-danger">
              {{ record.status }}
            </a>
          </template>
          <template v-if="column.key === 'index'">
            <a>{{ index + 1 }}</a>
          </template>
          
          <template v-if="column.dataIndex === 'created_at'">
            {{ formatDate(record.created_at) }}
          </template>
        </template>
      </a-table>
    </a-card>
  </template>
  
  <script>
  import { defineComponent, ref, computed } from "vue";
  import axios from "@/config/axios"; // Đảm bảo đường dẫn đúng
  import { EditOutlined, DeleteOutlined } from "@ant-design/icons-vue";
  import { Modal, message } from "ant-design-vue";
  import { createVNode } from "vue";
  import { ExclamationCircleOutlined } from "@ant-design/icons-vue";
  import { Axios } from "axios";
  
  export default defineComponent({
    components: { EditOutlined, DeleteOutlined },
    setup() {
      const monhoc = ref([]);
      const searchTerm = ref("");
  
      const columns = [
        {
          title: "#",
          key: "index",
          width: "50px",
          customRender: (index) => index + 1,
        },
        {
          title: "Mã SV",
          dataIndex: "masinhvien",
          width: "auto",
        },
        {
          title: "Tên SV",
          dataIndex: "hoten",
          width: "auto",
        },
        {
          title: "Tên môn",
          dataIndex: "temon",
          width: "auto",
        },
        {
          title: "Số tín chỉ",
          dataIndex: "sotinchi",
          width: "auto",
        },

        {
          title: "điểm tổng",
          dataIndex: "diemtongket",
          width: "auto",
        },
        {
          title: "Đánh giá loại",
          dataIndex: "diemchu",
          width: "auto",
        },
        {
          title: "Phân loại",
          dataIndex: "danhgia",
          customRender: (text) => (text ? 'Đạt' : 'Trượt'),
          width: "auto",
        },
  
     
      ];
  
      const dataSourceDanhgia = computed(() => {
        return monhoc.value.map((item) => ({
          diemtongket: item.diemtongket,
          danhgia: item.danhgia,
          diemchu: item.diemchu,
          masinhvien: item.diem.sinhVien?.masinhvien,
          hoten: item.diem.sinhVien?.hoten,
          temon: item.diem.monHoc?.temon,
          // sotinchi: item.diem?monHoc?.sotinchi
        
          sotinchi: item.diem.monHoc?.sotinchi,
        }));
      });
  
      const getMonHoc = async () => {
        try {
          const response = await axios.get("danhgia/all");
          monhoc.value = response.data;
          console.log("Danh sách môn học:", response);
        } catch (error) {
          console.error("Error fetching subjects:", error);
        }
      };
  
     
  
      const searchMonHoc = async () => {
        try {
          const response = await axios.get(`monhoc/timkiem`, {
            params: { tenmon: searchTerm.value } // Sử dụng giá trị từ `searchTerm`
          });
          monhoc.value = response.data; // Cập nhật danh sách môn học với kết quả tìm kiếm
          console.log("Kết quả tìm kiếm:", response.data);
        } catch (error) {
          console.error("Lỗi khi tìm kiếm môn học:", error);
        }
      };
  
      // Gọi hàm để lấy danh sách môn học khi component được mount
      getMonHoc();
  
      return {
        columns,
        searchTerm,
        dataSourceDanhgia,
        monhoc,
        searchMonHoc,
      };
    },
  });
  </script>
  
  <style>
  /* Thêm bất kỳ kiểu dáng nào bạn muốn */
  </style>