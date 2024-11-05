document.addEventListener('DOMContentLoaded', () => {
    const valorUsadoElem = document.getElementById('valorUsado');
    const cpmElem = document.getElementById('cpm');
    const ctrElem = document.getElementById('ctr');
    const cartAdditionsElem = document.getElementById('cartAdditions');
    const initiatedCheckoutsElem = document.getElementById('initiatedCheckouts');
    const paymentInfosElem = document.getElementById('paymentInfos');

    function formatCurrency(value) {
        return value.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 2
        });
    }


    function roundToNearestInteger(value) {
        return Math.round(value);
    }

    function calculateTopFunnel() {
        const valorUsado = parseFloat(valorUsadoElem.value.replace(',', '.')) || 0;
        const cpm = parseFloat(cpmElem.value.replace(',', '.')) || 0;
        const ctr = parseFloat(ctrElem.value.replace(',', '.')) / 100 || 0;

        const impressions = cpm > 0 ? Math.ceil((valorUsado * 1000) / cpm) : 0; 
        document.getElementById('impressions').value = impressions;

        const clicks = roundToNearestInteger(impressions * ctr);
        document.getElementById('clicks').value = clicks;


        const cpc = clicks > 0 ? (valorUsado / clicks).toFixed(2) : 0;
        document.getElementById('cpc').value = formatCurrency(parseFloat(cpc));
    }

    function calculateMidFunnel() {
        const valorUsado = parseFloat(valorUsadoElem.value.replace(',', '.')) || 0;
        const cartAdditions = parseFloat(cartAdditionsElem.value.replace(',', '.')) || 0;
        const initiatedCheckouts = parseFloat(initiatedCheckoutsElem.value.replace(',', '.')) || 0;
        const paymentInfos = parseFloat(paymentInfosElem.value.replace(',', '.')) || 0;

        const clicks = parseFloat(document.getElementById('clicks').value) || 0;


        const costPerInitiatedCheckout = initiatedCheckouts > 0 ? valorUsado / initiatedCheckouts : 0;
        document.getElementById('costPerInitiatedCheckout').value = formatCurrency(costPerInitiatedCheckout);


        const conversionRateInitiatedCheckout = clicks > 0 ? (initiatedCheckouts / clicks) * 100 : 0;
        document.getElementById('conversionRateInitiatedCheckout').value = conversionRateInitiatedCheckout.toFixed(1) + '%';

  
        const costPerPaymentInfo = paymentInfos > 0 ? valorUsado / paymentInfos : 0;
        document.getElementById('costPerPaymentInfo').value = formatCurrency(costPerPaymentInfo);


        const paymentInfoConversionRate = initiatedCheckouts > 0 ? roundToNearestInteger((paymentInfos / initiatedCheckouts) * 100) : 0;
        document.getElementById('paymentInfoConversionRate').value = paymentInfoConversionRate + '%';
    }

    
    const purchasesElem = document.getElementById('purchases');
    const faturamentoTotalElem = document.getElementById('faturamentoTotal');


    function calculateBottomFunnel() {
        const valorUsado = parseFloat(valorUsadoElem.value.replace(',', '.')) || 0;
        const purchases = parseFloat(purchasesElem.value) || 0;
        const faturamentoTotal = parseFloat(faturamentoTotalElem.value) || 0;


        const cpa = purchases > 0 ? valorUsado / purchases : 0;
        document.getElementById('cpa').value = formatCurrency(cpa);


        const roa = valorUsado > 0 ? (faturamentoTotal / valorUsado).toFixed(2) : 0;
        document.getElementById('roa').value = roa;


        const ticketMedio = purchases > 0 ? faturamentoTotal / purchases : 0;
        document.getElementById('ticketMedio').value = formatCurrency(ticketMedio);
    }


    if (valorUsadoElem) valorUsadoElem.addEventListener('input', () => {
        calculateTopFunnel();
        calculateMidFunnel();
        calculateBottomFunnel();
    });
    if (purchasesElem) purchasesElem.addEventListener('input', calculateBottomFunnel);
    if (faturamentoTotalElem) faturamentoTotalElem.addEventListener('input', calculateBottomFunnel);
    if (cpmElem) cpmElem.addEventListener('input', calculateTopFunnel);
    if (ctrElem) ctrElem.addEventListener('input', calculateTopFunnel);
    if (cartAdditionsElem) cartAdditionsElem.addEventListener('input', calculateMidFunnel);
    if (initiatedCheckoutsElem) initiatedCheckoutsElem.addEventListener('input', calculateMidFunnel);
    if (paymentInfosElem) paymentInfosElem.addEventListener('input', calculateMidFunnel);
});
