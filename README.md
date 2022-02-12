# HexSchoolVueLive2022Week04
About 六角學院Vue直播班2022第四週 - 元件化

### 產品管理登入


### 產品後台管理
* 根元件
  - 商品清單渲染
    - methods
      1. `checkLogin 檢查是否登入`
      2. `getData 取得商品資料`
          - 代入頁數，取得對應資料 
      4. `logOut 登出`
      5. `addProduct 新增產品`
      6. `modifyProduct 編輯產品`
      7. `deleteProduct 刪除產品`
      8. `sendDataToApi 新增編輯刪除 to API`
      9. `cancelDataToApi 取消 to API`
      10. `returnMessage 訊息提示視窗`
      

* 子元件（區域註冊）
  - 分頁元件（pagination）
    1. 產品清單分頁控制
        - props `pagination`
        - template `分頁pagination`
  
  - manageModal元件 (productModal)
    1. 新增產品
        - template `互動視窗`
    3. 編輯產品
        - template `互動視窗`
    5. 刪除產品
        - template `互動視窗`
    7. 上傳圖片頁面
        - template `互動視窗`
        - methods
            1. `checkFileType檢查檔案格式`
            2. `uploa上傳檔案`
  
  - messageModal元件（statusModal）
    1. 訊息提示頁面（新增、編輯、刪除完成） 
