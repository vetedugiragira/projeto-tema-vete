const catalog = [
  {
    id: 'xbox-series-x',
    category: 'consoles',
    name: 'Xbox Series X 1 TB',
    detail: '1 TB SSD • 4K • Preto',
    price: 449990,
    image: 'assets/xbox-series-x.webp',
    tint: 'purple',
    badge: 'Destaque',
    description: 'Console com SSD de 1 TB, leitor de discos e suporte a jogos em 4K. Inclui um controle sem fio Xbox.'
  },
  {
    id: 'galaxy-s24',
    category: 'celulares',
    name: 'Samsung Galaxy S24 256 GB',
    detail: '256 GB • 5G • Tela de 6,2″',
    price: 329990,
    image: 'assets/galaxy-s24.webp',
    tint: 'blue',
    description: 'Celular com 256 GB de armazenamento, tela AMOLED de 6,2 polegadas com taxa de atualização de até 120 Hz e câmera principal de 50 MP.'
  },
  {
    id: 'jbl-quantum-400',
    category: 'fones',
    name: 'Headset JBL Quantum 400',
    detail: 'Com fio • USB e P2 • Microfone',
    price: 49990,
    image: 'assets/jbl-quantum-400.webp',
    tint: 'lilac',
    description: 'Headset gamer com áudio JBL QuantumSURROUND no PC, microfone articulado com função mudo e conexões USB e de 3,5 mm.'
  },
  {
    id: 'fc-25',
    category: 'jogos',
    name: 'EA SPORTS FC™ 25 • PS5',
    detail: 'PlayStation 5 • Futebol • Mídia física',
    price: 29990,
    image: 'assets/fc-25.webp',
    tint: 'green',
    description: 'Jogo de futebol para PlayStation 5 com modo Carreira, Ultimate Team e partidas de cinco contra cinco no modo Rush.'
  },
  {
    id: 'iphone-15',
    category: 'celulares',
    name: 'Apple iPhone 15 128 GB',
    detail: '128 GB • 5G • Tela de 6,1″',
    price: 419990,
    image: 'assets/iphone-15.webp',
    tint: 'blue',
    description: 'iPhone com tela Super Retina XDR de 6,1 polegadas, Dynamic Island, câmera principal de 48 MP e porta USB-C.'
  },
  {
    id: 'pulse-elite',
    category: 'fones',
    name: 'Headset PlayStation PULSE Elite',
    detail: 'Sem fio • PlayStation Link • Bluetooth',
    price: 99990,
    image: 'assets/pulse-elite.webp',
    tint: 'lilac',
    description: 'Headset sem fio com alto-falantes planares magnéticos, microfone retrátil e conectividade PlayStation Link e Bluetooth.'
  },
  {
    id: 'switch-oled',
    category: 'consoles',
    name: 'Nintendo Switch OLED',
    detail: '64 GB • Tela OLED de 7″ • Joy-Con',
    price: 224990,
    image: 'assets/switch-oled.webp',
    tint: 'purple',
    description: 'Console híbrido com tela OLED de 7 polegadas, 64 GB de armazenamento interno, dois controles Joy-Con e base com porta de rede.'
  },
  {
    id: 'forza-horizon-5',
    category: 'jogos',
    name: 'Forza Horizon 5 • Xbox',
    detail: 'Xbox Series X e Xbox One • Corrida',
    price: 24990,
    image: 'assets/forza-horizon-5.webp',
    tint: 'green',
    description: 'Jogo de corrida em mundo aberto que leva o Festival Horizon ao México, com centenas de carros e paisagens variadas.'
  }
];

const categoryLabels = {
  celulares: "Celulares",
  fones: "Fones",
  consoles: "Consoles",
  jogos: "Jogos"
};

const currency = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL"
});

// Todos os cálculos usam valores inteiros em centavos.
function formatPrice(cents) {
  return currency.format(cents / 100);
}

function calculateCashPrice(total) {
  return Math.round(total * 9 / 10);
}

