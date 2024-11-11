<template>
  <a-card title="Quản lý tín chỉ">
    <template #extra>
      <a-input-search
        v-model:value="searchTerm"
        placeholder="input search"
        enter-button="tìm kiếm"
        @keyup="search"
        style="width: 300px; margin-left: 10px"
      />
      <a-button type="primary" style=" margin-left: 10px">
        <router-link :to="{ name: 'createTinchi' }"> Tạo mới </router-link>
      </a-button>
    </template>
    <a-table
      :columns="columns"
      :dataSource="formattedTinchi"
      :pagination="false"
      style="height: 600px; width: auto; overflow: auto"
      :scroll="{ x: 576 }"
    >
      <template #bodyCell="{ column, index, record }">
        <template v-if="column.key === 'index'">
          <a>{{ index + 1 }}</a>
        </template>
        <template v-if="column.key === 'action'">
          <a-button
            style="background-color: blue; color: aliceblue"
            @click="showModal(record.matinchi)">Chi tiết</a-button
          >
          <a-button type="primary" danger @click="deleteCN(record.matinchi)">
            <DeleteOutlined />
          </a-button>
        </template>
        <template v-if="column.dataIndex === 'created_at'">
          {{ formatDate(record.created_at) }}
        </template>
      </template>
    </a-table>

    <a-modal
      v-model:open="open"
      title="Chi tiết tín chỉ"
      :ok-button-props="{ style: { display: 'none' } }"
    >
      <p><strong>Mã tín chỉ:</strong> {{ detail.matinchi }}</p>
      <p><strong>Kỳ học:</strong> {{ detail.kyhoc }}</p>
      <p><strong>Mã lớp:</strong> {{ detail.lopHoc.malop }}</p>
      <p><strong>Sĩ số:</strong> {{ detail.lopHoc.siso }}</p>
      <p><strong>Mã ngành:</strong> {{ detail.lopHoc.chuyenNganh.manganh }}</p>
      <p><strong>Tên ngành:</strong> {{ detail.lopHoc.chuyenNganh.tennganh }}</p>
    </a-modal>
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
    const tinchi = ref([]);
    const searchTerm = ref("");
    const open = ref(false);
    const detail = ref({});

    const showModal = async (matinchi) => {
      try {
        const response = await axios.get(`tinchi/${matinchi}`);
        detail.value = response.data; // Assign the fetched data to detail
        open.value = true; // Open the modal
      } catch (error) {
        console.error("Error fetching detail:", error);
        message.error("Không thể lấy thông tin chi tiết");
      }
    };

    const columns = [
      {
        title: "#",
        key: "index",
        width: "4px",
        customRender: (index) => index + 1,
      },
      {
        title: "Mã tín chỉ",
        dataIndex: "matinchi",
        width: "auto",
      },
      {
        title: "Kỳ học",
        dataIndex: "kyhoc",
        width: "auto",
      },
      {
        title: "Mã lớp",
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

    const formattedTinchi = computed(() => {
      return tinchi.value.map((item) => ({
        matinchi: item.matinchi,
        kyhoc: item.kyhoc,
        malop: item.lopHoc?.malop,
      }));
    });

    const getTinchi = () => {
      axios
        .get("tinchi/")
        .then((response) => {
          tinchi.value = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const deleteCN = (matinchi) => {
      Modal.confirm({
        title: "Bạn có muốn xóa tài khoản này không?",
        icon: createVNode(ExclamationCircleOutlined),
        onOk() {
          axios
            .delete(`tinchi/delete/${matinchi}`)
            .then((response) => {
              if (response.status === 200) {
                getTinchi();
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
      if (!searchTerm.value) {
        await getTinchi();
        return;
      }
      try {
        const response = await axios.get(`tinchi/timkiem`, {
          params: { matinchi: searchTerm.value },
        });
        tinchi.value = response.data;
      } catch (error) {
        console.error("Error searching:", error);
      }
    };

    getTinchi();

    return {
      columns,
      searchTerm,
      deleteCN,
      tinchi,
      search,
      formattedTinchi,
      open,
      showModal,
      detail
    };
  },
});
</script>

<style>
/* Add any styles you want */
</style>