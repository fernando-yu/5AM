function loadSlides() {
  let slideIndex = 2;

  showSlides();

  function showSlides() {
    let i;
    let slides = document.getElementsByClassName("slide");
    let dots = document.getElementsByClassName("dot");
    
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";  
    }
    
    slideIndex++;
    
    if (slideIndex > slides.length) {
      slideIndex = 1
    }
    
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";
    setTimeout(showSlides, 3000); // Change image every 2 seconds
  }
}

window.addEventListener("load", loadSlides)

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function emailCheck() {
  var regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const email = document.getElementById("contact-us-email").value;

  if (!regex.test(email)) {
    console.log("Please enter a valid email")
  }
}

function send() {
  const name = document.getElementById("contact-us-name").value;
  const email = document.getElementById("contact-us-email").value;
  const subject = document.getElementById("contact-us-subject").value;
  const body = document.getElementById("contact-us-body").value;

  const d = new Date();
  const day = days[d.getUTCDay()];
  const month = months[d.getUTCMonth()];
  const date = d.getUTCDate();
  const year = d.getUTCFullYear();
  const hours = d.getUTCHours();
  const minutes = d.getUTCMinutes();
  const seconds = d.getUTCSeconds();

  const message = `On ${day}, ${month} ${date}, ${year} at ${hours}:${minutes}:${seconds}, ${name} <${email}> wrote:\nSubject: ${subject}\n${body}`;

  console.log(message);

  // alert(message)
}