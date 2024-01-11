export default class Paging {
    #pagingUl;
    #perPageRecord = 10; // 한 페이지 당 보여줄 record 수
    #currentPage = 1; // 현재 페이지
    #pageCount = 5; // 한 페이지 당 보여줄 페이지 네이션 수

    #totalRecord; // 전체 레코드 수
    #totalPage; // 전체 페이지
    #totalPageGroup; // 전체 페이지 그룹

    #currentPageGroup = Math.floor((this.#currentPage - 1) / this.#pageCount) + 1; // 현재 페이지 그룹
    #firstPageNum; // 현재 페이지 그룹의 첫번째 번호
    #lastPageNum; // 현재 페이지 그룹의 마지막 번호

    constructor() {
        this.#pagingUl = document.querySelector(".paging");
    }

    set totalRecord(totalRecord) {
        this.#totalRecord = totalRecord;
    }

    set currentPageGroup(pageGroup) {
        this.#currentPageGroup = pageGroup;
    }

    init() {
        this.#currentPageGroup = 1;
    }

    next() {
        this.#currentPageGroup++;
        this.calc();
        this.draw();
    }

    prev() {
        this.#currentPageGroup--;
        this.calc();
        this.draw();
    }

    calc() {
        this.#totalPage = this.#totalRecord % this.#perPageRecord === 0
            ? this.#totalRecord / this.#perPageRecord
            : Math.floor(this.#totalRecord / this.#perPageRecord) + 1;

        this.#totalPageGroup = this.#totalPage % this.#pageCount === 0
            ? this.#totalPage / this.#pageCount
            : Math.floor(this.#totalPage / this.#pageCount) + 1;

        this.#firstPageNum = 1 + this.#pageCount * this.#currentPageGroup - this.#pageCount;
        this.#lastPageNum = this.#firstPageNum + this.#pageCount - 1;
        // 마지막 페이지 보정
        if (this.#lastPageNum > this.#totalPage) this.#lastPageNum = this.#totalPage;
    }

    draw() {

        this.#pagingUl.innerHTML = "";

        let firstPageNum = this.#firstPageNum;
        let lastPageNum = this.#lastPageNum;

        // 현재 페이지 설정
        this.#currentPage = firstPageNum;

        for (let i = firstPageNum; i <= lastPageNum; i++) {
            if (this.#currentPage === firstPageNum) {
                this.#pagingUl.insertAdjacentHTML(
                    "beforeend",
                    `
                          <li>
                            <a class="item page-item active" href="">${firstPageNum++}</a>
                          </li>
                        `
                );
            } else {
                this.#pagingUl.insertAdjacentHTML(
                    "beforeend",
                    `
                          <li>
                            <a class="item page-item" href="">${firstPageNum++}</a>
                          </li>
                        `
                );
            }
        }

        // prev 버튼 삽입
        if (1 < this.#currentPageGroup)
            this.#pagingUl.insertAdjacentHTML(
                "afterbegin",
                `
                      <li>
                          <a class="item arrow arrow-prev" href=""></a>
                      </li>
                     `
            );

        // next 버튼 삽입
        if (this.#currentPageGroup < this.#totalPageGroup)
            this.#pagingUl.insertAdjacentHTML(
                "beforeend",
                `
                      <li>
                          <a class="item arrow arrow-next" href=""></a>
                      </li>
                     `
            );

    }
}