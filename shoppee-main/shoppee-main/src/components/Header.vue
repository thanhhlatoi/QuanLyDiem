<template>
  <div class="containter-fuld">
    <div class="row" style="background-color: #ffffff; padding: 1rem">
      <div
        class="col-1 d-flex d-sm-none align-items-center justify-content-center"
      >
        <span @click="showDrawer"><MenuOutlined /></span>
      </div>
<!-- 
      <div
        class="col-10 col-sm-4 d-flex align-items-center justify-content-center justify-content-sm-start d-none d-md-block"
      >
        <img src="../assets/images.jpg" alt="Logo" height="100" width="100" />
      </div>
      <div
        class="col-10 col-sm-4 d-flex align-items-center justify-content-center justify-content-sm-center"
      >
        <img src="../assets/images.jpg" alt="Logo" height="100" width="100" @click="goToHome" />
      </div> -->
      <div
        class="col-sm-4 d-none d-sm-flex align-items-center justify-content-sm-end"
        @click="showUser"
      >
   
      </div>
      <div
        class="col-1 d-flex d-sm-none align-items-center justify-content-right"
      >
        <span @click="showUser"><UserOutlined /></span>
      </div>
    </div>
  </div>

  <a-drawer v-model:open="open" title="DANH MUC" placement="left">
    <TheMenu />
  </a-drawer>

  <a-drawer v-model:open="user" title="Tài khoản" placement="right">
    <p @click="showModal"><a>Thông tin tài khoản</a></p>
    <p @click="showProject"><a>Đổi mật khẩu</a></p>
    <p> <a href="login">Đăng xuất</a></p>
  </a-drawer>
  <a-modal v-model:visible="project" title="Đổi mật khẩu" :width="400">
    <a-card>
    <a-form :model="user" :label-col="{ span: 6 }" :wrapper-col="{ span: 14 }">
    <a-form-item label="Password">
      <a-input v-model="user.password" />
    </a-form-item>
    <a-form-item label="New Password">
      <a-input v-model="user.email" />
    </a-form-item>
    <a-form-item label="Enter Password">
      <a-input v-model="user.address" />
    </a-form-item>
  </a-form>
</a-card>
    </a-modal>
  <a-modal v-model:visible="visible" title="Thông tin tài khoản" :ok-button-props="{ style: { display: 'none' } }" :width="800">
    <AccountInformation/>
    </a-modal>
</template>

<script>
import { ref } from "vue";
import TheMenu from "./TheMenu.vue";
import { UserOutlined, MenuOutlined } from "@ant-design/icons-vue";



export default {
  components: { TheMenu, UserOutlined, MenuOutlined},
  data() {
    return {
      visible: false,
      project: false
    }
  },
  methods: {
    showModal() {
      this.visible = true
    },
    showProject() {
      this.project = true
    },
    goToHome() {
      
      this.$router.push({ name: 'trangchu' });
    }
  },

  created() {
    this.username = localStorage.getItem("username");
  },
  setup() {
    
    const open = ref(false);
    const user = ref(false);

    const showDrawer = () => {
      open.value = true;
    };
    const showUser = () => {
      user.value = true;
    };

  

    return{
      open,
      user,
      showDrawer,
      showUser,
    }

  },
};
</script>
