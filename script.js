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
