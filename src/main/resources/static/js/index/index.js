import Modal from "/js/utils/lib/modal.js";

$(".main-slider-list").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    infinite: true,
    autoplay: true,
    prevArrow: false,
    nextArrow: false,
    autoplaySpeed: 5000,
    draggable: true,
});

window.addEventListener('load', function () {

    const modal = new Modal();
    let command;

    function showModal(config) {
        modal.title = config.title;
        modal.hasContent = config.hasContent;
        modal.content = config.content;
        modal.btnCount = config.btnCount;
        modal.btnMsg = config.btnMsg;
        modal.mainColor = "grey";
        modal.create();

        setTimeout(() => {
            modal.show();
        }, 100);
    }
 
    const noticeButtons = document.querySelectorAll('.notice');

    for (let noticeButton of noticeButtons) {
        noticeButton.onclick = (e) => {
            e.preventDefault();

            let config = {
                title: "준비 중인 기능입니다.",
                hasContent: false,
                content: "",
                btnCount: 1,
                btnMsg: [{msg: "확인"}]
            }

            const aside = document.querySelector('aside');
            aside.classList.remove('open');

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
})