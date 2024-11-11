<template>
  <a-card title="Danh sách lớp">
    <template #extra>
      <a-button type="primary">
        <router-link :to="{ name: 'ClassCreate' }"> Tạo mới </router-link>
      </a-button>
    </template>

    <a-table
      :columns="columns"
      :dataSource="ClassFrom"
      :pagination="false"
      style="height: 400px; width: auto; overflow: auto"
      :scroll="{ x: 576 }"
    >
      <template #bodyCell="{ column, index, record }">
        <template v-if="column.key === 'index'">
          <a>{{ index + 1 }}</a>
        </template>

        <template v-if="column.key === 'manganh'">
          <a>{{ record.chuyenNganh.manganh }}</a>
        </template>

        <template v-if="column.key === 'action'">
          <router-link :to="{ name: 'EditClass', params: { malop: record.malop } }">
            <a-button type="primary" class="me-sm-2 mb-2">
              <EditOutlined />
            </a-button>
          </router-link>
          <a-button type="primary" danger @click="deleteClass(record.malop)">
            <DeleteOutlined />
          </a-button>
        </template>
      </template>
    </a-table>
  </a-card>
</template>

<script>
import { defineComponent, ref } from "vue";
import axios from "@/config/axios";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons-vue";
import { Modal, message } from "ant-design-vue";

export default defineComponent({
  components: { EditOutlined, DeleteOutlined },
  setup() {
    const ClassFrom = ref([]);

    const columns = [
      {
        title: "#",
        key: "index",
        width: "4px",
      },
      {
        title: "Mã lớp",
        dataIndex: "malop",
        width: "auto",
      },

      {
        title: "Sinh viên",
        dataIndex: "siso",
        width: "auto",
      },
      {
        title: "Tên ngành",
        dataIndex: "tennganh",
        key: "tennganh",
        width: "auto",
      },
      {
        title: "Công cụ",
        dataIndex: "action",
        key: "action",
        width: "auto",
      },
    ];

    const getClass = async () => {
      try {
        const response = await axios.get("lophoc/");
        ClassFrom.value = response.data.map(item => ({
          ...item,
          tennganh: item.chuyenNganh.tennganh // Lưu manganh trực tiếp vào đối tượng
        }));
      } catch (error) {
        console.error(error);
      }
    };

    const deleteClass = (malop) => {
      Modal.confirm({
        title: "Bạn có muốn xóa tài khoản này không?",
        onOk() {
          return axios
            .delete(`lophoc/delete/${malop}`)
            .then((response) => {
              if (response.status === 200) {
                getClass(); // Refresh the class list
                message.success("Xóa tài khoản thành công");
              }
            })
            .catch((error) => {
              console.error(error);
              message.error("Xóa tài khoản thất bại");
            });
        },
        cancelText: "Hủy",
      });
    };

    getClass();

    return {
      columns,
      ClassFrom,
      deleteClass,
    };
  },
});
</script>

<style>
/* Add your styles here */
</style>