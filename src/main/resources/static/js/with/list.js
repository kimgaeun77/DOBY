let currentPage = 1;
let firstItemNum = 1;
let currentCategoryId = "";
let currentQuery = "";
let currentPositionId = "";
let currentWayId = "";
let isWish = false;
let currentTechList = new Set();


const fetchWithData = async () => {

    let techList = Array.from(currentTechList);

    const queryString = `?p=${currentPage}&c=${currentCategoryId}&q=${currentQuery}&t=${techList}&po=${currentPositionId}&w=${currentWayId}&wi=${isWish}`;

    let withURL = `/api/withs${queryString}`;
    let pagingURL = `/api/withs/paging${queryString}`;

    let withRes = await fetch(withURL);
    let pagingRes = await fetch(pagingURL);
    let withData = await withRes.json();
    let pagingData = await pagingRes.json();
    bind(withData);

    if (!pagingData.isFirstPageNum)
        return;

    firstItemNum = currentPage;
    bindPageBlock(pagingData);
}


let pagingBlock = document.querySelector('#paging');
let numList = pagingBlock.querySelector('.num-list');
let prevButton = pagingBlock.querySelector('.prev-box');
let nextButton = pagingBlock.querySelector('.next-box');

prevButton.onclick = () => {
    firstItemNum -= 5;
    currentPage = firstItemNum;
    fetchWithData();
}

nextButton.onclick = () => {
    firstItemNum += 5;
    currentPage = firstItemNum;
    fetchWithData();
}

const bindPageBlock = (paging) => {

    numList.innerHTML = "";

    let lastPage = paging.currentPageBlockLastPageNum;

    let template = "";

    for (let i = currentPage; i <= lastPage; i++) {
        let active = "";
        if (i === currentPage)
            active = "active";

        let item =
            `<li>
                <a class="item page-num ${active}" data-num="${i}">${i}</a>
            </li>`

        template += item;
    }

    numList.insertAdjacentHTML("beforeend", template);

    if (paging.prev)
        prevButton.classList.remove('d:none');
    else
        prevButton.classList.add('d:none')

    if (paging.next)
        nextButton.classList.remove('d:none');
    else
        nextButton.classList.add('d:none');
}

numList.onclick = (e) => {
    let el = e.target;

    if (!el.classList.contains('page-num'))
        return;

    let page = parseInt(el.dataset.num);

    if (page === currentPage)
        return;

    let currentActive = numList.querySelector('.active');
    currentActive.classList.remove('active');

    el.classList.add('active');

    currentPage = page;
    fetchWithData();
}


fetchWithData();


let filter = document.querySelector('#filter');
let techList = filter.querySelector('.category.tech');
let positionList = filter.querySelector('.category.position');
let categoryList = document.querySelector('#category-list');
let currentCategory = categoryList.querySelector('.active');
let wayList = filter.querySelector('.category.way');
let wishList = filter.querySelector('.category.wish');
let searchInput = document.querySelector('#search-input');
let searchButton = document.querySelector('.search-btn');
let form = document.querySelector('#form');

searchButton.onclick = () => {
    form.classList.toggle('d:none');
}

form.onsubmit = () => {
    currentPage = 1;
    fetchWithData();
    return false;
}

searchInput.oninput = () => {
    currentQuery = searchInput.value;
}

categoryList.onclick = (e) => {

    e.preventDefault();

    let element = e.target;

    if (!element.classList.contains('item'))
        return;

    currentCategory.classList.remove('active');
    element.classList.add('active');

    currentCategoryId = element.dataset.id;
    currentCategory = element;
    currentPage = 1;
    fetchWithData();
}

wayList.onclick = function (e) {
    let el = e.target;

    if (!el.classList.contains('way'))
        return;

    let id = el.dataset.id;

    if (id === undefined)
        id = "";

    currentWayId = id;

    currentPage = 1;
    fetchWithData();
}


wishList.onclick = function (e) {
    let el = e.target;

    if (!el.classList.contains('wish'))
        return;

    let id = el.dataset.id;

    if (id === undefined)
        id = false;

    isWish = id;

    currentPage = 1;
    fetchWithData();
}


positionList.onclick = function (e) {
    let el = e.target;

    if (!el.classList.contains('position'))
        return;

    let id = el.dataset.id;

    if (id === undefined)
        id = "";

    currentPositionId = id;
    currentPage = 1;
    fetchWithData();
}

techList.onclick = function (e) {
    let el = e.target;

    if (!el.classList.contains('tech'))
        return;

    let id = el.dataset.id;

    if (id === undefined)
        id = "";

    if (currentTechList.has(id))
        currentTechList.delete(id);
    else
        currentTechList.add(id);

    currentPage = 1;
    fetchWithData();
}

let boardList = document.querySelector('#board-list');
const bind = (list) => {

    boardList.innerHTML = "";

    let listTemplate = "";

    for (const w of list) {

        let techTemplate = "";

        for (const t of w.techList)
            techTemplate += `<li class="tag">${t.name}</li>`


        let template =
            `<li class="item" data-id="${w.id}">
            <div class="board">
                <div class="write-info-box">
                    <div class="profile">
                        <div class="img-container">
                            <img class="img" 
                                src="http://file.doby.co.kr/profiles/${w.profileImage}"
                                 alt="프로필사진">
                        </div>
                        <a class="nickname">${w.nickname}</a>
                    </div>
                    <div class="reg-date">${w.timeDifference}</div>
                </div>

                <div class="title-box">
                    <a class="title"  href="/with/detail?id=${w.id}">${w.title}</a>
                </div>

                <div class="board-info">
                    <div class="category-name-tag-box">
                        <div class="category-name">${w.categoryName}</div>
                        <ul class="tag-list">
                            ${techTemplate}
                        </ul>
                    </div>

                    <div class="view-like-comment-box">
                        <div class="views deco icon-color-3 icon-views">${w.hit}</div>
                        <div class="likes deco icon-color-3 icon-likes">${w.wishCount}</div>
                        <div class="comments deco icon-color-3 icon-comments">${w.commentCount}</div>
                    </div>
                </div>
            </div>
        </li>`

        listTemplate += template;
    }

    boardList.insertAdjacentHTML("beforeend", listTemplate);
}


let categoryItems = document.querySelectorAll('.category-menu .item');
let categoryBoxList = document.querySelectorAll('.item-box .category');
let filterItems = document.querySelectorAll('.category .list .item');
let checkBoxList = document.querySelectorAll('.check-box');
let clearButton = document.querySelector('#clear-btn');

function change_category() {
    for (let i = 0; i < categoryItems.length; i++) {
        categoryItems[i].classList.remove('active');
        categoryBoxList[i].classList.add('d:none');
    }
}

for (let i = 0; i < categoryItems.length; i++)
    categoryItems[i].addEventListener('click', () => {
        change_category();
        categoryItems[i].classList.add('active');
        categoryBoxList[i].classList.remove('d:none');
    });

function resetAll() {
    currentPage = 1;
    currentCategoryId = "";
    currentPositionId = "";
    currentWayId = "";
    isWish = false;
    currentTechList.clear();

    for (let i = 0; i < checkBoxList.length; i++) {
        filterItems[i].classList.remove('active');
        checkBoxList[i].checked = false;
    }

    fetchWithData();
}

clearButton.onclick = resetAll;

let filterButton = document.querySelector('.filter-btn');
let filterBox = document.querySelector('.filter-box');
let filterCloseButton = document.querySelector('#close-btn');

filterButton.onclick = function () {
    filterBox.classList.toggle('d:none');
}
filterCloseButton.onclick = function () {
    filterBox.classList.add('d:none');
}
