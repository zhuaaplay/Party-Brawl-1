// Registrasi Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js')
            .then(reg => console.log('Service Worker terdaftar:', reg.scope))
            .catch(err => console.log('Gagal mendaftarkan Service Worker:', err));
    });
}

// Atur tampilan fullscreen tanpa notch saat dijalankan sebagai WebAPK
window.addEventListener('load', () => {
    if (navigator.standalone || matchMedia('(display-mode: fullscreen)').matches) {
        // Untuk perangkat Android dengan API >= 29
        if (window.navigator && window.navigator.permissions && window.screen.orientation) {
            screen.orientation.lock('landscape')
                .then(() => console.log('Mode landscape diaktifkan'))
                .catch(err => console.log('Gagal mengunci mode landscape:', err));
            
            // Sembunyikan notch/poni kamera
            document.documentElement.style.setProperty('--safe-area-inset-top', '0px');
            document.documentElement.style.setProperty('--safe-area-inset-bottom', '0px');
            document.documentElement.style.setProperty('--safe-area-inset-left', '0px');
            document.documentElement.style.setProperty('--safe-area-inset-right', '0px');
        }
    }
});

// Set ikon untuk tampilan recent app
window.addEventListener('appinstalled', () => {
    // Beritahu sistem untuk memperbarui data aplikasi
    if (navigator.setAppBadge) {
        navigator.setAppBadge(0).catch(() => {});
    }
});

// Forcely set display mode and icon reference
document.addEventListener('DOMContentLoaded', () => {
    if (matchMedia('(display-mode: standalone)').matches || matchMedia('(display-mode: fullscreen)').matches) {
        document.title = 'Party Brawl';
        // Tambahkan meta tag dinamis untuk sistem
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
