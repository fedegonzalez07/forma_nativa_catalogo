// Productos
const products = [
  {
    id: 1,
    name: "Velador Geométrico Hexagonal",
    price: 15000,
    description: "Velador con diseño geométrico hexagonal, impreso en PLA biodegradable con acabado natural",
    category: "Veladores",
    featured: true,
  },
  {
    id: 2,
    name: "Lámpara Colgante Orgánica",
    price: 25000,
    description: "Lámpara colgante con formas orgánicas inspiradas en la naturaleza, material 100% reciclable",
    category: "Lámparas",
    featured: true,
  },
  {
    id: 3,
    name: "Velador Minimalista Cilíndrico",
    price: 12000,
    description: "Diseño minimalista de bajo impacto ambiental, perfecto para espacios conscientes",
    category: "Veladores",
  },
  {
    id: 4,
    name: "Lámpara de Mesa Paramétrica",
    price: 18000,
    description: "Lámpara de mesa con diseño paramétrico único, optimizada para eficiencia energética",
    category: "Lámparas",
  },
  {
    id: 5,
    name: "Velador Artístico Espiral",
    price: 20000,
    description: "Velador con forma espiral que maximiza la difusión de luz LED de bajo consumo",
    category: "Veladores",
  },
  {
    id: 6,
    name: "Lámpara Modular Hexagonal",
    price: 30000,
    description: "Sistema modular sustentable que crece con tus necesidades, reduciendo el consumo",
    category: "Lámparas",
  },
]

// Estado global
let cart = []
let currentFilter = "Todos"

// Inicialización
document.addEventListener("DOMContentLoaded", () => {
  loadProducts()
  updateCartBadge()
})

// Cargar productos
function loadProducts() {
  const productsGrid = document.getElementById("productsGrid")
  const filteredProducts =
    currentFilter === "Todos" ? products : products.filter((product) => product.category === currentFilter)

  productsGrid.innerHTML = filteredProducts
    .map(
      (product) => `
        <div class="product-card">
            <div class="product-image">
                <i class="fas fa-lightbulb"></i>
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-footer">
                    <span class="product-price">$${product.price.toLocaleString()}</span>
                    <button class="add-btn" onclick="addToCart(${product.id})">Agregar</button>
                </div>
            </div>
        </div>
    `,
    )
    .join("")
}

// Filtrar productos
function filterProducts(category) {
  currentFilter = category

  // Actualizar botones activos
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.classList.remove("active")
  })
  event.target.classList.add("active")

  loadProducts()
}

// Agregar al carrito
function addToCart(productId) {
  const product = products.find((p) => p.id === productId)
  const existingItem = cart.find((item) => item.id === productId)

  if (existingItem) {
    existingItem.quantity += 1
  } else {
    cart.push({ ...product, quantity: 1 })
  }

  updateCartBadge()
  showNotification(`${product.name} agregado al carrito`)
}

// Actualizar badge del carrito
function updateCartBadge() {
  const badge = document.getElementById("cartBadge")
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
  badge.textContent = totalItems
  badge.style.display = totalItems > 0 ? "flex" : "none"
}

// Mostrar/ocultar carrito
function toggleCart() {
  const modal = document.getElementById("cartModal")
  const isActive = modal.classList.contains("active")

  if (isActive) {
    modal.classList.remove("active")
  } else {
    loadCartItems()
    modal.classList.add("active")
  }
}

