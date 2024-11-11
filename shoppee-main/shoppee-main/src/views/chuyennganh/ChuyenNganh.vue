<template>
  <a-card title="Danh sách chuyên ngành">
    <template #extra>
      <a-input-search
        v-model:value="searchTerm"
        placeholder="input search"
        enter-button="tìm kiếm"
        @keyup="search"
        style="width: 300px; margin-left: 10px"
      />

      <a-button type="primary" style="margin-left: 10px">
        <router-link :to="{ name: 'createchuyennganh' }"> Tạo mới </router-link>
      </a-button>
    </template>
    <a-table
      :columns="columns"
      :dataSource="formattedChuyenNganh"
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
            :to="{ name: 'updateCn', params: { manganh: record.manganh } }"
          >
            <a-button type="primary" class="me-sm-2 mb-2">
              <EditOutlined />
            </a-button>
          </router-link>
          <a-button type="primary" danger @click="deleteCN(record.manganh)">
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
    const chuyennganh = ref([]);
    const searchTerm = ref("");

    const columns = [
      {
        title: "#",
        key: "index",
        width: "4px",
        customRender: (index) => index + 1,
      },
      {
        title: "Mã Ngành",
        dataIndex: "manganh",
        width: "auto",
      },
      {
        title: "Tên Ngành",
        dataIndex: "tennganh",
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

    const formattedChuyenNganh = computed(() => {
      return chuyennganh.value.map((item) => ({
        tenkhoa: item.khoa.tenkhoa,
        manganh: item.manganh,
        tennganh: item.tennganh,
        created_at: item.created_at,
      }));
    });

    const getChuyenNganh = async () => {
      try {
        const response = await axios.get("chuyennganh");
        chuyennganh.value = response.data;
      } catch (error) {
        console.log(error);
      }
    };

    const deleteCN = (manganh) => {
      Modal.confirm({
        title: "Bạn có muốn xóa tài khoản này không?",
        icon: createVNode(ExclamationCircleOutlined),
        onOk() {
          axios
            .delete(`chuyennganh/delete/${manganh}`)
            .then((response) => {
              if (response.status === 200) {
                getChuyenNganh();
                message.success("Xóa tài khoản thành công");
              }
            })
            .catch((error) => {
              console.log(error);
              message.error("Xóa tài khoản thất bại");
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
        await getChuyenNganh();
        return;
      }
      try {
        const response = await axios.get(
          `http://localhost:8081/api/chuyennganh/timkiem`,
          {
            params: { tennganh: searchTerm.value },
          }
        );
        chuyennganh.value = response.data;
        console.log("Kết quả tìm kiếm:", response.data);
      } catch (error) {
        console.error("Lỗi khi tìm kiếm chuyên ngành:", error);
      }
    };

    // Fetch all "chuyen nganh" when the component mounts
    getChuyenNganh();

    return {
      columns,
      searchTerm,
      formattedChuyenNganh,
      deleteCN,
      search,
    };
  },
});
</script>

<style>
/* Add any additional styles you want */
</style>