$(".slider-list").slick({
    slidesToShow: 4,
    slidesToScroll: 4,
    adaptiveHeight: true, // 슬라이더 높이 현재 슬라이드 높이로 설정
    // 커스텀 버튼 설정
    prevArrow: false,
    nextArrow: false,
    infinite: false, // 무한 반복 안함
    autoplay: false,

    // 반응형
    responsive: [
        {
            // 760보다 작을때
            breakpoint: 850,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3
            }

        },

        {
            breakpoint: 650,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
            },
        },

        {
            breakpoint: 450,
            settings: {
                slidesToShow: 1.5,
                slidesToScroll: 1,
            },
        }
    ]
});
