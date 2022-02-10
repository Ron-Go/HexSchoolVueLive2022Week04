
export default{
    data() {
        return {
            uploadFile: {},
            uploadStatus: false
        }
    },
    props: [ 'api' , 'manageMode' , 'manageProduct' ],
    created() {
        if(this.manageMode == 0){
            this.uploadFile = {};
            this.uploadStatus = false;
        }
    },
    methods: {
        // 檢查上傳檔案格式
        checkFileType(e) {
            // png檔案格式 => "image/png"
            if(e.target.files[0].type === 'image/png'){
                this.uploadFile = e.target.files[0];
                this.uploadStatus = !this.uploadStatus;
            }else{
                this.uploadStatus = false;
                alert('上傳檔案格式錯誤');
            }
        },
        // 上傳檔案
        upload() {
            axios.post(`${this.api.url}/api/${this.api.path}/admin/upload` , this.uploadFile)
            .then((res) => {
                console.log(res);
                alert('上傳圖片成功');
                alert('上傳圖片網址：' , res.imageUrl);
            })
            .catch((err) => {
                console.log(err);
                alert("上傳圖片失敗");
            })
        }
    },
    template: '#modal-template'
}


