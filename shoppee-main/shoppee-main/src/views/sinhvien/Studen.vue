<template>
  <a-card title="Danh sách sinh viên">
    <template #extra>
      <a-input-search
        v-model:value="searchTerm"
        placeholder="input search"
        enter-button="tìm kiếm"
        @keyup="search"
        style="width: 300px; margin-left: 10px"
      />

      <a-button type="primary" style="margin-left: 10px">
        <router-link :to="{ name: 'createstuden' }"> Tạo mới </router-link>
      </a-button>
    </template>
    <a-table
      :columns="columns"
      :dataSource="formattedStuden"
      :pagination="false"
      style="height: 600px; width: auto; overflow: auto"
      :scroll="{ x: 576 }"
    >
      <template #bodyCell="{ column, index, record }">
        <template v-if="column.key === 'index'">
          <a>{{ index + 1 }}</a>
        </template>
        <template v-if="column.key === 'action'">
          <router-link
            :to="{
              name: 'editstuden',
              params: { masinhvien: record.masinhvien },
            }"
          >
            <a-button type="primary" class="me-sm-2 mb-2">
              <EditOutlined />
            </a-button>
          </router-link>
          <a-button type="primary" danger @click="deleteCN(record.masinhvien)">
            <DeleteOutlined />
          </a-button>
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
import axios from "@/config/axios";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons-vue";
import { Modal, message } from "ant-design-vue"; // Nhập Modal và message từ ant-design-vue
import { createVNode } from "vue";
import { ExclamationCircleOutlined } from "@ant-design/icons-vue"; // Nhập ExclamationCircleOutlined

export default defineComponent({
  components: { EditOutlined, DeleteOutlined },
  setup() {
    const studen = ref([]);
    const searchTerm = ref("");
    const classS = ref([]);

    const columns = [
      {
        title: "#",
        key: "index",
        width: "4px",
        customRender: (index) => index + 1,
      },

      {
        title: "Mã sinh viên",
        dataIndex: "masinhvien",
        width: "auto",
      },
      {
        title: "Họ tên",
        dataIndex: "hoten",
        width: "auto",
      },
      {
        title: "Lớp",
        dataIndex: "malop",
        width: "auto",
      },
      {
        title: "Công cụ",
        dataIndex: "action",
        key: "action",
        width: "auto",
      },
    ];

    const formattedStuden = computed(() => {
      return studen.value.map((item) => ({
        malop: item.lopHoc?.malop,
        hoten: item.hoten,
        masinhvien: item.masinhvien,
        created_at: item.created_at, // Thêm created_at vào đối tượng
      }));
    });

    const getStuden = () => {
      axios
        .get("sinhvien/")
        .then((response) => {
          studen.value = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const deleteCN = (masinhvien) => {
      Modal.confirm({
        title: "Bạn có muốn xóa tài khoản này không?",
        icon: createVNode(ExclamationCircleOutlined),
        onOk() {
          axios
            .delete(`sinhvien/delete/${masinhvien}`) // Đảm bảo đường dẫn đúng
            .then((response) => {
              if (response.status === 200) {
                getStuden(); // Gọi lại hàm để cập nhật danh sách
                message.success("Xóa tài khoản thành công");
              }
            })
            .catch((error) => {
              console.log(error);
              message.error("Xóa tài khoản thất bại"); // Thêm thông báo lỗi nếu cần
            });
        },
        cancelText: "Hủy",
        onCancel() {
          Modal.destroyAll();
        },
      });
    };
    const search = async () => {
      console.log("Search term:", searchTerm.value);
      if (!searchTerm.value) {
        await getStuden();
        return;
      }
      try {
        const response = await axios.get(
          `http://localhost:8081/api/sinhvien/timkiem`,
          {
            params: { hoten: searchTerm.value },
          }
        );
        studen.value = response.data;
        console.log("Kết quả tìm kiếm:", response.data);
      } catch (error) {
        console.error("Lỗi khi tìm kiếm chuyên ngành:", error);
      }
    };

    getStuden();

    return {
      columns,
      searchTerm,
      formattedStuden,
      deleteCN,
      studen,
      search,

      classS,
    };
  },
});
</script>
  
  <style>
/* Thêm bất kỳ kiểu dáng nào bạn muốn */
</style>