// Menu produk Mochi Store. API supplier dan pembayaran hanya boleh dipanggil dari backend.
const cards = [...document.querySelectorAll(".product-card")];
const categoryButtons = [...document.querySelectorAll(".category")];
const searchInput = document.getElementById("searchInput");
const emptyState = document.getElementById("emptyState");
const dialog = document.getElementById("packageDialog");
const packageSelect = document.getElementById("packageSelect");
const dialogProductName = document.getElementById("dialogProductName");
const selectedPrice = document.getElementById("selectedPrice");
const packageNote = document.getElementById("packageNote");
let activeCategory = "Semua";
let selectedProduct = "";

const MENU = {
  "Netflix": {note:"Paket 1u dan 2u belum memiliki nominal harga di daftar yang dikirim. Harga tersebut ditampilkan sebagai belum ditentukan, bukan ditebak.", options:[
    {name:"1u · 7 hari", price:null},{name:"1u · 1 bulan",price:null},{name:"2u · 1 bulan",price:null},
    {name:"Semi privat · 1 bulan (bisa login 2 device)",price:null},
    {name:"Privat · 1 bulan (5 profil bisa dipakai semua)",price:165000}
  ]},
  "CapCut Pro": {options:[
    {name:"Sharing · 7 hari",price:3000},{name:"Sharing · 1 bulan",price:15000},
    {name:"Privat · 7 hari",price:6000},{name:"Privat · 1 bulan",price:28000}
  ]},
  "Canva Pro": {options:[
    {name:"1 bulan · member via invite",price:2000},{name:"1 bulan · designer via invite",price:3000},
    {name:"3 bulan · member invite",price:5000},{name:"1 tahun · edukasi (garansi 6 bulan)",price:15000}
  ]},
  "ChatGPT": {options:[
    {name:"Go sharing · 1 bulan · nogar",price:15000},{name:"Go sharing · 1 bulan · fullgar",price:20000},
    {name:"Go privat · 1 bulan",price:65000},{name:"Plus sharing · 1 bulan · nogar",price:25000},
    {name:"Plus sharing · 1 bulan · fullgar",price:30000},{name:"Plus privat · 1 bulan · nogar",price:155000}
  ]},
  "Gemini AI": {options:[{name:"Plus · 400 GB · 12 bulan",price:10000},{name:"Pro · 5 TB · 18 bulan",price:40000}]},
  "Spotify Premium": {options:[{name:"1 bulan · indplan",price:15000}]},
  "YouTube Premium": {options:[{name:"Famplan via invite · 1 bulan",price:5000}]},
  "Suntik Sosmed": {note:"Pilih layanan dan harga terbaru melalui admin/provider. Katalog, harga, dan order BuzzerPanel akan dihubungkan setelah endpoint dokumentasi diverifikasi.",options:[{name:"Instagram — cek layanan & harga",price:null},{name:"TikTok — cek layanan & harga",price:null},{name:"YouTube — cek layanan & harga",price:null},{name:"Layanan lainnya — konsultasi admin",price:null}]}
};
const rupiah = n => n == null ? "Belum ditentukan" : "Rp " + Number(n).toLocaleString("id-ID");
function filterProducts(){
  const q=(searchInput?.value||"").trim().toLowerCase(); let shown=0;
  cards.forEach(card=>{const cat=activeCategory==="Semua"||card.dataset.category===activeCategory;const query=card.dataset.name.toLowerCase().includes(q);card.hidden=!(cat&&query);if(!card.hidden)shown++;});
  emptyState.hidden=shown!==0;
}
categoryButtons.forEach(btn=>btn.addEventListener("click",()=>{activeCategory=btn.dataset.category;categoryButtons.forEach(b=>b.classList.toggle("active",b===btn));filterProducts();}));
searchInput?.addEventListener("input",filterProducts);
document.getElementById("showAll")?.addEventListener("click",()=>{activeCategory="Semua";if(searchInput)searchInput.value="";categoryButtons.forEach(b=>b.classList.toggle("active",b.dataset.category==="Semua"));filterProducts();document.getElementById("produk")?.scrollIntoView({behavior:"smooth"});});
function openProduct(product){
  selectedProduct=product;const data=MENU[product];if(!data){alert("Paket produk belum tersedia.");return;}
  dialogProductName.textContent=product;packageSelect.innerHTML="";
  data.options.forEach((opt,i)=>{const el=document.createElement("option");el.value=String(i);el.textContent=opt.name;packageSelect.appendChild(el);});
  packageNote.textContent=data.note||"Harga mengikuti daftar menu Mochi Store. Ketersediaan tetap dikonfirmasi sebelum pesanan diproses.";
  updatePrice();if(typeof dialog.showModal==="function")dialog.showModal();else alert("Browser ini belum mendukung pilihan paket. Silakan gunakan browser terbaru.");
}
function updatePrice(){const opt=MENU[selectedProduct]?.options[Number(packageSelect.value)];selectedPrice.textContent=rupiah(opt?.price);}
packageSelect.addEventListener("change",updatePrice);
document.querySelectorAll(".buy-button").forEach(btn=>btn.addEventListener("click",()=>openProduct(btn.dataset.product)));
document.getElementById("continueOrder").addEventListener("click", async ()=>{
  const opt=MENU[selectedProduct]?.options[Number(packageSelect.value)];
  const email=document.getElementById("customerEmail").value.trim();
  const status=document.getElementById("checkoutStatus");
  if(!opt)return;
  if(opt.price==null){status.textContent="Harga paket ini belum ditentukan. Lengkapi harga di menu sebelum checkout.";return;}
  if(!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){status.textContent="Masukkan email aktif untuk menerima stok digital.";return;}
  status.textContent="Menghubungi checkout Mochi Store…";
  try{
    const response=await fetch("/api/orders",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({product:selectedProduct,packageName:opt.name,amount:opt.price,email})});
    const result=await response.json().catch(()=>({}));
    if(!response.ok) throw new Error(result.error||"Checkout belum dikonfigurasi di server.");
    if(result.paymentUrl) window.location.href=result.paymentUrl;
    else status.textContent="Pesanan dibuat, tetapi URL pembayaran belum diterima. Hubungi admin sistem.";
  }catch(error){status.textContent=error.message+" Pastikan backend dan payment gateway sudah dipasang di VPS.";}
});
document.getElementById("menuToggle")?.addEventListener("click",()=>document.querySelector(".navlinks")?.classList.toggle("open"));
