/* =========================================================
   CONFIGURACIÓN — edita aquí número de WhatsApp y productos
   ========================================================= */
const WHATSAPP = "51935791691"; // ← número real con código de país, sin + ni espacios

// Precios de ejemplo (S/). Cámbialos por los reales.
const PRODUCTS = [
  {
    id: "ayacucho", name: "Ayacucho", origin: "Anco, La Mar", producer: "Nilda Ircañaupa",
    variety: "Geisha", process: "Lavado", altitude: "1,750 msnm",
    notes: "Manzana roja, toques de limón, té negro, miel", tags: ["frutal", "especial"],
    price: 65, label: { style: "white", color: "#7b2fa8" }, badge: "Geisha",
  },
  {
    id: "cusco", name: "Cusco", origin: "Santa Teresa, La Convención", producer: "Augusto Alarcón",
    variety: "Típica · Bourbon", process: "Lavado", altitude: "1,950 msnm",
    notes: "Caramelo, caña, especias", tags: ["dulce"],
    price: 52, label: { style: "white", color: "#b0563b" },
  },
  {
    id: "cajamarca", name: "Cajamarca", origin: "Huabal, Jaén", producer: "Aníbal, Óscar y Dianita Ramírez",
    variety: "Caturra · Típica · Catimor", process: "Lavado", altitude: "1,800 msnm",
    notes: "Chocolate, lima, vainilla, nueces pecanas", tags: ["dulce"],
    price: 48, label: { style: "white", color: "#e2762e" },
  },
  {
    id: "caturra", name: "Caturra", origin: "San Ignacio, Cajamarca", producer: "Miguel Padilla · Finca El Mirador",
    variety: "Caturra", process: "Lavado", altitude: "1,900 msnm",
    notes: "Panela, frutos rojos, cacao", tags: ["dulce", "frutal"],
    price: 50, label: { style: "solid", color: "#16707a" },
  },
  {
    id: "bourbon", name: "Bourbon", origin: "San Ignacio, Cajamarca", producer: "Edición especial",
    variety: "Bourbon", process: "Lavado", altitude: "1,850 msnm",
    notes: "Durazno, caramelo, cuerpo sedoso", tags: ["especial", "frutal"],
    price: 58, label: { style: "solid", color: "#e2512a" }, badge: "Edición especial",
  },
  {
    id: "amazonas", name: "Amazonas", origin: "Rodríguez de Mendoza", producer: "Pequeños productores",
    variety: "Típica · Catuaí", process: "Lavado", altitude: "1,700 msnm",
    notes: "Chocolate oscuro, nuez, cítrico suave", tags: ["dulce"],
    price: 48, label: { style: "solid", color: "#1f5c3d" },
  },
  {
    id: "puno", name: "Puno", origin: "Sandia", producer: "Cooperativa de la selva puneña",
    variety: "Bourbon · Típica", process: "Lavado", altitude: "1,800 msnm",
    notes: "Floral, mandarina, panela", tags: ["frutal"],
    price: 55, label: { style: "white", color: "#2f6fb0" },
  },
  {
    id: "cold-brew", name: "Cold Brew 1:8", origin: "Extracción 24 h", producer: "Listo para tomar",
    notes: "Suave, dulce y refrescante. Botella de 250 ml.", tags: ["dulce"],
    price: 15, photo: "img/ig/11.webp", variants: ["Botella 250 ml", "Pack x4"], variantPrices: [15, 55],
  },
];

const GRIND = ["250 g · En grano", "250 g · Molido para filtro", "250 g · Molido para espresso", "250 g · Molido para prensa"];

/* ========================================================= */

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const money = (n) => "S/ " + n.toFixed(2);
const waLink = (text) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;

