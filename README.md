# HexSchoolVueLive2022Week04
About 六角學院Vue直播班2022第四週 - 元件化

### 產品管理登入
* 根元件 
  1. 登入管理後台
      - methods
        1. `loggin 登入管理後台`
            - 輸入帳密進入後台管理
            - 把token、expired存入cookie 

### 產品後台管理
* 根元件
  1. 商品清單渲染
      - methods
        1. `checkLogin 檢查是否登入`
            - 從cookie取得tokken，加入header資料
            - post API 驗證
        3. `getData 取得商品資料`
            - 代入頁數，取得對應資料 
        4. `logOut 登出`
            - 登出管理後台
        6. `addProduct 新增產品`
        8. `modifyProduct 編輯產品`
        9. `deleteProduct 刪除產品`
        10. `sendDataToApi 新增編輯刪除toAPI`
        11. `cancelDataToApi 新增編輯刪除 取消toAPI`
        12. `returnMessage 訊息提示視窗`
            - 產品管理完成提示訊息
      

* 子元件（區域註冊）
  - 分頁元件（pagination）
    1. 產品清單分頁控制
        - props `pagination`
        - template `分頁pagination`
        - methods `$emit 根元件`
  
  - manageModal元件 (productModal)
    1. 新增產品
        - template `互動視窗`
        - methods `$emit 根元件`
    3. 編輯產品
        - template `互動視窗`
        - methods `$emit 根元件`
    5. 刪除產品
        - template `互動視窗`
        - methods `$emit 根元件`
    7. 上傳圖片頁面
        - template `互動視窗`
        - methods
            1. `checkFileType檢查檔案格式`
            2. `uploa上傳檔案`
  
  - messageModal元件（statusModal）
    1. 訊息提示頁面（新增、編輯、刪除完成） 
        - template `互動視窗`        
