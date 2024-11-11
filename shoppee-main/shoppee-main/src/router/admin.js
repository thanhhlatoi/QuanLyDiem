import { compileScript } from "vue/compiler-sfc";

const admin = [

    { path: '/', redirect: '/khoa' },

    {
        path: "/home",
        component: () => import("@/components/Home.vue"),
        name: "home",
        children: [
            {
                path: "/chuyennganh:manganh",
                name: "updateCn",
                component: () => import("@/views/chuyennganh/EditChuyenNganh.vue")
            },
            {
                path: "/createchuyennganh",
                name: "createchuyennganh",
                component: () => import("@/views/chuyennganh/CreateChuyenNganh.vue")
            },
            {
                path: "/chuyennganh",
                name: "chuyennganh",
                component: () => import("@/views/chuyennganh/ChuyenNganh.vue")
            },
            {
                path: "/khoa",
                name: "khoa",
                component: () => import("@/views/khoa/Khoa.vue")
            },
            {
                path: "/createkhoa",
                name: "createkhoa",
                component: () => import("@/views/khoa/CreateKhoa.vue")
            },
            {
                path: "/editkhoa/:makhoa",
                name: "editkhoa",
                component: () => import('@/views/khoa/EditKhoa.vue')
            },
            {
                path: "/monhoc",
                name: "monhoc",
                component: () => import("@/views/monhoc/MonHoc.vue")
            },
            {
                path: "/createmon",
                name: "CreateMon",
                component: () => import("@/views/monhoc/CreateMon.vue")
            },
            {
                path: "/editmon/:mamon",
                name: "editmon",
                component: () => import("@/views/monhoc/EditMonhoc.vue")
            },
            {
                path: "/lophoc",
                name: "ClassIndex",
                component: () => import("@/views/classform/ClassIndex.vue")
            },
            {
                path: "/classcreate",
                name: "ClassCreate",
                component: () => import("@/views/classform/ClassCreate.vue")
            },
            {
                path: "/editclass/:malop",
                name: "EditClass",
                component: () => import("@/views/classform/EditClass.vue")
            },
            {
                path: "/selectcity",
                name:"selectcity",
                component: () => import("@/views/citys/AllCitys.vue")
            },
            {
                path: "/studen",
                name:"studen",
                component: () => import("@/views/sinhvien/Studen.vue")
            },
            {
                path: "/createstuden",
                name:"createstuden",
                component: () => import("@/views/sinhvien/CreateStuden.vue")
            },
            {
                path: "/editstuden/:masinhvien",
                name:"editstuden",
                component: () => import("@/views/sinhvien/EditStuden.vue")
            },
            {
                path: "/score",
                name:"score",
                component: () => import("@/views/diem/ScoreIndex.vue")
            },
            {
                path: "/creatscore",
                name:"CreateScore",
                component: () => import("@/views/diem/CreateScore.vue")
            },
            {
                path:"/giaovien",
                name: "teacher",
                component: () =>import("@/views/teacher/Teacher.vue")
            },
            {
                path:"/createteacher",
                name: "CreateTeacher",
                component: () =>import("@/views/teacher/CreateTeacher.vue")
            },
            {
                path:"/giaovien/:magiaovien",
                name: "UpdateTeacher",
                component: () =>import("@/views/teacher/UpdateTeacher.vue")
            },
            {
                path:"/tinchi",
                name: "Tinchi",
                component: () =>import("@/views/tinchi/tinchi.vue")
            },
            {
                path:"/createTinchi",
                name: "createTinchi",
                component: () =>import("@/views/tinchi/CreateTinchi.vue")
            },
            {
                path:"/danhgia",
                name: "Evaluate",
                component: () =>import("@/views/evaluate/Evaluate.vue")
            },
     
        ]
    },

];

export default admin;