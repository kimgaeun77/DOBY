window.addEventListener("load", function () {
  let loginPage = this.document.querySelector(".login-page");
  let loginForm = loginPage.querySelector(".login-form");
  let username = loginPage.querySelector(".email");
  let password = loginPage.querySelector(".password");
  let loginBtn = loginPage.querySelector(".btn-login");
  let regUsername = /^(?=.*[A-Za-z])[A-Za-z\d]{5,15}$/;

  loginForm.oninput = function (e) {
    if (
      regUsername.test(username.value) &&
      username.value.length > 0 &&
      password.value.length > 0
    ) {
      loginBtn.classList.add("active");
    }
  };
  loginBtn.onclick = function (e) {
    if (!(regUsername.test(username.value) || username.value.length > 0))
      e.preventDefault();
    else loginForm.submit();
  };
});
