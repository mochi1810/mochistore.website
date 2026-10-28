const waNumber = "6281234567890"; // Ganti dengan nomormu

function orderWA(type) {
    const uid = document.getElementById('uid').value;
    const app = document.getElementById('app').value;
    
    let text = type === 'topup' 
        ? `Halo Mochi Store! 🌸%0AMau order Top Up untuk ID: ${uid}` 
        : `Halo Mochi Store! 🌸%0AMau beli aplikasi: ${app}`;
        
    window.open(`https://wa.me/${waNumber}?text=${text}`, '_blank');
}

async function orderAPI() {
    const target = document.getElementById('target').value;
    const statusText = document.getElementById('status');
    
    if(!target) return alert("Username tidak boleh kosong! 🌸");
    statusText.innerText = "⏳ Sedang memproses ke server...";
    
    // Tempatkan logika fetch API ke backend Node.js (Pterodactyl) di sini 
    // agar API Key SMM kamu tidak bocor di HTML publik.
    setTimeout(() => {
        statusText.innerText = "✅ Pesanan berhasil diproses oleh sistem!";
    }, 1500);
}
