window.addEventListener("load", function () {
    let section = document.querySelector(".blind");
    let btnSearch = section.querySelector(".search-filter-box");
    let searchForm = section.querySelector(".search-form");
    let inputQuery = searchForm.querySelector(".input")

    //페이징을 위함
    let paging = section.querySelector(".paging");
    let btnPaging = paging.querySelectorAll(".item.num"); //페이지를 나타내는 숫자버튼

    let currentPg = btnPaging[0]; //1페이지가 디폴트

    let totalCount;
    let last = 5;
    let first = 1;
    let next = last + 1;
    let prev = first - 1;

    let jsPagination = section.querySelector("#js-pagination")


    // =======================================페이지 그리기 위함==============================================

    let renderPagination = function (currentPage) {
        while (jsPagination.firstChild) {
            jsPagination.removeChild(jsPagination.firstChild); // container 안의 모든 자식 요소를 제거
        }

        // 현재 게시물의 전체 개수가 10개 이하면 pagination을 숨깁니다.
        if (totalCount <= 10) return;

        let totalPage = Math.ceil(totalCount / 10); //총 페이지 수 = 글수/10
        let pageGroup = Math.ceil(currentPage / 5); //현재 선택된 페이지묶음 index = 현재페이지/5 번째

        last = pageGroup * 5; //현재 선택된 페이지묶음 중에서 마지막 페이지
        if (last > totalPage) last = totalPage; //현재 선택된 페이지 묶음중에서 마지막 페이지가 총 페이지보다 크면, 현재 보이는 마지막페이지가 총 페이지임
        first = last - (5 - 1) <= 0 ? 1 : last - (5 - 1); //현재 선택된 페이지묶음 중 첫 페이지. 첫번째 페이지묶음이 아닐경우 last로 계산한다
        if (last === totalPage) first = last - (totalPage % 5 - 1) //만약 지금이 마지막페이지묶음이라면 지금묶음에서 첫페이지는 따로 구해줘야한다.
        next = last + 1;
        prev = first - 1;
// ====================
        const fragmentPage = document.createDocumentFragment();  //프래그먼트페이지를 만든다.
        if (prev > 0) { //이전페이지가 0보다 클때, 즉 이전묶음으로 갈데가 있을때
            let preli = document.createElement('li'); //preli라는 li를 만든다
            preli.insertAdjacentHTML("beforeend", `<a href='#js-bottom' class="item arrow arrow-prev" id='prev'></a>`); //여기엔 이전 페이지묶음으로 가는 페이지를 꽂는다.
            fragmentPage.appendChild(preli); //자식으로 넣기

        }

        for (let i = first; i <= last; i++) {  //현재 페이지묶음 중 첫페이지부터 마지막페이지까지 반복
            let li = document.createElement("li"); //문서에 li를 추가해서
            let isActive = (i === parseInt(currentPage) ? "active" : "")
            li.insertAdjacentHTML("beforeend", `<a href='#js-bottom' id='page-${i}' class="item num ${isActive} " data-num='${i}'>${i}</a>`); //끝에서 바로 앞부분에 i를 꽂아준다. href는 지우는게 나을지도?
            fragmentPage.appendChild(li); //자식으로 넣기
        }
        if (last < totalPage) { //끝 페이지가 총 페이지보다 작을때, 즉 다음묶음으로 갈데가 있을때
            let endli = document.createElement('li');
            endli.insertAdjacentHTML("beforeend", `<a  href='#js-bottom' class="item arrow arrow-next"  id='next'></a>`); //다음 페이지묶음으로 가는 li
            fragmentPage.appendChild(endli); //자식으로 넣기
        }
        jsPagination.appendChild(fragmentPage);//  새로운 요소를 추가
    }

// =================mvc에서부터 페이지 그리기 위함==========
    async function fetchDataAndProcess() {
        try {
            const response = await fetch('/api/with-blind-cancels/count?q=');
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.status}`);
            }

            const data = await response.text(); // 데이터를 가져오기 위해 await 사용

            // totalCount 설정
            totalCount = data;

            // renderPagination 호출
            renderPagination(1);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    fetchDataAndProcess(); // 함수 호출

    // =====================================================================================

    let content = section.querySelector(".content");

    let titleUrl = `/admin/with-blind-cancel/detail?id=`
    let query = "";

    function bind(text) {
        let list = JSON.parse(text);
        content.innerHTML = "";
        for (let b of list) {
            let status = (b.status === "처리중" ? "status" : "status finish");
            let template = `
                                <li class="blind-cancel-unit" >
                        <div class="${status}" >${b.status}</div>
                        <div class="title-box">
                            <a href="" class="user" >${b.nickname}</a>
                            <a href=${titleUrl}${b.id} class="title" >${b.title}</a>
                            <div class="category with" >${b.categoryName}</div>
                        </div>
                        <div class="reason d:none md:d:block" >사유: <span>${b.reportReason}</span></div>
                    </li>
            `;
            content.insertAdjacentHTML("beforeend", template);
        }
    }

    //검색을 하기 위함
    inputQuery.addEventListener("keyup", async function (e) {
        e.preventDefault();
        if (e.key === "Enter") {
            query = inputQuery.value;

            let url = `/api/with-blind-cancels?q=${query}`;

            let response = await fetch(url)
            let text = await response.text();
            bind(text);
            let countList = await fetch(`/api/with-blind-cancels/count?q=${query}`);
            totalCount = await countList.text();
            renderPagination(1);

        }

    });

    //모바일환경에서 검색창을 열고닫을 수 있음
    btnSearch.onclick = function (e) {
        e.preventDefault();
        if (searchForm.classList.contains("d:none")) searchForm.classList.remove("d:none"); else searchForm.classList.add("d:none");
    };

    // 페이징을 쓰기위함
    paging.onclick = async function (e) {
        e.preventDefault();

        let selectPg = e.target; // 현재 클릭한 <a> 요소를 객체로 선택
        let selectedPage = selectPg.innerHTML;  // 클릭한 페이지의 숫자를 가져옴

        if (selectPg.tagName !== "A") return;
        else if (selectPg.classList.contains("arrow-prev")) {
            selectedPage = prev;
            selectPg = btnPaging[prev]
        } else if (selectPg.classList.contains("arrow-next")) {
            selectedPage = next;
            selectPg = btnPaging[next]
        }
        let response = await fetch(`/api/with-blind-cancels?q=${query}&p=${selectedPage}`);
        let text = await response.text();
        bind(text);
        currentPg = selectPg;

        renderPagination(selectedPage);

    };


});
