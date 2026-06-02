document.addEventListener("DOMContentLoaded", () => {
  const priceConfig = window.HAMAR_PRICES;
  const priceHelpers = window.HAMAR_PRICE_HELPERS;

  if (!priceConfig || !priceHelpers) {
    throw new Error("Price config is missing. Load prices.js before main.js.");
  }

  const minus40l = document.getElementById("minus-40l");
  const plus40l = document.getElementById("plus-40l");
  const quantity40l = document.getElementById("quantity-40l");

  const minus1000l = document.getElementById("minus-1000l");
  const plus1000l = document.getElementById("plus-1000l");
  const quantity1000l = document.getElementById("quantity-1000l");
  const deliveryYes = document.getElementById("delivery-yes");
  const deliveryNo = document.getElementById("delivery-no");

  const totalDisplay = document.getElementById("total-sum");
  const qty40PriceDisplay = document.getElementById("qty40PriceDisplay");
  const qty1000PriceDisplay = document.getElementById("qty1000PriceDisplay");
  const deliveryCostDisplay = document.getElementById("deliveryCostDisplay");

  const leveringskostnad = document.getElementById("leveringskostnad");
  const vedkostnad = document.getElementById("vedkostnad");

  let totalPrice = 0;

  emailjs.init("GnJ4BJ1PgpmKm49ID");

  document
    .getElementById("contact-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      const hiddenEmailInput = document.createElement("input");
      hiddenEmailInput.type = "hidden";
      hiddenEmailInput.name = "email";
      hiddenEmailInput.value = "jonathan@hamarvedsentral.no";
      this.appendChild(hiddenEmailInput);

      const hiddenToalPriceInput = document.createElement("input");
      hiddenToalPriceInput.type = "hidden";
      hiddenToalPriceInput.name = "totalPrice";
      hiddenToalPriceInput.value = String(totalPrice);
      this.appendChild(hiddenToalPriceInput);

      const serviceID = "hamarVedsentral";
      const templateID = "template_yilq9iz";

      emailjs
        .sendForm(serviceID, templateID, this)
        .then(
          () => {
            window.location.href = "./bestilling-registrert/";
          },
          (err) => {
            alert("Sending feilet");
          }
        )
        .finally(() => {
          this.removeChild(hiddenEmailInput);
          this.removeChild(hiddenToalPriceInput);
        });
    });

  const updateTotal = () => {
    const qty40 = parseInt(quantity40l.value, 10) || 0;
    const qty1000 = parseInt(quantity1000l.value, 10) || 0;

    const deliveryCost = deliveryYes.checked ? priceConfig.delivery.standardPrice : 0;
    const qty40Price = priceConfig.smallBag.standardPrice;
    const qty1000Price = priceConfig.largeBag.price;

    const woodCost = qty40 * qty40Price + qty1000 * qty1000Price;
    totalPrice = woodCost + deliveryCost;

    qty40PriceDisplay.textContent = priceHelpers.formatCurrency(qty40Price);
    qty1000PriceDisplay.textContent = priceHelpers.formatCurrency(qty1000Price);
    deliveryCostDisplay.textContent = `Levering ${priceHelpers.formatCurrency(
      priceConfig.delivery.standardPrice
    )}`;
    totalDisplay.textContent = `Sum: ${priceHelpers.formatCurrency(totalPrice)}`;
    leveringskostnad.textContent = `Leveringskostnad: ${priceHelpers.formatCurrency(deliveryCost)}`;
    vedkostnad.textContent = `Vedkostnad: ${priceHelpers.formatCurrency(woodCost)}`;
  };

  minus40l.addEventListener("click", () => {
    let current = quantity40l.value ? parseInt(quantity40l.value, 10) : 0;
    console.log(current);
    quantity40l.value = current - 1;
    updateTotal();
  });

  plus40l.addEventListener("click", () => {
    let current = quantity40l.value ? parseInt(quantity40l.value, 10) : 0;
    quantity40l.value = current + 1;
    updateTotal();
  });

  minus1000l.addEventListener("click", () => {
    let current = quantity1000l.value ? parseInt(quantity1000l.value, 10) : 0;
    quantity1000l.value = current - 1;
    updateTotal();
  });

  plus1000l.addEventListener("click", () => {
    let current = quantity1000l.value ? parseInt(quantity1000l.value, 10) : 0;
    quantity1000l.value = current + 1;
    updateTotal();
  });

  quantity40l.addEventListener("input", updateTotal);
  quantity1000l.addEventListener("input", updateTotal);
  deliveryYes.addEventListener("input", updateTotal);
  deliveryNo.addEventListener("input", updateTotal);

  // Initial total
  updateTotal();
});
