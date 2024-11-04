document.addEventListener('DOMContentLoaded', () => {
    const valorUsadoElem = document.getElementById('valorUsado');
    const cpmElem = document.getElementById('cpm');
    const ctrElem = document.getElementById('ctr');
    const cartAdditionsElem = document.getElementById('cartAdditions');
    const initiatedCheckoutsElem = document.getElementById('initiatedCheckouts');
    const paymentInfosElem = document.getElementById('paymentInfos');
    const purchasesElem = document.getElementById('purchases');
    const revenueElem = document.getElementById('revenue');

    function calculateTopFunnel() {
        const valorUsado = parseFloat(valorUsadoElem.value) || 0;
        const cpm = parseFloat(cpmElem.value) || 0;
        const ctr = parseFloat(ctrElem.value) / 100 || 0;

        // Calcula as impressões e arredonda para o inteiro mais próximo
        const impressions = cpm > 0 ? Math.round((valorUsado * 1000) / cpm) : 0;
        document.getElementById('impressions').value = impressions;

        // Calcula os cliques e arredonda para o inteiro mais próximo
        const clicks = Math.round(impressions * ctr);
        document.getElementById('clicks').value = clicks;

        // Calcula o CPC com duas casas decimais
        const cpc = clicks > 0 ? (valorUsado / clicks).toFixed(2) : 0;
        document.getElementById('cpc').value = cpc;
    }

    function calculateMidFunnel() {
        const valorUsado = parseFloat(valorUsadoElem.value) || 0;
        const cartAdditions = parseFloat(cartAdditionsElem.value) || 0;
        const initiatedCheckouts = parseFloat(initiatedCheckoutsElem.value) || 0;
        const paymentInfos = parseFloat(paymentInfosElem.value) || 0;

        const clicks = parseFloat(document.getElementById('clicks').value) || 0;

        const costPerInitiatedCheckout = initiatedCheckouts > 0 ? (valorUsado / initiatedCheckouts).toFixed(2) : 0;
        document.getElementById('costPerInitiatedCheckout').value = costPerInitiatedCheckout;

        const conversionRateInitiatedCheckout = clicks > 0 ? ((initiatedCheckouts / clicks) * 100).toFixed(1) : 0;
        document.getElementById('conversionRateInitiatedCheckout').value = conversionRateInitiatedCheckout;

        const costPerPaymentInfo = paymentInfos > 0 ? (valorUsado / paymentInfos).toFixed(2) : 0;
        document.getElementById('costPerPaymentInfo').value = costPerPaymentInfo;

        const paymentInfoConversionRate = initiatedCheckouts > 0 ? ((paymentInfos / initiatedCheckouts) * 100).toFixed(1) : 0;
        document.getElementById('paymentInfoConversionRate').value = paymentInfoConversionRate;
    }

    function calculateBottomFunnel() {
        const valorUsado = parseFloat(valorUsadoElem.value) || 0;
        const paymentInfos = parseFloat(paymentInfosElem.value) || 0;
        const purchases = parseFloat(purchasesElem.value) || 0;
        const revenue = parseFloat(revenueElem.value) || 0;

        const costPerPurchase = purchases > 0 ? (valorUsado / purchases).toFixed(2) : 0;
        document.getElementById('costPerPurchase').value = costPerPurchase;

        const conversionRatePurchase = paymentInfos > 0 ? ((purchases / paymentInfos) * 100).toFixed(1) : 0;
        document.getElementById('conversionRatePurchase').value = conversionRatePurchase;

        const revenuePerPurchase = purchases > 0 ? (revenue / purchases).toFixed(2) : 0;
        document.getElementById('revenuePerPurchase').value = revenuePerPurchase;

        const roi = valorUsado > 0 ? ((revenue - valorUsado) / valorUsado).toFixed(2) : 0;
        document.getElementById('roi').value = roi;
    }

    if (valorUsadoElem) valorUsadoElem.addEventListener('input', () => {
        calculateTopFunnel();
        calculateMidFunnel();
        calculateBottomFunnel();
    });
    if (cpmElem) cpmElem.addEventListener('input', calculateTopFunnel);
    if (ctrElem) ctrElem.addEventListener('input', calculateTopFunnel);
    if (cartAdditionsElem) cartAdditionsElem.addEventListener('input', calculateMidFunnel);
    if (initiatedCheckoutsElem) initiatedCheckoutsElem.addEventListener('input', calculateMidFunnel);
    if (paymentInfosElem) paymentInfosElem.addEventListener('input', calculateMidFunnel);
    if (purchasesElem) purchasesElem.addEventListener('input', calculateBottomFunnel);
    if (revenueElem) revenueElem.addEventListener('input', calculateBottomFunnel);
});
