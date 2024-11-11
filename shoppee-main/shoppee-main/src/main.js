import { createApp } from 'vue'
import router from './router/index.js'
import { createPinia } from 'pinia'
import axios from "@/config/axios.js";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import Antd from 'ant-design-vue'
import { createFromIconfontCN } from '@ant-design/icons-vue';
import '@fortawesome/fontawesome-free/css/all.css';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
window.axios = axios;

import {
    Space,
    Input,
    Avatar,
    Image,
    List,
    Card,
    Table,
    Menu,
    Select,
    Checkbox,
    Modal,
    Drawer,
    Button,
    message
} from 'ant-design-vue';

import App from './App.vue'


import 'ant-design-vue/dist/reset.css';
import 'bootstrap/dist/css/bootstrap-grid.min.css'
import 'bootstrap/dist/css/bootstrap-utilities.css'

const app = createApp(App)
const pinia = createPinia()
const IconFont = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_1234567_abcd1234.js', // Thay thế bằng scriptUrl của bạn
  });
library.add(faPlus)
app.use(router)



app.use(Drawer)
    .use(Button)
    .use(List)
    .use(Menu)
    .use(Card)
    .use(Table)
    .use(Space)
    .use(Select)
    .use(Avatar)
    .use(Input)
    .use(Checkbox)
    .use(pinia)
    .use(Antd)
    .use(Image)
    .use(Modal)
    .mount('#app')

app.component('IconFont', IconFont);

app.config.globalProperties.$message = message;
