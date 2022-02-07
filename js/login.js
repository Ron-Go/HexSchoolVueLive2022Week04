import { createApp } from "https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.26/vue.esm-browser.min.js";

const app = createApp({
    data(){
        return{
            api: {
                url: 'https://vue3-course-api.hexschool.io/v2',
                path: 'vue2022ron',
            },
            signinData: {
                username: "",
                password: "",
            },

            loginStatus: false,
        }
    },
    created(){
        
    },
    methods:{
        loggin(){
            this.changeStatus('loginStatus');
            axios.post(`${this.api.url}/admin/signin` , this.signinData)
            .then((res) => {
                const { token, expired } = res.data;
                // 把token、expired存入cookie
                document.cookie = `myToken = ${token}; expires = ${ new Date(expired) };`;
                this.changeStatus('loginStatus');
                alert('登入成功');
                // 跳頁到products.html
                window.location = 'products.html';
            })
            .catch((err) => {
                this.changeStatus('loginStatus');
                alert('登入失敗 , 請檢查帳號、密碼');
            })
        },
        changeStatus(key){
            this[key] = !this[key];
        },
    }
});

app.mount("#app");