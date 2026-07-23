/* ==========================================================================
   CONFIGURACIÓN DE GOOGLE ADS (AdMob)
   ========================================================================== */

const AD_UNITS = {
    banner: 'ca-app-pub-3940256099942544/6300978111',
    interstitial: 'ca-app-pub-3940256099942544/1033173712'
};

/* 1. INICIALIZACIÓN DE ADS */
// Usamos un intervalo para esperar a que appState esté disponible (debido a la carga de módulos)
const adInitInterval = setInterval(() => {
    if (window.appState) {
        clearInterval(adInitInterval);
        if (!window.appState.isPro) {
            initBannerAd();
        }
    }
}, 100);

/* 2. LÓGICA DEL BANNER */
function initBannerAd() {
    const bannerContainer = document.getElementById('ad-banner-bottom');
    if (!bannerContainer) return;

    bannerContainer.innerHTML = `
        <div style="width: 100%; height: 50px; background: #333; color: #fff;
             display: flex; align-items: center; justify-content: center; font-size: 10px; margin: 10px 0;">
            AD BANNER PLACEHOLDER - ${AD_UNITS.banner}
        </div>
    `;
}

/* 3. LÓGICA DEL ANUNCIO INTERSTICIAL (Pantalla Completa) */
function showInterstitialAd(callback) {
    console.log("Cargando anuncio intersticial...");

    const loader = document.getElementById('results-loader');
    if (loader) {
        loader.innerHTML += '<p style="font-size:10px">Publicidad...</p>';
    }

    setTimeout(() => {
        console.log("Anuncio mostrado y cerrado");
        if (callback) callback();
    }, 2000);
}

// Hacer global para que ui-manager pueda llamarlo
window.showInterstitialAd = showInterstitialAd;
