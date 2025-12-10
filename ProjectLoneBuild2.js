const form = document.getElementById("form");
const cname = document.getElementById("cname");
const acNumber = document.getElementById("acNumber");
const Lamount = document.getElementById("Lamount");
const term = document.getElementById("term");
const repayment = document.getElementById("repayment");

form.addEventListener('submit', (e) => {
    e.preventDefault(); // Stop default submit first
    validate();
});

function validate() {
    let cnameValue = cname.value.trim();
    let acNumberValue = acNumber.value.trim();
    let LamountValue = Lamount.value.trim();
    let termValue = term.value.trim();
    let repaymentValue = repayment.value.trim();
    const regex = /^[a-zA-Z\s]+$/;

    // Check customer name
    if (cnameValue === '') {
        setError(cname, 'Customer name cannot be empty');
    } else if (cnameValue.length < 3) {
        setError(cname, 'Your name should be at least 2 characters long');
    } else if (!regex.test(cnameValue)) {
        setError(cname, 'Only letters (a-z, A-Z) and spaces are allowed');
    } else {
        setSuccess(cname);
    }

    // Check account number
    if (acNumberValue === '') {
        setError(acNumber, 'Account number cannot be empty');
    } else if (acNumberValue.charAt(0) === '0') {
        setError(acNumber, "Account number can't start with zero");
    } else if (!/^\d{6}$/.test(acNumberValue)) {
        setError(acNumber, 'Account number should be exactly 6 digits');
    } else {
        setSuccess(acNumber);
    }

    // Check loan amount requested
    if (LamountValue === '') {
        setError(Lamount, 'Loan amount requested cannot be empty');
    } else if (LamountValue < 500 || LamountValue > 9000) {
        setError(Lamount, 'Amount should be between 500 and 9000');
    } else {
        setSuccess(Lamount);
    }

    // Check term of loan
    if (termValue === '') {
        setError(term, 'Term of loan cannot be empty');
    } else if (termValue < 1 || termValue > 30) {
        setError(term, 'Term should be between 1 and 30 years');
    } else {
        setSuccess(term);
    }

    // Check monthly repayment
    if (repaymentValue === '') {
        setError(repayment, 'Monthly repayment cannot be empty');
    } else if (repaymentValue < 11) {
        setError(repayment, 'Monthly repayment should be at least 10');
    } else {
        setSuccess(repayment);
    }

    // FINAL STEP: Check if any error exists
    const errorFields = document.querySelectorAll(".field.error");

    if (errorFields.length === 0) {
        // No errors → NOW submit form to PHP
        form.submit();
    }
}

function setError(input, message) {
    let parent = input.parentElement;
    let small = parent.querySelector('small');
    small.innerText = message;
    parent.classList.add('error');
    parent.classList.remove('success');
}

function setSuccess(input) {
    let parent = input.parentElement;
    parent.classList.add('success');
    parent.classList.remove('error');
}