function describeInstallments(total, compact = false) {
  const base = Math.floor(total / 6);
  const remainder = total % 6;

  if (remainder === 0) {
    return `6× de ${formatPrice(base)}`;
  }

  if (compact) {
    return `6× de até ${formatPrice(base + 1)}`;
  }

  return `${remainder}× de ${formatPrice(base + 1)} + ${6 - remainder}× de ${formatPrice(base)}`;
}

function showMobileMenu() {
  const menuButton = document.querySelector("#menu-toggle");
  const navigation = document.querySelector("#site-nav");

  if (menuButton && navigation) {
    menuButton.addEventListener("click", () => {
      const menuOpen = navigation.classList.toggle("is-open");
      menuButton.setAttribute("aria-expanded", String(menuOpen));
    });
  }
}

function createProductCard(product, heading = "h2") {
  const card = document.createElement("article");
  card.className = "product-card";

  // O conteúdo do cartão vem exclusivamente do array estático de produtos.
  card.innerHTML = `
    <div class="product-media tint-${product.tint}">
      ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ""}
      <img src="${product.image}" alt="${product.name}" loading="lazy" width="443" height="443">
    </div>
    <div class="product-body">
      <span class="product-category">${categoryLabels[product.category]}</span>
      <${heading} class="product-name">${product.name}</${heading}>
      <p class="product-detail">${product.detail}</p>
      <div class="product-pricing">
        <p class="product-cash"><strong>${formatPrice(calculateCashPrice(product.price))}</strong> <span>à vista</span></p>
        <p class="product-installments">ou ${describeInstallments(product.price, true)}</p>
      </div>
      <a class="product-action" href="simulador.html?item=${encodeURIComponent(product.id)}" aria-label="Simular compra de ${product.name}">Simular compra</a>
    </div>
  `;

  return card;
}

function showFeaturedProducts() {
  const featured = document.querySelector("#featured-grid");
  if (featured) {
    const highlights = catalog.slice(0, 3);
    featured.replaceChildren(...highlights.map((product) => createProductCard(product, "h3")));
  }
}

function enableCatalog() {
  const grid = document.querySelector("#catalog-grid");

  if (!grid) {
    return;
  }

  const count = document.querySelector("#item-count");
  const total = document.querySelector("#catalog-total");
  const buttons = document.querySelectorAll(".filter-button[data-category]");

  function showCategory(category) {
    const products = catalog.filter((product) => category === "all" || product.category === category);
    const subtotal = products.reduce((sum, product) => sum + product.price, 0);

    grid.replaceChildren(...products.map((product) => createProductCard(product)));
    count.textContent = products.length === 1 ? "1 produto" : `${products.length} produtos`;
    total.textContent = formatPrice(subtotal);

    buttons.forEach((button) => {
      const active = button.dataset.category === category;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });
  }

  buttons.forEach((button) => {
    button.addEventListener("click", () => showCategory(button.dataset.category));
  });

  const category = new URLSearchParams(window.location.search).get("categoria");
  showCategory(Object.hasOwn(categoryLabels, category) ? category : "all");
}

