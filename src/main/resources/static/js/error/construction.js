window.addEventListener("load",function (){
    const btnBox = document.querySelector(".container .btn-box");

    btnBox.onclick = function (e) {
        e.preventDefault();
        let target = e.target;
        if (target.nodeName !== "A")
            return;
        if (target.classList.contains("back"))
            history.back();
        else if (target.classList.contains("index"))
            location.href = "/";
    }
});
