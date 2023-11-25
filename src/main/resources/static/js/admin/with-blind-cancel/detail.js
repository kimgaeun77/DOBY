window.addEventListener("load", function () {
    let withInfo = document.querySelector(".board-info")
    let btnDots = withInfo.querySelector(".dots-btn")
    let dotsList = withInfo.querySelector(".list")
    let statuses = dotsList.querySelectorAll(".item")

    btnDots.onclick = function (e) {
        dotsList.classList.toggle("d:none")
    };

    for (i = 0; i < statuses.length; i++) {
        statuses[i].onclick = async function (e) {
            let status = e.target.innerHTML;
            let statusNum = 1;
            if (status === "처리중")
                statusNum = 1;
            else if (status === "승인") statusNum = 2;
            else if (status === "거절") statusNum = 3;
            let curUrl = new URL(window.location.href); //현재주소
            const id = curUrl.searchParams.get("id"); //현재주소에서 글 id 추출
            let url = `/api/with-blind-cancels?id=` + id + `&s=` + statusNum;
            let csrfToken = document.querySelector("#csrf")

            let response = await fetch(url, {
                method: "PUT", headers: {
                    'Content-Type': 'application/json',
                    "X-CSRF-TOKEN": csrfToken.content
                },
            });
            dotsList.classList.toggle("d:none")

        };
    }

});
