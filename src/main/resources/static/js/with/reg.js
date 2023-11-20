import {editor} from '/js/utils/ckeditor/content.js';

window.addEventListener('load', function () {

    const csrfToken = document.querySelector('#csrf').content;
    const memberId = document.querySelector('#member-id').content;

    /* 뒤로가기 버튼 */
    let backButton = document.querySelector('#back-btn');

    backButton.onclick = function () {
        history.back();
    };

    /* 카테고리 */
    let categoryBox = document.querySelector('#category-box');
    let categoryButtonBox = categoryBox.querySelector('.btn-box');
    let activeCategoryButton = categoryBox.querySelector('.active');

    categoryButtonBox.onclick = function (e) {
        let element = e.target;

        if (!element.classList.contains('btn')) return

        activeCategoryButton.classList.remove('active');
        element.classList.add('active');
        activeCategoryButton = element;

        let radio = element.querySelector('input[type="radio"]');
        radio.checked = true;
    }

    /* 진행방식 */
    let wayBox = document.querySelector('#way-box');
    let wayButtonBox = wayBox.querySelector('.btn-box');
    let activeWayButton = wayBox.querySelector('.active');

    wayButtonBox.onclick = function (e) {
        let element = e.target;

        if (!element.classList.contains('btn')) return

        activeWayButton.classList.remove('active');
        element.classList.add('active');
        activeWayButton = element;

        let radio = element.querySelector('input[type="radio"]');
        radio.checked = true;
    }

    /* 모집기한 */
    let deadlineBox = document.querySelector('#deadline-box');
    let deadlineInput = deadlineBox.querySelector('#deadline');
    let deadlineWarning = deadlineBox.querySelector('.warning');

    deadlineInput.onclick = () => {
        deadlineWarning.classList.add('d:none');
    };

    deadlineInput.onchange = () => {
        deadlineInput.dataset.placeholder = deadlineInput.value;
        if (deadlineInput.dataset.placeholder === '' || deadlineInput.dataset.placeholder == null) deadlineInput.dataset.placeholder = '날짜를 선택해주세요.';
    }

    /* 모집기한 과거는 선택 못하게*/
    let now_utc = Date.now();
    let timeOff = new Date().getTimezoneOffset() * 60000;
    let today = new Date(now_utc - timeOff).toISOString().split('T')[0];
    deadlineInput.setAttribute('min', today);

    /* 진행기간 */
    let periodInput = document.querySelector('#period-value');
    let periodBox = document.querySelector('#period-box');
    let periodLabel = periodBox.querySelector('.label');
    let periodSelectList = periodBox.querySelector('.list');
    let periodWarning = periodBox.querySelector('.warning');

    periodLabel.onclick = () => {
        periodLabel.classList.toggle('up');
        periodSelectList.classList.toggle('d:none');
    };

    periodSelectList.onclick = function (e) {
        let element = e.target;
        if (element.tagName !== 'LI') return

        periodLabel.classList.toggle('up');
        periodWarning.classList.add('d:none');
        periodSelectList.classList.add('d:none');
        periodLabel.innerHTML = element.innerHTML;
        periodInput.value = element.dataset.id;
    }

    /* 기술스택 */

    let techSelectBox = document.querySelector('#tech-select-box');
    let label = techSelectBox.querySelector('.label');
    let selectBox = techSelectBox.querySelector('.select-box');
    let placeholder = techSelectBox.querySelector('.select-placeholder');
    let selectList = selectBox.querySelector('.list');
    let selectedList = techSelectBox.querySelector('.selected-box .list');

    let techData = [];
    let selectedCount = 0;

    async function getTechList() {
        let response = await fetch(`/api/techs`);
        return await response.json();
    }

    getTechList().then(data => {

        for (const item of data)
            item.isSelect = false;

        techData = data;
        renderSelectList();
    })

    function renderSelectList() {
        selectedList.innerHTML = "";
        selectList.innerHTML = "";
        selectedCount = 0;
        for (const tech of techData) {

            if (tech.isSelect) {
                selectedCount++;
                let template = `<li class="item" data-id="${tech.id}">
                                           <div>${tech.name}</div>
                                           <div class="btn-box"><button type="button" class="icon icon-x">삭제</button></div>
                                       </li>`;
                selectedList.insertAdjacentHTML("beforeend", template);
            } else {
                let template = `<li class="item" data-id="${tech.id}">${tech.name}</li>`;
                selectList.insertAdjacentHTML("beforeend", template);
            }

        }

        if (selectedCount === 0)
            placeholder.classList.remove('d:none')
        else
            placeholder.classList.add('d:none')
    }


    label.onclick = (e) => {
        let element = e.target;

        if (!(element.classList.contains('label')
            || element.classList.contains('select-placeholder')
            || element.classList.contains('list')))
            return;

        selectBox.classList.toggle('d:none');
        label.classList.toggle('up');

        let warning = techSelectBox.querySelector('.warning');
        warning.classList.add('d:none');
    }

    selectBox.onclick = (e) => {
        let element = e.target;

        if (!element.classList.contains('item'))
            return;

        selectBox.classList.toggle('d:none');
        label.classList.toggle('up');

        let techId = parseInt(element.dataset.id);

        let index = techData.findIndex(e => e.id === techId);

        techData[index].isSelect = true;


        renderSelectList();
    }

    selectedList.onclick = (e) => {
        let element = e.target;

        if (!element.classList.contains('icon'))
            return;

        let techItem = element.parentNode.parentNode;

        let techId = parseInt(techItem.dataset.id);

        let index = techData.findIndex(e => e.id === techId);
        techData[index].isSelect = false;
        renderSelectList();

    }

    /* 포지션 */
    let techPositionBox = document.querySelector('#tech-position-box');
    let selectUL = techPositionBox.querySelector('.total-list');
    let minusButton = techPositionBox.querySelector('.btn.minus');
    let plusButton = techPositionBox.querySelector('.btn.plus');
    let techPositionList = techPositionBox.querySelector('.total-list');
    let currentSelect = techPositionList.querySelector('.position-box .list');
    let techPositionWarning = techPositionBox.querySelector('.warning');
    let duplicateWarning = techPositionBox.querySelector('.warning-duplicate');
    let currentElement = null;
    let itemCount = 1;

    let clickCount = 0;

    selectUL.onclick = function (e) {

        let element = e.target;

        if (clickCount === 0)
            currentElement = element

        clickCount++;

        let isValid = element.classList.contains('label') || element.classList.contains('item');

        if (!isValid) return;

        if (element.classList.contains('label')) {

            techPositionWarning.classList.add('d:none');
            duplicateWarning.classList.add('d:none');
            let list = element.parentNode.querySelector('.list');
            currentSelect.classList.remove('up');
            element.classList.toggle('up');

            if (currentSelect === list) {
                list.classList.toggle('d:none');
                return;
            }
            currentSelect.classList.add('d:none');
            list.classList.remove('d:none');
            currentSelect = list;
            if (clickCount !== 0)
                currentElement.classList.remove('up');
            currentElement = element;
        } else {
            let list = element.parentNode;

            if (list.classList.contains('total-list'))
                return;

            let box = list.parentNode;

            let label = box.querySelector('.label');
            let input = box.querySelector('input');

            label.innerHTML = element.innerHTML;
            input.value = element.dataset.value;

            list.classList.add('d:none');
            label.classList.toggle('up');
        }
    }

    let positionList = []

    async function getPositionList() {
        let response = await fetch(`/api/positions`);
        return await response.json();
    }

    getPositionList().then(data => {

        for (const p of data) {
            p.isSelect = false;
        }

        positionList = data;


    })

    plusButton.onclick = createPositionSelect;

    function createPositionSelect() {
        if (itemCount === positionList.length)
            return;
        itemCount++;

        let list = "";

        for (const p of positionList)
            list += `<li class="item" data-value="${p.id}">${p.name}</li>`


        let template =
            `<li class="item">
                <div class="position-box">
                    <div class="label h:cursor">포지션</div>
                    <input type="hidden" name="position" class="position">
                    <ul class="list d:none">` + list + `</ul>
                </div>
                <div class="capacity-box">
                    <div class="label h:cursor">인원수</div>
                    <input type="hidden" name="capacity" class="capacity">
                    <ul class="list d:none">
                        <li class="item" data-value="1">1명</li>
                        <li class="item" data-value="2">2명</li>
                        <li class="item" data-value="3">3명</li>
                        <li class="item" data-value="4">4명</li>
                        <li class="item" data-value="5">5명</li>
                    </ul>
                </div>
            </li>`

        techPositionList.insertAdjacentHTML("beforeend", template);
    };


    minusButton.onclick = () => {
        if (itemCount === 1) {
            return;
        }
        itemCount--;
        techPositionList.removeChild(techPositionList.lastChild);
    };

    /* 제목 */
    let titleBox = document.querySelector('#title-box');
    let titleInput = titleBox.querySelector('.board-title');
    let titleWarning = titleBox.querySelector('.warning');

    titleInput.oninput = function (e) {
        titleWarning.classList.add('d:none');
    }

    /* 연락 방법 */
    let contactBox = document.querySelector('#contact-box');
    let contactButtonBox = contactBox.querySelector('.btn-box');
    let activeContactButton = contactButtonBox.querySelector('.active');
    let contactInput = contactBox.querySelector('.contact-link');

    let contactWarning = contactBox.querySelector('.warning');

    contactButtonBox.onclick = function (e) {
        let element = e.target;

        if (!element.classList.contains('btn')) return

        activeContactButton.classList.remove('active');
        element.classList.add('active');
        activeContactButton = element;

        let radio = element.querySelector('input[type="radio"]');
        radio.checked = true;
    }

    contactInput.oninput = function () {
        contactWarning.classList.add('d:none');
    }


    /* 내용 */
    let contentBox = document.querySelector('#content-box');
    let contentInput = contentBox.querySelector('.ck.ck-content');
    let contentWarning = contentBox.querySelector('.warning');

    contentInput.onclick = function () {
        contentWarning.classList.add('d:none');
    }


    function checkValid(inputArray, warningArray) {

        let size = inputArray.length;
        let isValid = true;

        for (let i = 0; i < size; i++)
            if (inputArray[i].value === '' || inputArray[i].value == null) {
                warningArray[i].classList.remove('d:none');
                isValid = false;
            }

        return isValid;
    }


    function checkSelectValid(positionList, capacityList) {

        let isValid = true;
        let size = positionList.length;
        let warning = techPositionBox.querySelector('.warning');

        for (let i = 0; i < size; i++)
            if (positionList[i].value === "" || capacityList[i].value === "") {
                warning.classList.remove('d:none');
                isValid = false;
                return isValid;
            }


        if (!isValid) return;

        warning.classList.add('d:none');
        return isValid;
    }

    let submitButton = document.querySelector('#submit');


    function checkSelectTech(count) {

        let warning = techSelectBox.querySelector('.warning');
        if (count === 0)
            warning.classList.remove('d:none');
        else
            warning.classList.add('d:none');

        return count !== 0;
    }

    function checkDuplicatePosition(list) {

        let isNotDuplicate = true;

        loop: for (const e1 of list)
            for (const e2 of list) {
                if (e1 === e2) continue;
                if (e1.value === e2.value) {
                    isNotDuplicate = false;
                    break loop;
                }
            }

        if (!isNotDuplicate)
            duplicateWarning.classList.remove('d:none');

        return isNotDuplicate;
    }

    submitButton.onclick = async function () {

        let contentInput = document.querySelector('#content-box').querySelector('input[type="hidden"]');
        contentInput.value = editor.getData();

        let inputArray = [deadlineInput, periodInput, titleInput, contentInput, contactInput];
        let warningArray = [deadlineWarning, periodWarning, titleWarning, contentWarning, contactWarning];

        let itemList = document.querySelector('.total-list');
        let positionList = itemList.querySelectorAll('.position');
        let capacityList = itemList.querySelectorAll('.capacity');

        let isInputValid = checkValid(inputArray, warningArray);
        let isSelectValid = checkSelectValid(positionList, capacityList);
        let isSelectTech = checkSelectTech(selectedCount);

        let isNotDuplicatePosition = checkDuplicatePosition(positionList);

        let techSelectList = [];

        for (const tech of techData)
            if (tech.isSelect)
                techSelectList.push(tech.id);

        if (isInputValid && isSelectValid && isSelectTech && isNotDuplicatePosition) {

            let categoryValue = document.querySelector('input[name="c"]:checked').value;
            let wayValue = document.querySelector('input[name="w"]:checked').value;
            let contactValue = document.querySelector('input[name="ct"]:checked').value;

            let data = {
                title: titleInput.value,
                content: contentInput.value,
                deadline: deadlineInput.value,
                periodId: periodInput.value,
                categoryId: categoryValue,
                wayId: wayValue,
                contactId: contactValue,
                link: contactInput.value
            }

            let withId = await submitWith(data);

            let capacityInputList = document.querySelectorAll('input[name="capacity"]');
            let positionInputList = document.querySelectorAll('input[name="position"]');

            let techSubmitResult = false;
            let positionSubmitResult = false;

            for (let i = 0; i < capacityInputList.length; i++) {

                if (capacityInputList[i].value === 0)
                    continue;

                let positionData = {
                    withId,
                    "positionId": positionInputList[i].value,
                    "capacity": capacityInputList[i].value
                }
                positionSubmitResult = await submitPosition(positionData);
            }


            for (const techId of techSelectList) {
                let data = {withId, techId}
                techSubmitResult = await submitTech(data);
            }

            if (techSubmitResult && positionSubmitResult)
                location.href = `/with/detail?id=${withId}`;

        }

    }

    const submitWith = async (data) => {

        let config = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-csrf-token": csrfToken
            },
            body: JSON.stringify(data)
        }

        const response = await fetch("/api/withs", config);

        if (response.status === 201) {
            const data = await response.json();
            return data.id;
        }
    }

    const submitTech = async (data) => {

        let config = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-csrf-token": csrfToken
            },
            body: JSON.stringify(data)
        }

        const response = await fetch("/api/with-techs", config);

        if (response.status === 200)
            return true;
    }

    const submitPosition = async (data) => {

        let config = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-csrf-token": csrfToken
            },
            body: JSON.stringify(data)
        }

        const response = await fetch("/api/with-positions", config);

        if (response.status === 200)
            return true;
    }


    const cancelModalBox = document.querySelector('.modal-box.cancel');
    const cancelModalOkButton = cancelModalBox.querySelector('.btn-yes');
    const cancelModalNoButton = cancelModalBox.querySelector('.btn-no');


    /* 취소 버튼 */

    let cancelBox = document.querySelector('#cancel-box');

    cancelBox.onclick = () => {
        cancelModalBox.classList.add('open');
    }

    cancelModalOkButton.onclick = () => {
        history.back();
    }

    cancelModalNoButton.onclick = () => {
        cancelModalBox.classList.remove('open');
    }

});