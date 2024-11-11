<template>
  <a-card title="Bảng điểm">
    <template #extra>
      <!-- <a-input-search
        v-model:value="searchTerm"
        placeholder="input search"
        enter-button="tìm kiếm"
        @keyup="search"
        style="width: 300px; margin-left: 10px"
      /> -->

      <a-button type="primary">
        <router-link :to="{ name: 'CreateScore' }"> Tạo mới </router-link>
      </a-button>
    </template>
    <a-table
      :columns="columns"
      :dataSource="formattedScore"
      :pagination="false"
      style="height: 600px; width: auto; overflow: auto"
      :scroll="{ x: 576 }"
    >
      <template #bodyCell="{ column, index, record }">
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
import axios from "@/config/axios";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons-vue";

export default defineComponent({
  components: { EditOutlined, DeleteOutlined },
  setup() {
    const Score = ref([]);
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
        title: "Tên sinh viên",
        dataIndex: "hoten",
        width: "auto",
      },
      {
        title: "Mã SV",
        dataIndex: "masinhvien",
        width: "auto",
      },
      {
        title: "Tên môn học",
        dataIndex: "temon",
        width: "auto",
      },
      {
        title: "Điển cc",
        dataIndex: "diemcc",
        width: "auto",
      },
      {
        title: "Điểm ck",
        dataIndex: "diemck",
        width: "auto",
      },
      {
        title: "Điem gk",
        dataIndex: "diemgk",
        width: "auto",
      },
      {
        title: "Điem th",
        dataIndex: "diemth",
        width: "auto",
      },
    ];

    const formattedScore = computed(() => {
      return Score.value.map((item) => ({
        diemcc: item.diemcc,
        diemck: item.diemck,
        diemgk: item.diemgk,
        diemth: item.diemth,
        hoten: item.sinhVien.hoten,
        masinhvien: item.sinhVien.masinhvien,
        temon: item.monHoc.temon,
      }));
    });

    const getScore = () => {
      axios
        .get("diem/")
        .then((response) => {
          console.log("hhiiii", response);
          Score.value = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const search = async () => {
      console.log("Search term:", searchTerm.value);
      if (!searchTerm.value) {
        await getScore();
        return;
      }
      try {
        const response = await axios.get(
          `http://localhost:8081/api/diem/timkiem`,
          {
            params: { masinhvien: searchTerm.value },
          }
        );
        chuyennganh.value = response.data;
        console.log("Kết quả tìm kiếm:", response.data);
      } catch (error) {
        console.error("Lỗi khi tìm kiếm chuyên ngành:", error);
      }
    };

    getScore();

    return {
      columns,
      searchTerm,
      formattedScore,
      Score,
      search,
      classS,
    };
  },
});
</script>
  
  <style>
/* Thêm bất kỳ kiểu dáng nào bạn muốn */
</style>