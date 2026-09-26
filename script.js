const buttons = document.querySelectorAll('.amount-btn');
const customAmountInput = document.getElementById('customAmount');
const progressFill = document.getElementById('progress-fill');
const progressText = document.getElementById('progress-text');
const form = document.getElementById('donation-form');
const formMessage = document.getElementById('form-message');

const goal = 50000000;
const currentRaised = 32000000;
let selectedAmount = 50000;

function updateProgress(amount) {
  const projectedTotal = currentRaised + amount;
  const percent = Math.min(100, Math.round((projectedTotal / goal) * 100));
  progressFill.style.width = `${percent}%`;
  progressText.textContent = `With your leadership gift of at least $${amount.toLocaleString()}, we would reach ${percent}% of our monthly goal of $50,000,000.`;
}

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    buttons.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');
    selectedAmount = Number(button.dataset.amount);
    customAmountInput.value = '';
    updateProgress(selectedAmount);
  });
});

customAmountInput.addEventListener('input', () => {
  const value = Number(customAmountInput.value);
  if (value > 0) {
    buttons.forEach((btn) => btn.classList.remove('active'));
    selectedAmount = value;
    updateProgress(selectedAmount);
  }
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const amount = selectedAmount || Number(customAmountInput.value) || 0;

  if (!amount) {
    formMessage.textContent = 'Please choose or enter a donation amount.';
    return;
  }

  formMessage.textContent = `Thank you! Your donation of $${amount.toLocaleString()} will help Foundation for Tomorrow continue its work.`;
  form.reset();
  selectedAmount = 50000;
  buttons.forEach((btn) => btn.classList.remove('active'));
  document.querySelector('.amount-btn[data-amount="50000"]').classList.add('active');
  updateProgress(50000);
});

updateProgress(selectedAmount);

// Payment Methods Tab Switching
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const tabName = button.dataset.tab;
    
    // Remove active class from all buttons and contents
    tabButtons.forEach((btn) => btn.classList.remove('active'));
    tabContents.forEach((content) => content.classList.remove('active'));
    
    // Add active class to clicked button and corresponding content
    button.classList.add('active');
    document.getElementById(tabName).classList.add('active');
  });
});

// Copy to Clipboard Functionality
const copyButtons = document.querySelectorAll('.copy-btn');

copyButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const address = button.dataset.address;
    
    // Copy to clipboard
    navigator.clipboard.writeText(address).then(() => {
      // Show success feedback
      const originalText = button.textContent;
      button.textContent = 'Copied!';
      button.classList.add('copied');
      
      // Reset after 2 seconds
      setTimeout(() => {
        button.textContent = originalText;
        button.classList.remove('copied');
      }, 2000);
    }).catch(() => {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = address;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      
      button.textContent = 'Copied!';
      button.classList.add('copied');
      setTimeout(() => {
        button.textContent = 'Copy';
        button.classList.remove('copied');
      }, 2000);
    });
  });
});

// Crypto selector behaviour
const cryptoSelect = document.getElementById('crypto-select');
const cryptoAddress = document.getElementById('crypto-address');
const cryptoCopyButton = document.getElementById('crypto-copy-btn');

const cryptoOptions = {
  bitcoin: {
    label: 'Wallet Address',
    address: 'bc1ps72609eka4ak6klumxscpft3xrqqk808c3kat05s9rjtxhcs9uzqp8a6rw'
  },
  ethereum: {
    label: 'Wallet Address',
    address: '0xab04b5c8e968037dda29fd0083a67c7f2dd7484b'
  },
  usdc: {
    label: 'Contract Address',
    address: '0xab04b5c8e968037dda29fd0083a67c7f2dd7484b'
  },
  usdt: {
    label: 'Contract Address',
    address: '0xab04b5c8e968037dda29fd0083a67c7f2dd7484b'
  },
  solana: {
    label: 'Wallet Address',
    address: '5tMHE6eF2j7oXGFTNugEQpouCJamM1uo2no512dfAEKT'
  },
  bnb: {
    label: 'Wallet Address',
    address: '0xab04b5c8e968037dda29fd0083a67c7f2dd7484b'
  },
  trx: {
    label: 'Wallet Address',
    address: 'TGVwwjqUyMsWaCoCjwbsaQMzQxUGQdkGhM'
  }
};

function updateCryptoAddress() {
  const value = cryptoSelect.value;
  const option = cryptoOptions[value];
  if (!option) return;

  const label = document.querySelector('#crypto-details label');
  if (label) label.textContent = option.label;
  cryptoAddress.textContent = option.address;
  cryptoCopyButton.dataset.address = option.address;
}

cryptoSelect?.addEventListener('change', updateCryptoAddress);
updateCryptoAddress();

// Payment Method Buttons
document.getElementById('stripe-donate')?.addEventListener('click', () => {
  alert('Stripe integration would redirect to payment form. This is a placeholder.');
});

document.getElementById('paypal-donate')?.addEventListener('click', () => {
  alert('PayPal integration would open PayPal payment form. This is a placeholder.');
});

document.getElementById('mobile-pay')?.addEventListener('click', () => {
  alert('Apple Pay / Google Pay integration would open mobile payment options. This is a placeholder.');
});

// Hero entrance and stats animation
document.addEventListener('DOMContentLoaded', () => {
  // subtle hero entrance
  const hero = document.querySelector('.hero-content');
  if (hero) hero.classList.add('animate');

  // Animate counters when visible
  const counters = document.querySelectorAll('.counter');
  const options = { root: null, threshold: 0.3 };

  function animateCounter(el) {
    const target = +el.dataset.target;
    const duration = 1400;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min(1, (now - start) / duration);
      const value = Math.floor(progress * target);
      el.textContent = value;
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = target;
    }

    requestAnimationFrame(tick);
  }

  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          animateCounter(el);
          observer.unobserve(el);
        }
      });
    }, options);

    counters.forEach(c => obs.observe(c));
  } else {
    // fallback: animate immediately
    counters.forEach(c => animateCounter(c));
  }
});
