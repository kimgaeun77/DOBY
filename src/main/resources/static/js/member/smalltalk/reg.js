import {editor} from "/js/utils/ckeditor/content.js";
import Modal from "/js/utils/lib/modal.js";

window.addEventListener("load", function () {
    const backBtn = document.querySelector(".container .catchphrase-back-btn-box .back-btn");
    const form = document.querySelector(".container form");
    const inputTitle = form.querySelector(".title-box .input-title");
    const inputTagBox = form.querySelector(".tag-inner-box .input-tag-box");
    const inputTag = inputTagBox.querySelector(".input-tag");
    const tags = form.querySelector(".tag-inner-box .tags");
    const saveCancelBtnBox = form.querySelector(".save-cancel-btn-box");

    //경고메시지
    const titleWarning = form.querySelector(".title-box .title-warning");
    const tagMsg = form.querySelector(".tag-inner-box .tag-msg");

    const memberId = document.querySelector("#member-id").content;
    const csrf = document.querySelector("#csrf").content;

    // 모달 관련
    const modal = new Modal();
    let command;

    // 모달 보여주는 함수
    function showModal(config) {
        modal.title = config.title;
        modal.hasContent = config.hasContent;
        modal.content = config.content;
        modal.btnCount = config.btnCount;
        modal.btnMsg = config.btnMsg;
        modal.mainColor = "#FACC57";
        modal.create();

        setTimeout(() => {
            modal.show();
        }, 100);
    }

    // 태그를 저장하는 함수
    async function saveTag(tag) {
        let config = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-Token": csrf
            },
            body: JSON.stringify(tag)
        }
        let response = await fetch(`/api/smalltalk-tags`, config);
        if (!response.ok)
            throw new Error("error occurred");
    }

    // 스몰톡을 저장하는 함수
    async function saveSmalltalk(smalltalk) {
        let config = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-Token": csrf
            },
            body: JSON.stringify(smalltalk)
        }
        let response = await fetch(`/api/smalltalks`, config);
        let statusCode = response.status;
        let json = await response.json();

        if (statusCode !== 201)
            throw new Error("error occurred");
        return json;

    }

    // 게시글 전체 저장 함수
    async function save() {

        let selectedTagList = inputTagBox.querySelectorAll(".selected-tag");
        let title = inputTitle.value;
        let content = editor.getData();

        let smalltalk = {
            memberId: memberId,
            title: title,
            content: content
        }
        // 스몰톡 저장
        let result = await saveSmalltalk(smalltalk);

        // 태그 저장
        let smalltalkId = result.id;
        for (let selectedTag of selectedTagList) {
            let tagId = selectedTag.dataset.id;
            await saveTag({smalltalkId, tagId});
        }
        return {isSuccess: true, smalltalkId: smalltalkId};
    }

    // 데이터를 올바르게 입력했는지 확인하는 함수
    function isValidData() {
        let selectedTagList = inputTagBox.querySelectorAll(".selected-tag");
        let title = inputTitle.value;
        let result = true;

        if (0 === title.length || title.length < 5) {
            titleWarning.classList.remove("d:none");
            result = false;
        } else if (selectedTagList.length === 0) {
            tagMsg.classList.add("warning")
            result = false;
        }
        return result;
    }

    // 저장,취소 버튼
    saveCancelBtnBox.onclick = async function (e) {
        e.preventDefault();
        let el = e.target;
        if (el.nodeName !== "A" && el.nodeName !== "INPUT") return;
        // 저장 버튼을 눌렀을 때
        if (el.classList.contains("save-btn")) {
            // 데이터 유효성 검사
            if (!isValidData()) return;
            // 데이터가 올바른 데이터라면
            let result = await save();
            if (result.isSuccess) {
                let config = {
                    title: "정상적으로 등록되었습니다.",
                    hasContent: false,
                    content: "",
                    btnCount: 1,
                    btnMsg: [{msg: "확인"}]
                }
                showModal(config);

                // 모달 확인, 닫기 버튼
                command = modal.command;
                command.onclick = function (e) {
                    let target = e.target;
                    if (target.nodeName !== "BUTTON") return;
                    if (target.classList.contains("ok-btn")) location.href = `/smalltalk/detail?id=${result.smalltalkId}`;
                }
            } else throw new Error("error occurred");
        } else if (el.classList.contains("cancel-btn")) {
            let config = {
                title: "작성을 취소하시겠습니까?",
                hasContent: true,
                content: "작성하던 내용은 저장되지 않습니다.",
                btnCount: 2,
                btnMsg: [{msg: "네"}, {msg: "아니요"}]
            }
            showModal(config);
            // 모달 확인, 닫기 버튼
            command = modal.command;
            command.onclick = async function (e) {
                let target = e.target;
                if (target.nodeName !== "BUTTON") return;
                if (target.classList.contains("ok-btn")) location.href = "/smalltalk/list";
                else if (target.classList.contains("cancel-btn")) modal.close();
            }
        }
    }

    // 선택된 태그 삭제 이벤트 달아주는 함수
    inputTagBox.addEventListener("click", function (e) {
        let el = e.target;
        if (!el.classList.contains("cancel-btn"))
            return;
        el.parentElement.remove();
    });

    // input-tag-box 박스를 클릭했을 때 태그 목록 창 닫히고 열리게 하는 함수
    inputTagBox.addEventListener("click", function (e) {
        let element = e.target;
        if (!element.classList.contains("input-tag-box"))
            return;
        tags.classList.toggle("d:none");
    });

    // 로딩바 제거해 주는 함수
    function removeLoading() {
        const element = tags.querySelector(".loading-img");
        if (element)
            element.remove();
    }

    // 로딩바 그려주는 함수
    function drawLoading() {

        let loadingImg = `
                                <li class="loading-img"><img src="/icon/loading.svg" alt="로딩이미지"></li>
                                `;
        tags.insertAdjacentHTML("beforeend", loadingImg);
    }

    // 이미 선택된 태그가 태그 목록에 또다시 그려지는 걸 막기 위해 확인하는 함수
    function isDuplicate(tagName) {
        let selectedTag = inputTagBox.querySelectorAll(".selected-tag");
        if (selectedTag.length === 0)
            return false;

        for (let t of selectedTag) {
            let selectedTagName = t.querySelector(".name").textContent;
            if (selectedTagName === tagName)
                return true;
        }
        return false;
    }

    // 태그 목록 그려주는 함수
    function renderTagList(tagList) {

        if (tagList.length === 0) {
            let msg = `
                            <li class="no-search-msg">검색된 태그가 없습니다.</li>
                            `;
            tags.insertAdjacentHTML("beforeend", msg);
            return;
        }
        let duplicatedCount = 0;
        for (let t of tagList) {
            let tagName = t.name;
            if (isDuplicate(tagName)) {
                duplicatedCount++;
                continue;
            }
            let template = `<li class="item" data-tag-id="${t.id}">${tagName}</li>`;
            tags.insertAdjacentHTML("beforeend", template);
        }
        // 가져온 목록 모두 다 선택되어 있을 때
        if (duplicatedCount === tagList.length) {
            let msg = `
                            <li class="no-search-msg">검색된 태그가 없습니다.</li>
                            `;
            tags.insertAdjacentHTML("beforeend", msg);
        }
    }

    // 태그 목록 요청 함수
    async function getTagListByInput(query) {

        let url = `/api/smalltalk-tag-defines?q=${query}`;
        let response = await fetch(url);
        let tagList = await response.json();

        renderTagList(tagList);
        removeLoading();
    }

    // 입력창 리셋 시키는 함수
    function resetInput() {
        inputTag.value = "";
        inputTag.placeholder = "";
        inputTag.focus();
    }

    // 태그 입력
    let timeoutId;
    inputTag.oninput = function () {
        if (inputTag.value === "")
            return;
        tags.classList.remove("d:none");
        tags.innerHTML = "";
        drawLoading();
        let query = inputTag.value;

        clearTimeout(timeoutId);
        timeoutId = setTimeout(getTagListByInput, 500, query);
    }

    // 태그 선택
    tags.onclick = function (e) {
        let el = e.target;
        if (el.nodeName !== "LI" || el.classList.contains("no-search-msg"))
            return;
        let tagName = el.textContent;
        // 렌더링 되기 전에 사용자가 값을 누를 때
        if (tagName === "") return;
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

    // 작성 취소 버튼(모바일.ver)
    backBtn.onclick = function (e) {
        e.preventDefault();
        let config = {
            title: "작성을 취소하시겠습니까?",
            hasContent: true,
            content: "작성하던 내용은 저장되지 않습니다.",
            btnCount: 2,
            btnMsg: [{msg: "네"}, {msg: "아니요"}]
        }
        showModal(config);
        // 모달 확인, 닫기 버튼
        command = modal.command;
        command.onclick = async function (e) {
            let target = e.target;
            if (target.nodeName !== "BUTTON") return;
            if (target.classList.contains("ok-btn")) location.href = "/smalltalk/list";
            else if (target.classList.contains("cancel-btn")) modal.close();
        }
    }
});
