const pword = document.getElementById("account_password");
const toogleEye = document.querySelector(".fa");

toogleEye.addEventListener("click", () => {
  if (toogleEye.classList.contains("fa-eye")) {
    toogleEye.classList.remove("fa-eye");
    toogleEye.classList.add("fa-eye-slash");

    pword.setAttribute("type", "text");
  } else {
    toogleEye.classList.remove("fa-eye-slash");
    toogleEye.classList.add("fa-eye");

    pword.setAttribute("type", "password");
  }
});

const updatePw = document.querySelector(".update-pw");
const pw = document.querySelector(".password-update");

updatePw.addEventListener("click", () => {
  pw.classList.toggle("show");
  if (updatePw.textContent == "Update Password") {
    updatePw.textContent = "Cansel Password Update";
  } else {
    updatePw.textContent = "Update Password";
  }
});
