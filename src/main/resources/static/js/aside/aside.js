window.addEventListener('load', function () {
    const aside = document.querySelector('aside');
    const asideCloseButton = aside.querySelector('.close-btn');

    asideCloseButton.onclick = () => {
        aside.classList.toggle('open');
    }
})