// Cargar items del carrito
function loadCartItems() {
  const cartItems = document.getElementById("cartItems")
  const cartTotal = document.getElementById("cartTotal")
  const orderForm = document.getElementById("orderForm")

  if (cart.length === 0) {
    cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <p>Tu carrito está vacío</p>
            </div>
        `
    cartTotal.style.display = "none"
    orderForm.style.display = "none"
  } else {
    cartItems.innerHTML = cart
      .map(
        (item) => `
            <div class="cart-item">
                <div class="cart-item-image">
                    <i class="fas fa-lightbulb"></i>
                </div>
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">$${item.price.toLocaleString()}</div>
                </div>
                <div class="cart-item-controls">
                    <button class="qty-btn" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">
                        <i class="fas fa-minus"></i>
                    </button>
                    <span>${item.quantity}</span>
                    <button class="qty-btn" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
            </div>
        `,
      )
      .join("")

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    cartTotal.innerHTML = `
            <span>Total:</span>
            <span class="cart-total-price">$${total.toLocaleString()}</span>
        `
    cartTotal.style.display = "flex"
    orderForm.style.display = "block"
  }
}

// Actualizar cantidad
function updateQuantity(productId, newQuantity) {
  if (newQuantity <= 0) {
    cart = cart.filter((item) => item.id !== productId)
  } else {
    const item = cart.find((item) => item.id === productId)
    if (item) {
      item.quantity = newQuantity
    }
  }

  updateCartBadge()
  loadCartItems()
}

// Mostrar/ocultar menú
function toggleMenu() {
  const modal = document.getElementById("menuModal")
  modal.classList.toggle("active")
}

// Mostrar consultas
function showConsultas() {
  document.getElementById("menuModal").classList.remove("active")
  document.getElementById("consultasModal").classList.add("active")
}

// Mostrar contacto
function showContacto() {
  document.getElementById("menuModal").classList.remove("active")
  document.getElementById("contactoModal").classList.add("active")
}

// Cerrar modales
function closeConsultas() {
  document.getElementById("consultasModal").classList.remove("active")
}

function closeContacto() {
  document.getElementById("contactoModal").classList.remove("active")
}

// Manejar envío de pedido
document.getElementById("orderForm").addEventListener("submit", function (e) {
  e.preventDefault()

  if (cart.length === 0) {
    showNotification("El carrito está vacío", "error")
    return
  }

  const formData = new FormData(this)
  const customerInfo = {
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    address: formData.get("address") || "No especificada",
    notes: formData.get("notes") || "Ninguna",
  }

  if (!customerInfo.name || !customerInfo.email || !customerInfo.phone) {
    showNotification("Por favor completa todos los campos obligatorios", "error")
    return
  }

  // Crear formulario para FormSubmit
  const submitForm = document.createElement("form")
  submitForm.action = "https://formsubmit.co/alejandro.gon052130@gmail.com"
  submitForm.method = "POST"
  submitForm.style.display = "none"

  // Agregar campos
  const fields = {
    _subject: `🛒 NUEVO PEDIDO - Forma Nativa - ${customerInfo.name}`,
    Nombre: customerInfo.name,
    Email: customerInfo.email,
    Teléfono: customerInfo.phone,
    Dirección: customerInfo.address,
    Productos: cart
      .map((item) => `${item.name} x${item.quantity} - $${(item.price * item.quantity).toLocaleString()}`)
      .join("\n"),
    Total: `$${cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toLocaleString()}`,
    Notas: customerInfo.notes,
    _next: window.location.href,
    _captcha: "false",
  }

  Object.entries(fields).forEach(([key, value]) => {
    const input = document.createElement("input")
    input.type = "hidden"
    input.name = key
    input.value = value
    submitForm.appendChild(input)
  })

  document.body.appendChild(submitForm)
  submitForm.submit()
  document.body.removeChild(submitForm)

  // Limpiar carrito y formulario
  cart = []
  updateCartBadge()
  this.reset()
  toggleCart()

  showNotification("¡Pedido enviado! Te contactaremos pronto.")
})

// Mostrar notificaciones
function showNotification(message, type = "success") {
  const notification = document.createElement("div")
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === "error" ? "#dc3545" : "#28a745"};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        z-index: 3000;
        font-weight: 500;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `
  notification.textContent = message

  document.body.appendChild(notification)

  // Animar entrada
  setTimeout(() => {
    notification.style.transform = "translateX(0)"
  }, 100)

  // Remover después de 3 segundos
  setTimeout(() => {
    notification.style.transform = "translateX(100%)"
    setTimeout(() => {
      document.body.removeChild(notification)
    }, 300)
  }, 3000)
}

// Cerrar modales al hacer clic fuera
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("modal")) {
    e.target.classList.remove("active")
  }
})

// Manejar tecla Escape
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    document.querySelectorAll(".modal.active").forEach((modal) => {
      modal.classList.remove("active")
    })
  }
})
