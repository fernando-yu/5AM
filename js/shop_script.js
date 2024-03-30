let productCounter = 0;

window.addEventListener("load", loadProducts)

function createProduct(productInfo, products, productsContainerDiv) {
  let productDiv = document.createElement("div");
  productDiv.className = "product";
  let aTag = document.createElement("a");
  aTag.href = `/product.html?${products[productCounter]}`;
  let productImgDiv = document.createElement("div");
  productImgDiv.className = "product-image";
  let imgElement = document.createElement("img");
  imgElement.src = productInfo["images_path"][0];
  let productInfoDiv = document.createElement("div");
  productInfoDiv.className = "product-info";
  let productNameDiv = document.createElement("div");
  productNameDiv.className = "product-name";
  productNameDiv.innerHTML = productInfo["name"];
  let productPriceDiv = document.createElement("div");
  productPriceDiv.className = "product-price";
  productPriceDiv.innerHTML = productInfo["price"]

  productInfoDiv.appendChild(productNameDiv);
  productInfoDiv.appendChild(productPriceDiv);
  productImgDiv.appendChild(imgElement);
  aTag.appendChild(productImgDiv);
  aTag.appendChild(productInfoDiv);
  productDiv.appendChild(aTag);
  productsContainerDiv.appendChild(productDiv)
}

function loadProducts() {
  fetch("products_info.json")
    .then((response) => response.json())
    .then((productsInfo) => {
      let products = Object.keys(productsInfo);
      let productsContainerDiv = document.getElementById("products-container");

      while (productCounter < 8 && productCounter < products.length) {
        let productInfo = productsInfo[products[productCounter]]

        createProduct(productInfo, products, productsContainerDiv);

        productCounter++;
      }
    })
}

function loadMore(self) {
  fetch("products_info.json")
    .then((response) => response.json())
    .then((productsInfo) => {
      let products = Object.keys(productsInfo);
      let productsContainerDiv = document.getElementById("products-container");

      do {
        let productInfo = productsInfo[products[productCounter]]

        createProduct(productInfo, products, productsContainerDiv);

        productCounter++;
      }  while (productCounter % 8 != 0 && productCounter < products.length)

      if (productCounter == products.length) {
        self.style.display = "none";
      }
    })
}