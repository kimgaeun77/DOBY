import {editor} from "/js/utils/ckeditor/content.js";
window.addEventListener("load", function (){

    const form = document.querySelector(".container form");
    const inputCategory = form.querySelector(".category-inner-box .input-category");
    const categorys = form.querySelector(".category-inner-box .categorys");
    const inputTitle = form.querySelector(".title-box .input-title");
    const inputTagBox = form.querySelector(".tag-inner-box .input-tag-box");
    const inputTag = inputTagBox.querySelector(".input-tag");
    const tags = form.querySelector(".tag-inner-box .tags");
    const saveCancelBtnBox = form.querySelector(".save-cancel-btn-box");
    //경고메시지
    const categoryWarning = form.querySelector(".category-inner-box .category-warning");
    const titleWarning = form.querySelector(".title-box .title-warning");
    const tagMsg = form.querySelector(".tag-inner-box .tag-msg");

    // 태그를 저장하는 함수
    async function saveTag(tag){
        let config = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(tag)
        }
        let response = await fetch(`/api/community-tags`, config);
        if(!response.ok)
            throw new Error("error occurred");
    }

    // 커뮤니티 태그 목록 전체 삭제
    async function deleteTag(communityId){
        let config = {
            method: "DELETE"
        }
        let response = await fetch(`/api/community-tags/${communityId}`, config);
        let statusCode = response.status;

        if(statusCode !== 204)
            throw new Error("error occurred");
    }

    // 커뮤니티를 수정하는 함수
    async function editCommunity(community){
        let config = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(community)
        }
        let response = await fetch(`/api/communitys`, config);
        let statusCode = response.status;

        if(statusCode !== 204)
            throw new Error("error occurred");
    }

    // 게시글 전체 수정 함수
    async function edit(){

        let selectedTagList = inputTagBox.querySelectorAll(".selected-tag");
        let categoryId = inputCategory.dataset.id;
        let title = inputTitle.value;
        let communityId = form.dataset.communityId;
        let content = editor.getData();

        let community = {
            id: communityId,
            categoryId: categoryId,
            title: title,
            content: content
        }
        // 커뮤니티 수정
        await editCommunity(community);
        
        // // 커뮤니티 태그 목록 전체 삭제
        await deleteTag(communityId);

        // 태그 새로 저장
        for(let selectedTag of selectedTagList){
            let tagId = selectedTag.dataset.id;
            await saveTag({communityId, tagId});
        }
        return { isSuccess:true, communityId:communityId };
    }

    // 데이터를 올바르게 입력했는지 확인하는 함수
    function isValidData() {
        let selectedTagList = inputTagBox.querySelectorAll(".selected-tag");
        let categoryId = inputCategory.dataset.id;
        let title = inputTitle.value;
        let result = true;

        if(categoryId === undefined){
            categoryWarning.classList.remove("d:none");
            result = false;
        }
        else if(0 === title.length|| title.length < 5){
            titleWarning.classList.remove("d:none");
            result = false;
        }
        else if (selectedTagList.length === 0){
            tagMsg.classList.add("warning")
            result = false;
        }
        return result;
    }
    
    // 수정,취소 버튼
    saveCancelBtnBox.onclick = async function (e){
        e.preventDefault();
        let el = e.target;
        if(el.nodeName !== "A" && el.nodeName !== "INPUT")
            return;

        if(el.classList.contains("save-btn")){
            if(!isValidData()) return;
            let result = await edit();
            if(result.isSuccess)
                location.href = `/community/detail?id=${result.communityId}`;
            throw new Error("error occurred");
        }
    }

    // 선택된 태그 삭제 이벤트 달아주는 함수 (이벤트 두 개 달아줘야 함.)
    inputTagBox.addEventListener("click", function (e){
        let el = e.target;
        if(!el.classList.contains("cancel-btn"))
            return;
        el.parentElement.remove();
    });

    // input-tag-box 박스를 클릭했을 때 태그 목록 창 닫히고 열리게 하는 함수
    inputTagBox.addEventListener("click", function (e){
        let element = e.target;
        if(!element.classList.contains("input-tag-box"))
            return;
        tags.classList.toggle("d:none");
    });

    // 로딩바 제거해 주는 함수
    function removeLoading(){
        const element = tags.querySelector(".loading-img");
        if(element)
            element.remove();
    }

    // 로딩바 그려주는 함수
    function drawLoading(){

        let loadingImg = `
                                <li class="loading-img"><img src="/icon/loading.svg" alt="로딩이미지"></li>
                                `;
        tags.insertAdjacentHTML("beforeend",loadingImg);
    }

    // 이미 선택된 태그가 태그 목록에 또다시 그려지는 걸 막기 위해 확인하는 함수
    function isDuplicate(tagName){
        let selectedTag = inputTagBox.querySelectorAll(".selected-tag");
        if (selectedTag.length === 0)
            return false;

        for(let t of selectedTag){
            let selectedTagName = t.querySelector(".name").textContent;
            if(selectedTagName === tagName)
                return true;
        }
        return false;
    }

    // 태그 목록 그려주는 함수
    function renderTagList(tagList){

        if(tagList.length === 0){
            let msg = `
                            <li class="no-search-msg">검색된 태그가 없습니다.</li>
                            `;
            tags.insertAdjacentHTML("beforeend", msg);
            return;
        }
        let duplicatedCount = 0;
        for(let t of tagList){
            let tagName = t.name;
            if(isDuplicate(tagName)){
                duplicatedCount++;
                continue;
            }
            let template = `<li class="item" data-tag-id="${t.id}">${tagName}</li>`;
            tags.insertAdjacentHTML("beforeend", template);
        }
        // 가져온 목록 모두 다 선택되어 있을 때
        if(duplicatedCount === tagList.length){
            let msg = `
                            <li class="no-search-msg">검색된 태그가 없습니다.</li>
                            `;
            tags.insertAdjacentHTML("beforeend", msg);
        }
    }

    // 태그 목록 요청 함수
    async function getTagListByInput(query){

        let url = `/api/community-tag-defines?q=${query}`;
        let response = await fetch(url);
        let tagList = await response.json();

        renderTagList(tagList);
        removeLoading();
    }

    // 입력창 리셋 시키는 함수
    function resetInput(){
        inputTag.value = "";
        inputTag.placeholder = "";
        inputTag.focus();
    }

    // 태그 입력
    let timeoutId;
    inputTag.oninput = function (){
        if(inputTag.value === "")
            return;
        tags.classList.remove("d:none");
        tags.innerHTML = "";
        drawLoading();
        let query = inputTag.value;

        clearTimeout(timeoutId);
        timeoutId = setTimeout(getTagListByInput, 500, query);
    }

    // 태그 선택
    tags.onclick = function (e){
        let el = e.target;
        if(el.nodeName !== "LI" || el.classList.contains("no-search-msg"))
            return;
        let tagName = el.textContent;
        // 렌더링 되기 전에 사용자가 값을 누를 때
        if(tagName === "") return;
        let tagId = el.dataset.tagId;
        let template = `       
                            <div class="selected-tag" data-id="${tagId}">
                                <span class="name">${tagName}</span>
                                <button class="cancel-btn icon icon-x" type="button">선택 취소 버튼</button>
                            </div>`;
        inputTag.insertAdjacentHTML("beforebegin", template);
        resetInput();
        tags.classList.add("d:none");
    }

    // 카테고리
    inputCategory.onclick = function (){
        categorys.classList.toggle("d:none");
    }

    // 카테고리 선택
    categorys.onclick = function (e){
        let el = e.target;
        if(el.nodeName !== "LI")
            return;
        let categoryId = el.dataset.categoryId;
        let categoryName = el.textContent;
        inputCategory.value = categoryName;
        inputCategory.dataset.id = categoryId;
        categorys.classList.add("d:none");
    }
});
