let url = window.location.href

let product = url.split('?')[1]

let image_displayed;

fetch("products_info.json")
  .then((response) => response.json())
  .then((productsInfo) => {
    let name = productsInfo[product]["name"];
    let price = productsInfo[product]["price"];
    let description = productsInfo[product]["description"];
    let images_path = productsInfo[product]["images_path"];
    let thumbnails = document.getElementsByClassName("thumbnail");
    let images = document.getElementsByClassName("product-image");

    document.title = name;
    document.getElementById("product-name").innerHTML = name;
    document.getElementById("product-price").innerHTML = price;
    document.querySelector("#product-description pre").innerHTML = description
    // document.getElementById("product-description").innerHTML = description;
    
    for (let i = 0; i < images_path.length; i++) {
      thumbnails[i].style.display = "initial";
      thumbnails[i].src = images_path[i];
      images[i].src = images_path[i];
    }

    images[0].style.display = "initial";
    image_displayed = images[0];
  })

function changeImage(i) {
  image_displayed.style.display = "none";
  image_displayed = document.getElementsByClassName("product-image")[i]
  image_displayed.style.display = "initial"
}

function addToCart() {
  let quantity = parseInt(document.getElementById("product-quantity").value);
  let cartInfo = JSON.parse(localStorage.YingZiTradingCart);
  let cartProducts = cartInfo["products"];

  const productInfo = {
    "name": product,
    "quantity": quantity
  };
  
  if (cartProducts.length == 0) {
    cartInfo["products"].push(productInfo);
  }
  else {
    let i = 0;
    let found = product == cartProducts[0]["name"];
    
    while (i < cartProducts.length - 1 && !found) {
      i++;
      found = product == cartProducts[i]["name"];
    }
    
    if (found) {
      cartInfo["products"][i]["quantity"] += quantity;
    }
    else {
      cartInfo["products"].push(productInfo);
    }
  }

  cartInfo["total_quantity"] += quantity;
  document.getElementById("cart-quantity").innerHTML = cartInfo["total_quantity"];
  
  localStorage.YingZiTradingCart = JSON.stringify(cartInfo);

  console.log(JSON.parse(localStorage.YingZiTradingCart));
}
