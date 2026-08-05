(function (window) {
  const prices = {
    currency: "kr",
    smallBag: {
      standardPrice: 80,
      size: 1,
    },
    largeBag: {
      price: 1520,
      size: 19,
    },
    delivery: {
      standardPrice: 500,
      unitsPerTrip: 76,
    },
  };

  const get = (path) =>
    path.split(".").reduce((value, key) => value && value[key], prices);

  const formatCurrency = (value) => `${value} ${prices.currency}`;

  const calculateDeliveryCost = ({ smallBagQuantity = 0, largeBagQuantity = 0 }) => {
    const totalSizeUnits = Math.max(
      0,
      smallBagQuantity * prices.smallBag.size + largeBagQuantity * prices.largeBag.size
    );
    const tripCount = Math.max(
      1,
      Math.ceil(totalSizeUnits / prices.delivery.unitsPerTrip)
    );

    return prices.delivery.standardPrice * tripCount;
  };

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
    calculateDeliveryCost,
    applyPricePlaceholders,
  };

  document.addEventListener("DOMContentLoaded", () => {
    applyPricePlaceholders(document);
  });
})(window);
