import Paging from "/js/utils/paging.js";

window.addEventListener("load", function () {
    const container = document.querySelector(".container");
    const category = container.querySelector(".category");
    let currentCategory = category.querySelector(".item:first-child"); // 현재 카테고리
    const searchBtn = container.querySelector(".search-filter-box .search-btn");
    const searchForm = container.querySelector(".search-form");
    const searchFormInput = searchForm.querySelector(".search-input-box .input");  // 검색어 입력창
    const filterBtn = container.querySelector(".search-filter-box .filter .filter-btn");
    const sortList = container.querySelector(".search-filter-box .filter .sort-list");
    let currentFilter = sortList.querySelector(".item:first-child");    // 현재 필터
    const pagingUl = container.querySelector(".paging");
    let currentPage;  // 현재 페이지
    const paging = new Paging();

    // 페이지 로딩되자마자 페이지 네이션을 그리기 위함
    getTotalRecord();
    
    // 페이지 네이션을 그려주는 함수
    function drawPagination(totalRecordCount, arrow) {
        if(totalRecordCount === 0){
            pagingUl.innerHTML = "";
            return;
        }
        paging.totalRecord = totalRecordCount;
        if (arrow) {
            if (arrow === "prev") paging.prev();
            else if (arrow === "next") paging.next();
        } else {
            paging.calc();
            paging.draw();
        }
        // 현재 페이지 설정
        currentPage = pagingUl.querySelector(".item.page-item.active");
    }

    // 전체 레코드 수를 가져오는 함수
    async function getTotalRecord(arrow) {
        // 현재 활성화된 카테고리 아이디
        let categoryId = currentCategory.dataset.categoryId === undefined ? "" : currentCategory.dataset.categoryId;
        // 검색어
        let query = searchFormInput.value;

        let response = await fetch(`/api/communitys/total-data?c=${categoryId}&q=${query}`);
        let totalRecordCount = await response.json();
        drawPagination(totalRecordCount, arrow);
    }

    // 게시글 목록 그려주는 함수
    function render(list) {
        const boardList = container.querySelector(".board-list");
        boardList.innerHTML = "";
        for (let l of list) {
            let template = `
                                    <li class="item">
                                      <div class="board">
                  
                                          <div class="write-info-box">
                                              <div class="profile">
                                                  <div class="img-container">
                                                      <img class="img" src="https://file.doby.co.kr/profiles/${l.profileImage}" alt="프로필사진">
                                                  </div>
                                                  <a class="nickname" href="">${l.nickname}</a>
                                              </div>
                                              <div class="reg-date">${l.timeDifference}</div>
                                          </div>
                  
                                          <div class="title-box">
                                              <a class="title" href="/community/detail?id=${l.id}">${l.title}</a>
                                          </div>
                  
                                          <div class="board-info">
                                              <div class="category-name-tag-box">
                                                  <div class="category-name">${l.categoryName}</div>
                                                  <ul class="tag-list">
                                                  </ul>
                                              </div>
                  
                                              <div class="view-like-comment-box">
                                                  <div class="views deco icon-color-3 icon-views">${l.hit}</div>
                                                  <div class="likes deco icon-color-3 icon-likes">${l.goodCount}</div>
                                                  <div class="comments deco icon-color-3 icon-comments">${l.commentCount}</div>
                                              </div>
                                          </div>
                                      </div>
                  
                                  </li>
                                 `;
            boardList.insertAdjacentHTML("beforeend", template);

            // 고정
            let pin = l.pin;
            if (pin) {
                let lastChild = boardList.querySelector(".item:last-child");
                lastChild.classList.add("pin");
            }

            // 태그 목록
            let tagList = l.tagList;
            let tagListElement = boardList.querySelector(".item:last-child .board-info .tag-list");
            for (let t of tagList) {
                let template = `<li class="tag">${t.name}</li>`;
                tagListElement.insertAdjacentHTML("beforeend", template);
            }
        }
    }

    // 게시글 목록 가져오는 함수(카테고리, 검색, 필터, 페이징)
    async function getBoardList() {
        // 현재 활성화된 카테고리 아이디
        let categoryId = currentCategory.dataset.categoryId === undefined ? "" : currentCategory.dataset.categoryId;
        // 검색어
        let query = searchFormInput.value;
        // 필터
        let filterId = currentFilter.dataset.filterId;
        // 페이징
        let page = currentPage.textContent;
        let response = await fetch(`/api/communitys?p=${page}&c=${categoryId}&q=${query}&f=${filterId}`);
        let json = await response.json();
        render(json);
    }

    // 카테고리
    category.onclick = async function (e) {
        e.preventDefault();
        let target = e.target;
        if (target.nodeName !== "A")
            return;
        currentCategory.classList.remove("active");
        target.classList.add("active");
        currentCategory = target;

        paging.init();
        await getTotalRecord();
        await getBoardList();
    }

    // 검색했을 때
    searchFormInput.onkeyup = async function (e) {
        e.preventDefault();
        if (e.key !== "Enter")
            return;

        paging.init();
        await getTotalRecord();
        await getBoardList();
    }

    // 단일 input이 있을 때 submit 막기
    searchForm.onsubmit = function (e) {
        e.preventDefault();
    }

    // 검색 버튼 누르면 검색창 토글
    searchBtn.onclick = function () {
        searchForm.classList.toggle("d:none");
    }

    // 필터 눌렀을 때
    sortList.onclick = function (e) {
        e.preventDefault();
        let target = e.target;
        if (target.nodeName !== "A") return;
        currentFilter = target;
        getBoardList();
    }

    // 필터 버튼 누르면 목록 토글
    filterBtn.onclick = function () {
        sortList.classList.toggle("d:none");
    }

    // 페이징
    pagingUl.onclick = async function (e) {
        e.preventDefault();
        let target = e.target;
        if (target.nodeName !== "A")
            return;
        if (target.classList.contains("page-item")) {
            currentPage.classList.remove("active");
            target.classList.add("active");
            currentPage = target;
        }
        else if (target.classList.contains("arrow-prev")) await getTotalRecord("prev");

        else if (target.classList.contains("arrow-next")) await getTotalRecord("next");

        await getBoardList();
    }
});
