const profile_box = document.querySelector('.profile-box');
const profile_list_box = document.querySelector('.list-box');

profile_box.addEventListener('click', () => {
    profile_list_box.classList.toggle('d:none');
});
