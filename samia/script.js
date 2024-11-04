document.addEventListener('DOMContentLoaded', () => {
    const valorUsadoElem = document.getElementById('valorUsado');
    const cpmElem = document.getElementById('cpm');
    const ctrElem = document.getElementById('ctr');
    const cartAdditionsElem = document.getElementById('cartAdditions');
    const initiatedCheckoutsElem = document.getElementById('initiatedCheckouts');
    const paymentInfosElem = document.getElementById('paymentInfos');
    const purchasesElem = document.getElementById('purchases');
    const revenueElem = document.getElementById('revenue');

    // Função para formatar valores em reais
    function formatCurrency(value) {
        return value.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 2
        });
    }

    // Função para arredondar valores para cima
    function roundUp(value) {
        return Math.ceil(value);
    }

    function calculateTopFunnel() {
        const valorUsado = parseFloat(valorUsadoElem.value) || 0;
        const cpm = parseFloat(cpmElem.value) || 0;
        const ctr = parseFloat(ctrElem.value) / 100 || 0;

        const impressions = cpm > 0 ? roundUp((valorUsado * 1000) / cpm) : 0;
        document.getElementById('impressions').value = impressions;

        const clicks = roundUp(impressions * ctr);
        document.getElementById('clicks').value = clicks;

        const cpc = clicks > 0 ? valorUsado / clicks : 0;
        document.getElementById('cpc').value = formatCurrency(cpc);
    }

    function calculateMidFunnel() {
        const valorUsado = parseFloat(valorUsadoElem.value) || 0;
        const cartAdditions = parseFloat(cartAdditionsElem.value) || 0;
        const initiatedCheckouts = parseFloat(initiatedCheckoutsElem.value) || 0;
        const paymentInfos = parseFloat(paymentInfosElem.value) || 0;

        const clicks = parseFloat(document.getElementById('clicks').value) || 0;

        const costPerInitiatedCheckout = initiatedCheckouts > 0 ? valorUsado / initiatedCheckouts : 0;
        document.getElementById('costPerInitiatedCheckout').value = formatCurrency(costPerInitiatedCheckout);

        const conversionRateInitiatedCheckout = clicks > 0 ? (initiatedCheckouts / clicks) * 100 : 0;
        document.getElementById('conversionRateInitiatedCheckout').value = conversionRateInitiatedCheckout.toFixed(1) + '%';

        const costPerPaymentInfo = paymentInfos > 0 ? valorUsado / paymentInfos : 0;
        document.getElementById('costPerPaymentInfo').value = formatCurrency(costPerPaymentInfo);

        const paymentInfoConversionRate = initiatedCheckouts > 0 ? roundUp((paymentInfos / initiatedCheckouts) * 100) : 0;
        document.getElementById('paymentInfoConversionRate').value = paymentInfoConversionRate + '%';
    }

    function calculateBottomFunnel() {
        const valorUsado = parseFloat(valorUsadoElem.value) || 0;
        const purchases = parseFloat(purchasesElem.value) || 0;
        const revenue = parseFloat(revenueElem.value) || 0;

        const clicks = parseFloat(document.getElementById('clicks').value) || 0;

        const costPerPurchase = purchases > 0 ? valorUsado / purchases : 0;
        document.getElementById('costPerPurchase').value = formatCurrency(costPerPurchase);

        const conversionRatePurchase = clicks > 0 ? (purchases / clicks) * 100 : 0;
        document.getElementById('conversionRatePurchase').value = conversionRatePurchase.toFixed(1) + '%';

        const revenuePerPurchase = purchases > 0 ? revenue / purchases : 0;
        document.getElementById('revenuePerPurchase').value = formatCurrency(revenuePerPurchase);

        const roi = valorUsado > 0 ? ((revenue - valorUsado) / valorUsado) * 100 : 0;
        document.getElementById('roi').value = roi.toFixed(1) + '%';
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
