// MENU TOGGLE
const myMenu = document.querySelector('.menu-toggle');
const myList = document.querySelector('.nav-list');

myMenu.addEventListener('click', () => {
    myMenu.classList.toggle('show');
    myList.classList.toggle('show');
});

// CLOSE THE NAV WHEN NAVLNKS ARE CLICKED
let navLinks = document.querySelectorAll('.nav-list a');

navLinks.forEach(function (navLink) {
    navLink.addEventListener('click', function () {
        myList.classList.remove('show');
    })
})

// LOGIN AND SIGN UP FORM SLIDER
var LoginForm = document.getElementById("LoginForm");
var RegForm = document.getElementById("RegForm");
var Indicator = document.getElementById("Indicator");


function register() {
    RegForm.style.transform = "translateX(0px)";
    LoginForm.style.transform = "translateX(0px)";
    Indicator.style.transform = "translateX(100px)";
}

function login() {
    RegForm.style.transform = "translateX(300px)";
    LoginForm.style.transform = "translateX(300px)";
    Indicator.style.transform = "translateX(0px)";
}

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function openingcart() {
    const cartContainer = document.getElementById("cart-container");
    //const dishesContainer = document.querySelector(".dishes");
  
    if (cartContainer.style.display !== "block") {
      cartContainer.style.display = "block";
      updateCartDisplay();
      
    }
    else {
        cartContainer.style.display = "none";
    }
  }
  
  function result() {
    
    const clickedElement = document.activeElement;
    const itemValue = clickedElement.getAttribute("value");
    const itemPrice = parseFloat(
      clickedElement.parentElement.parentElement.querySelector('small').textContent.slice(1)
    );
    const itemImage = clickedElement.parentElement.parentElement.previousElementSibling.querySelector('img').src;
  
    const cartItem = {
      name: itemValue,
      price: itemPrice,
      quantity: 1,
      image: itemImage,
    };
    console.log(cartItem);
    alert(cartItem.name + " added to cart");
  
    addToCart(cartItem);
    updateCartDisplay();
    //event.preventDefault();
  }
  
 
  
  function addToCart(item) {
    const existingItem = cart.find((cartItem) => cartItem.name === item.name);
    if (existingItem) {
      existingItem.quantity++;
      existingItem.price += item.price;
    } else {
      cart.push(item);
    }
    console.log(item);
    localStorage.setItem('cart', JSON.stringify(cart));
  }
  
  function updateCartDisplay() {
    const cartItemsContainer = document.getElementById("cart-items");
    cartItemsContainer.innerHTML = "";
    let total = 0;
    console.log(cart);
    cart.forEach((item) => {
      const cartItemHTML = `
              <li>
                  <div class="cart-item-details">
                      <h3>${item.name}</h3>
                      <div class="cart-item-price">
                          <span>Price: $${item.price}</span>
                          <div class="quantity-controls">
                              <button class="quantity-btn minus" onclick="updateQuantity('${
                                item.name
                              }', -1)">-</button>
                              <span class="quantity">${item.quantity}</span>
                              <button class="quantity-btn plus" onclick="updateQuantity('${
                                item.name
                              }', 1)">+</button>
                          </div>
                      </div>
                  </div>
              </li>
          `;
  
      cartItemsContainer.innerHTML += cartItemHTML;
      total += item.price * item.quantity;
    });
  
    const cartTotal = document.getElementById("cart-total");
    cartTotal.textContent = `$${total.toFixed(2)}`;
    const cartContainer = document.getElementById("cart-container");
    cartContainer.style.backgroundColor = "white";
    cartContainer.style.color = "black";
  }
  
  function updateQuantity(itemName, change) {
    console.log(itemName);
    const item = cart.find((cartItem) => cartItem.name === itemName);
    if (item) {
      item.quantity += change;
      if (item.quantity < 1) {
        cart.splice(cart.indexOf(item), 1);
      }
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
  }
  
  function closingcart() {
    const cartContainer = document.getElementById("cart-container");
    const cartCloseButton = document.getElementById("cart-close");
    const dishesContainer = document.querySelector(".dishes");
    cartCloseButton.addEventListener("click", () => {
      cartContainer.style.display = "none";
      if(dishesContainer) {
        dishesContainer.style.gridTemplateColumns = "repeat(3, 1fr)";
      dishesContainer.style.width = "92%";
      }
      
    });
    cartContainer.addEventListener("click", (event) => {
      event.stopPropagation();
    });
  }