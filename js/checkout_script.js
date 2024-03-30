function loadCart() {
  let cartInfo = JSON.parse(localStorage.YingZiTradingCart);
  let cartProducts = cartInfo["products"];
  document.querySelector("#cart-quantity b").innerHTML = cartInfo["total_quantity"];
  var total = 0;

  for (let i = 0; i < cartProducts.length; i++) {
    fetch("products_info.json")
      .then((response) => response.json())
      .then((productsInfo) => {
        let product = cartProducts[i]["name"];
        let quantity = cartProducts[i]["quantity"];
        let subtotal = (quantity * parseFloat(productsInfo[product]["price"].split('$')[1]));
        total += subtotal;
        let subtotalPrice = '$' + subtotal.toFixed(2);

        let cartContainer = document.getElementById("cart-container");

        let pTag = document.createElement("p");
        let aTag = document.createElement("a");
        aTag.href = `product.html?${product}`
        let nameSpan = document.createElement("span");
        nameSpan.className = "product-name";
        nameSpan.innerHTML = productsInfo[product]["name"];
        let priceSpan = document.createElement("span");
        priceSpan.className = "price";
        priceSpan.innerHTML = subtotalPrice;

        aTag.appendChild(nameSpan);
        pTag.appendChild(aTag);
        pTag.appendChild(priceSpan);
        cartContainer.appendChild(pTag);
        document.querySelector("#total-price b").innerHTML = '$' + total.toFixed(2);
      })
  }
}

window.addEventListener("load", loadCart);

function formatCCNumber(input) {
  console.log(input.value);
  let size = input.value.trim().length;
  let len = input.value.length;
  let number = input.value;

  if (size > 4 && size % 4 == 1) {
    console.log(input.value);
    input.value = number.slice(0, len - 1) + ' ' + number.slice(len - 1);
    console.log(input.value);
  }
}

function checkCCNumber() {
  let ccnum = document.getElementById("ccnum");

  return ccnum.length >= 15;
}

function submit() {
  return false;
  // alert("asdasdsa")
  // if (checkCCNumber()) {
  //   window.location.href = "verify-payment";
  //   alert("Credit Card Number correct");
  // }
  // else {
  //   alert("Credit Card Number incorrect");
  //   return false;
  // }
}

// 1111 11111
// 0123456789