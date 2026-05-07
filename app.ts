type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
};

type CartItem = Product & {
  quantity: number;
};

const products: Product[] = [
  { id: 1, name: "Waffle", price: 6, image: "https://images.unsplash.com/photo-1562376552-0d160a2f238d" },
  { id: 2, name: "Cake", price: 8, image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587" },
  { id: 3, name: "Ice Cream", price: 5, image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb" },
  { id: 4, name: "Brownie", price: 7, image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c" },
  { id: 5, name: "Macarons", price: 9, image: "https://images.unsplash.com/photo-1558326567-98ae2405596b" },
  { id: 6, name: "Cheesecake", price: 10, image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad" },
  { id: 7, name: "Donuts", price: 4, image: "https://images.unsplash.com/photo-1551024601-bec78aea704b" },
  { id: 8, name: "Cupcake", price: 5, image: "https://images.unsplash.com/photo-1486427944299-d1955d23e34d" }
];

let cart: CartItem[] = [];

const productsContainer = document.getElementById("products") as HTMLDivElement;
const cartContainer = document.getElementById("cart-items") as HTMLDivElement;
const totalEl = document.getElementById("total") as HTMLSpanElement;

const orderBtn = document.getElementById("order-btn") as HTMLButtonElement;
const message = document.getElementById("message") as HTMLParagraphElement;

// SHOW PRODUCTS
function displayProducts() {
  products.forEach(product => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <img src="${product.image}">
      <h3>${product.name}</h3>
      <p>$${product.price}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;

    productsContainer.appendChild(card);
  });
}

// ADD TO CART
(window as any).addToCart = (id: number) => {
  const product = products.find(p => p.id === id);
  if (!product) return;

  const item = cart.find(i => i.id === id);

  if (item) {
    item.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  renderCart();
};

// RENDER CART
function renderCart() {
  cartContainer.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    total += item.price * item.quantity;

    const div = document.createElement("div");
    div.classList.add("cart-item");

    div.innerHTML = `
      <span>${item.name} x${item.quantity}</span>
      <span>$${item.price * item.quantity}</span>
    `;

    cartContainer.appendChild(div);
  });

  totalEl.textContent = total.toString();
}

// ORDER BUTTON
orderBtn.addEventListener("click", () => {
  if (cart.length === 0) {
    message.style.color = "red";
    message.textContent = "Cart is empty!";
    return;
  }

  cart = [];
  renderCart();

  message.style.color = "green";
  message.textContent = "Order placed successfully 🎉";

  setTimeout(() => {
    message.textContent = "";
  }, 3000);
});

// INIT
displayProducts();