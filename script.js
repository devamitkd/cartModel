const cartIcon = document.querySelector('#header_bag');
const cart = document.querySelector('.cart');
const cartClose = document.querySelector('#cart_close');

cartIcon.addEventListener('click', () => cart.classList.add('active'));
cartClose.addEventListener('click', () => cart.classList.remove('active'));

let addCartBtn = document.querySelectorAll('.add_cart');

addCartBtn.forEach( button => {
  button.addEventListener('click', event => {
    let productBox = event.target.closest('.product_box');
    addToCart(productBox);
  });
});

let cartContainer = document.querySelector('.cart_container');
let addToCart = productBox => {
  let productImg = productBox.querySelector('img').src;
  let productName = productBox.querySelector('.product_name').textContent;
  let productPrice = productBox.querySelector('.price').textContent;
  
  let cartBox = document.createElement('div');
  cartBox.classList.add('cart_box');
  cartBox.innerHTML = `
    <img src="${productImg}" alt="">
        <div class="cart_detail">
          <h2 class="cart_product_name">${productName}</h2>
          <span class="cart_product_price">${productPrice}</span>
          <div class="cart_quantity">
            <button id="decrement">-</button>
            <span class="number">1</span>
            <button id="increment">+</button>
          </div>
        </div>
        <i class="fa-solid fa-trash cart_remove"></i>
  `;
  cartContainer.appendChild(cartBox);
  
  cartBox.querySelector('.cart_remove').addEventListener('click', () => {
    cartBox.remove();
    updateCartItemCount(-1);
    updateTotalPrice();

  });
  updateCartItemCount(1);
  updateTotalPrice();
};

let updateTotalPrice = () => {
  let totalPrice = document.querySelector('.total_price');
  let cartBoxes = cartContainer.querySelectorAll('.cart_box');
  let total = 0;

  cartBoxes.forEach( cartBox => {
    let individualPrice = cartBox.querySelector('.cart_product_price');
    let quantityElement = cartBox.querySelector('.number');
    let price = individualPrice.textContent.replace('$', '');
    let quantity = quantityElement.textContent;
    total += price * quantity;
  });
  totalPrice.textContent = `$ ${total}`;
};

let cartItemcount = 0;
let updateCartItemCount = change => {
  let cartCountIcon = document.querySelector('.cart_item_count');
  cartItemcount += change;
  if(cartItemcount > 0 ){
    cartCountIcon.style.visibility = "visible";
    cartCountIcon.textContent = cartItemcount;
  } else {
    cartCountIcon.style.visibility = "hidden";
    cartCountIcon.textContent = "";
  }
};