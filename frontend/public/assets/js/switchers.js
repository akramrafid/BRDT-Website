// Language and Currency Switcher Logic

// --- Google Translate Integration ---
function googleTranslateElementInit() {
  new google.translate.TranslateElement(
    { pageLanguage: 'en', includedLanguages: 'en,bn,ar', autoDisplay: false },
    'google_translate_element'
  );
}

document.addEventListener('DOMContentLoaded', () => {
  // --- Aggressively hide Google Translate Banner ---
  setInterval(() => {
    // Hide the iframe itself
    const frames = document.querySelectorAll('.goog-te-banner-frame, .VIpgJd-Zvi9od-ORHb-OEVmcd');
    frames.forEach(frame => {
      frame.style.setProperty('display', 'none', 'important');
    });
    
    // Fix body/html being pushed down
    const resetPosition = (el) => {
      if (el.style.top !== '0px') el.style.setProperty('top', '0px', 'important');
      if (el.style.marginTop !== '0px') el.style.setProperty('margin-top', '0px', 'important');
      if (el.style.paddingTop !== '0px') el.style.setProperty('padding-top', '0px', 'important');
    };
    resetPosition(document.documentElement);
    resetPosition(document.body);
  }, 50);

  // --- Language Switcher ---
  const langSwitcherSelect = document.getElementById('langSwitcherSelect');
  
  // Initialize from localStorage
  const getCookieLang = () => {
    if (document.cookie.includes('googtrans=/en/bn')) return 'bn';
    if (document.cookie.includes('googtrans=/en/ar')) return 'ar';
    return 'en';
  };
  const currentLang = localStorage.getItem('siteLang') || getCookieLang();
  
  if (langSwitcherSelect) {
    langSwitcherSelect.value = currentLang;
  }
  const langSwitcherText = document.getElementById('langSwitcherText');
  if (langSwitcherText) {
    langSwitcherText.innerText = 'EN';
    langSwitcherText.classList.add('notranslate');
  }

  // If Bengali or Arabic is selected, wait for Google Translate widget to load, then trigger it
  if (currentLang !== 'en') {
    const checkWidget = setInterval(() => {
      const translateSelect = document.querySelector('.goog-te-combo');
      if (translateSelect) {
        if (translateSelect.value !== currentLang) {
          translateSelect.value = currentLang;
          translateSelect.dispatchEvent(new Event('change'));
        }
        clearInterval(checkWidget);
      }
    }, 100);
    setTimeout(() => clearInterval(checkWidget), 5000); // stop polling after 5s
  }
  
  if (langSwitcherSelect) {
    langSwitcherSelect.addEventListener('change', (e) => {
      const targetLang = e.target.value;
      
      if (langSwitcherText) langSwitcherText.innerText = 'EN';
      
      // Update state
      localStorage.setItem('siteLang', targetLang);
      
      // Set the Google Translate cookie for persistence on actual servers
      document.cookie = `googtrans=/en/${targetLang}; path=/`;
      if (location.hostname) {
        document.cookie = `googtrans=/en/${targetLang}; domain=.${location.hostname}; path=/`;
      }
      
      // Trigger Google Translate change if available
      const translateSelect = document.querySelector('.goog-te-combo');
      if (translateSelect) {
        if (targetLang === 'en') {
          // Attempt to restore instantly using the Google Translate restore button if accessible
          const iframe = document.querySelector('.goog-te-banner-frame');
          if (iframe) {
            try {
              const innerDoc = iframe.contentDocument || iframe.contentWindow.document;
              const restoreBtn = innerDoc.getElementById(':1.restore');
              if (restoreBtn) {
                restoreBtn.click();
                return;
              }
            } catch (err) { /* ignore cross-origin issues */ }
          }
          
          // Fallback: clear cookies and attempt native dropdown reset
          document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          if (location.hostname) document.cookie = `googtrans=; domain=.${location.hostname}; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
          
          translateSelect.value = 'en';
          translateSelect.dispatchEvent(new Event('change'));
          
          // Safety fallback: if it doesn't restore within 400ms, reload the page
          setTimeout(() => {
            if (document.documentElement.classList.contains('translated-ltr') || document.documentElement.classList.contains('translated-rtl')) {
              window.location.reload();
            }
          }, 400);
        } else {
          translateSelect.value = targetLang;
          translateSelect.dispatchEvent(new Event('change'));
        }
      } else {
        // Fallback: reload the page
        window.location.reload();
      }
    });
  }

  // --- Currency Switcher ---
  const currencySwitcherSelect = document.getElementById('currencySwitcherSelect');
  const EXCHANGE_RATES = {
      'BDT': 1,
      'GBP': 1 / 150,
      'USD': 1 / 120,
      'EUR': 1 / 130
  };
  
  let currentCurrency = localStorage.getItem('currency') || 'BDT';
  if (currencySwitcherSelect) {
      currencySwitcherSelect.value = currentCurrency;
  }
  const currencySwitcherText = document.getElementById('currencySwitcherText');
  if (currencySwitcherText) {
    if (currentCurrency === 'BDT') currencySwitcherText.innerText = '৳ (BDT)';
    else if (currentCurrency === 'GBP') currencySwitcherText.innerText = '£ (GBP)';
    else if (currentCurrency === 'USD') currencySwitcherText.innerText = '$ (USD)';
    else if (currentCurrency === 'EUR') currencySwitcherText.innerText = '€ (EUR)';
  }
  
  function formatCurrency(amount, currency) {
    if (currency === 'GBP') {
      const formatted = amount.toFixed(2);
      return '£' + (formatted.endsWith('.00') ? formatted.slice(0, -3) : formatted);
    } else if (currency === 'USD') {
        const formatted = amount.toFixed(2);
        return '$' + (formatted.endsWith('.00') ? formatted.slice(0, -3) : formatted);
    } else if (currency === 'EUR') {
        const formatted = amount.toFixed(2);
        return '€' + (formatted.endsWith('.00') ? formatted.slice(0, -3) : formatted);
    }
    return '৳' + Math.round(amount);
  }
  
  // Find all text nodes that contain currency values and convert them
  function updateCurrencyInDOM(targetCurrency) {
    // Get the base currency we are coming from. This is tricky without storing original DOM values.
    // Assuming BDT is base, we need a way to track the current state or just convert from BDT base.
    // Instead of doing complex regex state tracking, let's reload the page on currency switch to keep logic simple and robust, OR we convert assuming BDT is base if we only allow single-hop conversion.
    // A better approach for this simple charity site is to reload the page with the currency saved in local storage, but since we want to avoid reloads...
    
    // Actually, doing this dynamically is hard for 4 currencies without `data-amount` attributes. Let's just reload the page and format on load.
    window.location.reload();
  }

  function formatDOMOnLoad(targetCurrency) {
      if (targetCurrency === 'BDT') return; // default HTML is BDT

      const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        null,
        false
      );
  
      let node;
      const regexBDT = /৳(\d+(?:,\d+)*(?:\.\d+)?)/g;
      const nodesToUpdate = [];
      
      while ((node = walker.nextNode())) {
        if (node.parentElement && ['SCRIPT', 'STYLE', 'NOSCRIPT', 'OPTION'].includes(node.parentElement.tagName)) continue;
        if (node.nodeValue.includes('৳')) {
          nodesToUpdate.push(node);
        }
      }
      
      nodesToUpdate.forEach(n => {
          n.nodeValue = n.nodeValue.replace(regexBDT, (match, p1) => {
            const amount = parseFloat(p1.replace(/,/g, ''));
            const converted = amount * EXCHANGE_RATES[targetCurrency];
            return formatCurrency(converted, targetCurrency);
          });
      });

      const inputs = document.querySelectorAll('input[placeholder]');
      inputs.forEach(input => {
        if (input.placeholder.includes('৳')) {
          input.placeholder = input.placeholder.replace(regexBDT, (match, p1) => {
            const amount = parseFloat(p1.replace(/,/g, ''));
            const converted = amount * EXCHANGE_RATES[targetCurrency];
            return formatCurrency(converted, targetCurrency);
          });
        }
      });
  }

  formatDOMOnLoad(currentCurrency);

  if (currencySwitcherSelect) {
    currencySwitcherSelect.addEventListener('change', (e) => {
      const newCurrency = e.target.value;
      if (newCurrency !== currentCurrency) {
          localStorage.setItem('currency', newCurrency);
          window.location.reload(); // Reload to ensure base BDT text is re-parsed cleanly.
      }
    });
  }

  // --- Custom Translation Overrides ---
  const applyOverrides = (text) => {
    if (!text) return text;
    let newText = text;
    if (newText === 'আমাদের সাথে যোগাযোগ করুন') {
      newText = 'যোগাযোগ করুন';
    } else if (newText.includes('শিক্ষার্থীদের পরামর্শ ও সার্বিক সহায়তা প্রদান করে।')) {
      newText = newText.replace('শিক্ষার্থীদের পরামর্শ ও সার্বিক সহায়তা প্রদান করে।', 'শিক্ষার্থীদের পরামর্শ ও সার্বিক সহায়তা প্রদান।');
    } else if (newText.includes('শিক্ষার্থীদের পরামর্শ ও সার্বিক সহায়তা প্রদান করে')) {
      newText = newText.replace('শিক্ষার্থীদের পরামর্শ ও সার্বিক সহায়তা প্রদান করে', 'শিক্ষার্থীদের পরামর্শ ও সার্বিক সহায়তা প্রদান');
    }
    return newText;
  };

  const observer = new MutationObserver((mutations) => {
    mutations.forEach(mutation => {
      if (mutation.type === 'characterData') {
        const newVal = applyOverrides(mutation.target.nodeValue);
        if (newVal !== mutation.target.nodeValue) {
          mutation.target.nodeValue = newVal;
        }
      } else if (mutation.type === 'childList') {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === Node.TEXT_NODE) {
            const newVal = applyOverrides(node.nodeValue);
            if (newVal !== node.nodeValue) {
              node.nodeValue = newVal;
            }
          } else if (node.nodeType === Node.ELEMENT_NODE) {
            const textNodes = document.createTreeWalker(node, NodeFilter.SHOW_TEXT, null, false);
            let tNode;
            while (tNode = textNodes.nextNode()) {
              const newVal = applyOverrides(tNode.nodeValue);
              if (newVal !== tNode.nodeValue) {
                tNode.nodeValue = newVal;
              }
            }
          }
        });
      }
    });
  });

  observer.observe(document.body, { childList: true, subtree: true, characterData: true });

  // Initial check just in case
  const textNodes = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
  let tNode;
  while (tNode = textNodes.nextNode()) {
    const newVal = applyOverrides(tNode.nodeValue);
    if (newVal !== tNode.nodeValue) {
      tNode.nodeValue = newVal;
    }
  }
});
