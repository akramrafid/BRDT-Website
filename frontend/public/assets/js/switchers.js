// Language and Currency Switcher Logic

// --- Google Translate Integration ---
function googleTranslateElementInit() {
  new google.translate.TranslateElement(
    { pageLanguage: 'en', includedLanguages: 'en,bn', autoDisplay: false },
    'google_translate_element'
  );
}

document.addEventListener('DOMContentLoaded', () => {
  // --- Language Switcher ---
  const langSwitcherBtn = document.getElementById('langSwitcherBtn');
  const langSwitcherText = document.getElementById('langSwitcherText');
  
  if (langSwitcherBtn) {
    langSwitcherBtn.addEventListener('click', () => {
      const isEnglish = langSwitcherText.innerText === 'EN';
      const targetLang = isEnglish ? 'bn' : 'en';
      
      // Update our button text
      langSwitcherText.innerText = isEnglish ? 'BN' : 'EN';
      
      // Trigger Google Translate change
      const translateSelect = document.querySelector('.goog-te-combo');
      if (translateSelect) {
        translateSelect.value = targetLang;
        translateSelect.dispatchEvent(new Event('change'));
      }
    });
  }

  // --- Currency Switcher ---
  const currencySwitcherBtn = document.getElementById('currencySwitcherBtn');
  const currencySwitcherText = document.getElementById('currencySwitcherText');
  const EXCHANGE_RATE = 150; // 1 GBP = 150 BDT
  
  let currentCurrency = localStorage.getItem('currency') || 'BDT';
  
  function formatCurrency(amount, currency) {
    if (currency === 'GBP') {
      const gbpAmount = (amount / EXCHANGE_RATE).toFixed(2);
      // Remove trailing .00 if it's a whole number
      return '£' + (gbpAmount.endsWith('.00') ? gbpAmount.slice(0, -3) : gbpAmount);
    }
    return '৳' + amount;
  }
  
  // Find all text nodes that contain currency values and convert them
  function updateCurrencyInDOM(targetCurrency) {
    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      null,
      false
    );

    let node;
    const regexBDT = /৳(\d+(?:,\d+)*(?:\.\d+)?)/g;
    const regexGBP = /£(\d+(?:,\d+)*(?:\.\d+)?)/g;

    const nodesToUpdate = [];
    while ((node = walker.nextNode())) {
      // Skip script and style tags
      if (node.parentElement && ['SCRIPT', 'STYLE', 'NOSCRIPT'].includes(node.parentElement.tagName)) continue;
      
      if (targetCurrency === 'GBP' && node.nodeValue.includes('৳')) {
        nodesToUpdate.push({ node, type: 'toGBP' });
      } else if (targetCurrency === 'BDT' && node.nodeValue.includes('£')) {
        nodesToUpdate.push({ node, type: 'toBDT' });
      }
    }
    
    nodesToUpdate.forEach(({ node, type }) => {
      if (type === 'toGBP') {
        node.nodeValue = node.nodeValue.replace(regexBDT, (match, p1) => {
          const amount = parseFloat(p1.replace(/,/g, ''));
          return formatCurrency(amount, 'GBP');
        });
      } else {
        node.nodeValue = node.nodeValue.replace(regexGBP, (match, p1) => {
          const amount = parseFloat(p1.replace(/,/g, '')) * EXCHANGE_RATE;
          return formatCurrency(amount, 'BDT');
        });
      }
    });
    
    // Update input placeholders if any
    const inputs = document.querySelectorAll('input[placeholder]');
    inputs.forEach(input => {
      if (targetCurrency === 'GBP' && input.placeholder.includes('৳')) {
        input.placeholder = input.placeholder.replace(regexBDT, (match, p1) => formatCurrency(parseFloat(p1.replace(/,/g, '')), 'GBP'));
      } else if (targetCurrency === 'BDT' && input.placeholder.includes('£')) {
        input.placeholder = input.placeholder.replace(regexGBP, (match, p1) => formatCurrency(parseFloat(p1.replace(/,/g, '')) * EXCHANGE_RATE, 'BDT'));
      }
    });
  }

  function applyCurrency(currency) {
    if (currency === 'GBP') {
      if (currencySwitcherText) currencySwitcherText.innerText = '£ (GBP)';
      updateCurrencyInDOM('GBP');
    } else {
      if (currencySwitcherText) currencySwitcherText.innerText = '৳ (BDT)';
      // If switching back to BDT, convert £ back to ৳
      updateCurrencyInDOM('BDT');
    }
  }

  // Initial apply
  if (currentCurrency === 'GBP') {
    applyCurrency('GBP');
  }

  if (currencySwitcherBtn) {
    currencySwitcherBtn.addEventListener('click', () => {
      currentCurrency = currentCurrency === 'BDT' ? 'GBP' : 'BDT';
      localStorage.setItem('currency', currentCurrency);
      applyCurrency(currentCurrency);
    });
  }
});
