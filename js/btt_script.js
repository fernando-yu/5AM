window.onscroll = function showScrollBtn() {
  let btn = document.getElementById("back-to-top")

  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    btn.style.display = "block";
  } else {
    btn.style.display = "none";
  }
}

function backToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}