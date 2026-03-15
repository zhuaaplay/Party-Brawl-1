// Registrasi Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js')
            .then(reg => console.log('Service Worker terdaftar:', reg.scope))
            .catch(err => console.log('Gagal mendaftarkan Service Worker:', err));
    });
}

// Fungsi fullscreen tanpa batasan
function enterFullScreen() {
    const elem = document.documentElement;
    // Metode khusus untuk Chrome Android
    if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen({
            navigationUI: "hide",
            displayOverride: ["landscape-primary"]
        });
        // Hapus pesan peringatan
        document.addEventListener('webkitfullscreenchange', () => {
            const notices = document.querySelectorAll('[class*="fullscreen-notice"], [id*="fullscreen-notice"]');
            notices.forEach(notice => notice.style.display = 'none');
            // Paksa layar penuh
            document.body.style.width = screen.width + 'px';
            document.body.style.height = screen.height + 'px';
        });
    } else if (elem.requestFullscreen) {
        elem.requestFullscreen({ navigationUI: "hide" });
    }

    // Atur sistem Android untuk abaikan notch
    if (window.Android) {
        // Jika ada akses ke API native (jika perlu nanti bisa tambah plugin)
        Android.setSystemUiVisibility(
            4864 | // SYSTEM_UI_FLAG_LAYOUT_STABLE
            4868 | // SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
            4866 | // SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
            4098 | // SYSTEM_UI_FLAG_FULLSCREEN
            4099 | // SYSTEM_UI_FLAG_HIDE_NAVIGATION
            4102    // SYSTEM_UI_FLAG_IMMERSIVE_STICKY
        );
    }

    // Lock landscape dan hapus safe area
    if (screen.orientation) {
        screen.orientation.lock('landscape-primary').catch(() => {});
    }
    document.documentElement.style.setProperty('--safe-area-inset-top', '0');
    document.documentElement.style.setProperty('--safe-area-inset-bottom', '0');
    document.documentElement.style.setProperty('--safe-area-inset-left', '0');
    document.documentElement.style.setProperty('--safe-area-inset-right', '0');
}

// Klik untuk fullscreen tanpa pesan
document.addEventListener('click', (e) => {
    e.preventDefault();
    if (!document.fullscreenElement && !document.webkitFullscreenElement) {
        enterFullScreen();
    }
});

// Jalankan saat aplikasi dibuka
window.addEventListener('load', () => {
    if (navigator.standalone || matchMedia('(display-mode: standalone)').matches) {
        setTimeout(enterFullScreen, 300);
        // Sembunyikan navbar sistem
        document.body.style.webkitUserSelect = 'none';
        document.body.style.webkitTouchCallout = 'none';
    }
});

// Hapus pesan peringatan saat muncul
setInterval(() => {
    const systemNotice = document.querySelector('div[style*="position:fixed"][style*="bottom"]');
    if (systemNotice) systemNotice.remove();
}, 100);
