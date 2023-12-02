import createEditor from '/js/utils/ckeditor/comment.js';
import {modal} from '/js/community/detail.js';

window.addEventListener("load", async function () {
    let commentEditor = await createEditor(".comment-editor");
    let subCommentEditor;
    let currentSubCommentForm;// 현재 대댓글 달기 폼

    const commentList = document.querySelector("#comment-list"); // 목록
    const commentListBox = commentList.querySelector(".comment-list-box"); // 목록 ul

    const commentReg = document.querySelector("#comment-reg"); // 등록
    const commentCount = commentReg.querySelector(".comment-count-box .comment-count");
    const commentRegForm = commentReg.querySelector(".comment-reg-form");

    const communityId = document.querySelector(".board-info .title-dots-btn-container .title").dataset.communityId;
    const memberId = document.querySelector("#member-id");
    const profileImage = document.querySelector("#profile-image");
    const csrf = document.querySelector("#csrf").content;

    if (!memberId) commentRegForm.classList.add("disabled");

    // 모달 보여주는 함수
    function showModal(config) {
        modal.title = config.title;
        modal.hasContent = config.hasContent;
        modal.content = config.content;
        modal.btnCount = config.btnCount;
        modal.btnMsg = config.btnMsg;
        modal.mainColor = "#6FA6F4";
        modal.create();

        setTimeout(() => {
            modal.show();
        }, 100);
    }

    function loginModal() {
        let config = {
            title: "로그인이 필요합니다.",
            hasContent: false,
            content: "",
            btnCount: 2,
            btnMsg: [{msg: "확인"}, {msg: "닫기"}]
        };
        showModal(config);
        let command = modal.command;
        command.onclick = function (e) {
            let target = e.target;
            if (target.nodeName !== "BUTTON") return;
            if (target.classList.contains("ok-btn")) location.href = "/user/login";
            else if (target.classList.contains("cancel-btn")) modal.close();
        }
    }

    commentReg.onclick = function (e) {
        e.preventDefault();
        let target = e.target;
        if (!target.classList.contains("submit-btn"))
            return;
        saveMainComment();
    }

    commentList.onclick = function (e) {
        e.preventDefault();
        let target = e.target;

        if (target.nodeName !== "DIV" && target.nodeName !== "A" && target.nodeName !== "BUTTON") return;

        // .. 버튼 눌렀을 때 메뉴 드롭 다운
        if (target.classList.contains("menu"))
            target.parentElement.nextElementSibling.classList.toggle("d:none");

        // 메인, 서브 댓글 삭제
        else if (target.classList.contains("delete"))
            deleteComment(target);

        // 대댓글 접기, 펼치기
        else if (target.classList.contains("comment-down-btn")) {

            let findTarget = findTargetByChild(target);
            let subCommentList = findTarget.querySelector(".sub-comment-list");
            subCommentList.classList.toggle("d:none");

            if (target.classList.contains("icon-up-arrow")) target.classList.remove("icon-up-arrow");
            else if (target.classList.contains("icon-down_arrow")) {
                target.classList.add("icon-up-arrow");
                let mainCommentId = findTarget.dataset.commentId;
                getSubCommentList(mainCommentId, subCommentList);
            }
        }

        // 댓글 쓰기 버튼
        else if (target.classList.contains("comment-reg-btn")) {
            if (!memberId) {
                loginModal();
                return;
            }
            let findTarget = findTargetByChild(target);
            let isExist = findTarget.querySelector(".img-form-box");
            if (isExist) isExist.classList.toggle("d:none");
            else createSubEditor(findTarget);
        }

        // 좋아요
        else if (target.classList.contains("like")) {
            if (!memberId) {
                loginModal();
                return;
            }
            let findTarget = findTargetByChild(target);
            let commentId = findTarget.dataset.commentId;
            let mId = memberId.content;

            if (target.classList.contains("icon-likes-fill")) {
                target.classList.remove("icon-likes-fill")
                target.classList.add("icon-likes");
                deleteCommentGood(mId, commentId, findTarget);
            } else if (target.classList.contains("icon-likes")) {
                target.classList.remove("icon-likes")
                target.classList.add("icon-likes-fill")
                addCommentGood(mId, commentId, findTarget);
            }
        }

        // 서브 댓글 달기
        if (target.classList.contains("submit-btn")) {
            if (!memberId) {
                loginModal();
                return;
            }
            let findTarget = findTargetByChild(target);
            saveSubComment(findTarget);
        }
    }

    // 대댓글 수 update
    function updateReplyCount(parent, option) {
        let commentCount = parent.querySelector(".root-comment .comment-count");
        if (!commentCount) {
            let replayCountTemplate = ` <a class="comment-down-btn btn cursor:pointer icon-color-2 icon-down_arrow deco">
                                                   댓글&nbsp;<span class="comment-count">1</span>개
                                               </a>
                                             `;
            parent.querySelector(".root-comment .util-box").insertAdjacentHTML("afterbegin", replayCountTemplate);
            return;
        }
        if (option === "up") commentCount.textContent++;
        else if (option === "down") {
            commentCount.textContent--;
            if (commentCount.textContent === "0") {
                commentCount.parentElement.remove();
                parent.querySelector(".sub-comment-list").classList.add("d:none");
            }
        }
    }

    // 서브 댓글 등록
    async function saveSubComment(findTarget) {
        let content = subCommentEditor.getData();
        if (content === "") return;
        let data = {
            content,
            communityId,
            memberId: memberId.content,
            parentId: findTarget.dataset.commentId
        }
        let config = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-Token": csrf
            },
            body: JSON.stringify(data)
        }
        let response = await fetch(`/api/community-comments`, config);
        if (response.status !== 201)
            throw new Error("error occurred");

        // 메인 댓글 대댓글 수 update
        subCommentEditor.setData("");
        updateReplyCount(findTarget, "up");

        let json = await response.json();
        let parentId = json.parentId;
        let subCommentList = findTarget.querySelector(".sub-comment-list");
        await getSubCommentList(parentId, subCommentList);
        await getCommentCount(communityId);
    }

    // 메인 댓글 등록
    async function saveMainComment() {
        let content = commentEditor.getData();
        if (content === "") return;
        let data = {
            content,
            communityId,
            memberId: memberId.content
        }
        let config = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-Token": csrf
            },
            body: JSON.stringify(data)
        }
        let response = await fetch(`/api/community-comments`, config);
        if (response.status !== 201)
            throw new Error("error occurred");

        commentEditor.setData("");
        await getMainCommentList(communityId);
        await getCommentCount(communityId);
    }

    // 좋아요 수 업데이트
    function updateCommentGoodCount(findTarget, option) {
        let likeCount = findTarget.querySelector(".like-box .like-count");
        if (option === "up") likeCount.textContent++;
        else if (option === "down") likeCount.textContent--;
    }

    // 좋아요 삭제
    async function deleteCommentGood(mId, commentId, findTarget) {
        let config = {
            method: "DELETE",
            headers: {
                "X-CSRF-Token": csrf
            }
        }
        let response = await fetch(`/api/community-comment-goods/${mId},${commentId}`, config);
        if (response.status !== 204)
            throw new Error("error occurred");
        updateCommentGoodCount(findTarget, "down");
    }

    // 좋아요
    async function addCommentGood(mId, commentId, findTarget) {
        let config = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-Token": csrf
            },
            body: JSON.stringify({memberId: mId, commentId: commentId})
        }
        let response = await fetch(`/api/community-comment-goods`, config);
        if (response.status !== 201)
            throw new Error("error occurred");
        updateCommentGoodCount(findTarget, "up");
    }

    // editor 새로 만들어주는 함수(댓글 쓰기 눌렀을 때)
    async function createSubEditor(findTarget) {

        if (currentSubCommentForm) currentSubCommentForm.remove();

        let memberProfileTemplate = profileImage ? `<img class="profile-img" src="https://file.doby.co.kr/profiles/${profileImage.content}" alt="프로필_이미지">`
            : `<img class="profile-img" src="/image/user.svg" alt="프로필_이미지">`;

        let editorTemplate =
            `
                                      <div class="img-form-box">
                                            <div class="img-box">
                                               ${memberProfileTemplate}
                                            </div>
                                            <div class="comment-reg-form">
                                                <div class="editor-box">
                                                    <div class="sub-comment-editor"></div>
                                                </div>
                                                <div class="btn-box d:flex">
                                                    <button class="submit-btn cursor:pointer">댓글 작성</button>
                                                </div>
                                            </div>
                                      </div>
                                    `;
        let subCommentList = findTarget.querySelector(".sub-comment-list");
        subCommentList.insertAdjacentHTML("beforebegin", editorTemplate);
        subCommentEditor = await createEditor(".sub-comment-editor");
        currentSubCommentForm = findTarget.querySelector(".img-form-box");
    }

    function findTargetByChild(child) {
        let findTarget = child;
        do {
            findTarget = findTarget.parentElement;

        } while (!findTarget.classList.contains("comment-item"));

        return findTarget;
    }

    // 댓글 삭제
    async function deleteComment(target) {

        let findTarget = findTargetByChild(target);
        let commentId = findTarget.dataset.commentId;

        let response = await fetch(`/api/community-comments/${commentId}`, {
            method: "DELETE",
            headers: {
                "X-CSRF-Token": csrf
            }
        });
        if (response.status !== 204)
            throw new Error("error occurred");
        // 삭제 후 처리 작업
        if (findTarget.parentElement.classList.contains("sub-comment-list")) {
            let parent = findTargetByChild(findTarget);
            let parentCommentId = parent.dataset.commentId;
            let subCommentList = parent.querySelector(".sub-comment-list");
            await getSubCommentList(parentCommentId, subCommentList);
            updateReplyCount(parent, "down");
        } else {
            await getMainCommentList(communityId);
        }
        await getCommentCount(communityId);
    }

    // 부모 댓글 목록 get
    async function getMainCommentList(communityId) {

        let response = await fetch(`/api/community-comments?community-id=${communityId}`);
        if (response.status === 200) {
            let list = await response.json();
            renderMainCommentList(list);
        } else
            throw new Error("error occurred");
    }

    // 부모 댓글 목록 render
    function renderMainCommentList(list) {
        commentListBox.innerHTML = "";

        let currentUser = memberId ? parseInt(memberId.content) : undefined;
        let menuBoxTemplate;
        let replyCountTemplate;
        let likeClassName;

        for (let item of list) {
            // .. 메뉴
            menuBoxTemplate = currentUser && currentUser === item.memberId ? `
                                                                                  <div class="menu-box">
                                                                                        <div class="menu-btn-box">
                                                                                            <a class="menu icon icon-dots icon-size-3  icon-color-3 cursor:pointer">메뉴</a>
                                                                                        </div>
                                                                                        <ul class="list d:none">
                                                                                            <li><a class="item delete">삭제하기</a></li>
                                                                                        </ul>
                                                                                  </div>  
                                                                              ` : ``;
            // 대댓글 수
            replyCountTemplate = item.replyCount !== 0 ? `  
                                                            <a class="comment-down-btn btn cursor:pointer icon-color-2 icon-down_arrow deco">
                                                                댓글&nbsp;<span class="comment-count">${item.replyCount}</span>개
                                                            </a>
                                                         ` : ``;

            // 좋아요 여부
            likeClassName = item.isGood ? "icon-likes-fill" : "icon-likes";
            let template = `                
                                    <li class="item comment-item" data-comment-id="${item.id}">
                                        <div class="root-comment comment-box">
                                            <div class="img-box">
                                                <img class="profile-img" src="https://file.doby.co.kr/profiles/${item.profileImage}" alt="프로필_이미지">
                                            </div>
                                            <div class="comment-info-box">
                                                <div class="info-box">
                                                    <span class="nickname cursor:pointer">${item.nickname}</span>
                                                    <span class="reg-time">${item.timeDifference}</span>
                                                </div>
                                                ${menuBoxTemplate}
                                                <div class="content-box">
                                                    <span class="content editor-content">${item.content}</span>
                                                </div>
                                                <div class="util-box">
                                                    ${replyCountTemplate}
                                                    <a class="comment-reg-btn btn cursor:pointer">댓글 쓰기</a>
                                                </div>
                                                <div class="like-box">
                                                    <a class="like icon icon-size-1 cursor:pointer ${likeClassName}">좋아요</a>
                                                    <span class="like-count">${item.goodCount}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <ul class="sub-comment-list d:none">
                                        </ul>
                    
                                    </li>
                                                       
                                  `;
            commentListBox.insertAdjacentHTML("beforeend", template);
            hljs.highlightAll();
        }
    }

    // 자식 댓글 목록 get
    async function getSubCommentList(mainCommentId, subCommentList) {

        let response = await fetch(`/api/community-comments?community-id=${communityId}&p-id=${mainCommentId}`);
        if (response.status === 200) {
            let list = await response.json();
            renderSubCommentList(list, subCommentList);
        } else
            throw new Error("error occurred");
    }

    // 자식 댓글 목록 render
    function renderSubCommentList(list, subCommentList) {
        subCommentList.innerHTML = "";

        let currentUser = memberId ? parseInt(memberId.content) : undefined;
        let menuBoxTemplate;
        let likeClassName;

        for (let item of list) {
            // .. 메뉴

            menuBoxTemplate = currentUser && currentUser === item.memberId ? `
                                                                                  <div class="menu-box">
                                                                                        <div class="menu-btn-box">
                                                                                            <a class="menu icon icon-dots icon-size-3  icon-color-3 cursor:pointer">메뉴</a>
                                                                                        </div>
                                                                                        <ul class="list d:none">
                                                                                            <li><a class="item delete">삭제하기</a></li>
                                                                                        </ul>
                                                                                  </div>  
                                                                              ` : ``;

            // 좋아요 여부
            likeClassName = item.isGood ? "icon-likes-fill" : "icon-likes";
            let template = `  
                                     <li class="item comment-item" data-comment-id="${item.id}">
                                        <div class="sub-comment comment-box">
                                            <div class="img-box">
                                                <img class="profile-img"
                                                     src="https://file.doby.co.kr/profiles/${item.profileImage}" alt="프로필_이미지">
                                            </div>
                                            <div class="comment-info-box">
                                                <div class="info-box">
                                                    <span class="nickname cursor:pointer">${item.nickname}</span>
                                                    <span class="reg-time">${item.timeDifference}</span>
                                                </div>
                                                 ${menuBoxTemplate}
                                                <div class="content-box">
                                                    <span class="content">${item.content}</span>
                                                </div>
                                                <div class="like-box">
                                                    <a class="like icon icon-size-1 cursor:pointer ${likeClassName}">좋아요</a>
                                                    <span class="like-count">${item.goodCount}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </li>           
                                  `;
            subCommentList.insertAdjacentHTML("beforeend", template);
            hljs.highlightAll();
        }
    }

    // 댓글 전체 수 get
    async function getCommentCount(communityId) {
        let response = await fetch(`/api/community-comments/count?community-id=${communityId}`);
        let count = await response.json();
        renderCommentCount(count);
    }

    // 댓글 전체 수 render
    function renderCommentCount(count) {
        commentCount.textContent = count;
    }
})