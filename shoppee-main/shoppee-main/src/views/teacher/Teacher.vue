<template>
  <a-card title="Danh sách giáo viên">
    
    <template #extra>
      <a-input-search
      
      v-model:value="searchTerm"
      placeholder="input search"
      enter-button="tìm kiếm"
      @keyup="search"
      style="width: 300px; margin-left: 10px;"
    />

      
      <!-- <a-button type="primary">
        <router-link :to="{ name: 'CreateTeacher' }"> Tạo mới </router-link>
      </a-button> -->

      <a-button type="dashed" @click="syncDataTeacher()">
        Đồng bộ data
      </a-button>
    </template>
    <a-table
      :columns="columns"
      :dataSource="formattedTeacher"
      :pagination="false"
      style="height: 600px; width: auto; overflow: auto"
      :scroll="{ x: 576 }"
    >
      <template #bodyCell="{ column, index, record }">
        <template v-if="column.key === 'index'">
          <a>{{ index + 1 }}</a>
        </template>
        <template v-if="column.key === 'action'">
          <!-- <router-link :to="{ name: 'UpdateTeacher', params: { magiaovien: record.magiaovien } }">
            <a-button type="primary" class="me-sm-2 mb-2">
              <EditOutlined />
            </a-button>
          </router-link> -->
          <a-button type="primary" danger @click="deleteCN(record.magiaovien)">
            <DeleteOutlined />
          </a-button>
        </template>
        <!-- <template v-if="column.dataIndex === 'created_at'">
          {{ formatDate(record.created_at) }}
        </template> -->
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
    const Teacher = ref([]);
    const searchTerm = ref("");


    const columns = [
      {
        title: "#",
        key: "index",
        width: "4px",
        customRender: (index) => index + 1,
      },
   
      {
        title: "Mã giáo viên",
        dataIndex: "magiaovien",
        key: "magiaovien",
        width: "auto",
      },
      {
        title: "Họ tên",
        dataIndex: "tengiaovien",
        key: "magiaovien",
        width: "auto",
      },
      {
        title: "Công cụ",
        dataIndex: "action",
        key: "action",
        width: "auto",
      },
    ];
      const formattedTeacher = computed(() => {
        return Teacher.value.map((item) => ({
          magiaovien: item.magiaovien, 
          tengiaovien: item.tengiaovien,    
        }));
      })
    const getTeacher = () => {
      axios
        .get("giaovien/")
        .then((response) => {
          console.log(response.data)
          Teacher.value = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const deleteCN = (magiaovien) => {
      Modal.confirm({
        title: "Bạn có muốn xóa tài khoản này không?",
        icon: createVNode(ExclamationCircleOutlined),
        onOk() {
          axios
            .delete(`giaovien/delete/${magiaovien}`) // Đảm bảo đường dẫn đúng
            .then((response) => {
              message.success("Xóa tài khoản thành công");
              getStuden();
              // if (response.status === 200) {
              //     getStuden(); // Gọi lại hàm để cập nhật danh sách
              //   message.success("Xóa tài khoản thành công");
              // }
            })
            .catch((error) => {
              console.log(error);
              // message.error("Xóa tài khoản thất bại"); // Thêm thông báo lỗi nếu cần
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
        await getTeacher();
        return;
      }
      try {
        const response = await axios.get(`giaovien/search`, {
          params: { tengiaovien: searchTerm.value }
        });
        Teacher.value = response.data;
        console.log("Kết quả tìm kiếm:", response.data);
      } catch (error) {
        console.error("Lỗi khi tìm kiếm chuyên ngành:", error);
      }
    }

    getTeacher();

    return {
      columns,
      searchTerm,
      deleteCN,
      Teacher,
      search,
      formattedTeacher
    };
  },

  methods: {
    syncDataTeacher() {
      axios
        .get("giaovien/fetch-data")
        .then((response) => {
          this.Teacher.value = response.data;
          message.success('Đồng bộ thành công');
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
});


</script>

<style>
/* Thêm bất kỳ kiểu dáng nào bạn muốn */
</style>