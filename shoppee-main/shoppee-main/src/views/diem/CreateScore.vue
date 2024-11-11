<template>
  <form @submit.prevent="CreateStuden">
    <a-card title="Tạo chuyên ngành mới">
      <div class="row">
        <div class="row mb-2">
          <div class="col-12 col-sm-3 text-start text-sm-end">
            <label>
              <span>Điểm CC:<span class="text-danger me-1">*</span></span>
            </label>
          </div>
          <div class="col-12 col-sm-5">
            <a-input v-model:value="diemcc" placeholder="Điểm CC" />
          </div>
        </div>

        <div class="row mb-2">
          <div class="col-12 col-sm-3 text-start text-sm-end">
            <label>
              <span>Điểm CK:<span class="text-danger me-1">*</span></span>
            </label>
          </div>
          <div class="col-12 col-sm-5">
            <a-input v-model:value="diemck" placeholder="Điểm CK" />
          </div>
        </div>

        <div class="row mb-2">
          <div class="col-12 col-sm-3 text-start text-sm-end">
            <label>
              <span>Điểm GK:<span class="text-danger me-1">*</span></span>
            </label>
          </div>
          <div class="col-12 col-sm-5">
            <a-input v-model:value="diemgk" placeholder="Điểm GK" />
          </div>
        </div>

        <div class="row mb-2">
          <div class="col-12 col-sm-3 text-start text-sm-end">
            <label>
              <span>Điểm TH:<span class="text-danger me-1">*</span></span>
            </label>
          </div>
          <div class="col-12 col-sm-5">
            <a-input v-model:value="diemth" placeholder="Điểm TH" />
          </div>
        </div>

        <div class="row mb-2">
          <div class="col-12 col-sm-3 text-start text-sm-end">
            <label>
              <span>Mã môn học:</span>
            </label>
          </div>
          <div class="col-12 col-sm-5">
            <a-select
              placeholder="Chọn môn học"
              style="width: 100%"
              :options="selectMonhoc"
              v-model:value="mamonhoc"
            />
          </div>
        </div>

        <div class="row mb-2">
          <div class="col-12 col-sm-3 text-start text-sm-end">
            <label>
              <span>Mã sinh viên:<span class="text-danger me-1">*</span></span>
            </label>
          </div>
          <div class="col-12 col-sm-5">
            <a-select
              placeholder="Chọn sinh viên"
              style="width: 100%"
              :options="selectStuden"
              v-model:value="masinhvien"
            />
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-12 d-grid d-sm-flex justify-content-sm-end mx-auto">
          <a-button class="me-0 me-sm-2 mb-3 mb-sm-0">
            <router-link :to="{ name: 'score' }"> Hủy </router-link>
          </a-button>
          <a-button type="primary" html-type="submit">
            <span>Xác Nhận</span>
          </a-button>
        </div>
      </div>
    </a-card>
  </form>
</template>

<script>
import { onMounted, ref, reactive, toRefs, computed } from "vue";
import { useRouter } from "vue-router";
import { message } from "ant-design-vue";
import axios from "@/config/axios";

export default {
  setup() {
    const router = useRouter();
    const errors = ref({});
    const Class = ref([]);
    const SV = ref([]);

    const diem = reactive({
      diemcc: "",
      diemck: "",
      diemgk: "",
      diemth: "",
      masinhvien: "",
      mamonhoc: ""
    });

    const selectMonhoc = computed(() => {
      return Class.value.map(item => ({
        value: item.mamon,
        label: item.tenmon // Adjust according to your API response
      }));
    });

    const selectStuden = computed(() => {
      return SV.value.map(item => ({
        value: item.masinhvien, // Ensure this is the correct property
        label: item.hoten
      }));
    });

    const getClass = () => {
      axios
        .get("sinhvien/")
        .then((response) => {
          SV.value = response.data;
          console.log(response)
        })
        .catch((error) => {
          console.error(error);
        });
    };

    const getmonhoc = () => {
      axios
        .get("monhoc/")
        .then((response) => {
          Class.value = response.data;
          console.log("ad",response) // Ensure this is the correct property
        })
        .catch((error) => {
          console.error(error);
        });
    };

    const CreateStuden = () => {
      axios
        .post("diem/create", diem)
        .then((response) => {
          if (response) {
            message.success("Tạo thành công chuyên ngành mới");
            router.push({ name: "score" });
          }
        })
        .catch((error) => {
          errors.value = error.response.data.errors;
        });
    };

    onMounted(() => {
      getClass();
      getmonhoc();
    });

    return {
      ...toRefs(diem),
      CreateStuden,
      errors,
      selectMonhoc,
      selectStuden
    };
  },
};
</script>

<style>
.select_danger {
  border: 1px solid red;
}
</style>