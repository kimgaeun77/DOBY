window.addEventListener('load', function () {


    const csrfToken = document.querySelector('#csrf').content;
    const memberIdMeta = document.querySelector('#member-id');
    let memberId = null;

    if (memberIdMeta)
        memberId = memberIdMeta.content;
    const withId = parseInt(document.querySelector('#with-id').dataset.withId);

    const loginModal = document.querySelector('.modal-box.login');
    const loginModalYesButton = loginModal.querySelector('.btn-yes');
    const loginModalNoButton = loginModal.querySelector('.btn-no');

    loginModalYesButton.onclick = () => {
        location.href = `/user/login`;
    }

    loginModalNoButton.onclick = () => {
        loginModal.classList.remove('open');
    }

    let currentBars = document.querySelectorAll('.current-bar');
    let btnMinus = document.querySelectorAll('.minus');
    let btnPlus = document.querySelectorAll('.plus');
    let statusCount = document.querySelectorAll('.status_count');
    let statusCountBox = document.querySelectorAll('.status_count_box');

    let capacityList = document.querySelectorAll('.capacity-bar.bar');
    let currentList = document.querySelectorAll('.current-bar.bar');

    let positionItems = document.querySelectorAll('.recruit-status .position .list>.item');


    let positionIds = [];
    let capacity = [];
    let current = [];

    for (let item of positionItems)
        positionIds.push(parseInt(item.dataset.id));

    for (let item of capacityList)
        capacity.push(parseInt(item.dataset.capacity));

    for (let item of currentList)
        current.push(parseInt(item.dataset.current));


    for (let i = 0; i < btnMinus.length; i++) {
        btnMinus[i].addEventListener('click', () => {
            if (current[i] > 0) current[i]--;
            refresh_status(i);
        });
    }
    for (let i = 0; i < btnPlus.length; i++) {
        btnPlus[i].addEventListener('click', () => {
            if (capacity[i] > current[i]) current[i]++;
            refresh_status(i);
        });
    }
    let refresh_status = (i) => {
        let currentRatio = (current[i] / capacity[i]) * 100;

        if (currentRatio === 100) {
            statusCountBox[i].classList.add('max');
        } else {
            statusCountBox[i].classList.remove('max');
        }

        currentBars[i].style.width = `${currentRatio}%`;
        statusCount[i].innerHTML = `${current[i]}/${capacity[i]}`;
    };

    for (let i = 0; i < capacityList.length; i++) {
        refresh_status(i);
    }

    let wishBtn = document.querySelector('.wish');

    wishBtn.onclick = function () {

        if (memberId === null) {
            loginModal.classList.add('open');
            return;
        }

        wishBtn.classList.toggle('active');

        let method = null;

        if (wishBtn.classList.contains('active'))
            method = "POST";
        else
            method = "DELETE";

        let url = `/api/wishs/${withId}`

        let config = {
            method,
            headers: {
                "Content-Type": "application/json",
                "x-csrf-token": csrfToken
            }
        }

        let promise = fetch(url, config);

    }

    let btnMenu = document.getElementById('btn-menu');
    let menuItemBox = document.getElementById('menu-item-box');

    if (btnMenu)
        btnMenu.onclick = function () {
            menuItemBox.classList.toggle('d:none');
        }


    let deleteButton = document.querySelector('#delete-button');
    let editButton = document.querySelector('#edit-button');

    let deleteModalBox = document.querySelector('.modal-box.delete');
    let copyModalBox = document.querySelector('.modal-box.copy');
    let editModalBox = document.querySelector('.modal-box.edit');
    let contactModalBox = document.querySelector('.modal-box.contact');
    let deleteModalOkButton = deleteModalBox.querySelector('.btn-yes');
    let copyModalOkButton = copyModalBox.querySelector('.btn-yes');
    let editModalOkButton = editModalBox.querySelector('.btn-yes');
    let contactModalOkButton = contactModalBox.querySelector('.btn-yes');
    let deleteModalNoButton = deleteModalBox.querySelector('.btn-no');

    let editCurrentButton = document.querySelector('#edit-current-btn');

    if (editCurrentButton)
        editCurrentButton.onclick = async () => {

            for (let i = 0; i < positionIds.length; i++) {
                let data = {
                    withId,
                    positionId: positionIds[i],
                    current: current[i]
                }
                await editCurrent(data);
            }

            editModalBox.classList.add('open');
        }

    editModalOkButton.onclick = () => {
        editModalBox.classList.remove('open');
    }

    contactModalOkButton.onclick = () => {
        contactModalBox.classList.remove('open');
    }

    const contactButton = document.querySelector('.contact-wish-box .contact');

    contactButton.onclick = (e) => {

        const el = e.target;

        let textarea = document.createElement('textarea');
        document.body.appendChild(textarea);
        textarea.value = el.dataset.contact;
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);

        contactModalBox.classList.add('open');
    };

    const shareButton = document.getElementById('btn-share');
    shareButton.onclick = () => {
        let url = '';
        let textarea = document.createElement('textarea');
        document.body.appendChild(textarea);
        url = location.href;
        textarea.value = url;
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);

        copyModalBox.classList.add('open');
    };

    copyModalOkButton.onclick = () => {
        copyModalBox.classList.remove('open');
    }


    deleteButton.onclick = () => {
        deleteModalBox.classList.add('open');
    }

    deleteModalNoButton.onclick = () => {
        deleteModalBox.classList.remove('open');
    }

    deleteModalOkButton.onclick = deleteWith;

    async function deleteWith() {
        let config = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "x-csrf-token": csrfToken
            }
        }

        let response = await fetch(`/api/withs/${withId}`, config);

        if (response.status === 204)
            location.href = "/with/list";

        if (response.status === 403) {
            try {
                throw new Error("삭제할 권한이 없습니다.");
            } catch (e) {
                alert(e);
                location.reload();
            }
        }
    }

    editButton.onclick = editWith;

    function editWith() {
        location.href = `/member/with/edit?id=${withId}`;
    }


    async function editCurrent(data) {
        let config = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "x-csrf-token": csrfToken
            },
            body: JSON.stringify(data)
        }

        let response = await fetch('/api/with-positions', config);

        if (response.status !== 200)
            throw new Error("수정에 실패했습니다");

        return true;
    }


})