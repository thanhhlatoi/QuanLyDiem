<template>
  <div class="container-fuild mt-3">
    <div class="row">
      <div class="col-sm-2 d-none d-sm-flex">
        <a-list bordered style="width: 100%">
          <TheMenu />
          <template #header>
            <div>Menu</div>
          </template>
        </a-list>
      </div>
      <div class="col-12 col-sm-10">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
import TheMenu from "@/components/TheMenu.vue";
import axios from "@/config/axios.js";


export default {
  components: { Headers, TheMenu },

  data() {
    return {
      homeData: null,
    };
  },
  // mounted() {
  //   this.gethomeData();
  // },
  methods: {
    // async gethomeData() {
    //   try {
    //     await csrf.getCookie();
    //     const token = localStorage.getItem("token");
    //     const response = await axios.get("/home", {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     });
    //     console.log(response);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },
  },
  // setup() {
  //   let token = ''
  //   const getToken = async () =>{

  //   }
  //   getToken()
  //   console.log(token);
  // }
};
</script>