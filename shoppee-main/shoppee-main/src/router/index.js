import { createRouter, createWebHistory } from "vue-router";
import admin from "./admin.js";


const routes = [...admin];

const router = createRouter({
    history: createWebHistory(),
    routes
});

// router.beforeEach((to, from, next) => {
//     if (to.meta.requiresAuth && !isLoggedIn()) {
//       next('/login')
//     } else {
//       next()
//     }
//   })
  // const isAuthorized = (route) => {
  //   return route.roles.includes(userRole) && userStatus === 'Hoạt động';
  // };
  // const currentRoute = routes.find((r) => r.path === window.location.pathname);
  // if (currentRoute && isAuthorized(currentRoute)) {
  //   // Cho phép truy cập
  //   // ...
  // } else {
  //   // Chặn truy cập và hiển thị thông báo lỗi
  //   showAccessDeniedError();
  // }
  function isLoggedIn() {
    // Kiểm tra trạng thái đăng nhập của người dùng
    return /* true/false */
  }
export default router;