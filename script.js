const WA_NUMBER = "6285154810966";
const waBase = "https://wa.me/" + WA_NUMBER;
document.querySelectorAll(".order-link").forEach(link => {
  const product = link.dataset.product || "produk";
  link.href = waBase + "?text=" + encodeURIComponent("Halo Mochi Store, aku mau tanya harga dan ketersediaan " + product + ".");
  link.target = "_blank";
  link.rel = "noopener";
});
document.querySelectorAll(".filter").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach(b => b.classList.remove("active"));
    button.classList.add("active");
    const category = button.dataset.filter;
    document.querySelectorAll(".product-card").forEach(card => {
      card.hidden = category !== "semua" && card.dataset.category !== category;
    });
  });
});
document.getElementById("year").textContent = new Date().getFullYear();
