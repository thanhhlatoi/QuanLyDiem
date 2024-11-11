<template>
  <a-card title="Danh sách môn học">
    <template #extra>
      <a-input-search
        v-model:value="searchTerm"
        placeholder="input search"
        enter-button="tìm kiếm"
        @keyup="search"
        style="width: 300px; margin-left: 10px"
      />

      <a-button type="primary" style="margin-left: 10px;">
        <router-link :to="{ name: 'CreateMon' }">Tạo mới</router-link>
      </a-button>
    </template>
    <a-table
      :columns="columns"
      :dataSource="dataSourceMonHoc"
      :pagination="false"
      style="height: 600px; width: auto; overflow: auto"
      :scroll="{ x: 576 }"
    >
      <template #bodyCell="{ column, index, record }">
        <template v-if="column.key === 'index'">
          <a>{{ index + 1 }}</a>
        </template>
        <template v-if="column.key === 'action'">
          <router-link :to="{ name: 'editmon', params: { mamon: record.mamon } }">
            <a-button type="primary" class="me-sm-2 mb-2">
              <EditOutlined />
            </a-button>
          </router-link>
          <a-button type="primary" danger @click="deleteMH(record.mamon)">
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
import { Modal, message } from "ant-design-vue";
import { createVNode } from "vue";
import { ExclamationCircleOutlined } from "@ant-design/icons-vue";

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
        title: "Mã môn học",
        dataIndex: "mamon",
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
        title: "Khoa",
        dataIndex: "tenkhoa",
        width: "auto",
      },
      {
        title: "Công cụ",
        dataIndex: "action",
        key: "action",
        width: "auto",
      },
    ];

    const dataSourceMonHoc = computed(() => {
      return monhoc.value.map((item) => ({
        tenkhoa: item.khoa?.tenkhoa,
        temon: item.temon,
        sotinchi: item.sotinchi,
        mamon: item.mamon,
        created_at: item.created_at,
      }));
    });

    const getMonHoc = async () => {
      try {
        const response = await axios.get("monhoc/");
        monhoc.value = response.data;
        console.log("Danh sách môn học:", response.data);
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    };

    const deleteMH = (mamon) => {
      Modal.confirm({
        title: "Bạn có muốn xóa môn học này không?",
        icon: createVNode(ExclamationCircleOutlined),
        onOk() {
          axios
            .delete(`monhoc/delete/${mamon}`)
            .then((response) => {
              if (response.status === 200) {
                getMonHoc(); // Cập nhật danh sách
                message.success("Xóa môn học thành công");
              }
            })
            .catch((error) => {
              console.error("Error deleting subject:", error);
              message.error("Xóa môn học thất bại");
            });
        },
        cancelText: "Hủy",
      });
    };

    const search = async () => {
      console.log("Search term:", searchTerm.value);
      if (!searchTerm.value) {
        await getMonHoc();
        return;
      }
      try {
        const response = await axios.get(`monhoc/timkiem`, {
          params: { temon: searchTerm.value }
        });
        monhoc.value = response.data;
        console.log("Kết quả tìm kiếm:", response.data);
      } catch (error) {
        console.error("Lỗi khi tìm kiếm chuyên ngành:", error);
      }
    }

    // Fetch subjects when component mounts
    getMonHoc();

    return {
      columns,
      searchTerm,
      dataSourceMonHoc,
      monhoc,
      deleteMH,
      search,
    };
  },
});
</script>

<style>
/* Add any additional styles you want */
</style>