window.addEventListener('load', function () {

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

        let radio = element.querySelector('input[type="radio"');
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
        if (deadlineInput.dataset.placeholder == '' || deadlineInput.dataset.placeholder == null) deadlineInput.dataset.placeholder = '날짜를 선택해주세요.';
    }

    /* 모집기한 과거는 선택 못하게*/
    let now_utc = Date.now();
    let timeOff = new Date().getTimezoneOffset() * 60000;
    let today = new Date(now_utc - timeOff).toISOString().split('T')[0];
    deadlineInput.setAttribute('min', today);

    /* 진행기간 */
    let periodInput = document.querySelector('#period-value');
    let periodBox = document.querySelector('#period-box');
    let periodLable = periodBox.querySelector('.label');
    let periodSelectList = periodBox.querySelector('.list');
    let periodWarning = periodBox.querySelector('.warning');

    periodLable.onclick = () => {
        periodLable.classList.toggle('up');
        periodSelectList.classList.toggle('d:none');
    };

    periodSelectList.onclick = function (e) {
        let element = e.target;
        if (element.tagName !== 'LI') return

        periodLable.classList.toggle('up');
        periodWarning.classList.add('d:none');
        periodSelectList.classList.add('d:none');
        periodLable.innerHTML = element.innerHTML;
        periodInput.value = element.dataset.id;
    }

    /* 기술스택 & 포지션 */
    let techPositionBox = document.querySelector('#tech-position-box');
    let selectUL = techPositionBox.querySelector('.total-list');
    let minusButton = techPositionBox.querySelector('.btn.minus');
    let plusButton = techPositionBox.querySelector('.btn.plus');
    let techPositionList = techPositionBox.querySelector('.total-list');
    let currentSelect = techPositionList.querySelector('.tech-box .list');
    let techPositionWarning = techPositionBox.querySelector('.warning');
    let itemCount = 1;

    selectUL.onclick = function (e) {

        let element = e.target;
        let isVaild = element.classList.contains('label') || element.classList.contains('item');

        if (!isVaild) return;

        if (element.classList.contains('label')) {
            // debugger;
            techPositionWarning.classList.add('d:none');

            let list = element.parentNode.querySelector('.list');
            element.classList.toggle('up');
            if (currentSelect === list) {
                list.classList.toggle('d:none');
                return;
            }
            currentSelect.classList.add('d:none')
            list.classList.remove('d:none');
            currentSelect = list;
        } else {
            let list = element.parentNode;
            let box = list.parentNode;

            let label = box.querySelector('.label');
            let input = box.querySelector('input');

            label.innerHTML = element.innerHTML;
            input.value = element.dataset.value;

            list.classList.add('d:none');
            label.classList.toggle('up');
        }
    }

    plusButton.onclick = () => {
        if (itemCount == 10)
            return;

        itemCount++;

        let template =
            `<li class="item">
                <div class="tech-box">
                    <div class="label h:cursor">기술 스택</div>
                    <input type="hidden" name="tech" class="tech">
                    <ul class="list d:none">
                        <li class="item" data-value="1">Java</li>
                        <li class="item" data-value="2">Spring</li>
                        <li class="item" data-value="3">Kotlin</li>
                        <li class="item" data-value="4">JavaScript</li>
                        <li class="item" data-value="5">TypeScript</li>
                        <li class="item" data-value="6">Node.js</li>
                        <li class="item" data-value="7">React</li>
                        <li class="item" data-value="8">Vue</li>
                        <li class="item" data-value="9">Angular</li>
                        <li class="item" data-value="10">Python</li>
                        <li class="item" data-value="11">Django</li>
                    </ul>
                </div>
                <div class="position-box">
                    <div class="label h:cursor">포지션</div>
                    <input type="hidden" name="position" class="position">
                    <ul class="list d:none">
                        <li class="item" data-value="1">백엔드</li>
                        <li class="item" data-value="2">프론트엔드</li>
                        <li class="item" data-value="3">퍼블리셔</li>
                    </ul>
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
        if (itemCount == 1) {
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

        let radio = element.querySelector('input[type="radio"');
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

    /* 취소 버튼 */

    let cancelBox = document.querySelector('#cancel-box');
    let cancelButton = cancelBox.querySelector('.cancel')

    cancelButton.onclick = function () {
        console.log("눌림");
        history.back();
    }

    /* 폼 */
    let form = document.querySelector('#form');

    function checkValid(inputArray, warningArray) {

        let size = inputArray.length;
        let isVaild = true;

        for (let i = 0; i < size; i++)
            if (inputArray[i].value == '' || inputArray[i].value == null) {
                warningArray[i].classList.remove('d:none');
                isVaild = false;
            }

        return isVaild;
    }


    function checkSelectValid(techList, positionList, capacityList) {

        let isVaild = true;
        let size = techList.length;
        let warning = techPositionBox.querySelector('.warning');

        for (let i = 0; i < size; i++)
            if (techList[i].value == "" || positionList[i].value == "" || capacityList[i].value == "") {
                warning.classList.remove('d:none');
                isVaild = false;
                return isVaild;
            }


        if (!isVaild) return;

        warning.classList.add('d:none');
        return isVaild;
    }

    form.onsubmit = function () {
        let contentInput = document.querySelector('#content-box').querySelector('input[type="hidden"]');
        contentInput.value = editor.getData();

        let inputArray = [deadlineInput, periodInput, titleInput, contentInput, contactInput];
        let warningArray = [deadlineWarning, periodWarning, titleWarning, contentWarning, contactWarning];

        let itemList = document.querySelector('.total-list');
        let techList = itemList.querySelectorAll('.tech');
        let positionList = itemList.querySelectorAll('.position');
        let capacityList = itemList.querySelectorAll('.capacity');

        let isInputVaild = checkValid(inputArray, warningArray);
        let isSelectVaild = checkSelectValid(techList, positionList, capacityList);

        return isInputVaild && isSelectVaild;
    }
});
