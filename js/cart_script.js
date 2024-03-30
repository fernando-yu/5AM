if (!localStorage.YingZiTradingCart) {
  const emptyCart = {
    "total_quantity": 0,
    "products": []
  };
  localStorage.YingZiTradingCart = JSON.stringify(emptyCart);
}

function updateCartQuantity() {
  document.getElementById("cart-quantity").innerHTML = JSON.parse(localStorage.YingZiTradingCart)["total_quantity"];
}

function updateSummary() {
  let subtotal = document.getElementById("subtotal-price");
  let total = document.getElementById("total-price");
  let prices = document.querySelectorAll(".price p");
  let totalPrice = 0;

  for (let i = 0; i < prices.length; i++) {
    totalPrice += parseFloat(prices[i].innerHTML.split('$')[1]);
  }
  let price = '$' + totalPrice.toFixed(2);
  subtotal.innerHTML = price;
  total.innerHTML = price;
}

function updateCartInfo() {
  let cartInfo = JSON.parse(localStorage.YingZiTradingCart);
  let cartProducts = cartInfo["products"];

  if (cartInfo["total_quantity"] == 0) {
    document.getElementById("empty-cart").style.display = "initial";
    document.getElementById("products-list").style.display = "none";
  }
  else {
    document.getElementById("empty-cart").style.display = "none";
    document.getElementById("products-list").style.display = "initial";

    fetch("products_info.json")
      .then((response) => response.json())
      .then((productsInfo) => {
        let productsList = document.getElementById("products-list");

        for (let i = 0; i < cartProducts.length; i++) {
          let product = cartProducts[i]["name"];
          let image = productsInfo[product]["images_path"][0];
          let name = productsInfo[product]["name"];
          let quantity = cartProducts[i]["quantity"];
          let price = '$' + (quantity * parseFloat(productsInfo[product]["price"].split('$')[1])).toFixed(2);

          let productInfoDiv = document.createElement("div");
          productInfoDiv.className = "product-info";
          let productDiv = document.createElement("div");
          productDiv.className = "product";
          let productImgDiv = document.createElement("div");
          productImgDiv.className = "product-img";
          let imgElement = document.createElement("img");
          imgElement.src = image;
          let productNameDiv = document.createElement("div");
          productNameDiv.className = "product-name"
          let productNameP = document.createElement("p");
          productNameP.innerHTML = name;
          let quantityDiv = document.createElement("div");
          quantityDiv.className = "quantity";
          let productQuantityInput = document.createElement("input");
          productQuantityInput.type = "number";
          productQuantityInput.name = product;
          productQuantityInput.className = "product-quantity";
          productQuantityInput.value = quantity;
          productQuantityInput.min = "1";
          productQuantityInput.addEventListener("change", () => {updateCart(productQuantityInput)});
          let priceDiv = document.createElement("div");
          priceDiv.className = "price";
          let priceB = document.createElement("b");
          let priceP = document.createElement("p");
          priceP.innerHTML = price;
          let removeDiv = document.createElement("div");
          removeDiv.className = "remove";
          removeDiv.id = product;
          removeDiv.addEventListener("click", () => {removeProduct(removeDiv.id)});
          let removeB = document.createElement("b");
          let removeP = document.createElement("p");
          removeP.innerHTML = "Remove";

          productImgDiv.appendChild(imgElement);
          productNameDiv.appendChild(productNameP);
          productDiv.appendChild(productImgDiv);
          productDiv.appendChild(productNameDiv);
          quantityDiv.appendChild(productQuantityInput);
          priceB.appendChild(priceP);
          priceDiv.appendChild(priceB);
          removeB.appendChild(removeP);
          removeDiv.appendChild(removeB);
          productInfoDiv.appendChild(productDiv);
          productInfoDiv.appendChild(quantityDiv);
          productInfoDiv.appendChild(priceDiv);
          productInfoDiv.appendChild(removeDiv);
          productsList.appendChild(productInfoDiv);
        }

        updateSummary();
      })
  }
}

let webUrl = window.location.href

window.addEventListener("load", updateCartQuantity);
if (webUrl.includes("cart")) {
  window.addEventListener("load", updateCartInfo);
}

function updateCart(product) {
  let newQuantity = parseInt(product.value);
  let cartInfo = JSON.parse(localStorage.YingZiTradingCart);
  let cartProducts = cartInfo["products"];
  let i = 0;
  let found = product.name == cartProducts[0]["name"];

  while (i < cartProducts.length - 1 && !found) {
    i++;
    found = product.name == cartProducts[i]["name"];
  }
  
  let difference = newQuantity - cartProducts[i]["quantity"];
  cartInfo["total_quantity"] += difference;
  cartInfo["products"][i]["quantity"] = newQuantity;
  localStorage.YingZiTradingCart = JSON.stringify(cartInfo);
  updateCartQuantity();
  
  fetch("products_info.json")
    .then((response) => response.json())
    .then((productsInfo) => {
      let price = document.querySelectorAll(".price p")[i];
      let newPrice = '$' + (newQuantity  * parseFloat(productsInfo[product.name]["price"].split('$')[1])).toFixed(2);

      price.innerHTML = newPrice;

      updateSummary();
    })

}

function removeProduct(product) {
  let cartInfo = JSON.parse(localStorage.YingZiTradingCart);
  let cartProducts = cartInfo["products"];
  let i = 0;
  let found = product == cartProducts[0]["name"];

  while (i < cartProducts.length - 1 && !found) {
     i++;
     found = product == cartProducts[i]["name"];
  }

  let products = document.getElementsByClassName("product-info");
  products[i].remove();

  cartInfo["total_quantity"] -= cartProducts[i]["quantity"];
  cartProducts.splice(i, 1);
  
  localStorage.YingZiTradingCart = JSON.stringify(cartInfo);

  updateCartQuantity();
  updateSummary();

  if (cartInfo["total_quantity"] == 0) {
    document.getElementById("empty-cart").style.display = "initial";
    document.getElementById("products-list").style.display = "none";
  }
}