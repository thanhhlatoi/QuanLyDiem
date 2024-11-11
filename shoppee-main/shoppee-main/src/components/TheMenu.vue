<template>
  <div style="width: 256px">
    <a-menu mode="inline" :items="items" @click="handleClick"></a-menu>
    <div class="row mb-2">
      <div class="col-12 col-sm-2 text-start text-sm-end"></div>

    </div>

  </div>
</template>
<script setup>
import { reactive, watch, h } from "vue";
import { useRouter } from "vue-router";


const router = useRouter();

const items = reactive([
  {
    key: "Khoa",
    label: "Khoa",
    title: "Khoa",
  },

  {
    key: "chuyennganh",
    label: "Chuyên ngành",
    title: "Chuyên ngành",
  },
  {
    key:"monhoc",
    label: "Môn học",
    title: "Môn học",
    
  },
  {
    key: "lophoc",
    label: "Lớp học",
    title: "Lớp học",
  },
  {
    key: "studen",
    label: "Danh sách sinh viên",
    title: "Danh sách sinh viên",
  },
  {
    key: "score",
    label: "Bảng điểm",
    title: "Bảng điểm",
  },
  {
    key: "giaovien",
    label: "Danh sách giáo viên",
    title: "Danh sách giáo viên",
  },
  {
    key: "tinchi",
    label: "Quản lý tín chỉ",
    title: "Quản lý tín chỉ",
  },
  {
    key: "danhgia",
    label: "Đánh giá năng lực",
    title: "Đánh giá năng lực",
  },
]);
const handleClick = (menuInfo) => {
  console.log("click ", menuInfo);
  router.push(menuInfo.key);
};
</script>
<style>
.a-qrcode {
  align-items: center;
}
</style>