/* --- Render productos --- */
function bagHTML(p) {
  if (p.photo) {
    return `<div class="bag bag--photo"><img src="${p.photo}" alt="${p.name}" loading="lazy"></div>`;
  }
  const solid = p.label.style === "solid";
  const style = solid ? `--c:${p.label.color}` : `--c2:${p.label.color}`;
  return `
    <div class="bag">
      ${p.badge ? `<span class="bag__tag">${p.badge}</span>` : ""}
      <div class="bag__body">
        <div class="label label--${solid ? "solid" : "white"}" style="${style}">
          <div class="label__meta"><span>${p.variety}</span><span>${p.process}</span><span>${p.altitude}</span></div>
          <div>
            <div class="label__name">${p.name}</div>
            <div class="label__origin">${p.origin}</div>
          </div>
        </div>
      </div>
    </div>`;
}

function cardHTML(p) {
  const variants = p.variants || GRIND;
  return `
    <article class="card" data-tags="${p.tags.join(" ")}">
      ${bagHTML(p)}
      <div class="card__row">
        <h3 class="card__title">${p.name}</h3>
        <span class="card__price" data-price="${p.id}">${money(p.price)}</span>
      </div>
      <p class="card__notes">${p.notes}${p.producer ? ` · <em>${p.producer}</em>` : ""}</p>
      <div class="card__opts">
        <select aria-label="Presentación de ${p.name}" data-variant="${p.id}">
          ${variants.map((v, i) => `<option value="${i}">${v}</option>`).join("")}
        </select>
        <button class="btn" data-add="${p.id}">Agregar</button>
      </div>
    </article>`;
}

$("#product-grid").innerHTML = PRODUCTS.map(cardHTML).join("");

const priceOf = (p, vi = 0) => (p.variantPrices ? p.variantPrices[vi] : p.price);
$$("[data-price]").forEach((el) => {
  const p = PRODUCTS.find((x) => x.id === el.dataset.price);
  el.textContent = money(priceOf(p));
});
$$("select[data-variant]").forEach((sel) =>
  sel.addEventListener("change", () => {
    const p = PRODUCTS.find((x) => x.id === sel.dataset.variant);
    sel.closest(".card").querySelector(".card__price").textContent = money(priceOf(p, +sel.value));
  })
);

/* --- Filtros --- */
$$(".chip").forEach((chip) =>
  chip.addEventListener("click", () => {
    $$(".chip").forEach((c) => c.classList.toggle("is-active", c === chip));
    const f = chip.dataset.filter;
    $$(".card").forEach((card) => {
      card.hidden = f !== "all" && !card.dataset.tags.split(" ").includes(f);
    });
  })
);

/* --- Carrito --- */
let cart = [];
try { cart = JSON.parse(localStorage.getItem("alzamora-cart")) || []; } catch { cart = []; }
// Refresca nombre, variante y precio desde PRODUCTS por si cambiaron desde la última visita
cart = cart.flatMap((l) => {
  const p = PRODUCTS.find((x) => x.id === l.id);
  const vi = +String(l.key).split("|")[1];
  const variant = p && (p.variants || GRIND)[vi];
  return variant ? [{ ...l, name: p.name, variant, price: priceOf(p, vi) }] : [];
});
const save = () => { try { localStorage.setItem("alzamora-cart", JSON.stringify(cart)); } catch {} };

function addToCart(id, vi) {
  const p = PRODUCTS.find((x) => x.id === id);
  const variant = (p.variants || GRIND)[vi];
  const key = id + "|" + vi;
  const line = cart.find((l) => l.key === key);
  line ? line.qty++ : cart.push({ key, id, name: p.name, variant, price: priceOf(p, vi), qty: 1 });
  save(); renderCart(true);
  toast(`${p.name} agregado al carrito`);
}

