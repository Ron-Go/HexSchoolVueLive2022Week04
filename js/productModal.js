
export default{
    data() {
        return {
            uploadFile: { type: '' },
            uploadStatus: false,
            uploadImgUrl: ''
        }
    },
    props: [ 'api' , 'manageMode' , 'manageProduct' ],
    created() {
        console.log(this.uploadFile);
    },
    methods: {
        // 檢查上傳檔案格式
        checkFileType(e) {
            // png檔案格式 => "image/png"
            this.uploadFile = e.target.files[0];
            console.log(e.target.files[0]);
            if(this.uploadFile.type === 'image/png'){
                this.uploadStatus = !this.uploadStatus;
            }else{
                this.uploadStatus = { type: '' };
            }
        },
        // 上傳檔案
        upload() {
            const formData = new FormData();
            formData.append('file-to-upload' , this.uploadFile);
            axios.post(`${this.api.url}/api/${this.api.path}/admin/upload` , formData)
            .then((res) => {
                console.log(res);
                this.uploadImgUrl = res.data.imageUrl;
            })
            .catch((err) => {
                console.dir(err);
                alert("上傳圖片失敗");
            })
        },
    },
    template: '#modal-template'
}


