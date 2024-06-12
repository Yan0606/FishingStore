function toggleForms(paymentType) {
    const creditForm = document.getElementById('payment-form');
    const debitForm = document.getElementById('debit-form');

    if (paymentType === 'credit') {
        creditForm.style.display = 'block';
        debitForm.style.display = 'none';
    } else if (paymentType === 'debit') {
        creditForm.style.display = 'none';
        debitForm.style.display = 'block';
    }
}

// Para formatar o input cpf
document.getElementById('cpf').addEventListener('input', function (e) {
    let value = e.target.value.replace(/\D/g, ''); // Remove todos caracteres não númericos
    value = value.replace(/^(\d{3})(\d)/, '$1.$2'); // Add o primeiro ponto
    value = value.replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3'); // Add o segundo ponto
    value = value.replace(/\.(\d{3})(\d)/, '.$1-$2'); // Add o traso
    e.target.value = value.slice(0, 14); // Limit length to 14 characters
});

document.getElementById('debit-cpf').addEventListener('input', function (e) {
    let value = e.target.value.replace(/\D/g, ''); // Remove todos caracteres não númericos
    value = value.replace(/^(\d{3})(\d)/, '$1.$2'); // Add o primeiro ponto
    value = value.replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3'); // Add o segundo ponto
    value = value.replace(/\.(\d{3})(\d)/, '.$1-$2'); // Add o traso
    e.target.value = value.slice(0, 14); // Limit length to 14 characters
});