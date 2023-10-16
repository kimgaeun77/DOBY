window.addEventListener('load', function () {
    let profileBox = document.querySelector('.profile-box');
    let profileListBox = document.querySelector('.list-box');

    profileBox.onclick = () => {
        profileListBox.classList.toggle('d:none');
    }

    const menuButton = document.querySelector('#header-menu-btn');
    const aside = document.querySelector('aside');

    menuButton.onclick = () => {
        aside.classList.toggle('open');
    }
})