// Registrasi Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js')
            .then(reg => console.log('Service Worker terdaftar:', reg.scope))
            .catch(err => console.log('Gagal mendaftarkan Service Worker:', err));
    });
}

// Fungsi untuk masuk fullscreen penuh tanpa notch
function enterFullScreen() {
    const elem = document.documentElement;
    // Coba semua metode fullscreen yang ada
    if (elem.requestFullscreen) {
        elem.requestFullscreen({ navigationUI: "hide", fullscreenElement: elem });
    } else if (elem.webkitRequestFullscreen) { // Untuk Chrome/Android
        elem.webkitRequestFullscreen({ navigationUI: "hide" });
    } else if (elem.msRequestFullscreen) { // Untuk IE/Edge
        elem.msRequestFullscreen();
    }

    // Atur agar sistem abaikan notch/poni
    if (window.screen) {
        // Untuk Android API >= 29
        if (screen.orientation) {
            screen.orientation.lock('landscape')
                .then(() => console.log('Mode landscape aktif'))
                .catch(err => console.log('Gagal kunci landscape:', err));
        }
        // Hapus safe area insets
        document.documentElement.style.setProperty('--safe-area-inset-top', '0px');
        document.documentElement.style.setProperty('--safe-area-inset-bottom', '0px');
        document.documentElement.style.setProperty('--safe-area-inset-left', '0px');
        document.documentElement.style.setProperty('--safe-area-inset-right', '0px');
        // Paksa layar penuh
        document.body.classList.add('fullscreen-active');
    }
}

// Klik mana saja untuk masuk fullscreen
document.addEventListener('click', () => {
    if (!document.fullscreenElement && !document.webkitFullscreenElement) {
        enterFullScreen();
    }
});

// Jalankan otomatis jika sudah sebagai WebAPK
window.addEventListener('load', () => {
    if (navigator.standalone || matchMedia('(display-mode: fullscreen)').matches || matchMedia('(display-mode: standalone)').matches) {
        setTimeout(() => {
            enterFullScreen();
        }, 500);
    }
});

// Set ikon untuk recent app (jika masih diperlukan)
window.addEventListener('appinstalled', () => {
    if (navigator.setAppBadge) {
        navigator.setAppBadge(0).catch(() => {});
    }
});

document.addEventListener('DOMContentLoaded', () => {
    if (matchMedia('(display-mode: standalone)').matches || matchMedia('(display-mode: fullscreen)').matches) {
        document.title = 'Party Brawl';
        const metaIcon = document.createElement('meta');
        metaIcon.name = 'msapplication-TileImage';
        metaIcon.content = 'assets/icon/icon-144x144.png';
        document.head.appendChild(metaIcon);
        
        const metaTile = document.createElement('meta');
        metaTile.name = 'msapplication-TileColor';
        metaTile.content = '#ffffff';
        document.head.appendChild(metaTile);
    }
});
