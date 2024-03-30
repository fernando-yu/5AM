function logIn() {
  document.getElementById("error").style.display = "initial";
  
  return false;
}

function myReset() {
  document.getElementById("error").style.display = "none";
}

function emailCheck(self) {
  let regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const email = self.value;
  let errorMsg = document.getElementById("email-error");

  if (!regex.test(email)) {
    errorMsg.style.display = "block";
  }
  else {
    errorMsg.style.display = "none";
  }
}
