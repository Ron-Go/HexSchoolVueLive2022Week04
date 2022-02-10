export default {
    props: ["pagination"],
    template:
    // v-for用.total_pages去渲染所有頁數
    // 點擊頁數、前一頁、後一頁，透過emit觸發外層根元件『同一個』methods
    // 點擊頁數，把頁數作為參數代入外層根元件methods，取得對應頁數的商品資料
    // 點擊前一頁、後一頁，把當前頁數current_page加減後，作為參數代入外層根元件methods
    `
    <nav aria-label="Page navigation example">
    <ul class="pagination justify-content-center">
        <li class="page-item" :class="{ disabled: !pagination.has_pre }">
            <a class="page-link" href="#" @click="$emit('send-page' , pagination.current_page - 1)" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
            </a>
        </li>
        <li class="page-item" 
        :class="{ active : page === pagination.current_page }"
        v-for="(page , key) in pagination.total_pages" :key="'page' + page">
            <a class="page-link" href="#" @click="$emit('send-page' , page)">{{ page }}</a>
        </li>
        <li class="page-item" :class="{ disabled: !pagination.has_next }">
            <a class="page-link" href="#" @click="$emit('send-page' , pagination.current_page + 1)" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
            </a>
        </li>
    </ul>
</nav>
    `,
};
