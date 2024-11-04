document.addEventListener('DOMContentLoaded', () => {
    const valorUsadoElem = document.getElementById('valorUsado');
    const cpmElem = document.getElementById('cpm');
    const ctrElem = document.getElementById('ctr');
    const cartAdditionsElem = document.getElementById('cartAdditions');
    const initiatedCheckoutsElem = document.getElementById('initiatedCheckouts');
    const paymentInfosElem = document.getElementById('paymentInfos');

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

        // Calcula as impressões e arredonda para cima
        const impressions = cpm > 0 ? roundUp((valorUsado * 1000) / cpm) : 0;
        document.getElementById('impressions').value = impressions;

        // Calcula os cliques e arredonda para cima
        const clicks = roundUp(impressions * ctr);
        document.getElementById('clicks').value = clicks;

        // Calcula o custo por clique (CPC) e formata como moeda BRL
        const cpc = clicks > 0 ? valorUsado / clicks : 0;
        document.getElementById('cpc').value = formatCurrency(cpc);
    }

    function calculateMidFunnel() {
        const valorUsado = parseFloat(valorUsadoElem.value) || 0;
        const cartAdditions = parseFloat(cartAdditionsElem.value) || 0;
        const initiatedCheckouts = parseFloat(initiatedCheckoutsElem.value) || 0;
        const paymentInfos = parseFloat(paymentInfosElem.value) || 0;

        const clicks = parseFloat(document.getElementById('clicks').value) || 0;

        // Calcula o custo por finalização de compra e formata como moeda BRL
        const costPerInitiatedCheckout = initiatedCheckouts > 0 ? valorUsado / initiatedCheckouts : 0;
        document.getElementById('costPerInitiatedCheckout').value = formatCurrency(costPerInitiatedCheckout);

        // Calcula a taxa de conversão de finalizações sem arredondar
        const conversionRateInitiatedCheckout = clicks > 0 ? (initiatedCheckouts / clicks) * 100 : 0;
        document.getElementById('conversionRateInitiatedCheckout').value = conversionRateInitiatedCheckout.toFixed(1) + '%'; // Duas casas decimais

        // Calcula o custo por inclusão de pagamento e formata como moeda BRL
        const costPerPaymentInfo = paymentInfos > 0 ? valorUsado / paymentInfos : 0;
        document.getElementById('costPerPaymentInfo').value = formatCurrency(costPerPaymentInfo);

        // Calcula a taxa de conversão de pagamento e arredonda para cima
        const paymentInfoConversionRate = initiatedCheckouts > 0 ? roundUp((paymentInfos / initiatedCheckouts) * 100) : 0;
        document.getElementById('paymentInfoConversionRate').value = paymentInfoConversionRate + '%';
    }

    if (valorUsadoElem) valorUsadoElem.addEventListener('input', () => {
        calculateTopFunnel();
        calculateMidFunnel();
    });
    if (cpmElem) cpmElem.addEventListener('input', calculateTopFunnel);
    if (ctrElem) ctrElem.addEventListener('input', calculateTopFunnel);
    if (cartAdditionsElem) cartAdditionsElem.addEventListener('input', calculateMidFunnel);
    if (initiatedCheckoutsElem) initiatedCheckoutsElem.addEventListener('input', calculateMidFunnel);
    if (paymentInfosElem) paymentInfosElem.addEventListener('input', calculateMidFunnel);
});
