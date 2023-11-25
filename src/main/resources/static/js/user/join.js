window.addEventListener("load", function () {
  let joinForm = document.querySelector(".join-form");
  let inputEmail = joinForm.querySelector(".email-input-box");
  let inputPwd = joinForm.querySelector(".password-input-box");
  let inputUsername = joinForm.querySelector(".name-input-box");
  let inputPhone = joinForm.querySelector(".phone-input-box");
  let inputCertif = joinForm.querySelector(".certif-input-box");
  let btnCertif = joinForm.querySelector(".btn-certif");
  let boxToggle = joinForm.querySelector(".toggle");
  let btnToggle = joinForm.querySelector(".toggle-button");
  let privacyBoxToggle = joinForm.querySelector(".privacy .toggle");
  let privacyBtnToggle = joinForm.querySelector(".privacy .toggle-button");

  let realCertifNum;
  let btnJoin = joinForm.querySelector(".btn-join");
  btnJoin.disabled = true;
  var regMail =
    /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
  //*특문포함 비밀번호*
  var regPwd = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;
  //*특문제외 비밀번호*
  // var regPwd = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/
  // 이름
  let regUsername = /^(?=.*[A-Za-z])[A-Za-z\d]{5,15}$/;
  let regNickname = /^[가-힣a-zA-Z]{2,15}$/;
  let regPhone = /^01[016789]-\d{3,4}-\d{4}$/;
  let emailAllow;
  let privacyAllow;
  let phoneNum;
  const inputValue = {
    regMail: false,
    regPwd: false,
    regUsername: false,
    regPhone: false,
    regCertif: false,
  };
  const duple = { username: false, phone: false, email: false };


  joinForm.oninput = async function (e) {
    await checkRules();
  };

  inputEmail.oninput = function (e) {
    e.preventDefault();

    let warning = joinForm.querySelector(".email-input-box ~ .warning");
    let duplication = joinForm.querySelector(".email-input-box ~ .duplication");
    if (inputEmail.value.length < 1) {
      warning.classList.add("d:none");
    } else if (!regMail.test(inputEmail.value)) {
      warning.classList.remove("d:none");
      inputValue.regMail = false;
      return false;
    } else {
      warning.classList.add("d:none");
      inputValue.regMail = true;
    }
  };
  inputPwd.oninput = function (e) {
    e.preventDefault();
    let warning = joinForm.querySelector(".password-input-box ~ .warning");
    if (inputPwd.value.length < 1) {
      warning.classList.add("d:none");
    } else if (!regPwd.test(inputPwd.value)) {
      // if (warning.classList.contains("d:none"))
      warning.classList.remove("d:none");
      inputValue.regPwd = false;
      inputPwd.focus();
      return false;
    } else {
      warning.classList.add("d:none");
      inputValue.regPwd = true;
    }
  };
  inputUsername.oninput = async function (e) {
    e.preventDefault();

    let warning = joinForm.querySelector(".name-input-box ~ .warning");
    if (inputUsername.value.length < 1) {
      warning.classList.add("d:none");
    } else if (!regUsername.test(inputUsername.value)) {
      warning.classList.remove("d:none");
      inputValue.regUsername = false;
      inputUsername.focus();
      return false;
    } else {
      warning.classList.add("d:none");
      inputValue.regUsername = true;
    }
    const username = inputUsername.value;
  };
  inputPhone.oninput = function (e) {
    e.preventDefault();
    formatPhoneNumber();
    realCertifNum = undefined;
    let warning = joinForm.querySelector(".phone-input-certif ~ .warning");

    if (inputPhone.value.length < 1) {
      warning.classList.add("d:none");
    } else if (!regPhone.test(inputPhone.value)) {
      warning.classList.remove("d:none");
      inputValue.regPhone = false;
      if (btnCertif.classList.contains("active"))
        btnCertif.classList.remove("active");
      inputPhone.focus();
      return false;
    } else {
      warning.classList.add("d:none");
      btnCertif.classList.add("active");
      inputValue.regPhone = true;
    }
  };

  function formatPhoneNumber() {
    let phoneNumber = inputPhone.value.replace(/\D/g, ""); // 숫자 이외의 문자 제거
    const phoneNumberLength = phoneNumber.length;

    if (phoneNumberLength >= 4 && phoneNumberLength <= 7) {
      // 010- 부분 포맷팅
      phoneNumber = phoneNumber.replace(/(\d{3})(\d{1,3})/, "$1-$2");
    } else if (phoneNumberLength >= 8) {
      // 010-1111- 부분 포맷팅
      phoneNumber = phoneNumber.replace(/(\d{3})(\d{4})(\d{1,4})/, "$1-$2-$3");
    }

    inputPhone.value = phoneNumber;
    const phone = inputPhone.value;
    phoneNum = phone.replace(/-/g, "");
  }

  btnCertif.onclick = async function (e) {
    const randomNum = Math.floor(Math.random() * 900000) + 100000;
    let randomNumber = randomNum.toString(); // 문자열로 변환
    const requestBody = {
      from: phoneNum,
      to: phoneNum,
      text: `DOBY인증번호는 [${randomNumber}]입니다`,
    };

    let csrfToken = document.querySelector("#csrf");
    // 문자보내기
    const response = await fetch(`/api/send-one`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-TOKEN": csrfToken.content,
      },
      body: JSON.stringify(requestBody),
    });

    if (response.ok) {
      const data = await response.json();
    } else {
      console.error("요청 실패");
    }
  };

  async function receiveMessage() {
    //문자받기
    try {
      const getResponse = await fetch(`/api/get-message-list?p=${phoneNum}`);

      if (!getResponse.ok) {
        throw new Error(`HTTP error! Status: ${getResponse.status}`);
      }

      const responseText = await getResponse.text(); // 응답 본문을 텍스트로 가져옵니다.
      const responseJSON = JSON.parse(responseText); // JSON 형식의 텍스트를 JavaScript 객체로 파싱

      // 동적으로 messageList 객체 내의 첫 번째 속성을 사용
      const firstMessageKey = Object.keys(responseJSON.messageList)[0];

      if (
        responseJSON.messageList[firstMessageKey] &&
        responseJSON.messageList[firstMessageKey].text
      ) {
        const messageText = responseJSON.messageList[firstMessageKey].text;

        const regex = /\[(\d+)\]/; // 괄호 안에 있는 숫자를 추출하는 정규 표현식

        const match = messageText.match(regex); // 정규 표현식과 일치하는 부분을 찾습니다

        if (match) {
          realCertifNum = match[1]; // 두 번째 매치 그룹을 가져옵니다
        } else {
          console.log("일치하는 숫자가 없습니다.");
        }
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
    inputValue.regCertif = realCertifNum === inputCertif.value;
  }
  function checkRules() {
     let submitRequirements = // 아래 조건을 모두 충족할 시 제출 버튼 활성화.
      inputValue.regMail && // 아이디가 입력되었는가?
      inputValue.regPwd && // 비밀번호가 입력되었는가?
      inputValue.regUsername && //유저네임이 입력되었는가?
      inputValue.regPhone && //휴대전화번호가 입력되었는가?
      privacyAllow == 1 &&
      inputCertif.value.length >= 6; //인증번호가 6자이상 입력되었는가?
    if (submitRequirements) {
      if (!btnJoin.classList.contains("active"))
        btnJoin.classList.add("active");
      btnJoin.disabled = false;
    } else {
      if (btnJoin.classList.contains("active"))
        btnJoin.classList.remove("active");
      btnJoin.disabled = true;
    }
  }
  boxToggle.onclick = function (e) {
    boxToggle.classList.toggle("active");
    if (boxToggle.classList.contains("active")) emailAllow = 1;
    else emailAllow = 0;
  };

  privacyBoxToggle.onclick = function (e) {
    privacyBoxToggle.classList.toggle("active");
    if (privacyBoxToggle.classList.contains("active")) privacyAllow = 1;
    else privacyAllow = 0;
    checkRules();
  };

  let privacyPolicy = joinForm.querySelector(".privacy-policy");
  privacyPolicy.onclick = function (e) {
    window.open("privacy-policy", "개인정보 수집 및 이용동의", "width=600,height=400");
  };

  joinForm.addEventListener("submit", async function (event) {
    event.preventDefault(); // 기본 제출 동작을 막습니다.

    // 사용자가 입력한 username을 가져옵니다.
    // 서버로 아이디 중복 검사 요청을 보냅니다.
    let usernameAlready = joinForm.querySelector(".name-input-box ~ .already");
    let phoneAlready = joinForm.querySelector(
      ".phone-input-certif-box .already"
    );
    let emailAlready = joinForm.querySelector(".email-input-box ~ .already");
    let notMatchCertif = joinForm.querySelector(
      ".certif-number-box .notMatchCertif"
    );

    let response = await fetch(
      "/api/members/uniqueCheck?u=" +
        inputUsername.value +
        `&p=` +
        inputPhone.value +
        `&e=` +
        inputEmail.value
    )
      .then(async (response) => {
        await receiveMessage();
        return response.text();
      })
      .then((data) => {
        // data에 원하는 값을 얻게 됩니다.
        if (data === "usernameAlready") {
          if (usernameAlready.classList.contains("d:none"))
            usernameAlready.classList.remove("d:none");
          if (!phoneAlready.classList.contains("d:none")) {
            phoneAlready.classList.add("d:none");
          }
          if (!emailAlready.classList.contains("d:none"))
            emailAlready.classList.add("d:none");
        } else if (data === "phoneAlready") {
          if (!usernameAlready.classList.contains("d:none"))
            usernameAlready.classList.add("d:none");
          if (phoneAlready.classList.contains("d:none")) {
            phoneAlready.classList.remove("d:none");
          }
          if (!emailAlready.classList.contains("d:none"))
            emailAlready.classList.add("d:none");
        } else if (data === "emailAlready") {
          if (!usernameAlready.classList.contains("d:none"))
            usernameAlready.classList.add("d:none");
          if (!phoneAlready.classList.contains("d:none")) {
            phoneAlready.classList.add("d:none");
          }
          if (emailAlready.classList.contains("d:none"))
            emailAlready.classList.remove("d:none");
        } else if (realCertifNum !== inputCertif.value) {
          if (!usernameAlready.classList.contains("d:none"))
            usernameAlready.classList.add("d:none");
          if (!phoneAlready.classList.contains("d:none")) {
            phoneAlready.classList.add("d:none");
          }
          if (!emailAlready.classList.contains("d:none"))
            emailAlready.classList.add("d:none");
          if (notMatchCertif.classList.contains("d:none"))
            notMatchCertif.classList.remove("d:none");
        } else {
          joinForm.submit();
        }
      })
      .catch((error) => {
        console.error("에러 발생:", error);
      });
  });
});