function enableSimulator() {
  const form = document.querySelector("#simulator-form");

  if (!form) {
    return;
  }

  const productSelect = document.querySelector("#product-select");
  const quantity = document.querySelector("#quantity");
  const error = document.querySelector("#simulator-error");
  const result = document.querySelector("#simulation-result");

  catalog.forEach((product) => {
    productSelect.add(new Option(product.name, product.id));
  });

  const selectedId = new URLSearchParams(window.location.search).get("item");
  const initialProduct = catalog.find((product) => product.id === selectedId) ?? catalog[0];
  productSelect.value = initialProduct.id;

  function updateOutput(name, value) {
    const field = document.querySelector(`[data-output="${name}"]`);
    if (field) {
      field.textContent = value;
    }
  }

  function calculateTotal(focusOnError = false) {
    const units = Number(quantity.value);
    const product = catalog.find((item) => item.id === productSelect.value);

    productSelect.removeAttribute("aria-invalid");
    quantity.removeAttribute("aria-invalid");
    if (!product) {
      error.textContent = "Selecione um produto.";
      productSelect.setAttribute("aria-invalid", "true");
      result.hidden = true;
      if (focusOnError) {
        productSelect.focus();
      }
    } else if (quantity.value === "" || !Number.isInteger(units) || units < 1 || units > 99) {
      error.textContent = "Informe uma quantidade inteira de 1 a 99.";
      quantity.setAttribute("aria-invalid", "true");
      result.hidden = true;

      if (focusOnError) {
        quantity.focus();
      }
    } else {
      error.textContent = "";

      const subtotal = product.price * units;
      const cash = calculateCashPrice(subtotal);
      updateOutput("product", product.name);
      updateOutput("product-detail", product.detail);
      updateOutput("preview-category", categoryLabels[product.category]);
      updateOutput("subtotal", formatPrice(subtotal));
      updateOutput("cash", formatPrice(cash));
      updateOutput("installments", describeInstallments(subtotal));
      updateOutput("savings", formatPrice(subtotal - cash));

      const image = document.querySelector('[data-output="preview-image"]');
      if (image) {
        image.src = product.image;
        image.alt = product.name;
      }

      result.hidden = false;
    }
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    calculateTotal(true);
  });

  calculateTotal();
}

function enableSignup() {
  const form = document.querySelector("#signup-form");

  if (!form) {
    return;
  }

  const fields = form.elements;
  const status = document.querySelector("#signup-status");

  function setFieldError(name, message = "") {
    const error = document.querySelector(`#error-${name}`);
    error.textContent = message;

    if (message) {
      fields.namedItem(name).setAttribute("aria-invalid", "true");
    } else {
      fields.namedItem(name).removeAttribute("aria-invalid");
    }
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    status.textContent = "";

    const name = fields.namedItem("name").value.trim();
    const email = fields.namedItem("email");
    const phone = fields.namedItem("phone").value.trim();
    const birth = fields.namedItem("birth").value;
    const password = fields.namedItem("password").value;
    const confirmation = fields.namedItem("confirm").value;
    const today = new Date();
    const birthDate = new Date(`${birth}T00:00:00`);
    const nameParts = name.split(/\s+/);
    const validName = nameParts.length >= 2 && nameParts.every((part) =>
      /^[\p{L}\p{M}.'’\u2010-]+$/u.test(part) && /\p{L}/u.test(part)
    );
    const validEmail = !email.validity.typeMismatch && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());
    const phoneDigits = phone.replace(/\D/g, "");
    const validPhone = /^[\d\s().-]+$/.test(phone) && /^[1-9]\d{9,10}$/.test(phoneDigits);

    const rules = [
      ["name", validName, "Informe seu nome e sobrenome."],
      ["email", validEmail, "Informe um e-mail válido, como nome@exemplo.com."],
      ["phone", validPhone, "Informe um telefone com DDD e 10 ou 11 dígitos."],
      ["birth", birth !== "" && birthDate <= today, "Informe uma data de nascimento válida, até hoje."],
      ["password", password.length >= 8 && /\p{L}/u.test(password) && /\d/.test(password), "Use pelo menos 8 caracteres, com letras e números."],
      ["confirm", confirmation !== "" && confirmation === password, "Repita a mesma senha."],
      ["terms", fields.namedItem("terms").checked, "Marque a caixa para continuar."]
    ];

    let firstInvalid = null;

    rules.forEach(([field, valid, message]) => {
      setFieldError(field, valid ? "" : message);

      if (!valid && firstInvalid === null) {
        firstInvalid = fields.namedItem(field);
      }
    });

    if (firstInvalid) {
      firstInvalid.focus();
    } else {
      form.reset();
      status.textContent = "Cadastro validado! Esta é uma demonstração e os dados não foram armazenados.";
    }
  });

  form.querySelector('button[type="submit"]').disabled = false;

  form.addEventListener("input", (event) => {
    const field = event.target;
    if (field.hasAttribute("aria-invalid")) {
      setFieldError(field.name);
    }

    status.textContent = "";
  });
}

document.documentElement.classList.add("has-js");
showMobileMenu();
showFeaturedProducts();
enableCatalog();
enableSimulator();
enableSignup();
