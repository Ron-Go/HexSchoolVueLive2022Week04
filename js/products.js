import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.26/vue.esm-browser.min.js';
// 預設匯入『分頁』元件
import pagination from './pagination.js';
// 預設匯入『productModal』元件
import productModal from "./productModal.js";


let myModal = {};

const app = createApp({
    data() {
        return {
            api: {
                url: "https://vue3-course-api.hexschool.io/v2",
                path: "vue2022ron",
            },
            tempProducts: {},
            manageProduct: {
                // imagesUrl: []
            },
            // 0.初始狀態、1.新增商品、2.編輯商品、3.刪除商品
            manageMode: 0,
            pagination: {}
        };
    },
    components:{
        // 區域註冊『分頁』元件
        pagination,
        // 區域註冊『productModal』元件
        productModal
    },
    mounted(){
        myModal = new bootstrap.Modal(document.querySelector('#modal'));
        this.checkLogin();
    },
    methods: {
        // 檢查是否登入
        checkLogin(){
            // 取得存在cookie的token資訊
            const token = document.cookie.replace(/(?:(?:^|.*;\s*)myToken\s*\=\s*([^;]*).*$)|^.*$/,"$1");
            // 把token加入axios的headers授權資料
            axios.defaults.headers.common["Authorization"] = token;
            axios.post(`${this.api.url}/api/user/check`)
            .then((res) => {
                // 檢查登入狀態，成功的話取得商品資料
                this.getData();
            })
            .catch((err) => {
                alert('登入資訊異常，請重新登入');
                window.location = 'login.html';
            })
        },
        // 取得商品資料
        // 參數為頁數，用預設值 = 1
        // 呼叫時不設定參數，就用1代入
        getData(page = 1){
            // 用query的方式，代出商品資料
            // /?page=${ 頁數 }
            axios.get(`${this.api.url}/api/${this.api.path}/admin/products/?page=${page}`)
            .then((res) => {
                // 取得api商品資料，存放tempProducts，準備渲染畫面
                this.tempProducts = res.data.products;
                // 取得分頁資訊，存放pagination
                this.pagination = res.data.pagination;
            })
            .catch((err) => {
                alert("取得資料失敗");
            })
        },
        // 登出
        logOut(){
            axios.post(`${this.api.url}/logout`)
            .then(() => {
                alert("已登出");
                window.location = "login.html";
            })
        },
        //新增產品
        addProduct(){
            myModal.show();
            this.manageMode = 1;
            this.manageProduct = {};
        },
        // 編輯商品
        // 按下編輯button
        // 1.把v-for渲染的item代入參數，賦予給manageProduct（淺層複製）
        // 2.modify = 2，進入編輯狀態
        modifyProduct(item){
            myModal.show();
            this.manageMode = 2;
            this.manageProduct = {...item};
        },
        // 刪除商品
        // 點擊刪除，商品資料帶入參數
        // modify = 3，進入刪除狀態
        deleteProduct(product){
            myModal.show();
            this.manageMode = 3;
            this.manageProduct = {...product};
            // 把商品id代入，刪除商品
            // this.sendDataToApi(product.id);
        },
        // 新增/編輯/刪除產品=>送出
        // 參數id用來刪除產品使用
        sendDataToApi(id){
            // 不同模式做不同的事
            if(this.manageMode == 1){
                // 新增商品
                axios.post(`${this.api.url}/api/${this.api.path}/admin/product` , {data: this.manageProduct})
                .then((res) => {
                    // 新增商品，再重新取得全部資料渲染
                    this.getData();
                    // 修改完再清空manageProduct
                    this.manageProduct = {};
                    // manageMode回到初始狀態
                    this.manageMode = 0
                    myModal.hide();
                    alert('新增商品完成');
                })
                .catch((err) => {
                    alert('新增商品失敗')
                })
            }else if (this.manageMode == 2) {
                // 修改商品
                axios.put(`${this.api.url}/api/${this.api.path}/admin/product/${this.manageProduct.id}` , {data: this.manageProduct})
                .then((res) => {
                    // 修改商品，再重新取得全部資料渲染
                    // 修改完商品，getData()不使用參數預設值，代入當前頁數避免跳回第一頁
                    this.getData(this.pagination.current_page);
                    // 修改完再清空manageProduct
                    this.manageProduct = {};
                    // manageMode回到初始狀態
                    this.manageMode = 0;
                    myModal.hide();
                    alert('修改商品完成');
                })
                .catch((err) => {
                    alert('修改商品失敗');
                })
            }else if (this.manageMode == 3) {
                // 刪除商品
                axios.delete(`${this.api.url}/api/${this.api.path}/admin/product/${id}`)
                .then((res) => {
                    myModal.hide();
                    //刪除商品，再重新取得全部資料渲染
                    alert('刪除資料成功');
                    // manageMode回到初始狀態
                    this.manageMode = 0;
                    // 刪除完商品，getData()不使用參數預設值，代入當前頁數避免跳回第一頁
                    this.getData(this.pagination.current_page);
                })
                .catch((err) => {
                    alert('刪除資料失敗');
                })
            }
        },
        // 新增/編輯產品=>取消
        cancelDataToApi(){
            // 清空manageProduct
            this.manageProduct = {};
            // manageMode回初始狀態
            this.manageMode = 0;
        }
    },
});

app.mount('#app');