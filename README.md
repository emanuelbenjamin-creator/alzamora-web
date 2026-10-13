# Alzamora Café Lab — web

Sitio estático (HTML + CSS + JS, sin dependencias) listo para GitHub Pages.

## Editar
- **Productos, precios y WhatsApp:** `app.js` (arriba del todo, sección CONFIGURACIÓN).
- **Textos:** `index.html`.
- **Colores y estilos:** `styles.css` (variables en `:root`).
- **Fotos:** carpeta `img/`.

## Probar en local
```
python -m http.server 8000
```
y abre http://localhost:8000

## Publicar en GitHub Pages
1. Crea un repositorio vacío en github.com (ej. `alzamora-web`).
2. `git remote add origin https://github.com/TU_USUARIO/alzamora-web.git`
3. `git push -u origin main`
4. En el repo: **Settings → Pages → Branch: main / (root) → Save**.
5. En 1–2 minutos estará en `https://TU_USUARIO.github.io/alzamora-web/`.
