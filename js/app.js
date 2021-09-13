const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {

    const image = product.images;
    const div = document.createElement("div");

    div.classList.add("product");
    div.innerHTML = `<div class="single-product">
      <div>
    <img class="product-image" src=${product.image}></img>
      </div>
      <h3 class="text-white">${product.title}</h3>
      <p>Category: ${product.category}</p>
      <p>Rating Count: ${product.rating.count}</p>
      <p>Rating Rate: ${product.rating.rate}</p>
      <h2>Price: $ ${product.price}</h2>
      <div class="d-flex px-3 pb-3">
        <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="btn btn-success w-100 shadow-none rounded-0">Add to cart</button>
        <button id="details-btn" class="btn btn-primary w-100 shadow-none rounded-0">Details</button>
      </div>
      
      `;
    document.getElementById("all-products").appendChild(div);
    
  }
};
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);
  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
  updateTotal();

};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;

    // update value fixed
  document.getElementById(id).innerText =total.toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
    // update value fixed
  document.getElementById(id).innerText =value.toFixed(2);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
    // update value fixed
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};


