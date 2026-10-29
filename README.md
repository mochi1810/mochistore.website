# Mochi Store — Pink Kawaii + manual stock starter

- `index.html`: pink kawaii storefront; product buttons open package selection and the checkout button calls `/api/orders` (not WhatsApp).
- `style.css`, `script.js`, `assets/mochi-hero.png`: frontend styling, interactions, and hero artwork.
- `admin-stok.html`: admin interface to register package SKUs and add manual stock items through the backend.
- `backend/`: Node.js/Express starter, PostgreSQL schema, supplier adapter placeholder, environment example.

## Current status
The UI no longer redirects orders to WhatsApp. Admin stock endpoints are implemented and protected with `ADMIN_API_KEY`. Checkout intentionally returns a clear disabled response until a real payment gateway is selected and its official API + webhook signature validation is implemented. Auto delivery after verified payment is not active yet. SMM supplier calls are not enabled for ordering until BuzzerPanel's exact API documentation is verified.

See `backend/README-INTEGRASI.md` before deploying. Never commit `.env` or expose API keys.

