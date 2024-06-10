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