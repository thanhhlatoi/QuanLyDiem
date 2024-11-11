<template>
  <a-card title="Danh sách khoa">
    <template #extra>
      <a-input-search
        v-model:value="searchTerm"
        placeholder="input search"
        enter-button="tìm kiếm"
        @keyup="search"
        style="width: 300px; margin-left: 10px"
      />
      <a-button type="primary">
        <router-link :to="{ name: 'createkhoa' }"> Tạo mới </router-link>
      </a-button>
    </template>
    <a-table
      :columns="columns"
      :dataSource="formattedKhoa"
      :pagination="false"
      style="height: 400px; width: auto; overflow: auto"
      :scroll="{ x: 576 }"
    >
      <template #bodyCell="{ column, index, record }">
        <template v-if="column.key === 'index'">
          <a>{{ index + 1 }}</a>
        </template>

        <template v-if="column.key === 'action'">
          <router-link :to="{ name: 'editkhoa', params: { makhoa: record.makhoa } }">
            <a-button type="primary" class="me-sm-2 mb-2">
              <EditOutlined />
            </a-button>
          </router-link>
          <a-button type="primary" danger @click="deleteKhoa(record.makhoa)">
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
import { defineComponent, ref, computed, onMounted } from "vue";
import axios from "@/config/axios";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons-vue";
import { Modal, message } from "ant-design-vue";
import { createVNode } from "vue";
import { ExclamationCircleOutlined } from "@ant-design/icons-vue";

export default defineComponent({
  components: { EditOutlined, DeleteOutlined },
  setup() {
    const searchTerm = ref("");
    const khoa = ref([]);

    const columns = [
      {
        title: "#",
        key: "index",
        width: "4px",
      },
      {
        title: "Mã khoa",
        dataIndex: "makhoa",
        width: "auto",
      },
      {
        title: "Tên khoa",
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

    const formattedKhoa = computed(() => {
      return khoa.value.map((item) => ({
        makhoa: item.makhoa,
        tenkhoa: item.tenkhoa,
      }));
    });

    const getKhoa = () => {
      axios
        .get("khoa")
        .then((response) => {
          khoa.value = response.data.content;
        })
        .catch((error) => {
          console.error(error);
        });
    };

    const deleteKhoa = (makhoa) => {
      Modal.confirm({
        title: "Bạn có muốn xóa khoa này không?",
        icon: createVNode(ExclamationCircleOutlined),
        onOk() {
          axios
            .delete(`khoa/delete/${makhoa}`)
            .then((response) => {
              if (response.status === 200) {
                getKhoa();
                message.success("Xóa khoa thành công");
              }
            })
            .catch((error) => {
              console.error(error);
              message.error("Xóa khoa thất bại");
            });
        },
        cancelText: "Hủy",
      });
    };

    const search = async () => {
      console.log("hahaha", searchTerm)
      if (!searchTerm.value) {
        await getKhoa();
        return;
      }
      try {
        const response = await axios.get(`khoa/timkiem`, {
          params: { tenkhoa: searchTerm.value },
        });
        khoa.value = response.data;
        console.log("Kết quả tìm kiếm:", response.data);
      } catch (error) {
        console.error("Lỗi khi tìm kiếm khoa:", error);
      }
    };

    onMounted(() => {
      getKhoa();
    });

    return {
      columns,
      khoa,
      deleteKhoa,
      formattedKhoa,
      search,
      searchTerm,
    };
  },
});
</script>

<style>
/* Add your styles here */
</style>