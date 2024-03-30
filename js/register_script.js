let regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

function signUp() {
  const password = document.getElementById("password").value;
  const cpassword = document.getElementById("cpassword").value;
  const email = document.getElementById("email").value;

  if (!regex.test(email)) {
    return false;
  }

  if (password != cpassword) {
    document.getElementById("error").style.display = "block";
    return false;
  }
  else {
    return true;
  }
}

function emailCheck(self) {
  const email = self.value;
  let errorMsg = document.getElementById("email-error");

  if (!regex.test(email)) {
    errorMsg.style.display = "block";
  }
  else {
    errorMsg.style.display = "none";
  }
}
