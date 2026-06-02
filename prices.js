(function (window) {
  const prices = {
    currency: "kr",
    smallBag: {
      standardPrice: 80,
    },
    largeBag: {
      price: 1520,
    },
    delivery: {
      standardPrice: 500,
    },
  };

  const get = (path) =>
    path.split(".").reduce((value, key) => value && value[key], prices);

  const formatCurrency = (value) => `${value} ${prices.currency}`;

  const formatValue = (value, format) => {
    if (format === "currency") {
      return formatCurrency(value);
    }

    return String(value);
  };

  const applyPricePlaceholders = (root) => {
    root.querySelectorAll("[data-price-value]").forEach((element) => {
      const value = get(element.dataset.priceValue);

      if (value === undefined) {
        return;
      }

      element.textContent = formatValue(value, element.dataset.priceFormat);
    });
  };

  window.HAMAR_PRICES = prices;
  window.HAMAR_PRICE_HELPERS = {
    get,
    formatCurrency,
    applyPricePlaceholders,
  };

  document.addEventListener("DOMContentLoaded", () => {
    applyPricePlaceholders(document);
  });
})(window);
