// Registrasi Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js')
            .then(reg => console.log('Service Worker terdaftar:', reg.scope))
            .catch(err => console.log('Gagal mendaftarkan Service Worker:', err));
    });
}

// Fungsi fullscreen seperti di file kamu
function enterFullScreen() {
    const elem = document.documentElement;
    if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen({
            navigationUI: "hide",
            displayOverride: ["landscape-primary"]
        });
    } else if (elem.requestFullscreen) {
        elem.requestFullscreen({ navigationUI: "hide" });
    }

    // Paksa sistem abaikan notch
    if (screen.orientation) {
        screen.orientation.lock('landscape-primary').catch(() => {});
    }
}

// Klik untuk fullscreen
document.addEventListener('click', () => {
    if (!document.fullscreenElement && !document.webkitFullscreenElement) {
        enterFullScreen();
    }
});

// Jalankan saat aplikasi dibuka
window.addEventListener('load', () => {
    if (navigator.standalone || matchMedia('(display-mode: standalone)').matches) {
        setTimeout(enterFullScreen, 300);
    }
});