function renderCart(bump) {
  const count = cart.reduce((n, l) => n + l.qty, 0);
  const total = cart.reduce((n, l) => n + l.qty * l.price, 0);
  const badge = $(".cart-count");
  badge.textContent = count;
  if (bump) { badge.classList.remove("bump"); void badge.offsetWidth; badge.classList.add("bump"); }

  $(".drawer__items").innerHTML = cart.length
    ? cart.map((l) => `
        <li>
          <div><div class="item__name">${l.name}</div><div class="item__var">${l.variant} · ${money(l.price)}</div></div>
          <div class="qty">
            <button data-dec="${l.key}" aria-label="Quitar uno">−</button><span>${l.qty}</span><button data-inc="${l.key}" aria-label="Agregar uno">+</button>
          </div>
        </li>`).join("")
    : `<li class="empty">Tu carrito está vacío.<br>¡Elige un café!</li>`;
  $(".total").textContent = money(total);

  const checkout = $(".checkout");
  checkout.setAttribute("aria-disabled", cart.length ? "false" : "true");
  const msg = "Hola Coffee Bear ☕, quiero hacer este pedido:\n\n" +
    cart.map((l) => `• ${l.qty} × ${l.name} (${l.variant}) — ${money(l.qty * l.price)}`).join("\n") +
    `\n\nTotal: ${money(total)}\n\nNombre:\nDirección de entrega:`;
  checkout.href = waLink(msg);
}

document.addEventListener("click", (e) => {
  const add = e.target.closest("[data-add]");
  if (add) {
    const sel = $(`select[data-variant="${add.dataset.add}"]`);
    addToCart(add.dataset.add, sel ? +sel.value : 0);
  }
  const inc = e.target.closest("[data-inc]");
  const dec = e.target.closest("[data-dec]");
  if (inc || dec) {
    const line = cart.find((l) => l.key === (inc || dec).dataset[inc ? "inc" : "dec"]);
    line.qty += inc ? 1 : -1;
    if (line.qty <= 0) cart = cart.filter((l) => l !== line);
    save(); renderCart();
  }
});

const drawer = $(".drawer"), overlay = $(".overlay");
function openCart(open) {
  drawer.classList.toggle("is-open", open);
  drawer.setAttribute("aria-hidden", !open);
  drawer.inert = !open;
  overlay.hidden = !open;
}
$(".cart-btn").addEventListener("click", () => openCart(true));
$(".drawer__close").addEventListener("click", () => openCart(false));
overlay.addEventListener("click", () => openCart(false));
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") { openCart(false); openSections(false); }
});

/* --- Menú móvil --- */
const menuBtn = $(".menu-btn");
menuBtn.addEventListener("click", () => {
  const open = $(".header").classList.toggle("menu-open");
  menuBtn.setAttribute("aria-expanded", open);
});
$$(".nav--left a").forEach((a) => a.addEventListener("click", () => {
  $(".header").classList.remove("menu-open"); menuBtn.setAttribute("aria-expanded", false);
}));

/* --- Menú de secciones --- */
const sectionsBtn = $(".sections__btn"), sectionsList = $(".sections__list");
const sectionLinks = $$(".sections__list a");
function openSections(open) {
  sectionsList.hidden = !open;
  sectionsBtn.setAttribute("aria-expanded", open);
}
sectionsBtn.addEventListener("click", () => openSections(sectionsList.hidden));
sectionLinks.forEach((a) => a.addEventListener("click", () => openSections(false)));
document.addEventListener("click", (e) => { if (!e.target.closest(".sections")) openSections(false); });

// Resalta la sección que se está viendo
const io = new IntersectionObserver((entries) => entries.forEach((en) => {
  if (!en.isIntersecting) return;
  sectionLinks.forEach((a) => a.classList.toggle("is-current", a.hash === "#" + en.target.id));
}), { rootMargin: "-45% 0px -50% 0px" });
sectionLinks.forEach((a) => { const s = $(a.hash); if (s) io.observe(s); });

/* --- Instagram, WhatsApp, varios --- */
const IG = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
$("#ig-grid").innerHTML = IG.map((n) => {
  const f = String(n).padStart(2, "0");
  return `<a href="https://www.instagram.com/pergaminocafe/" target="_blank" rel="noopener"><img src="img/ig/${f}.webp" alt="Publicación de Instagram ${n}" loading="lazy"></a>`;
}).join("");

$$("[data-wa]").forEach((a) => { a.href = waLink(a.dataset.wa); a.target = "_blank"; a.rel = "noopener"; });
$("#year").textContent = new Date().getFullYear();

let toastTimer;
function toast(text) {
  const t = $(".toast");
  t.textContent = text; t.classList.add("show");
  clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove("show"), 2000);
}

renderCart();
