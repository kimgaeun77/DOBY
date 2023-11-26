import Modal from "/js/utils/lib/modal.js";

window.addEventListener('load', function () {
    const dotsBtnSection = document.querySelector(".dots-btn-list-container");
    const likeBtn = document.querySelector(".content-container .like-share-btn-container .like-btn");
    const shareBtn = document.querySelector(".content-container .like-share-btn-container .share-btn");
    const title = document.querySelector(".board-info .title-dots-btn-container .title")

    const memberId = document.querySelector("#member-id");
    const csrf = document.querySelector("#csrf").content;

    // 모달 관련
    const modal = new Modal();
    let command;

    // 모달 보여주는 함수
    function showModal(config){
        modal.title =  config.title;
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

    // 회원일때만 보이기 때문에 조건 처리
    if (dotsBtnSection) {
        const dotsBtn = dotsBtnSection.querySelector(".dots-btn");
        const dotsList = dotsBtnSection.querySelector(".list");

        // ...버튼 눌렀을 때
        dotsBtn.onclick = function () {
            dotsList.classList.toggle("d:none");
        }

        // dotsList 목록
        dotsList.onclick = function (e) {
            let el = e.target;
            if (el.nodeName !== "A") return;
            if (el.classList.contains("delete")) {
                e.preventDefault();
                let config = {
                    title:"글을 삭제하시겠습니까?",
                    hasContent: false,
                    content :  "",
                    btnCount: 2,
                    btnMsg: [{msg: "네"}, {msg: "아니요"}]
                }
                showModal(config);

                // 모달 확인, 닫기 버튼
                command = modal.command;
                command.onclick = async function (e) {
                    let target = e.target;
                    if (target.nodeName !== "BUTTON") return;
                    if (target.classList.contains("ok-btn")) {
                        let smalltalkId = title.dataset.smalltalkId;
                        let result = await del(smalltalkId);
                        if (result.success) {
                            let config = {
                                title:"정상적으로 삭제되었습니다.",
                                hasContent: false,
                                content :  "",
                                btnCount: 1,
                                btnMsg: [{msg: "확인"}]
                            }
                            showModal(config);
                            command = modal.command;
                            command.onclick = function (e) {
                                let target = e.target;
                                if (target.nodeName !== "BUTTON") return;
                                if (target.classList.contains("ok-btn")) location.href = "/smalltalk/list";
                            }
                        }
                    }
                    else if (target.classList.contains("cancel-btn")) modal.close();
                }
            }
        }
    }

    // 게시글 삭제
    async function del(smalltalkId) {
        let config = {
            method: "DELETE",
            headers: {
                "X-CSRF-Token": csrf
            }
        }
        let response = await fetch(`/api/smalltalks/${smalltalkId}`, config);
        let statusCode = response.status;
        if (statusCode !== 204)
            throw new Error("error occurred");
        return {success: true}
    }

    // 좋아요 삭제 함수
    async function cancelLike(data) {
        let config = {
            method: "DELETE",
            headers: {
                "X-CSRF-Token": csrf
            }
        }
        let response = await fetch(`/api/smalltalk-goods/${data.memberId},${data.smalltalkId}`, config);
        let statusCode = response.status;
        if (statusCode !== 204)
            throw new Error("error occurred");
        return true;
    }

    // 좋아요 추가 함수
    async function addLike(data) {
        let config = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-Token": csrf
            },
            body: JSON.stringify(data)
        }
        let response = await fetch(`/api/smalltalk-goods`, config);
        let statusCode = response.status;
        if (statusCode !== 201)
            throw new Error("error occurred");
        return true;
    }

    // 좋아요
    likeBtn.onclick = async function (e) {
        e.preventDefault();
        if (!memberId) {
            let config = {
                title:"로그인이 필요합니다.",
                hasContent: false,
                content :  "",
                btnCount: 2,
                btnMsg: [{msg: "확인"}, {msg: "닫기"}]
            }
            showModal(config);

            // 모달 확인, 닫기 버튼
            command = modal.command;
            command.onclick = function (e) {
                let target = e.target;
                if (target.nodeName !== "BUTTON") return;
                if (target.classList.contains("ok-btn")) location.href = "/user/login";
                else if (target.classList.contains("cancel-btn")) modal.close();
            }
            return;
        }
        let mId = memberId.content;
        let smalltalkId = title.dataset.smalltalkId;
        let data = {memberId: mId, smalltalkId};

        // 좋아요 버튼을 누르고 있다면
        if (likeBtn.classList.contains("icon-likes-fill")) {
            let isCancel = await cancelLike(data);
            if (isCancel) {
                likeBtn.classList.remove("icon-likes-fill");
                likeBtn.classList.add("icon-likes");
            }

        } else {
            let isAdd = await addLike(data);
            if (isAdd) {
                likeBtn.classList.add("icon-likes-fill");
                likeBtn.classList.remove("icon-likes");
            }
        }
    }

    // 공유하기 버튼
    shareBtn.onclick = async function (e) {
        e.preventDefault();
        let result = await navigator.permissions.query({name: "clipboard-write"})
        if (result.state === "granted") {
            let currentUrl = location.href;
            await navigator.clipboard.writeText(currentUrl);
            let config = {
                title:"주소가 복사되었습니다.",
                hasContent: false,
                content :  "",
                btnCount: 1,
                btnMsg: [{msg: "닫기"}]
            }
            showModal(config);

            // 모달 확인, 닫기 버튼
            command = modal.command;
            command.onclick = function (e) {
                let target = e.target;
                if (target.nodeName !== "BUTTON") return;
                if (target.classList.contains("ok-btn")) modal.close();
            }
        }
    }
});