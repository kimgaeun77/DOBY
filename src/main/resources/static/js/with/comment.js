import createEditor from '/js/utils/ckeditor/comment.js';

window.addEventListener('load', async function () {

    const csrfToken = document.querySelector('#csrf').content;
    const memberIdMeta = document.querySelector('#member-id');
    const memberProfileMeta = document.querySelector('#profile-image');
    const commentRegForm = document.querySelector("#comment-reg .comment-reg-form");
    let memberId = null;
    let memberProfile = `/image/user.svg`;

    if (memberIdMeta)
        memberId = memberIdMeta.content;
    else
        commentRegForm.classList.add("disabled");


    if (memberProfileMeta)
        memberProfile = `https://file.doby.co.kr/profiles/${memberProfileMeta.content}`;

    const loginModal = document.querySelector('.modal-box.login');
    const loginModalYesButton = loginModal.querySelector('.btn-yes');
    const loginModalNoButton = loginModal.querySelector('.btn-no');

    loginModalYesButton.onclick = () => {
        location.href = `/user/login`;
    }

    loginModalNoButton.onclick = () => {
        loginModal.classList.remove('open');
    }


    const commentEditor = await createEditor('.comment-editor');

    const withId = parseInt(document.querySelector('#with-id').dataset.withId);

    const mainCommentRegBlock = document.querySelector('#comment-reg');
    const mainCommentRegButton = mainCommentRegBlock.querySelector('.submit-btn');
    const commentListBlock = document.querySelector('#comment-list');
    const commentList = commentListBlock.querySelector('.comment-list-box');

    const getCommentList = async () => {
        let res = await fetch(`/api/with-comments?wid=${withId}`)
        let data = await res.json();

        bindCommentList(data);
    }

    const getCommentCount = async () => {

        let res = await fetch(`/api/with-comments/${withId}`);
        let data = await res.json();

        bindCommentCount(data);
    }

    const bindCommentCount = (count) => {
        const commentCountElement = document.querySelector('.comment-count');
        commentCountElement.innerText = count;
    }

    const bindCommentList = (list) => {

        commentList.innerHTML = "";

        for (const c of list) {

            let menuBox = "";
            if (memberId && (parseInt(memberId) === parseInt(c.memberId)))
                menuBox = `<div class="menu-box">
                                <div class="menu-btn-box"><a
                                        class="menu icon icon-dots icon-size-3  icon-color-3 cursor:pointer">메뉴</a>
                                </div>
                                <ul class="list d:none">
                                    <li><a class="item delete root" data-id="${c.id}">삭제하기</a></li>
                                </ul>
                            </div>`;

            let display = '';
            if (!parseInt(c.replyCount))
                display = 'd:none';

            let replyCountTemplate =
                `<a class="comment-down-btn cursor:pointer icon-color-2 icon-down_arrow deco ${display}" data-id="${c.id}">
                    댓글&nbsp<span class="reply-count">${c.replyCount}</span>개
                    </a>`;

            let template =
                `<li class="item root" data-id="${c.id}">
                    <div class="root-comment comment-box">
                        <div class="img-box">
                            <img class="profile-img" src="https://file.doby.co.kr/profiles/${c.profileImage}" alt="프로필사진">
                        </div>
                        <div class="comment-info-box">
                            <div class="info-box">
                                <span class="nickname cursor:pointer">${c.nickname}</span>
                                <span class="reg-time">${c.timeDifference}</span>
                            </div>
                            ${menuBox}
                            <div class="content-box">
                                <span class="content editor-content">${c.content}</span>
                            </div>
                            <div class="util-box">
                                ${replyCountTemplate}
                                <a class="comment-reg-btn sub-comment-write-btn cursor:pointer">댓글 쓰기</a>
                            </div>
                        </div>
                    </div>
                    <ul class="sub-comment-list d:none" data-id="${c.id}"></ul>
                    <div class="sub-comment-editor-box"></div>
                </li>`
            commentList.insertAdjacentHTML("beforeend", template);
        }
        hljs.highlightAll();
    }

    getCommentList();

    mainCommentRegButton.onclick = async () => {

        if (!memberId) {
            loginModal.classList.add('open');
            return;
        }

        const editorContent = commentEditor.getData();

        if (!editorContent)
            return;

        const data = {
            withId,
            content: editorContent,
        }

        const config = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-csrf-token": csrfToken
            },
            body: JSON.stringify(data)
        }

        try {
            const res = await fetch(`/api/with-comments`, config);
            if (res.status !== 200)
                throw new Error("등록에 실패했습니다");
        } catch (e) {
            alert(e.message)
            return;
        }

        getCommentList();
        commentEditor.setData('');

        getCommentCount();
    }

    const getSubCommentList = async (pid, target) => {
        let res = await fetch(`/api/with-comments?pid=${pid}`);
        let data = await res.json();
        bindSubCommentList(data, target);
    }

    const bindSubCommentList = (list, target) => {

        target.innerHTML = "";

        for (const c of list) {

            let menuBox = "";
            if (memberId && parseInt(memberId) === parseInt(c.memberId))
                menuBox = `<div class="menu-box">
                                <div class="menu-btn-box"><a
                                        class="menu icon icon-dots icon-size-3  icon-color-3 cursor:pointer">메뉴</a>
                                </div>
                                <ul class="list d:none">
                                    <li><a class="item delete" data-id="${c.id}">삭제하기</a></li>
                                </ul>
                            </div>`;

            let template =
                `<li class="item sub" data-id="${c.id}">
                    <div class="sub-comment comment-box">
                        <div class="img-box">
                            <img class="profile-img"
                                 src="https://file.doby.co.kr/profiles/${c.profileImage}" alt="">
                        </div>
                        <div class="comment-info-box">
                            <div class="info-box">
                                <span class="nickname cursor:pointer">${c.nickname}</span>
                                <span class="reg-time">${c.timeDifference}</span>
                            </div>
                        ${menuBox}
                            <div class="content-box">
                                <span class="content editor-content">${c.content}</span>
                            </div>
                        </div>
                    </div>
                </li>`

            target.insertAdjacentHTML("beforeend", template);
        }
        hljs.highlightAll();
    }

    let commentListSection = this.document.querySelector('#comment-list');
    let commentListBox = commentListSection.querySelector('.comment-list-box');
    let subEditor;

    commentListBox.onclick = function (e) {
        e.preventDefault();

        let el = e.target;

        let isValid =
            el.classList.contains('menu') ||
            el.classList.contains('btn') ||
            el.classList.contains('nickname') ||
            el.classList.contains('comment-down-btn') ||
            el.classList.contains('sub-comment-write-btn') ||
            el.classList.contains('submit-btn') ||
            el.classList.contains('delete');

        if (!isValid) return;

        if (el.classList.contains('menu')) openMenuList(el);
        else if (el.classList.contains('comment-down-btn')) openCommentList(el);
        else if (el.classList.contains('sub-comment-write-btn')) openEditor(el);
        else if (el.classList.contains('submit-btn')) regSubComment(el);
        else if (el.classList.contains('delete')) deleteComment(el);

    }

    let currentSubCommentEditorBox;
    let currentRootCommentId;

    const deleteComment = async (el) => {

        let temp = el;

        while (!temp.classList.contains('item'))
            temp = temp.parentElement;

        let item = temp;

        const id = parseInt(item.dataset.id);

        const config = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "x-csrf-token": csrfToken
            }
        }

        const res = await fetch(`/api/with-comments/${id}`, config);

        try {
            if (res.status !== 204)
                throw new Error("삭제에 실패했습니다")
        } catch (e) {
            alert(e)
            return;
        }


        if (item.classList.contains('root'))
            getCommentList();
        else {
            while (!item.classList.contains('root'))
                item = item.parentElement;

            const replyCountElement = item.querySelector('.reply-count');
            let replyCount = parseInt(replyCountElement.innerText);
            replyCount--;
            replyCountElement.innerText = replyCount;

            const subCommentList = item.querySelector('.sub-comment-list');


            const rootId = item.dataset.id;
            getSubCommentList(rootId, subCommentList);
        }

        getCommentCount();
    }

    let currentParentComment = null;

    const regSubComment = async (element) => {

        if (!memberId) {
            loginModal.classList.add('open');
            return;
        }

        const editorContent = subEditor.getData();

        if (!editorContent)
            return;

        const data = {
            withId,
            content: editorContent,
            parentId: currentRootCommentId
        }

        const config = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-csrf-token": csrfToken
            },
            body: JSON.stringify(data)
        }

        const res = await fetch(`/api/with-comments`, config);

        try {
            if (res.status !== 200)
                throw new Error("댓글 등록에 실패했습니다.");
        } catch (e) {
            alert(e)
            return;
        }

        let temp = element;

        while (!temp.classList.contains('root'))
            temp = temp.parentElement;


        getCommentCount();

        const commentOpenButton = temp.querySelector('.comment-down-btn');
        commentOpenButton.classList.remove('d:none');
        let replyCountElement = commentOpenButton.querySelector('.reply-count');
        let replyCount = parseInt(replyCountElement.innerText);
        replyCount++;

        replyCountElement.innerText = replyCount;

        await openCommentList(commentOpenButton, true);

        if (currentSubCommentEditorBox)
            currentSubCommentEditorBox.innerHTML = "";

        currentParentComment = null;


    }


    const openEditor = async (el) => {

        let temp = el;

        while (!temp.classList.contains('item'))
            temp = temp.parentElement;

        currentRootCommentId = parseInt(temp.dataset.id);

        if (currentSubCommentEditorBox)
            currentSubCommentEditorBox.innerHTML = "";

        if (currentParentComment === el) {
            currentParentComment = null;
            return;
        }

        let subCommentEditorBox = temp.querySelector('.sub-comment-editor-box');
        currentSubCommentEditorBox = subCommentEditorBox;

        let editorTemplate =
            `<div class="img-form-box">
                    <div class="img-box">
                        <img class="profile-img" src="${memberProfile}" alt="">
                    </div>
                    <div class="comment-reg-form">
                        <div class="editor-box">
                            <div class="sub-comment-editor"></div>
                        </div>
                        <div class="btn-box d:flex">
                            <button class="submit-btn cursor:pointer">댓글 작성</button>
                        </div>
                    </div>
                </div>`;

        subCommentEditorBox.insertAdjacentHTML("beforeend", editorTemplate);


        subEditor = await createEditor('.sub-comment-editor');

        currentParentComment = el;
    }

    async function openCommentList(el, open) {

        let temp = el;

        while (!temp.classList.contains('item'))
            temp = temp.parentElement;

        let subCommentList = temp.querySelector('.sub-comment-list');

        const id = el.dataset.id;
        await getSubCommentList(id, subCommentList);

        if (open) {
            el.classList.add('icon-up-arrow');
            subCommentList.classList.remove('d:none');
        } else {
            el.classList.toggle('icon-up-arrow');
            subCommentList.classList.toggle('d:none');
        }

    }

    let currentMenuList = null;

    function openMenuList(el) {

        let temp = el;

        while (!temp.classList.contains('menu-box'))
            temp = temp.parentElement;

        let list = temp.querySelector('.list')

        if (currentMenuList) {
            if (currentMenuList === list) {
                currentMenuList.classList.toggle('d:none');
                return;
            }
            currentMenuList.classList.add('d:none');
        }

        list.classList.remove('d:none');

        currentMenuList = list;
    }
});